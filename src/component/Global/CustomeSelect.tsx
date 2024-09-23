import { CheckOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import { useState } from "react";

const { Option } = Select;

const CustomSelect = ({ items }) => {
  const [currentItems, setCurrentItems] = useState(items);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddNewItem = () => {
    if (inputValue && !currentItems.includes(inputValue)) {
      setCurrentItems([...currentItems, inputValue]);
      setInputValue("");
      setInputVisible(false);
    }
  };

  return (
    <Select
      className="w-full "
      placeholder=""
      dropdownRender={(menu) => (
        <>
          {menu}
          <div style={{ display: "flex", alignItems: "center", padding: 8 }}>
            {inputVisible ? (
              <>
                <Input
                  value={inputValue}
                  suffix={
                    inputValue && (
                      <CheckOutlined
                        className="text-[#0A95CC]"
                        onClick={handleAddNewItem}
                      />
                    )
                  }
                  onChange={handleInputChange}
                  placeholder="Add item"
                  style={{ marginRight: 8 }}
                />
                {/* {inputValue && } */}
                {/* <Button type="primary" onClick={handleAddNewItem}>
                  Add
                </Button> */}
              </>
            ) : (
              <Button type="dashed" onClick={() => setInputVisible(true)}>
                + Add option
              </Button>
            )}
          </div>
        </>
      )}
    >
      {currentItems.map((item: any) => (
        <Option key={item} value={item}>
          {item}
        </Option>
      ))}
    </Select>
  );
};

export default CustomSelect;
