import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import AdminSidebar from "../components/layout/AdminSidebar";

import "./adminLayout.css";

function AdminLayout() {
  return (
    <div className="admin-layout">

      <AdminSidebar />

      <motion.main
        className="admin-main"
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.35,
        }}
      >
        <Outlet />
      </motion.main>

    </div>
  );
}

export default AdminLayout;