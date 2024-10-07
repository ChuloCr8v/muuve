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
    <section className="flex w-full gap-4">
      <Heading heading={heading} />
      <div className="flex items-center justify-end w-full gap-2">
        <Input className="max-w-[300px] w-full" prefix={<SearchOutlined />} />
        <Button
          onClick={handleGenerateReport}
          className="text-xs text-grey"
          iconPosition="end"
          icon={<DownloadOutlined />}
        >
          Generate Report
        </Button>
        <Button
          onClick={handleRefresh}
          className="text-grey"
          iconPosition="end"
          icon={<Loading3QuartersOutlined className="text-xs" />}
        >
          Refresh
        </Button>
        <Button
          onClick={onclick}
          className="flex items-center text-xs"
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
