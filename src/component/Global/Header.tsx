type Props = {
    heading: string;
  };
  
  const Heading = (props: Props) => {
    return <h2 className="font-semibold text-[20px]">{props.heading}</h2>;
  };
  
  export default Heading;
  