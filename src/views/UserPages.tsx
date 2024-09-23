import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../component/layout/Layout";
import Invoices from "./billing/invoices";
import NewSubscription from "./billing/subscription/NewSubscription";
import Subscription from "./billing/subscription/Subscriptions";
import Tickets from "./incidence/Tickets";
import Devices from "./inventory/Devices";
import Model from "./inventory/Model";
import Operations from "./operations/Operations";
import Maintenance from "./ppm/maintenance";
import Snags from "./ppm/Snag";
import Programs from "./Programs";
import JobOrder from "./projects/JobOrders";
import Survey from "./projects/Survey";
import InitiatePayment from "./projects/surveys/InitiatePayment";

export default function UserPages() {
  // if (!useAuth()) {
  //   return <Navigate replace to="/login" />;
  // }
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/projects/survey" />} />
        <Route path="/projects/surveys" element={<Survey />} />
        <Route
          path="/projects/surveys/initiate-payment"
          element={<InitiatePayment />}
        />
        <Route path="/ppm/maintenance" element={<Maintenance />} />
        <Route path="/ppm/snags" element={<Snags />} />
        <Route path="/inventory/model" element={<Model />} />
        <Route path="/inventory/devices" element={<Devices />} />
        <Route path="/incidence/tickets" element={<Tickets />} />
        <Route path="/billing/subscription" element={<Subscription />} />
        <Route path="/billing/add-sub" element={<NewSubscription />} />
        <Route path="/billing/Invoices" element={<Invoices />} />
        <Route path="/projects/job-orders" element={<JobOrder />} />
        <Route path="/program" element={<Programs />} />
        <Route
          path="/operations/reports"
          element={
            <Operations
              title={""}
              open={false}
              close={function (): void {
                throw new Error("Function not implemented.");
              }}
              submitText={""}
            />
          }
        />
      </Routes>
    </Layout>
  );
}
