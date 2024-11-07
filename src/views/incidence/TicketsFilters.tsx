import { Button, Input, Select } from "antd";
import { BiPlus, BiRefresh } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { DrawerState, openDrawer } from "../../redux/popupSlice";

const filterSelectOptions = [
  {
    defaultLabel: "Requested By",
    items: [
      {
        label: "MTN",
        value: "mtn",
      },
      {
        label: "Airtel",
        value: "airtel",
      },
      {
        label: "Village People",
        value: "villagePeople",
      },
    ],
  },
  {
    defaultLabel: "Category",
    items: [
      {
        label: "Billing",
        value: "billing",
      },
      {
        label: "Payment Issues",
        value: "paymentIssues",
      },
      {
        label: "Refunds",
        value: "refunds",
      },
    ],
  },
  {
    defaultLabel: "Priority",
    items: [
      {
        label: "Critical",
        value: "critical",
      },
      {
        label: "High",
        value: "high",
      },
      {
        label: "Medium",
        value: "medium",
      },
      {
        label: "Low",
        value: "low",
      },
    ],
  },
  {
    defaultLabel: "Status",
    items: [
      {
        label: "Closed",
        value: "closed",
      },
      {
        label: "Resolved",
        value: "resolved",
      },
      {
        label: "Escalated",
        value: "escalated",
      },
      {
        label: "Open",
        value: "open",
      },
      {
        label: "Pending",
        value: "pending",
      },
    ],
  },
];

const TicketsFilters = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2">
      <Input placeholder="Search Tickets" className="max-w-[246px] w-full" />
      {filterSelectOptions.map((item) => (
        <Select
          key={item.defaultLabel}
          dropdownStyle={{ maxWidth: "fit-content", width: "100%" }}
          placeholder={item.defaultLabel}
          options={item.items.map((option) => ({
            label: option.label,
            value: option.value,
          }))}
        />
      ))}
      <Button
        icon={<BiRefresh className="text-xl" />}
        className="text-grey"
        iconPosition="end"
      >
        Refresh
      </Button>
      <Button
        onClick={() => {
          dispatch(openDrawer({ isOpen: DrawerState.NEW_TICKET_DRAWER }));
        }}
        type={"primary"}
        icon={<BiPlus />}
        iconPosition="end"
      >
        New Ticket
      </Button>
    </div>
  );
};

export default TicketsFilters;
