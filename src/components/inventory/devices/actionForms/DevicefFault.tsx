import { Form, Input } from "antd";
import { useState } from "react";
import { CustomLabel } from "../../../global/Extras";
import MultiUpload from "../../../global/MultipleUpload";

interface Prop {
  selectedRow: any;
}

const { TextArea } = Input;

export default function DeviceFault(props: Prop) {
  const { selectedRow } = props;

  return (
    <Form layout="vertical" className="space-y-[12px]">
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

      <Form.Item label="Reason" required>
        <TextArea rows={3} />
      </Form.Item>
    </Form>
  );
}
