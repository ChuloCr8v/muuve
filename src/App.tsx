import { ConfigProvider } from "antd";
import Login from "./views/onboarding/Login";
import OrgOnboarding from "./views/onboarding/OrgOnboarding";
import UserPages from "./views/UserPages";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import VerifyOrgOTP from "./views/onboarding/VerifyOrgOTP";
import OrganizationInformation from "./views/onboarding/OrganizationInformation";
import Password from "./views/onboarding/Password";
import ProductsSelection from "./views/onboarding/ProductsSelection";
import ProductsCustomization from "./views/onboarding/ProductsCustomization";
import Summary from "./views/onboarding/Summary";

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#0A96CC" } }}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserPages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/org/onboarding" element={<OrgOnboarding />} />
          <Route
            path="/org/onboarding/verify-otp/:email"
            element={<VerifyOrgOTP />}
          />
          <Route
            path="/org/onboarding/info/:email"
            element={<OrganizationInformation />}
          />
          <Route
            path="/org/onboarding/password/:email"
            element={<Password />}
          />
          <Route
            path="/org/onboarding/products"
            element={<ProductsSelection />}
          />
          <Route
            path="/org/onboarding/customize-products"
            element={<ProductsCustomization />}
          />
          <Route path="/org/onboarding/summary" element={<Summary />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
