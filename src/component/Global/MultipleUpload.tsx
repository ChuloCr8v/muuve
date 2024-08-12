import { CloseOutlined } from '@ant-design/icons';
import { Input, InputProps, message } from 'antd';
import React, { useEffect, useRef } from 'react';
// import { toast } from 'react-toastify';
import { twJoin } from 'tailwind-merge';

type MultiUploadProps = {
  className?: string;
  value?: File[] | null;
  onChange?: (file: File[]) => void;
  size?: InputProps['size'];
  maxSizeMb?: number | false;
  required?: boolean;
};

const MB = 1024 * 1024;

export default function MultiUpload({
  value,
  onChange,
  className,
  size,
  maxSizeMb = 10,
  required,
}: MultiUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value?.length === 0 && fileRef.current) {
      fileRef.current.value = '';
    }
  }, [value]);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (onChange && files) {
      const newFiles = value
        ? [...files].filter((file) => !value.includes(file))
        : [...files];
      if (maxSizeMb && newFiles.some((file) => file.size > maxSizeMb * MB)) {
        message.error(`File size cannot exceed ${maxSizeMb}MB`);
        return;
      }
      onChange(value ? [...value, ...newFiles] : newFiles);
    }
  };

  const onRemove = (file: File) => {
    if (!onChange) return;
    onChange(value?.filter((f) => f !== file) ?? []);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className={className}>
      <div className="flex flex-row gap-2">
        <Input
          className=""
          size={size}
          readOnly
          value={value?.length ? `${value.length} files selected` : ''}
        //   placeholder={
        //     'Up to ten files' + (maxSizeMb ? ` (max ${maxSizeMb}MB each)` : '')
        //   }
        />

        <label
          role="button"
          className={twJoin(
            'flex items-center justify-center text-[#262626] font-normal text-center px-4 rounded-md cursor-pointer',
            'border border-slate-300 bg-[#fbfbfb] hover:bg-slate-200 relative',
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
