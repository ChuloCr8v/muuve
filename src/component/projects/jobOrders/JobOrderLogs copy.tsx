import { Popover, Tag } from "antd";
import dayjs from "dayjs";
import { BiDownload } from "react-icons/bi";
import { FileInterface, JobOrderType } from "../../../types";
import TableComponent from "../../Global/TableComponent";
import TableRowData from "../../Global/TableRowData";

type LogsDataType = {
  phase: string;
  owner: string;
  createdAt: string;
  comment: string;
  attachments: Array<FileInterface>;
};

const logData: LogsDataType[] = [
  {
    phase: "Project request created",
    owner: "modesta ekeh",
    createdAt: "2024-09-20T14:45:00.000Z",
    comment: "Please commence immidately",
    attachments: [
      {
        name: "sample.pdf",
        size: 5.5,
        type: "pdf",
      },
      {
        name: "sample 2.doc",
        size: 5.5,
        type: "doc",
      },
    ],
  },
  {
    phase: "Project request created",
    owner: "modesta ekeh",
    createdAt: "2024-09-20T14:45:00.000Z",
    comment: "Please commence immidately",
    attachments: [
      {
        name: "sample.pdf",
        size: 5.5,
        type: "pdf",
      },
      {
        name: "sample 2.doc",
        size: 5.5,
        type: "doc",
      },
    ],
  },
  {
    phase: "Project request created",
    owner: "modesta ekeh",
    createdAt: "2024-09-20T14:45:00.000Z",
    comment: "Please commence immidately",
    attachments: [],
  },
  {
    phase: "Project request created",
    owner: "modesta ekeh",
    createdAt: "2024-09-20T14:45:00.000Z",
    comment: "Please commence immidately",
    attachments: [
      {
        name: "sample.pdf",
        size: 5.5,
        type: "pdf",
      },
      {
        name: "sample 2.doc",
        size: 5.5,
        type: "doc",
      },
    ],
  },
  {
    phase: "Project request created",
    owner: "modesta ekeh",
    createdAt: "2024-09-20T14:45:00.000Z",
    comment: "Please commence immidately",
    attachments: [
      {
        name: "sample.pdf",
        size: 5.5,
        type: "pdf",
      },
      {
        name: "sample 2.doc",
        size: 5.5,
        type: "doc",
      },
    ],
  },
];

const value = (_value: any) => {
  return (
    <div className="flex flex-col items-start gap-1">
      {_value.map((item: File) => (
        <Popover
          content={<p className="text-white">{item.name}</p>}
          title={false}
          color="black"
        >
          <Tag className="rounded-full hover flex items-center gap-4 cursor-pointer border-[#40b554] bg-[#40b554] text-[#40b554] bg-opacity-5 !py-0 px-2">
            <span className=" text-[12px]">
              {item.name.slice(0, 20)}
              {item.name.length > 20 && "..."}
            </span>
            <BiDownload />
          </Tag>
        </Popover>
      ))}
    </div>
  );
};

const columns = [
  {
    title: "S/N",
    dataIndex: "",
    key: "s/n",
    render: (_text: string, _record: JobOrderType, index: number) => index + 1, // Automatically incrementing the index for serial numbers
  },
  {
    title: "Project Phase",
    dataIndex: "phase",
    key: "phase",
    render: (_text: string, record: LogsDataType) => {
      return (
        <TableRowData
          mainText={record.phase}
          tagText={record.owner}
          tagTextStyle="!text-primary"
        />
      );
    },
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    render: (_text: string, record: LogsDataType) => {
      return (
        <TableRowData
          mainText={dayjs(record.createdAt).format("DD MMM YYYY hh:mm")}
          mainTextStyle="font-normal"
        />
      );
    },
  },
  {
    title: "Comment / Uploads",
    dataIndex: "comment",
    width: 400,
    key: "comment",
    render: (_text: string, record: LogsDataType) => {
      return (
        <div className="">
          <TableRowData mainText={record.comment} mainTextStyle="font-normal" />
          {value(record.attachments)}
        </div>
      );
    },
  },
];

const JobOrderLogs = () => {
  return (
    <div>
      <TableComponent scroll={900} columns={columns} dataSource={logData} />
    </div>
  );
};

export default JobOrderLogs;
