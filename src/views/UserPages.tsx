import Layout from '../component/layout/Layout'
import { Navigate, Route, Routes } from 'react-router-dom';
import Survey from './projects/Survey';
import JobOrder from './projects/JobOrder';
import Programs from './Programs';
import Operations from './operations/Operations';
import Maintenance from './ppm/maintenance';
import Snags from './ppm/Snag';
import Model from './inventory/Model';
import Devices from './inventory/Devices';
import Tickets from './incidence/Tickets';
import Subscription from './billing/subscription/Subscriptions';
import NewSubscription from './billing/subscription/NewSubscription';
import Invoices from './billing/invoices';



export default function UserPages() {
  // if (!useAuth()) {
  //   return <Navigate replace to="/login" />;
  // }
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/projects/survey" />} />
        <Route path="/projects/survey" element={<Survey />} />
        <Route path="/ppm/maintenance" element={<Maintenance />} />
        <Route path="/ppm/snags" element={<Snags />} />
        <Route path="/inventory/model" element={<Model />} />
        <Route path="/inventory/devices" element={<Devices />} />
        <Route path="/incidence/tickets" element={<Tickets />} />
        <Route path="/billing/subscription" element={<Subscription />} />
        <Route path="/billing/add-sub" element={<NewSubscription />} />
        <Route path="/billing/Invoices" element={<Invoices/>}/>
        <Route path="/projects/job-order" element={<JobOrder />} />
        <Route path="/program" element={<Programs />} />
        <Route path="/operations/reports" element ={<Operations title={''} open={false} close={function (): void {
          throw new Error('Function not implemented.');
        } } submitText={''}/>}/>

      </Routes>
    </Layout>
  );
}

