import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";

const AuthGuard = ({ children }: { children: any }) => {
    const isAuthenticated = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/" />
    }

    return <>{children}</>;
} 

AuthGuard.propTypes = {
    children: PropTypes.node,
}
export default AuthGuard;