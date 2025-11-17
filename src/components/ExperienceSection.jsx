import React from "react";
import { motion } from "framer-motion";
import { getThemeStyles } from "../styles/theme";
import { useAppContext } from "../context/AppContext";

const ExperienceSection = ({ darkMode }) => {
  const { experiences } = useAppContext();
  const styles = getThemeStyles(darkMode);

  return (
    <section
      id="experience"
      style={{
        padding: "80px 16px",
        backgroundColor: darkMode ? "#111827" : "#f9fafb",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <h2
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            Journey So Far
          </h2>
          <p
            style={{
              color: darkMode ? "#d1d5db" : "#4b5563",
              maxWidth: "672px",
              margin: "0 auto",
            }}
          >
            My educational background and professional experience in web
            development and AI
          </p>
        </motion.div>

        <div
          style={{
            maxWidth: "768px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            position: "relative",
            paddingLeft: "32px",
          }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              style={{ position: "relative", paddingLeft: "32px" }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "-36px",
                  top: "4px",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: "#7c3aed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "4px solid",
                  borderColor: darkMode ? "#111827" : "#f9fafb",
                }}
              >
                {exp.icon}
              </div>
              <div
                style={{
                  ...styles.card,
                  borderRadius: "12px",
                  padding: "24px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "8px",
                  }}
                >
                  <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {exp.title}
                  </h3>
                  <span style={{ color: "#8b5cf6", fontWeight: 500 }}>
                    {exp.period}
                  </span>
                </div>
                <p style={{ color: darkMode ? "#d1d5db" : "#4b5563" }}>
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
