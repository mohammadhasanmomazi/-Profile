import React from "react";
import { motion } from "framer-motion";
import {
  Moon,
  Sun,
  Github,
  Linkedin,
  Send,
  ChevronDown,
  Plus,
} from "lucide-react";
import { getThemeStyles } from "../styles/theme";

const NavBar = ({
  darkMode,
  setDarkMode,
  isMenuOpen,
  setIsMenuOpen,
  activeSection,
  scrollToSection,
  setShowAdminPanel,
  profileImage,
  setIsEditingProfileImage,
}) => {
  const styles = getThemeStyles(darkMode);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        ...styles.nav,
        position: "fixed",
        width: "100%",
        zIndex: 50,
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "80px",
          }}
        >
          <motion.div
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => setIsEditingProfileImage(true)}
            whileHover={{ scale: 1.05 }}
          >
            <div
              style={{
                position: "relative",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid rgba(124, 58, 237, 0.3)",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={profileImage}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </motion.div>

          <div style={{ display: "none", alignItems: "center", gap: "40px" }}>
            {[
              "home",
              "about",
              "skills",
              "projects",
              "experience",
              "contact",
            ].map((section) => (
              <motion.button
                key={section}
                whileHover={{ y: -2 }}
                style={{
                  textTransform: "capitalize",
                  fontWeight: 500,
                  transition: "color 0.3s",
                  color:
                    activeSection === section
                      ? "#8b5cf6"
                      : darkMode
                      ? "#d1d5db"
                      : "#374151",
                }}
                onClick={() => scrollToSection(section)}
              >
                {section}
              </motion.button>
            ))}

            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                padding: "8px",
                borderRadius: "50%",
                backgroundColor: darkMode ? "#374151" : "#f3f4f6",
                color: darkMode ? "#d1d5db" : "#374151",
                transition: "background-color 0.3s",
              }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? (
                <Sun style={{ width: "20px", height: "20px" }} />
              ) : (
                <Moon style={{ width: "20px", height: "20px" }} />
              )}
            </motion.button>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                marginRight: "16px",
                padding: "8px",
                borderRadius: "50%",
                backgroundColor: darkMode ? "#374151" : "#f3f4f6",
                color: darkMode ? "#d1d5db" : "#374151",
                transition: "background-color 0.3s",
              }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? (
                <Sun style={{ width: "20px", height: "20px" }} />
              ) : (
                <Moon style={{ width: "20px", height: "20px" }} />
              )}
            </motion.button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ color: darkMode ? "#d1d5db" : "#374151" }}
            >
              <div
                style={{
                  width: "24px",
                  height: "2px",
                  backgroundColor: "currentColor",
                  marginBottom: "6px",
                  borderRadius: "9999px",
                  transition: "transform 0.3s",
                  transform: isMenuOpen
                    ? "rotate(45deg) translateY(8px)"
                    : "rotate(0)",
                }}
              ></div>
              <div
                style={{
                  width: "24px",
                  height: "2px",
                  backgroundColor: "currentColor",
                  marginBottom: "6px",
                  borderRadius: "9999px",
                  transition: "opacity 0.3s",
                  opacity: isMenuOpen ? 0 : 1,
                }}
              ></div>
              <div
                style={{
                  width: "24px",
                  height: "2px",
                  backgroundColor: "currentColor",
                  borderRadius: "9999px",
                  transition: "transform 0.3s",
                  transform: isMenuOpen
                    ? "rotate(-45deg) translateY(-8px)"
                    : "rotate(0)",
                }}
              ></div>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: "absolute",
            width: "100%",
            backgroundColor: darkMode ? "#111827" : "#ffffff",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            borderTop: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`,
            padding: "16px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {[
              "home",
              "about",
              "skills",
              "projects",
              "experience",
              "contact",
            ].map((section) => (
              <motion.button
                key={section}
                whileTap={{ scale: 0.95 }}
                style={{
                  textTransform: "capitalize",
                  fontWeight: 500,
                  padding: "8px 0",
                  color:
                    activeSection === section
                      ? "#8b5cf6"
                      : darkMode
                      ? "#d1d5db"
                      : "#374151",
                }}
                onClick={() => scrollToSection(section)}
              >
                {section}
              </motion.button>
            ))}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAdminPanel(true)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                backgroundColor: "#7c3aed",
                color: "white",
                borderRadius: "12px",
                fontWeight: 500,
              }}
            >
              <Plus
                style={{ width: "16px", height: "16px", marginRight: "8px" }}
              />
              Add Project
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default NavBar;
