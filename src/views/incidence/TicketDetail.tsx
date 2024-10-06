import { useParams } from "react-router-dom";
import Heading from "../../component/Global/Header";
import { ticketsData } from "../../dummy/ticketsData";
import StatusTag from "../../component/Global/StatusTag";
import { Button, Dropdown, MenuProps } from "antd";
import { BiChevronDown } from "react-icons/bi";
import TableRowData from "../../component/Global/TableRowData";
import AttachmentCard from "../../component/Global/AttachmentCard";
import UserAvatar from "../../component/Global/UserAvatar";

const TicketDetail = () => {
  const { id } = useParams();

  const currentTicket = ticketsData.find((ticket) => ticket.id === id);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a className="text-green-500 text-sm">Import Customer List</a>,
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="#"
          className="text-green-500 text-sm"
        >
          Single Customer
        </a>
      ),
    },
  ];

  return (
    <div>
      <div className="">
        <div className="">
          <div className="">
            <Heading heading={currentTicket?.subject ?? ""} />
            <StatusTag status={currentTicket?.status} />
          </div>
          <Dropdown menu={{ items }} placement="bottom">
            <Button
              type="primary"
              icon={<BiChevronDown />}
              className=""
              iconPosition="end"
            >
              New Customer
            </Button>
          </Dropdown>
        </div>

        <div className="">
          <TableRowData
            mainText="Description"
            tagText={currentTicket?.description}
          />
          <div className="">
            {currentTicket?.attachments.map((attachment) => (
              <AttachmentCard name={attachment.name} size={attachment.size} />
            ))}
          </div>
        </div>

        <div className="">
          <div className="">
            <div className="">
              <UserAvatar dp={""} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
