import { Empty } from "antd";

type Props = { text: string };

const EmptyComponent = (props: Props) => {
  return (
    <div>
      <p className="">{props.text}</p>
      <Empty />
    </div>
  );
};

export default EmptyComponent;
