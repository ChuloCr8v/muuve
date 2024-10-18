import SLAComponent from "./SLAComponent";

interface Props {
  currentItem: string;
  setCurrentItem: (arg: string) => void;
}

const BillingSLAConfig = (props: Props) => {
  return (
    <div>
      <SLAComponent
        currentItem={props.currentItem}
        setCurrentItem={props.setCurrentItem}
      />
    </div>
  );
};

export default BillingSLAConfig;
