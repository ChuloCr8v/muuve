import Layout from '../component/layout/Layout'
import { Navigate, Route, Routes } from 'react-router-dom';
import Survey from './projects/Survey';


export default function UserPages() {
  // if (!useAuth()) {
  //   return <Navigate replace to="/login" />;
  // }
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/projects/survey" />} />
        <Route path="/projects/survey" element={<Survey />} />
        
      </Routes>
    </Layout>
  );
}
