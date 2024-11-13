import { DatePicker, DatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";

type Props = Omit<DatePickerProps, "onChange" | "value"> & {
  value?: Date | Dayjs | string | null;
  onChange?: (date: string | null) => void;
};

export default function DateStringPicker({ value, onChange, ...props }: Props) {
  return (
    <DatePicker
      {...props}
      value={value === undefined ? undefined : value ? dayjs(value) : null}
      onChange={onChange && ((d) => onChange(d ? d.toISOString() : null))}
    />
  );
}
