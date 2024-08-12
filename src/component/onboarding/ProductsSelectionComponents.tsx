import { Button, ConfigProvider, Segmented } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productsData } from "../../dummy/productsData";
import { productsState } from "../../types";
import ProductSelectionCard from "./ProductSelectionCard";
import { setDuration } from "../../redux/productsSlice";

const ProductsSelectionComponent = () => {
  const { products, duration } = useSelector(
    (state: productsState) => state.products
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/org/onboarding/summary`);
  };

  console.log(productsData);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <ConfigProvider
        theme={{
          components: {
            Segmented: {
              itemSelectedBg: "#40B554",
              itemSelectedColor: "white",
              itemHoverColor: "white",
            },
          },
        }}
      >
        <Segmented
          itemProp="text-red-600"
          defaultValue="Billed monthly"
          value={duration === "monthly" ? "Billed monthly" : "Billed yearly"}
          style={{ marginBottom: 8 }}
          className="rounded-full"
          onChange={(value) => {
            dispatch(setDuration(value.slice(7)));
          }}
          options={["Billed monthly", "Billed yearly"]}
        />
      </ConfigProvider>
      <div className="grid grid-cols-2 gap-6">
        {productsData.map((product) => (
          <ProductSelectionCard key={product.id} data={product} />
        ))}
      </div>
      <Button
        onClick={handleSubmit}
        className="place-self-end w-[144px]"
        type="primary"
        disabled={!products.length}
      >
        Proceed
      </Button>
    </div>
  );
};

export default ProductsSelectionComponent;
