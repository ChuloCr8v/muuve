import { Ticket } from "@/api/types";
import TableComponent from "@/components/global/TableComponent";
import TableRowData from "@/components/global/TableRowData";
import { usePopup } from "@/context/PopupContext";
import { NewTicketDrawer } from "@/drawers/ticketing/NewTicketDrawer";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, MenuProps } from "antd";
import { ColumnType } from "antd/es/table";
import { differenceInMinutes } from "date-fns";
import dayjs from "dayjs";
import { CiEdit } from "react-icons/ci";
import { useListTicketsQuery } from "../../api/ticket.api";
import Header from "../../components/global/Header";
import TicketSeverityTag from "./TicketSeverityTag";
import { IoMdArrowDropdown } from "react-icons/io";
import { PiUserSwitch } from "react-icons/pi";
import { VscIssueReopened } from "react-icons/vsc";
import { EditTicketDrawer } from "@/drawers/ticketing/EditTicketDrawer";
import { ReassignTicketModal } from "@/modals/ticketing/ReassignTicketModal";
import { useNavigate } from "react-router-dom";

export default function Tickets() {
  const { openDrawer, openModal } = usePopup();

  const navigate = useNavigate();

  const listTickets = useListTicketsQuery();
  const tickets = listTickets.data ?? [];

  const actions = (ticket: Ticket): MenuProps["items"] => [
    {
      key: "1",
      label: "Edit",
      icon: <CiEdit size={20} />,
      onClick: () => openDrawer(<EditTicketDrawer ticket={ticket} />),
    },
    {
      key: "2",
      label: "Resssign",
      icon: <PiUserSwitch size={20} />,
      onClick: () => openModal(<ReassignTicketModal ticket={ticket} />),
    },
    {
      key: "3",
      label: "Reopen",
      icon: <VscIssueReopened size={20} />,
      // onClick: () => openModal(<AssignDeviceModal devices={[device]} />),
    },
  ];

  const columns: ColumnType<Ticket>[] = [
    {
      title: "ID",
      dataIndex: "ticketId",
      key: "ticketId",
      render: (_, { ticketId }) => (
        <span className="font-semibold">{ticketId}</span>
      ),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (_, record) => {
        return (
          <TableRowData
            mainText={record.subject}
            tagText={record.category.name}
            tagTextStyle="!text-primary"
          />
        );
      },
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (_, { customer }) => {
        return (
          <TableRowData
            mainText={customer.customer.name}
            tagText={customer.customer.address}
            tagTextStyle="!text-primary"
          />
        );
      },
    },
    {
      title: "Severity",
      dataIndex: "severity",
      key: "severity",
      render: (_, record) => {
        return <TicketSeverityTag severity={record.severity} />;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, record) => {
        return (
          <TableRowData
            mainText={dayjs(record.createdAt).format("MMM DD YYYY, h:mm a")}
            tagText={`${Math.floor(
              differenceInMinutes(new Date(), new Date(record.createdAt)) / 60
            )}h:${
              differenceInMinutes(new Date(), new Date(record.createdAt)) % 60
            }m`}
          />
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        return (
          <TableRowData
            mainText={record.status}
            tagTextStyle="!text-primary"
            tagText={record.assignee.staff.name}
          />
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record: any) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Dropdown
            trigger={["click"]}
            menu={{
              items: actions(record),
            }}
          >
            <Button size="small" className="px-4 text-grey">
              Action
              <IoMdArrowDropdown />
            </Button>
          </Dropdown>
        </div>
      ),
    },
  ];

  const summaryData = [
    {
      label: "Total",
      value: 8,
    },
    {
      label: "Closed",
      value: 3,
    },
    {
      label: "Open",
      value: 5,
    },
  ];

  return (
    <div className="p-8 space-y-3">
      <div className="flex items-center justify-between">
        <Header heading={"Tickets"} />

        <section className="flex items-center gap-[16px]">
          <Input className="w-[400px]" prefix={<SearchOutlined />} />
          <Button>Generate Report</Button>
          <Button>Refresh</Button>

          <Button
            className="flex items-center spacex-2"
            type="primary"
            onClick={() => openDrawer(<NewTicketDrawer />)}
          >
            <span>New Ticket</span>
            <PlusOutlined />
          </Button>
        </section>
      </div>

      {/* <SummaryCards summaryData={summaryCard} /> */}

      <TableComponent<Ticket>
        columns={columns}
        dataSource={tickets}
        loading={listTickets.isFetching}
        onRow={(ticket) => navigate(`/incidence/tickets/${ticket.id}`)}
      />
    </div>
  );
}
