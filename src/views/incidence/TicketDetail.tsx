import { Button, Dropdown, Input } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { useParams } from "react-router-dom";
import FileCard from "../../component/Global/FileCard";
import Heading from "../../component/Global/Header";
import StatusTag from "../../component/Global/StatusTag";
import TableRowData from "../../component/Global/TableRowData";
import UserAvatar from "../../component/Global/UserAvatar";
import { ticketsData } from "../../dummy/ticketsData";
import TimeDifference from "../../hooks/TimeDifference";
import TicketLogItem from "./TicketLog";
import TicketRepliesComponent from "./TicketRepliesComponent";
import TicketReplyComponent from "./TicketReplyComponent";
import TicketSeverityTag from "./TicketSeverityTag";
import useTicketActionItems from "../../hooks/incidence/useTicketActionItems";

const TicketDetail = () => {
  const [replyContent, setReplyContent] = useState("");
  const { id } = useParams();

  const currentTicket = ticketsData.find((ticket) => ticket.id === id);

  const { ticketActionItems } = useTicketActionItems(id);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heading heading={currentTicket?.subject ?? ""} />
          <StatusTag status={currentTicket?.status} />
        </div>
        <Dropdown menu={{ items: ticketActionItems }} placement="bottom">
          <Button
            type="primary"
            icon={<FaChevronDown />}
            className=""
            iconPosition="end"
          >
            Take Action
          </Button>
        </Dropdown>
      </div>

      <div className="grid gap-4 grid-cols-5">
        {/* left */}
        <div className="space-y-4 col-span-3">
          <div className="border p-4 py-4 rounded-md bg-white space-y-4">
            <TableRowData
              mainText="Description"
              mainTextStyle="text-grey uppercase font-semibold"
              wrapperClassName="space-y-2"
              tagTextStyle="!text-customBlack"
              tagText={currentTicket?.description}
            />

            <div className="space-y-2">
              <p className="text-grey font-semibold">
                {currentTicket?.attachments.length} Attachment
                {currentTicket?.attachments.length &&
                  currentTicket?.attachments.length > 1 &&
                  "s"}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {currentTicket?.attachments.map((attachment, index) => (
                  <FileCard
                    key={index}
                    name={attachment.name}
                    size={attachment.size}
                    fileType={attachment.type}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ReplyForm */}
          <TicketReplyComponent
            setReplyContent={setReplyContent}
            replyContent={replyContent}
          />

          {/* Replies */}
          <TicketRepliesComponent currentTicket={currentTicket} />
        </div>

        {/* Right */}
        <div className="col-span-2 space-y-4">
          <div className="w-full border pb-6 rounded-md bg-white space-y-4 h-fit">
            <TableRowData
              mainText="Ticket Details"
              wrapperClassName="border-b p-4"
            />

            <div className="p-4 space-y-4">
              <TableRowData
                mainText="Request Date"
                tagText={dayjs(currentTicket?.requestDate).format(
                  "MMM DD, YYYY HH:MM A"
                )}
                wrapperClassName="grid grid-cols-2"
                mainTextStyle="uppercase text-grey"
                tagTextStyle="!text-customBlack font-semibold"
              />

              <TableRowData
                mainText="Category"
                tagText={currentTicket?.category}
                wrapperClassName="grid grid-cols-2"
                mainTextStyle="uppercase text-grey"
                tagTextStyle="!text-customBlack font-semibold "
              />

              <TableRowData
                mainText="Customer"
                tagText={
                  <UserAvatar
                    firstName={"Modesta"}
                    lastName={"Ekeh"}
                    showFullName
                  />
                }
                wrapperClassName="grid grid-cols-2"
                mainTextStyle="uppercase text-grey"
                tagTextStyle="!text-customBlack font-semibold"
              />

              <TableRowData
                mainText="Status"
                tagText={<StatusTag status={currentTicket?.status} />}
                wrapperClassName="grid grid-cols-2"
                mainTextStyle="uppercase text-grey"
                tagTextStyle="!text-customBlack font-semibold"
              />

              <TableRowData
                mainText="Assignee"
                tagText={
                  <UserAvatar
                    firstName={"Stefflon"}
                    lastName={"Don"}
                    showFullName
                  />
                }
                wrapperClassName="grid grid-cols-2"
                mainTextStyle="uppercase text-grey"
                tagTextStyle="!text-customBlack font-semibold"
              />

              <TableRowData
                mainText="Severity"
                tagText={
                  <TicketSeverityTag severity={currentTicket?.severity ?? ""} />
                }
                wrapperClassName="grid grid-cols-2"
                mainTextStyle="uppercase text-grey"
                tagTextStyle="!text-customBlack font-semibold"
              />

              <TableRowData
                mainText="Age"
                tagText={
                  <TimeDifference date={currentTicket?.requestDate ?? 0} />
                }
                wrapperClassName="grid grid-cols-2"
                mainTextStyle="uppercase text-grey"
                tagTextStyle="!text-customBlack font-semibold"
              />
            </div>
          </div>

          <div className="border p-4 rounded-md bg-white space-y-4 h-fit">
            <TableRowData
              mainText="History"
              mainTextStyle="!text-grey font-semibold"
            />

            <Input
              type="text"
              placeholder="Search history, action, user"
              prefix={<FaSearch className="text-grey mr-2" />}
            />

            <div className="w-full pt-4">
              {currentTicket?.history?.map((history, index) => (
                <TicketLogItem data={history} key={index} module="ticketing" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
