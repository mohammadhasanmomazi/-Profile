import React from "react";
import { motion } from "framer-motion";
import { Trash2, Edit } from "lucide-react";
import { getThemeStyles } from "../styles/theme";

const SkillsSection = ({
  darkMode,
  skills,
  setShowAdminPanel,
  deleteSkill,
  isAdmin = false,
}) => {
  const styles = getThemeStyles(darkMode);

  return (
    <section
      id="skills"
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
            My Expertise
          </h2>
          <p
            style={{
              color: darkMode ? "#d1d5db" : "#4b5563",
              maxWidth: "672px",
              margin: "0 auto",
            }}
          >
            Technologies and tools I use to build exceptional digital
            experiences
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            maxWidth: "1024px",
            margin: "0 auto",
          }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              style={{
                ...styles.card,
                padding: "24px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                position: "relative",
              }}
            >
              {isAdmin && (
                <div
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    display: "flex",
                    gap: "8px",
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                  className="skill-admin-buttons"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Implement edit skill functionality
                      alert("Edit skill functionality coming soon!");
                    }}
                    style={{
                      padding: "4px",
                      backgroundColor: "#f59e0b",
                      color: "white",
                      borderRadius: "50%",
                      transition: "background-color 0.3s",
                    }}
                  >
                    <Edit style={{ width: "14px", height: "14px" }} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSkill(skill.id);
                    }}
                    style={{
                      padding: "4px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      borderRadius: "50%",
                      transition: "background-color 0.3s",
                    }}
                  >
                    <Trash2 style={{ width: "14px", height: "14px" }} />
                  </motion.button>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: "16px",
                }}
              >
                <div style={{ fontSize: "24px", marginRight: "16px" }}>
                  {skill.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginBottom: "4px",
                    }}
                  >
                    {skill.name}
                  </h3>
                  <span style={{ color: "#8b5cf6", fontWeight: 500 }}>
                    {skill.level}
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  backgroundColor: darkMode ? "#374151" : "#e5e7eb",
                  borderRadius: "9999px",
                  height: "8px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: "9999px",
                    backgroundColor:
                      skill.level === "Advanced"
                        ? "#8b5cf6"
                        : skill.level === "Intermediate"
                        ? "#a78bfa"
                        : "#c4b5fd",
                    width:
                      skill.level === "Advanced"
                        ? "95%"
                        : skill.level === "Intermediate"
                        ? "75%"
                        : "50%",
                  }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .skill-admin-buttons:hover {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;
