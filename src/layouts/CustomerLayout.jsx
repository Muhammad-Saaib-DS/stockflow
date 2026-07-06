import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import CustomerNavbar from "../components/layout/CustomerNavbar";
import Footer from "../components/layout/Footer";

function CustomerLayout() {
  return (
    <>
      <CustomerNavbar />

      <motion.main
        className="customer-layout"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.35,
        }}
      >
        <Outlet />
      </motion.main>

      <Footer />
    </>
  );
}

export default CustomerLayout;