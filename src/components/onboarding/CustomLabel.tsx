const CustomLabel = (props: {
  label: string;
  required?: boolean;
  extra?: string;
}) => {
  return (
    <label
      htmlFor=""
      className="flex items-center font-semibold gap-1 text-label_black capitalize"
    >
      {props.label}
      {props.extra && (
        <span className="text-grey font-normal">{props.extra}</span>
      )}
      {props.required && <span className="text-red-600"> *</span>}
    </label>
  );
};

export default CustomLabel;
