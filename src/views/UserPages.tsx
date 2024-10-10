import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAuthUserQuery } from "../api/auth.api";
import { Loading } from "../components/common/Loading";
import Layout from "../components/layout/Layout";
import ProtectedRoutes from "../routes/ProtectedRoutes";

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
