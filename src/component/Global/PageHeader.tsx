import {
  SearchOutlined,
  PlusOutlined,
  Loading3QuartersOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import Heading from "./Header";

type Props = {
  onclick: () => void;
  handleRefresh: () => void;
  handleGenerateReport: () => void;
  heading: string;
};

const PageHeader = ({
  onclick,
  handleRefresh,
  handleGenerateReport,
  heading,
}: Props) => {
  return (
    <section className=" w-full flex items-center justify-between gap-[16px]">
      <Heading heading={heading} />
      <div className="flex items-center gap-2">
        <Input className="max-w-[400px] h-7" prefix={<SearchOutlined />} />
        <Button
          onClick={handleGenerateReport}
          className="text-grey h-7"
          iconPosition="end"
          icon={<DownloadOutlined />}
        >
          Generate Report
        </Button>
        <Button
          onClick={handleRefresh}
          className="text-grey h-7"
          iconPosition="end"
          icon={<Loading3QuartersOutlined className="text-xs" />}
        >
          Refresh
        </Button>
        <Button
          onClick={onclick}
          className="flex items-center h-7"
          type="primary"
          icon={<PlusOutlined />}
          iconPosition="end"
        >
          <span>New Request</span>
        </Button>
      </div>
    </section>
  );
};

export default PageHeader;
