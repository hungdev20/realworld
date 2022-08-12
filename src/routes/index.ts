import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { AddArticle, DetailArticle } from "../pages/Articles";
import User from "../pages/User";
import Settings from "../pages/Settings";

const publicRoutes = [ 
    { path: "/", component: Home },
    { path: "/register", component: Register },
    { path: "/login", component: Login },
    { path: "/article/:slug", component: DetailArticle },
    { path: "/@:user", component: User }
];

const privateRoutes = [
    { path: "/editor", component: AddArticle },
    { path: "/editor/:slug", component: AddArticle },
    { path: "/settings", component: Settings },
];

export { publicRoutes, privateRoutes };
