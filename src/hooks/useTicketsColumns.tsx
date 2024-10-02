import { Button, Dropdown } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import StatusTag from "../component/Global/StatusTag";
import TableRowData from "../component/Global/TableRowData";
import { showPopup } from "../redux/popupSlice";
import { TicketsDataType } from "../types";
import TicketSeverityTag from "../views/incidence/TicketSeverityTag";
import useTicketsTableActionItems from "./useTicketsTableActionItems";
import TicketSLA from "../views/incidence/TicketSLA";

const useTicketsColumns = () => {
  const { ticketsTableActionItems } = useTicketsTableActionItems();

  const dispatch = useDispatch();

  const ticketTableColumns: ColumnsType<TicketsDataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (_: ReactNode, records) => {
        return (
          <TableRowData
            mainText={records.subject}
            tagText={records.category}
            tagTextStyle="!text-primary"
          />
        );
      },
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (_: ReactNode, records) => {
        return (
          <TableRowData
            mainText={records.customer}
            tagText={records.organization}
            tagTextStyle="!text-primary"
          />
        );
      },
    },
    {
      title: "Severity",
      dataIndex: "severity",
      key: "severity",
      render: (_: ReactNode, records) => {
        return <TicketSeverityTag severity={records.severity} />;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_: ReactNode, records) => {
        return (
          <TableRowData
            mainText={dayjs(records.sla).format("MMM DD YYYY, h:mm a")}
            tagText={<TicketSLA date={records.sla} status={records.status} />}
          />
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: ReactNode, records) => {
        return (
          <TableRowData
            mainText={
              ["open", "closed", "resolved", "pending"].includes(
                records.status.toLowerCase()
              ) ? (
                <StatusTag status={records.status} />
              ) : (
                records.status
              )
            }
            tagText={
              ["escalated", "assigned"].includes(records.status.toLowerCase())
                ? records.assignee
                : ""
            }
            tagTextStyle="!text-primary"
          />
        );
      },
    },
    {
      title: "Action",
      dataIndex: "latitude",
      key: "latitude",
      width: 150,
      render: (_: string, records) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: ticketsTableActionItems,
          }}
        >
          <Button
            size="small"
            className="px-4 text-grey"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(showPopup({ isOpen: false, data: records }));
            }}
          >
            Action
          </Button>
        </Dropdown>
      ),
    },
  ];
  return { ticketTableColumns };
};

export default useTicketsColumns;
