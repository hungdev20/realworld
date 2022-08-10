import { Navigate} from "react-router-dom";

export default function PrivateRoute({ children }: {children: any}) {
  const token = Boolean(localStorage.getItem("token"));
  return token ? children : <Navigate to="/" />;
}
