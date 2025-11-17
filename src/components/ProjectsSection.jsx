import React from "react";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { getThemeStyles } from "../styles/theme";

const ProjectsSection = ({
  darkMode,
  projects,
  setShowAdminPanel,
  deleteProject,
}) => {
  const styles = getThemeStyles(darkMode);

  return (
    <section
      id="projects"
      style={{
        padding: "80px 16px",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
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
          Featured Projects
        </h2>
        <p
          style={{
            color: darkMode ? "#d1d5db" : "#4b5563",
            maxWidth: "672px",
            margin: "0 auto",
          }}
        >
          A selection of my recent work showcasing modern frontend development
          and innovative solutions
        </p>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "32px",
        }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ y: -10 }}
            style={{
              ...styles.card,
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              transition: "box-shadow 0.3s",
            }}
          >
            <div
              style={{
                position: "relative",
                height: "192px",
                overflow: "hidden",
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProject(project.id);
                  }}
                  style={{
                    padding: "4px",
                    backgroundColor: "#ef4444",
                    color: "white",
                    borderRadius: "50%",
                    transition: "background-color 0.3s",
                  }}
                >
                  <Trash2 style={{ width: "16px", height: "16px" }} />
                </motion.button>
              </div>
            </div>
            <div style={{ padding: "24px" }}>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "8px",
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  color: darkMode ? "#d1d5db" : "#4b5563",
                  marginBottom: "16px",
                }}
              >
                {project.description}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "20px",
                }}
              >
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: darkMode
                        ? "rgba(139, 92, 246, 0.2)"
                        : "rgba(139, 92, 246, 0.1)",
                      color: darkMode ? "#c4b5fd" : "#7c3aed",
                      borderRadius: "9999px",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    flex: 1,
                    padding: "8px",
                    backgroundColor: "#7c3aed",
                    color: "white",
                    fontWeight: 500,
                    borderRadius: "12px",
                    transition: "background-color 0.3s",
                  }}
                >
                  Live Demo
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    flex: 1,
                    padding: "8px",
                    backgroundColor: darkMode ? "#374151" : "#f3f4f6",
                    color: darkMode ? "#d1d5db" : "#374151",
                    fontWeight: 500,
                    borderRadius: "12px",
                    transition: "background-color 0.3s",
                  }}
                >
                  View Code
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
