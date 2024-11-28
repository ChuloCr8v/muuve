import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const UserPages = lazy(() => import("../views/UserPages"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserPages />} />
    </Routes>
  );
};

export default AppRoutes;
