import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "../api/data/auth";
import { AuthResult } from "../api/types";
import { toastApiError } from "../utils/error.util";

export function useAuthComplete() {
  const auth = useAuthState();
  const navigate = useNavigate();
  const { search } = useLocation();

  return useCallback(
    async (result: Promise<AuthResult>) => {
      try {
        const res = await result;
        auth.set(res);
        navigate("/");
      } catch (e) {
        toastApiError(e);
      }
    },
    [auth, navigate, search]
  );
}
