import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { persistor, store } from "./redux/store";
import Login from "./views/onboarding/Login";
import OrganizationInformation from "./views/onboarding/OrganizationInformation";
import OrgOnboarding from "./views/onboarding/OrgOnboarding";
import Password from "./views/onboarding/Password";
import ProductsDisplayComponent from "./views/onboarding/ProductsDisplayComponent";
import Summary from "./views/onboarding/Summary";
import VerifyOrgOTP from "./views/onboarding/VerifyOrgOTP";
import UserPages from "./views/UserPages";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
