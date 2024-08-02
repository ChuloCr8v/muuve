import OnboardingLayout from "../../component/onboarding/OnboardingLayout";
import ProductsSelectionComponent from "../../component/onboarding/ProductsSelectionComponents";

const ProductsSelection = () => {
  return (
    <div>
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
