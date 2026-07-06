import { motion } from "framer-motion";
import {
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
  FaUndoAlt,
} from "react-icons/fa";

import "./whyChooseUs.css";

const features = [
  {
    icon: <FaShippingFast />,
    title: "Fast Delivery",
    description:
      "Get your orders delivered quickly with our trusted shipping partners.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Payment",
    description:
      "100% secure payments with trusted payment gateways and encryption.",
  },
  {
    icon: <FaUndoAlt />,
    title: "Easy Returns",
    description:
      "Simple and hassle-free return policy within 30 days of purchase.",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    description:
      "Our customer support team is always ready to help you anytime.",
  },
];

function WhyChooseUs() {
  return (
    <section className="why-section">

      <div className="section-header">

        <h2>Why Choose StockFlow?</h2>

        <p>
          We are committed to providing an exceptional shopping experience
          with quality products and outstanding customer service.
        </p>

      </div>

      <div className="why-grid">

        {features.map((item, index) => (
          <motion.div
            key={item.title}
            className="why-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: index * 0.15,
            }}
          >
            <div className="why-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.description}</p>
          </motion.div>
        ))}

      </div>

    </section>
  );
}

export default WhyChooseUs;