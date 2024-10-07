type Props = {
  heading: string;
};

const Heading = (props: Props) => {
  return (
    <h2 className="block text-nowrap font-semibold head">
      {props.heading}
    </h2>
  );
};

export default Heading;
