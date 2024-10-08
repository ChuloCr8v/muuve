import { CloseOutlined } from "@ant-design/icons";
import { UploadFile } from "antd";

const SelectedFiles = ({
  handleRemoveFile,
  files,
}: {
  handleRemoveFile: any;
  files: UploadFile<File>[];
}) => {
  return (
    <div className="grid grid-cols-4 items-center gap-2 border rounded-md p-1 max-w-[400px] w-full min-h-8 h-fit">
      {files?.map((file, index) => (
        <div
          key={index}
          className="flex items-center justify-between overflow-hidden text-sm border-[1.5px] border-[#379D51] rounded-md bg-[#E3FFE6]"
        >
          <div
            className="border-[#379D51] flex-grow flex-shrink p-1 overflow-hidden text-xs overflow-ellipsis whitespace-nowrap basis-1"
            title={file.name}
          >
            <span className="text-[#379D51] text-sm">
              {file.name.slice(0, 10)}
            </span>
          </div>
          <button
            type="button"
            className="flex items-center  self-stretch justify-center flex-shrink-0 px-3 border-l border-gray-300 hover:text-white hover:bg-red-500"
            onClick={() => handleRemoveFile(file)}
          >
            <CloseOutlined />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SelectedFiles;
