import { Button, Form, Input, InputNumber, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useListCustomersQuery } from "../../api/customer.api";
import {
  useListProjectCategoryQuery,
  useListProjectModeOfDeliveryQuery,
  useListRequestTypesQuery,
  useListServiceTypesQuery,
} from "../../api/org.api";
import { useListStaffQuery } from "../../api/staff.api";
import { CustomDrawer } from "../../components/common/CustomDrawer";
import MultiUpload from "../../components/global/MultiUpload";
import { regions, statesInNigeria } from "../../constants";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";
import { useCreateProjectMutation } from "../../api/project.api";
import { RiSurveyLine } from "react-icons/ri";
import { useState } from "react";
import { useListSurveysQuery } from "@/api/surveys.api";

export const NewJobDrawer = () => {
  const [showSurvey, setShowSurvey] = useState(false);

  const [form] = Form.useForm();
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const { closeDrawer } = usePopup();

  const { data: customers } = useListCustomersQuery();
  const { data: staff } = useListStaffQuery();
  const { data: serviceTypes } = useListServiceTypesQuery();
  const { data: requestTypes } = useListRequestTypesQuery();
  const { data: projectCategory } = useListProjectCategoryQuery();
  const { data: modeOfDelivery } = useListProjectModeOfDeliveryQuery();
  const { data: surveys } = useListSurveysQuery();

  const submit = async () => {
    const values = await form.validateFields();
    createProject(values)
      .unwrap()
      .then(() => {
        message.success("Job Order Created");
        closeDrawer();
      })
      .catch(toastApiError);
  };

  const handleCustomerChange = (cusId: string) => {
    const selectedCustomer = customers?.find((u) => u.id === cusId);

    if (selectedCustomer) {
      form.setFieldsValue({
        address: selectedCustomer.customer.address,
      });
    }
  };

  const handleSurveyChange = (surveyId: string) => {
    const selectedSurvey = surveys?.find((u) => u.id === surveyId);

    if (selectedSurvey) {
      form.setFieldsValue(selectedSurvey);
    }
  };

  return (
    <CustomDrawer
      title="New Customer Job Order"
      width={550}
      onSubmit={submit}
      loading={isLoading}
    >
      <div className="w-full">
        <div className="flex justify-end">
          <Button
            size="small"
            icon={<RiSurveyLine />}
            onClick={() => setShowSurvey(true)}
          >
            Import From Survey
          </Button>
        </div>
        <Form form={form} layout="vertical">
          {showSurvey && (
            <Form.Item
              label="Survey ID"
              required
              name="surveyId"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                options={surveys?.map((s) => ({
                  label: s.surveyId,
                  value: s.id,
                }))}
                onChange={handleSurveyChange}
              />
            </Form.Item>
          )}
          <Form.Item
            label="Customer"
            required
            name="customerId"
            rules={[{ required: true, message: "Customer is required" }]}
          >
            <Select
              showSearch
              optionFilterProp="label"
              options={customers?.map((u) => ({
                label: u.customer.name,
                value: u.id,
              }))}
              onChange={handleCustomerChange}
            />
          </Form.Item>
          <Form.Item
            label="Service Description"
            required
            name="description"
            rules={[
              {
                required: true,
                message: "Service description is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Service Location Address"
            required
            name="address"
            rules={[
              {
                required: true,
                message: "Address is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="flex space-x-3">
            <Form.Item
              className="w-1/2"
              label="Service Type"
              required
              name="serviceTypeId"
              rules={[{ required: true, message: "Service type is required" }]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                options={serviceTypes?.map((st) => ({
                  label: st.name,
                  value: st.id,
                }))}
              />
            </Form.Item>
            <Form.Item
              className="w-1/2"
              label="Request Type"
              required
              name="requestTypeId"
              rules={[{ required: true, message: "Request type is required" }]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                options={requestTypes?.map((rt) => ({
                  label: rt.name,
                  value: rt.id,
                }))}
              />
            </Form.Item>
          </div>
          <div className="flex space-x-3">
            <Form.Item
              className="w-1/2"
              label="Mode Of Delivery"
              required
              name="modeOfDeliveryId"
              rules={[
                { required: true, message: "Mode of delivery is required" },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                options={modeOfDelivery?.map((md) => ({
                  label: md.name,
                  value: md.id,
                }))}
              />
            </Form.Item>
            <Form.Item
              className="w-1/2"
              label="Project Category"
              required
              name="categoryId"
              rules={[
                { required: true, message: "Project category is required" },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                options={projectCategory?.map((pc) => ({
                  label: pc.name,
                  value: pc.id,
                }))}
              />
            </Form.Item>
          </div>
          <div className="flex space-x-3">
            <Form.Item
              className="w-1/2"
              label="Bandwidth"
              required
              name="bandwidth"
              rules={[{ required: true, message: "Bandwidth is required" }]}
            >
              <Input />
            </Form.Item>
            <div className="flex w-1/2">
              <Form.Item
                className="w-1/2"
                label="NRR"
                required
                name="nrr"
                rules={[{ required: true, message: "NRR is required" }]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                className="w-1/2"
                label="MRR"
                required
                name="mrr"
                rules={[{ required: true, message: "MRR is required" }]}
              >
                <InputNumber />
              </Form.Item>
            </div>
          </div>
          <div className="flex space-x-3">
            <Form.Item
              className="w-1/2"
              label="State"
              required
              name="state"
              rules={[{ required: true, message: "State is required" }]}
            >
              <Select
                showSearch
                options={statesInNigeria.map((s) => ({
                  label: s,
                  value: s,
                }))}
              />
            </Form.Item>
            <Form.Item
              className="w-1/2"
              label="Region"
              required
              name="region"
              rules={[{ required: true, message: "Region is required" }]}
            >
              <Select
                options={regions.map((r) => ({
                  label: r,
                  value: r,
                }))}
              />
            </Form.Item>
          </div>
          <div className="flex space-x-3">
            <Form.Item
              className="w-1/2"
              label="Longitude"
              required
              name="longitude"
              rules={[{ required: true, message: "Longitude is required" }]}
            >
              <InputNumber className="w-full" />
            </Form.Item>
            <Form.Item
              className="w-1/2"
              label="Latitude"
              required
              name="latitude"
              rules={[{ required: true }]}
            >
              <InputNumber className="w-full" />
            </Form.Item>
          </div>
          <div className="flex space-x-3">
            <Form.Item
              className="w-1/2"
              label="Manager"
              required
              name="managerId"
              rules={[{ required: true, message: "Manager is required" }]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                options={staff?.map((s) => ({
                  label: s.staff.name,
                  value: s.id,
                }))}
              />
            </Form.Item>
            <Form.Item
              className="w-1/2"
              label="Project Lead"
              required
              name="leadId"
              rules={[{ required: true, message: "Manager is required" }]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                options={staff?.map((s) => ({
                  label: s.staff.name,
                  value: s.id,
                }))}
              />
            </Form.Item>
          </div>
          <Form.Item label="Comment" name="comment">
            <TextArea />
          </Form.Item>
          <Form.Item label="Upload one or more files" name="attachments">
            <MultiUpload />
          </Form.Item>
        </Form>
      </div>
    </CustomDrawer>
  );
};
