import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";

import "./newsletter.css";

function Newsletter() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim()) return;

    alert("🎉 Thank you for subscribing!");

    setEmail("");
  }

  return (
    <section className="newsletter">

      <motion.div
        className="newsletter-container"
        initial={{ opacity: 0, scale: .95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: .5 }}
      >

        <div className="newsletter-icon">
          <FaEnvelope />
        </div>

        <h2>Subscribe To Our Newsletter</h2>

        <p>
          Get exclusive offers, new arrivals and special discounts
          delivered directly to your inbox.
        </p>

        <form
          className="newsletter-form"
          onSubmit={handleSubmit}
        >

          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">

            Subscribe

            <FaPaperPlane />

          </button>

        </form>

      </motion.div>

    </section>
  );
}

export default Newsletter;