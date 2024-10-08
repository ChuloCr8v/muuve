import { Button, Input, Popconfirm, Select, Table } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { servicesData } from "../../dummy/servicesData";
import Trash from "/trash.svg";
import { PlusCircleOutlined } from "@ant-design/icons";
import { NewSubscriptionFormDataType, serviceFormDataType } from "../../types";

const serviceFormFields = {
  id: 0,
  serviceName: "",
  plan: "",
  quantity: 0,
  unitPrice: 0,
  amount: 0,
};

interface Props {
  setFormData: Dispatch<SetStateAction<NewSubscriptionFormDataType>>;
}

const ServicesRow = (props: Props) => {
  const [serviceFormData, setServiceFormData] = useState<
    Array<serviceFormDataType>
  >([serviceFormFields]);
  const [itemCount, setItemCount] = useState(1);

  const handleGetServiceFields = () => {
    const newServiceFields = serviceFormData.map((data) => ({
      serviceName: data.serviceName,
      plan: data.plan,
      quantity: data.quantity,
      amount: data.amount,
    }));

    props.setFormData((prev) => ({ ...prev, services: newServiceFields }));
  };

  useEffect(() => {
    handleGetServiceFields();
  }, [serviceFormData]);

  const handleSelectService = (serviceID: string, formDataID: number) => {
    const service = servicesData.find((service) => service.id === serviceID);

    const updatedServiceFormData = serviceFormData?.map((formData) => {
      if (formData.id === formDataID) {
        return {
          ...formData,
          serviceName: service?.serviceName || "",
          plans: service?.plans || [],
          plan: "",
          quantity: 0,
          amount: 0,
        };
      }
      return formData;
    });

    setServiceFormData(updatedServiceFormData);
  };

  const handleUpdateFormData = (
    formDataID: number,
    name: string,
    value: string | number
  ) => {
    const updatedServiceFormData = serviceFormData.map((formData) => {
      if (formData.id === formDataID) {
        let updatedItem = { ...formData, [name]: value };

        // Update unit price based on selected plan
        if (name.toLowerCase() === "plan") {
          const selectedService = servicesData.find(
            (service) => service.serviceName === formData.serviceName
          );
          const selectedPlan = selectedService?.plans.find(
            (plan) => plan.label === value
          );

          if (selectedPlan) {
            updatedItem = {
              ...updatedItem,
              unitPrice: selectedPlan.price,
              amount: selectedPlan.price * formData.quantity,
            };
          }
        }

        // Update amount based on quantity change
        if (name.toLowerCase() === "quantity") {
          updatedItem = {
            ...updatedItem,
            amount: formData.unitPrice * Number(value),
          };
        }

        return updatedItem;
      }

      return formData;
    });

    setServiceFormData(updatedServiceFormData);
  };

  const handleAddNewItem = () => {
    const newServiceItem = { ...serviceFormFields, id: itemCount };
    setServiceFormData([...serviceFormData, newServiceItem]);
    setItemCount(itemCount + 1);
  };

  const handleDelete = (id: number) => {
    setServiceFormData(serviceFormData.filter((item) => item.id !== id));
  };

  return (
    <div>
      <Table
        bordered
        dataSource={serviceFormData}
        pagination={false}
        rowKey="id"
        className="border rounded-lg"
      >
        <Table.Column
          title="Service Name"
          dataIndex="serviceName"
          key="serviceName"
          render={(_: string, record: serviceFormDataType) => (
            <Select
              value={record.serviceName}
              onChange={(value) => handleSelectService(value, record.id)}
              options={servicesData.map((service) => ({
                label: service.serviceName,
                value: service.id,
              }))}
              className="w-full"
            />
          )}
        />

        <Table.Column
          title="Plan"
          dataIndex="plan"
          key="plan"
          width={200}
          render={(_: string, record: serviceFormDataType) => (
            <Select
              value={record.plan}
              options={
                record.plans?.map((plan) => ({
                  label: plan.label,
                  value: plan.label,
                })) || []
              }
              onChange={(value) =>
                handleUpdateFormData(record.id, "plan", value)
              }
              placeholder="Select Plan"
              className="w-full"
            />
          )}
        />

        <Table.Column
          title="Quantity"
          dataIndex="quantity"
          key="quantity"
          width={144}
          render={(_text, record: serviceFormDataType) => (
            <Input
              type="number"
              min={1}
              value={record.quantity}
              className="h-7 bg-inherit"
              onChange={(e) =>
                handleUpdateFormData(
                  record.id,
                  "quantity",
                  Number(e.target.value)
                )
              }
            />
          )}
        />

        <Table.Column
          title="Unit Price"
          dataIndex="unitPrice"
          key="unitPrice"
          width={144}
          render={(_: string, record: serviceFormDataType) => (
            <div>
              <span className="text-grey mr-1">NGN</span>
              {record.unitPrice.toLocaleString()}
            </div>
          )}
        />

        <Table.Column
          title="Amount"
          dataIndex="amount"
          key="amount"
          width={144}
          render={(_text, record: serviceFormDataType) => (
            <div>
              <span className="text-grey mr-1">NGN</span>
              {record.amount.toLocaleString()}
            </div>
          )}
        />

        {
          <Table.Column
            title=""
            dataIndex="id"
            key="id"
            width={80}
            render={(_, record: serviceFormDataType) =>
              serviceFormData.length > 1 && record.id !== 0 ? (
                <Popconfirm
                  title="Are you sure you want to delete this service?"
                  onConfirm={() => handleDelete(record.id)}
                >
                  <img src={Trash} className="" />
                </Popconfirm>
              ) : (
                ""
              )
            }
          />
        }
      </Table>

      <Button
        onClick={handleAddNewItem}
        type="dashed"
        icon={<PlusCircleOutlined className="text-[13px]" />}
        iconPosition="end"
        className="flex items-center text-[13px] my-4 font-semibold border-[#0A95CC66] text-[#0A95CC]"
      >
        <span>Add Item</span>
      </Button>
    </div>
  );
};

export default ServicesRow;
