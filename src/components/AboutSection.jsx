import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const AboutSection = ({ darkMode, scrollToSection, profileImage }) => {
  return (
    <section
      id="about"
      style={{
        padding: "80px 16px",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "48px",
          alignItems: "center",
        }}
      >
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div style={{ position: "relative" }}>
            <motion.div
              whileHover={{ rotate: 3 }}
              style={{
                width: "256px",
                height: "256px",
                borderRadius: "16px",
                overflow: "hidden",
                border: "4px solid rgba(139, 92, 246, 0.2)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(135deg, #8b5cf6, #4f46e5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </motion.div>
            <motion.div
              style={{
                position: "absolute",
                bottom: "-16px",
                right: "-16px",
                backgroundColor: "#7c3aed",
                color: "white",
                padding: "8px",
                borderRadius: "12px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              whileHover={{ scale: 1.1 }}
            >
              <span style={{ fontWeight: 500 }}>17 Y.O.</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          <div>
            <h2
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              About Me
            </h2>
            <p
              style={{
                color: darkMode ? "#d1d5db" : "#4b5563",
                lineHeight: "1.75",
                marginBottom: "24px",
              }}
            >
              I'm Mohammad Hassan Momtazi, a 17-year-old frontend developer from
              Iran passionate about building interactive, responsive web apps
              using React and Next.js. Currently learning n8n and AI Agent
              development.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 20px",
                backgroundColor: "#7c3aed",
                color: "white",
                fontWeight: 500,
                borderRadius: "12px",
                transition: "background-color 0.3s",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Download
                style={{ marginRight: "8px", width: "20px", height: "20px" }}
              />
              Download Resume
            </motion.button>
            <motion.button
              onClick={() => scrollToSection("contact")}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 20px",
                backgroundColor: darkMode ? "#374151" : "#f3f4f6",
                color: darkMode ? "#d1d5db" : "#374151",
                fontWeight: 500,
                borderRadius: "12px",
                transition: "background-color 0.3s",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              Contact Me
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
