import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Send, ChevronDown, Plus } from "lucide-react";

const HomeSection = ({
  darkMode,
  scrollToSection,
  setShowAdminPanel,
  profileImage,
}) => {
  return (
    <section
      id="home"
      style={{
        paddingTop: "128px",
        paddingBottom: "80px",
        paddingLeft: "16px",
        paddingRight: "16px",
        maxWidth: "1280px",
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ width: "100%" }}
      >
        <div
          style={{ textAlign: "center", maxWidth: "672px", margin: "0 auto" }}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "9999px",
              backgroundColor: darkMode
                ? "rgba(139, 92, 246, 0.2)"
                : "rgba(139, 92, 246, 0.1)",
              color: darkMode ? "#c4b5fd" : "#7c3aed",
              marginBottom: "24px",
              fontWeight: 500,
            }}
          >
            Hi, I'm Mohammad
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                background: "linear-gradient(to right, #8b5cf6, #4f46e5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Crafting beautiful
            </span>
            <br />
            digital experiences
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{
              fontSize: "18px",
              color: darkMode ? "#d1d5db" : "#4b5563",
              marginBottom: "32px",
            }}
          >
            17-year-old frontend developer from Iran specializing in React and
            Next.js. Passionate about creating responsive, interactive web
            applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "16px",
              marginBottom: "40px",
            }}
          >
            <motion.a
              href="https://github.com/mohammadhasanmomazi"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "12px",
                borderRadius: "12px",
                backgroundColor: darkMode ? "#374151" : "#f3f4f6",
                color: darkMode ? "#d1d5db" : "#374151",
                transition: "background-color 0.3s",
              }}
            >
              <Github style={{ width: "24px", height: "24px" }} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/mohammad-hasan-momtazi-aa1b54377/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "12px",
                borderRadius: "12px",
                backgroundColor: darkMode ? "#374151" : "#f3f4f6",
                color: darkMode ? "#d1d5db" : "#374151",
                transition: "background-color 0.3s",
              }}
            >
              <Linkedin style={{ width: "24px", height: "24px" }} />
            </motion.a>
            <motion.a
              href="https://t.me/MOHAMMADHASANDEV"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
              style={{
                padding: "12px",
                borderRadius: "12px",
                backgroundColor: darkMode ? "#374151" : "#f3f4f6",
                color: darkMode ? "#d1d5db" : "#374151",
                transition: "background-color 0.3s",
              }}
            >
              <Send style={{ width: "24px", height: "24px" }} />
            </motion.a>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("projects")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 24px",
              backgroundColor: "#7c3aed",
              color: "white",
              fontWeight: 500,
              borderRadius: "12px",
              transition: "all 0.3s",
              cursor: "pointer",
              margin: "0 auto",
            }}
          >
            View My Projects
            <ChevronDown
              style={{ marginLeft: "8px", width: "16px", height: "16px" }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HomeSection;
