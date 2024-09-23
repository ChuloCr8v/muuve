import { CloseOutlined } from "@ant-design/icons";
import { message, UploadFile } from "antd";
import React, { useEffect, useRef } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import SelectedFiles from "./SelectedFiles";

type MultiUploadProps = {
  className?: string;
  value?: File[] | null;
  files: UploadFile<File>[];
  setFiles: any;
  onChange?: (file: File[]) => void;
  maxSizeMb?: number | false;
  required?: boolean;
};

const MB = 1024 * 1024;

export default function MultiUpload({
  files,
  setFiles,
  value,
  onChange,
  className,
  maxSizeMb = 10,
  required,
}: MultiUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value?.length === 0 && fileRef.current) {
      fileRef.current.value = "";
    }
  }, [value]);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && onChange) {
      const newFilesArray = Array.from(selectedFiles);
      const newFiles = value
        ? newFilesArray.filter(
            (file) => !value.some((f) => f.name === file.name)
          )
        : newFilesArray;

      if (maxSizeMb && newFiles.some((file) => file.size > maxSizeMb * MB)) {
        message.error(`File size cannot exceed ${maxSizeMb}MB`);
        return;
      }

      onChange([...(value || []), ...newFiles]);
    }
    if (selectedFiles) {
      setFiles((prev: File[]) => [...prev, ...Array.from(selectedFiles)]);
    }
  };

  const onRemove = (fileItem: File) => {
    setFiles((prev: File[]) =>
      prev.filter((file) => file.name !== fileItem.name)
    );
  };

  return (
    <div className={twMerge(className, "w-full")}>
      <div className="flex flex-row items-center gap-2 w-full">
        <SelectedFiles files={files} handleRemoveFile={onRemove} />

        <label
          role="button"
          className={twJoin(
            "h-8 flex items-center justify-center text-[#262626] font-semibold text-center px-4 rounded-md cursor-pointer",
            "border border-slate-300 bg-[#fbfbfb] hover:bg-slate-200 relative"
          )}
        >
          Browse
          <input
            ref={fileRef}
            type="file"
            multiple
            required={required && !value?.length}
            onChange={onFileSelect}
            className="w-[1px] h-[1px] opacity-0 absolute"
          />
        </label>
      </div>
      <div className="flex flex-col">
        {value?.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between mt-1 overflow-hidden text-sm border-[1.5px] border-[#379D51] rounded-md bg-[#E3FFE6]"
          >
            <div
              className="border-[#379D51] flex-grow flex-shrink p-2 overflow-hidden text-xs overflow-ellipsis whitespace-nowrap basis-1"
              title={file.name}
            >
              <span className="text-[#379D51]">{file.name}</span>
            </div>
            <button
              type="button"
              className="flex items-center  self-stretch justify-center flex-shrink-0 px-3 border-l border-gray-300 hover:text-white hover:bg-red-500"
              onClick={() => onRemove(file)}
            >
              <CloseOutlined />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
