import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(
  () => import("../views/Home")
);

const AppRoutes = () => {
  return (
    <Routes>
      
      <Route
        path="/"
        element={<Home />}
      />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
