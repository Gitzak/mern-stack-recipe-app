import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Public Routes
import { Login } from "./pages/auth/Login";
import PublicRoutes from "./utils/PublicRoutes";
import AdminRoutes from "./utils/AdminRoutes";
import Dashboard from "./pages/dashboard/Dashboard";
import { NotFound } from "./pages/errors/NotFound";
import { Profile } from "./pages/auth/Profile";
import MainLayout from "./layouts/MainLayout";

// Admin Routes

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<PublicRoutes />}>
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route element={<AdminRoutes />}>
                    <Route path="/dashboard" element={<MainLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
