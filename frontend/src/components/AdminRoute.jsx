import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    // Not logged in or missing user object
    if (!token || !userStr || userStr === "undefined") {
        return <Navigate to="/login" replace />;
    }

    try {
        const user = JSON.parse(userStr);

        // Not admin
        if (!user || user.role !== "admin") {
            return <Navigate to="/dashboard" replace />;
        }

        // Admin access
        return children;
    } catch (e) {
        console.error("Error parsing user from localStorage in AdminRoute", e);
        return <Navigate to="/login" replace />;
    }
};

export default AdminRoute;
