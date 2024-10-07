import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const SuccessfulPasswordReset = lazy(
  () => import("../components/auth/SuccessfulPasswordReset")
);
const ReportReview = lazy(
  () => import("../components/operations/maintenance/ReportReview")
);
const Login = lazy(() => import("../views/onboarding/Login"));
const ForgotPassword = lazy(() => import("../views/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../views/auth/ResetPassword"));
const ResetPasswordOTP = lazy(() => import("../views/auth/ResetPasswordOTP"));
const OnboardingSuccessful = lazy(
  () => import("../views/onboarding/OnboardingSuccessful")
);
const OrganizationInformation = lazy(
  () => import("../views/onboarding/OrganizationInformation")
);
const OrgOnboarding = lazy(() => import("../views/onboarding/OrgOnboarding"));
const ProductsDisplayComponent = lazy(
  () => import("../views/onboarding/ProductsDisplayComponent")
);
const Summary = lazy(() => import("../views/onboarding/Summary"));
const VerifyOrgOTP = lazy(() => import("../views/onboarding/VerifyOrgOTP"));
const UserPages = lazy(() => import("../views/UserPages"));
const Password = lazy(() => import("../views/onboarding/Password"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserPages />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route
        path="/operations/maintenance/preview"
        element={<ReportReview />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/forgot-password/verify-otp/:email"
        element={<ResetPasswordOTP />}
      />
      <Route path="/reset-password/:email" element={<ResetPassword />} />
      <Route
        path="/auth/successful-password-reset/:email"
        element={<SuccessfulPasswordReset />}
      />

      {/* Onboarding */}
      <Route path="/org/onboarding" element={<OrgOnboarding />} />
      <Route path="/org/verify-otp" element={<VerifyOrgOTP />} />
      <Route
        path="/org/onboarding/info"
        element={<OrganizationInformation />}
      />
      <Route path="/org/onboarding/password" element={<Password />} />

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
  );
};

export default AppRoutes;
