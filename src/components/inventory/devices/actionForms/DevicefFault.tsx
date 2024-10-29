import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { CustomLabel } from "../../../global/Extras";
import MultiUpload from "../../../global/MultipleUpload";
import { useReportFaultMutation } from "../../../../api/devices.api";
import { toastApiError } from "../../../../utils/error.util";

interface Prop {
  selectedRow: any;
  setOpenActionModal: any;
}

const { TextArea } = Input;

export default function DeviceFault(props: Prop) {
  const { selectedRow, setOpenActionModal } = props;
  const [reportFault, { isLoading }] = useReportFaultMutation();
  const [form] = Form.useForm();

  const Submit = async () => {
    const values = await form.validateFields();

    const data = { ...values, id: selectedRow.id };

    reportFault(data)
      .unwrap()
      .then(() => {
        message.success("Fault Reported");
        setOpenActionModal(false);
      })
      .catch(toastApiError);
  };

  return (
    <Form form={form} layout="vertical" className="space-y-[12px]">
      <span>
        Are you sure you want to report fault on{" "}
        <span className="font-semibold">{selectedRow?.name}</span> ?
      </span>

      <Form.Item
        label={
          <CustomLabel
            main={"Upload one or more files "}
            subText={"(Max: 10 files, 10mb each)"}
          />
        }
      >
        <MultiUpload files={[]} setFiles={undefined} />
      </Form.Item>

      <Form.Item label="Reason" name="comment" required>
        <TextArea rows={3} />
      </Form.Item>

      <Button onClick={Submit}>Submit</Button>
    </Form>
  );
}
