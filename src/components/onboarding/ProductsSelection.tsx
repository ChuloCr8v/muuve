import OnboardingLayout from "./OnboardingLayout";
import ProductsSelectionComponent from "./ProductsSelectionComponents";

const ProductsSelection = () => {
  return (
    <div className="overflow-y-scroll">
      <OnboardingLayout
        children={<ProductsSelectionComponent />}
        heading={"What products are you interested in?"}
        subheading={"You can select as much products as you want"}
        steps
        totalSteps={5}
        currentStep={3}
      />
    </div>
  );
};

export default ProductsSelection;
