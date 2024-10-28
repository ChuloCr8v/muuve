import { Button, Form, Input, Radio, RadioChangeEvent, Select, Table } from "antd";
import { useState } from "react";
import { useListStaffQuery } from "../../../../api/staff.api";

interface Prop {
  selectedRow: any;
  form: any;
}

const { TextArea } = Input;

export default function AssignDevice(props: Prop) {
  const { selectedRow, form } = props;
  const { data: Staffs, isLoading: isStaffLoading, error } = useListStaffQuery();
  const listStaff = Staffs;

  const [value, setValue] = useState("User");

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const Jobs: any[] = [];

  const options = [
    { label: "User", value: "User" },
    { label: "Job", value: "Job" },
  ];

  const device = [
    { title: "Serial No", dataIndex: "serialNumber" },
    { title: "Name", width: 200, dataIndex: "name" },
    { title: "Part No", dataIndex: "partNumber" },
  ];

  if (isStaffLoading) return <div>Loading staff data...</div>;
  if (error) return <div>Error loading staff data</div>;

  return (
    <Form form={form} layout="vertical" className="space-y-[12px]">
      <Form.Item name="deviceIds:" label={<span className="pb-2">You are about to assign this device to a user!</span>}>
        <Table
          size="small"
          pagination={false}
          className="border-[1.5px] rounded-md"
          columns={device}
          dataSource={Array.isArray(selectedRow) ? selectedRow : [selectedRow]}
        />
      </Form.Item>

      <div className="grid grid-cols-1 gap-x-[8px]">
        <Form.Item name="assigneeId" required label={value === "Job" ? "Select Job" : "Select User"}>
          <Select
            options={
              value === "User"
                ? listStaff?.map((d) => ({ label: d.staff.name, value: d.id}))
                : Jobs.map((job) => ({ label: job, value: job }))
            }
          />
        </Form.Item>
      </div>

      <Form.Item label="Comment">
        <TextArea rows={3} />
      </Form.Item>
    </Form>
  );
}
