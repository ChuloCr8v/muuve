import { useState } from "react";
import { Button, Table, message, Input, Upload } from "antd";
import { CheckOutlined, RightOutlined } from "@ant-design/icons";
import Papa from "papaparse";

interface CustomerData {
  sn: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const ImportCustomerList = () => {
  const [tableData, setTableData] = useState<CustomerData[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const columns = [
    { title: "S/N", dataIndex: "sn", key: "sn" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Address", dataIndex: "address", key: "address" },
  ];

  const handleFileSelect = (file: File) => {
    setFile(file);
    setFileName(file.name); 
    return false; 
  };

  const handleSubmit = () => {
    if (!file) {
      message.error("Please select a CSV file before submitting.");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<CustomerData>) => {
        if (results.errors.length === 0) {
          // Map CSV data to table format
          const data = results.data.map((row, index) => ({
            sn: index + 1,
            name: row.name || "",
            email: row.email || "",
            phone: row.phone || "",
            address: row.address || "",
          }));
          setTableData(data);
          message.success("CSV file processed successfully!");
        } else {
          message.error("Error parsing CSV file.");
        }
      },
    });
  };

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 md:flex-row items-center justify-between mb-2 p-2">
      <h2 className="text-lg md:text-xl font-semibold">New Customer <RightOutlined size={2} /> Import List</h2>
      <Button
        type="primary"
        icon={<CheckOutlined />}
        iconPosition="end"
        className=""
        onClick={handleSubmit}
        // disabled={!file}
      >
        Submit
      </Button>
      </div>
      <p className="text-sm ">Attach files (Max: 10 files, 10Mb each) </p>
      <div className="py-4 flex items-center">
        <Input
          value={fileName}
          // disabled
          placeholder="No file selected"
          className=" w-full md:w-[50%] mr-4"
        />

        <Upload
          beforeUpload={handleFileSelect}
          showUploadList={false}
          accept=".csv"
        >
          <Button  type="primary">
            Browse
          </Button>
        </Upload>
      </div>

      {tableData.length > 0 && (
       <div>
         <p className="font-semibold">Customer List</p>
        <Table
          columns={columns}
          dataSource={tableData}
          rowKey="sn"
          pagination={false}
          className="mt-4"
        />
       </div>
      )}
    </div>
  );
};

export default ImportCustomerList;
