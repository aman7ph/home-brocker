import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

export default function AdminPrivateRoute() {
  const { currentUser } = useSelector((state: RootState) => state.user);
  return currentUser?.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/profile" />
  );
}
