import { type JSX } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const userToken = localStorage.getItem("token");

  if (!userToken) {
    return <Navigate to={"/login"} />;
  }
  return children;
}
