import dayjs from "dayjs";
import { TicketsDataType } from "../../types";
import FileCard from "../../components/global/FileCard";
import UserAvatar from "../../components/global/UserAvatar";

type Props = {
  currentTicket?: TicketsDataType;
};

const TicketRepliesComponent = (props: Props) => {
  return (
    <div className="">
      {props.currentTicket?.replies?.map((reply, index) => (
        <div
          className="border p-4 py-6 rounded-md bg-white space-y-4"
          key={index}
        >
          <div className="flex items-center justify-between">
            <UserAvatar
              firstName={reply.user.firstName}
              lastName={reply.user.lastName}
              showFullName
            />
            <p className="text-grey">
              {dayjs(reply.date).format("MMM DD, YYYY HH:MM a")}
            </p>
          </div>

          <p className="">{reply.message}</p>
          <div className="space-y-2">
            <p className="font-semibold text-grey">
              {reply.attachments?.length} Attachment
              {reply.attachments && reply.attachments?.length > 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-2">
              {reply.attachments?.map((attachment, index) => (
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
      ))}
    </div>
  );
};

export default TicketRepliesComponent;
