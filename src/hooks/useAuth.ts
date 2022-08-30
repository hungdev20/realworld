import { useSelector } from "react-redux";
import { IrootReducer } from "../index-reducer";


const useAuth = () => {
    const user = useSelector((state: IrootReducer) => state.user.data?.user);
    let isAuthenticated = false;
    if (user?.token !== undefined) {
        isAuthenticated = true;
    }
    return isAuthenticated;
} 

export default useAuth;