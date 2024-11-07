import { Form, Input, InputNumber, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useListCustomersQuery } from "../../api/customer.api";
import {
  useListProjectCategoryQuery,
  useListProjectModeOfDeliveryQuery,
  useListRequestTypesQuery,
  useListServiceTypesQuery,
} from "../../api/org.api";
import { useEditProjectMutation } from "../../api/project.api";
import { useListStaffQuery } from "../../api/staff.api";
import { Project } from "../../api/types";
import { CustomDrawer } from "../../components/common/CustomDrawer";
import MultiUpload from "../../components/global/MultiUpload";
import { regions, statesInNigeria } from "../../constants";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";

interface Props {
  project: Project;
}

export const EditJobDrawer = ({ project }: Props) => {
  const [form] = Form.useForm();
  const [edit, { isLoading }] = useEditProjectMutation();
  const { closeDrawer } = usePopup();

  const { data: customers } = useListCustomersQuery();
  const { data: staff } = useListStaffQuery();
  const { data: serviceTypes } = useListServiceTypesQuery();
  const { data: requestTypes } = useListRequestTypesQuery();
  const { data: projectCategory } = useListProjectCategoryQuery();
  const { data: modeOfDelivery } = useListProjectModeOfDeliveryQuery();

  const submit = async () => {
    const values = await form.validateFields();
    edit({ id: project.id, ...values })
      .unwrap()
      .then(() => {
        message.success("Job Details Updated");
        closeDrawer();
      })
      .catch(toastApiError);
  };

  return (
    <CustomDrawer
      title="Edit Job Details"
      okText="Update"
      width={500}
      onSubmit={submit}
      loading={isLoading}
    >
      <div className="w-full">
        <Form form={form} layout="vertical" initialValues={project}>
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
              rules={[{ required: true, message: "Lattitude is required" }]}
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
