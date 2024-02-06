import { isAuth } from "./isAuth";
import { Route, Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
    return isAuth() ? (
        <>
            {" "}
            <Navigate to="/dashboard" />{" "}
        </>
    ) : (
        <Outlet />
    );
};

export default PublicRoutes;
