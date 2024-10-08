import { CgList } from "react-icons/cg";
import { FaBan } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { VscVmActive } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";

const SummaryCardIcon = ({ label }: { label: string }) => {
  const icon = () => {
    switch (label.toLowerCase()) {
      case "total":
        return <CgList />;
      case "active":
      case "available":
      case "closed":
        return <VscVmActive />;
      case "deactivated":
      case "inactive":
      case "open":
        return <FaBan />;

      case "expiring":
        return <IoWarningOutline />;
    }
  };

  const color = () => {
    switch (label.toLowerCase()) {
      case "total":
        return "bg-[#00afef] text-[#00afef]";
      case "active":
      case "available":
      case "closed":
        return "bg-green-500 text-green-600";
      case "deactivated":
      case "inactive":
      case "open":
        return "bg-red-500 text-red-600";
      default:
        return "bg-yellow-500 text-yellow-600";
    }
  };

  return (
    <div
      className={twMerge(
        "h-12 w-12 rounded-full flex items-center justify-center border-none summary_card-icon bg-opacity-10",
        color()
      )}
    >
      {icon()}
    </div>
  );
};

export default SummaryCardIcon;
