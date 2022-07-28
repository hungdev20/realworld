import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";

const publicRoutes = [
    { path: "/", component: Home } ,
    { path: "/register", component: Register } ,
    { path: "/login", component: Login } 
];

// const privateRoutes = [];

export { publicRoutes };
