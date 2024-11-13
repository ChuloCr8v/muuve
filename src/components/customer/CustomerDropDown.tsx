import { Button, MenuProps } from "antd";
import { useNavigate } from "react-router-dom"; // Use react-router-dom for navigation

const CustomerDropButton = () => {
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button
          size="small"
          type="link"
          rel="noopener noreferrer"
          className="text-sm text-black"
        >
          Single Customer
        </Button>
      ),
    },
    {
      key: "2",
      label: (
        <Button
          type="link"
          size="small"
          className="text-sm text-black"
          onClick={() => navigate("import-customers")}
        >
          Import Customer List
        </Button>
      ),
    },
  ];

  return <div></div>;
};

export default CustomerDropButton;
