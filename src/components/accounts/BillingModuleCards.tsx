import { Button } from "antd";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openDeactivateServiceModal } from "../../redux/popupSlice";
import { updateProducts } from "../../redux/productsSlice";
import TableRowData from "../global/TableRowData";
import { productsData } from "../../dummy/productsData";

const products = [
  {
    id: "PM",
    moduleTitle: "project management",
    cost: 200000,
    billingDate: 1727714328,
  },
  {
    id: "BS",
    moduleTitle: "billing system",
    cost: 800000,
    billingDate: 1727627928,
  },
  {
    id: "IS",
    moduleTitle: "Inventory system",
    cost: 500000,
    billingDate: 1727541528,
  },
  {
    id: "TS",
    moduleTitle: "Ticketing system",
    cost: 100000,
    billingDate: 1727455128,
  },
  {
    id: "SALES",
    moduleTitle: "Sales",
    cost: 900000,
    billingDate: 1727368728,
  },
];

const BillingModuleCards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (product: { id: string }) => {
    const selectedProduct = productsData.find((p) => p.id === product.id);
    dispatch(updateProducts([selectedProduct]));
    navigate(`/account/plan-update`);
  };

  return (
    <div className="bg-white flex gap-4 w-full overflow-x-scroll billing-settings">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-md max-w-[600px] w-full p-4 space-y-3"
        >
          <TableRowData
            mainText={product.moduleTitle}
            tagText={"NGN" + product.cost.toLocaleString()}
            mainTextStyle="font-normal text-grey"
            tagTextStyle="font-semibold !text-customBlack"
          />
          <TableRowData
            wrapperClassName="flex items-center gap-2"
            mainText={"Next billing date"}
            tagText={dayjs(product.billingDate).format("MMM DD, YYYY")}
            mainTextStyle="font-normal text-grey"
            tagTextStyle="font-semibold !text-customBlack"
          />
          <div className="flex items-center gap-2">
            <Button
              onClick={() => dispatch(openDeactivateServiceModal(product))}
            >
              Deactivate
            </Button>
            <Button onClick={() => handleClick(product)} type="primary">
              Upgrade/Downgrade
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BillingModuleCards;
