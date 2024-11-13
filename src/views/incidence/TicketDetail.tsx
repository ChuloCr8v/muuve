import { Button, Dropdown, Input } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { useParams } from "react-router-dom";

import { ticketsData } from "../../dummy/ticketsData";
import TimeDifference from "../../hooks/TimeDifference";
import TicketLogItem from "./TicketLog";
import TicketRepliesComponent from "./TicketRepliesComponent";
import TicketReplyComponent from "./TicketReplyComponent";
import TicketSeverityTag from "./TicketSeverityTag";
import useTicketActionItems from "../../hooks/incidence/useTicketActionItems";
import StatusTag from "../../components/global/StatusTag";
import FileCard from "../../components/global/FileCard";
import Heading from "../../components/global/Header";
import TableRowData from "../../components/global/TableRowData";
import UserAvatar from "../../components/global/UserAvatar";
import { useGetTicketQuery, useListTicketsQuery } from "@/api/ticket.api";

const TicketDetail = () => {
  const [replyContent, setReplyContent] = useState("");
  const { id } = useParams();

  const { data: tickets, isLoading: gettingTickets } = useListTicketsQuery();

  const currentTicket = tickets?.find((item) => item.id === id);
  console.log(currentTicket);

  const { ticketActionItems } = useTicketActionItems(id ?? "");

  const ticketDetailsData = [
    {
      label: "request date",
      value: dayjs(currentTicket?.createdAt).format("MMM DD, YYYY HH:MM A"),
    },
    {
      label: "category",
      value: currentTicket?.category.name,
    },
    {
      label: "Customer",
      value: (
        <UserAvatar
          firstName={currentTicket?.customer.customer.name.split(" ")[0] ?? ""}
          lastName={currentTicket?.customer.customer.name.split(" ")[1] ?? ""}
          showFullName
        />
      ),
    },
    {
      label: "Status",
      value: <StatusTag status={currentTicket?.status ?? ""} />,
    },
    {
      label: "Assignee",
      value: (
        <UserAvatar
          firstName={currentTicket?.assignee.staff.name.split(" ")[0] ?? ""}
          lastName={currentTicket?.assignee.staff.name.split(" ")[1] ?? ""}
          showFullName
        />
      ),
    },
    {
      label: "Severity",
      value: <TicketSeverityTag severity={currentTicket?.severity ?? ""} />,
    },
    {
      label: "Age",
      value: <TimeDifference date={currentTicket?.createdAt!} />,
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heading heading={currentTicket?.subject ?? ""} />
          <StatusTag status={currentTicket?.status ?? ""} />
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

      <div className="grid grid-cols-5 gap-3">
        {/* left */}
        <div className="col-span-3 space-y-4">
          <div className="p-4 py-4 space-y-4 bg-white border rounded-md">
            <TableRowData
              mainText="Description"
              mainTextStyle="text-grey uppercase font-semibold"
              wrapperClassName="space-y-2 text-sm"
              tagTextStyle="!text-customBlack !text-sm"
              tagText={currentTicket?.description}
            />

            <div className="space-y-2">
              <p className="font-semibold text-grey text-sm">
                {ticketsData[0]?.attachments.length} Attachment
                {ticketsData[0]?.attachments.length &&
                  ticketsData[0]?.attachments.length > 1 &&
                  "s"}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {ticketsData[0]?.attachments.map((attachment, index) => (
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
          <div className="w-full pb-6 space-y-4 bg-white border rounded-md h-fit">
            <TableRowData
              mainText="Ticket Details"
              wrapperClassName="border-b p-4"
            />

            <div className="p-4 py-0 space-y-3">
              {ticketDetailsData.map((item) => (
                <TableRowData
                  mainText={item.label}
                  tagText={item.value}
                  wrapperClassName="grid grid-cols-2 text-sm items-center"
                  mainTextStyle="uppercase text-grey font-semibold text-[13px]"
                  tagTextStyle="!text-customBlack !text-sm"
                />
              ))}
            </div>
          </div>

          <div className="p-2 space-y-4 bg-white border rounded-md h-fit">
            <div className="px-2 space-y-4">
              {" "}
              <TableRowData
                mainText="History"
                mainTextStyle="!text-grey font-semibold"
              />
              <Input
                type="text"
                placeholder="Search history, action, user"
                prefix={<FaSearch className="mr-2 text-grey" />}
              />
            </div>

            <div className="w-full pt-4 px-3 h-[500px]  overflow-y-scroll">
              {ticketsData[0]?.history?.map((history, index) => (
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
