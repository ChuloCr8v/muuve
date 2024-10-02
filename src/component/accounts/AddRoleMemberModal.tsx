import { Avatar, Select, Space } from "antd";
import ActionPopup from "../Global/ActionPopup";

type Props = {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  title: string;
};

const AddRoleMemberModal = (props: Props) => {
  const options = [
    {
      label: "Modesta Ekeh",
      value: "modestaEkeh",
      emoji: <Avatar>ME</Avatar>,
      desc: "Modesta Ekeh",
    },
    {
      label: "Benedict Nwosu",
      value: "benedictNwosu",
      emoji: <Avatar>BN</Avatar>,
      desc: "Benedict Nwosu",
    },
    {
      label: "Mistura Salaudeen",
      value: "mistura",
      emoji: <Avatar>MS</Avatar>,
      desc: "Mistura Salaudeen",
    },
    {
      label: "Lily Obicheozo",
      value: "lily",
      emoji: <Avatar>LO</Avatar>,
      desc: "Lily Obicheozo",
    },
    {
      label: "Stefflon Don",
      value: "stefflonDon",
      emoji: <Avatar>SD</Avatar>,
      desc: "Stefflon Don",
    },
  ];

  return (
    <ActionPopup
      open={props.isOpen}
      onCancel={() => props.setIsOpen(false)}
      title={"Add Members |" + " " + `${props.title}`}
      sendButtonText={"Add"}
    >
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Choose User/s"
        options={options}
        optionRender={(option) => (
          <Space>
            <span role="img" aria-label={option.data.label}>
              {option.data.emoji}
            </span>
            {option.data.desc}
          </Space>
        )}
      />
    </ActionPopup>
  );
};

export default AddRoleMemberModal;
