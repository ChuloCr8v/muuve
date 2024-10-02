import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import ForgotPassword from "./views/auth/ForgotPassword";
import ResetPassword from "./views/auth/ResetPassword";
import ResetPasswordOTP from "./views/auth/ResetPasswordOTP";
import Login from "./views/onboarding/Login";
import OrganizationInformation from "./views/onboarding/OrganizationInformation";
import OrgOnboarding from "./views/onboarding/OrgOnboarding";
import Password from "./views/onboarding/Password";
import ProductsDisplayComponent from "./views/onboarding/ProductsDisplayComponent";
import Summary from "./views/onboarding/Summary";
import VerifyOrgOTP from "./views/onboarding/VerifyOrgOTP";
import UserPages from "./views/UserPages";
import SuccessfulPasswordReset from "./component/auth/SuccessfulPasswordReset";
import OnboardingSuccessful from "./views/onboarding/OnboardingSuccessful";
import ReportReview from "./component/operations/maintenance/ReportReview";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#0A96CC",
            },
            components: {
              Form: {
                itemMarginBottom: 16,
              },
             
            },
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<UserPages />} />

              {/* Auth */}
              <Route path="/login" element={<Login />} />
              <Route path="/operations/maintenance/preview" element={<ReportReview />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/forgot-password/verify-otp/:email"
                element={<ResetPasswordOTP />}
              />
              <Route
                path="/reset-password/:email"
                element={<ResetPassword />}
              />
              <Route
                path="/auth/successful-password-reset/:email"
                element={<SuccessfulPasswordReset />}
              />

              {/* Onboarding */}
              <Route path="/org/onboarding" element={<OrgOnboarding />} />
              <Route
                path="/org/onboarding/info/:email"
                element={<OrganizationInformation />}
              />
              <Route
                path="/org/onboarding/password/:email"
                element={<Password />}
              />
              <Route
                path="/org/onboarding/verify-otp/:email"
                element={<VerifyOrgOTP />}
              />

              <Route
                path="/org/onboarding/successful/:email"
                element={<OnboardingSuccessful />}
              />

              <Route
                path="/org/onboarding/products"
                element={<ProductsDisplayComponent />}
              />
              <Route
                path="/org/onboarding/customize-products"
                element={<ProductsDisplayComponent />}
              />
              <Route path="/org/onboarding/summary" element={<Summary />} />
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
