import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../component/layout/Layout";
import Survey from "./projects/Survey";
import Onboarding from "../component/Onboarding";
import LastPage from "../component/LastPage";

export default function UserPages() {
  // if (!useAuth()) {
  //   return <Navigate replace to="/login" />;
  // }
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/requests" />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/onboardings" element={<Onboarding />} />
        <Route path="/lastpage" element={<LastPage />} />

      </Routes>
    </Layout>
  );
}
