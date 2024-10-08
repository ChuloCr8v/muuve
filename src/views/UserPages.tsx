import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import { useGetAuthUserQuery } from "../api/auth.api";
import { useEffect } from "react";
import { Loading } from "../components/common/Loading";

export default function UserPages() {
  const navigate = useNavigate();
  const { data: user, isLoading: loadingUser } = useGetAuthUserQuery();

  useEffect(() => {
    if (!loadingUser && !user) {
      navigate("/login");
    }
  }, [loadingUser, user, navigate]);

  if (loadingUser) return <Loading />;

  return (
    <Layout>
      <ProtectedRoutes />
    </Layout>
  );
}
