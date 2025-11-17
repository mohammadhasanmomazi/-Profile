import React from "react";

const Footer = ({ darkMode }) => {
  return (
    <footer
      style={{
        padding: "32px 16px",
        borderTop: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          textAlign: "center",
          color: darkMode ? "#9ca3af" : "#6b7280",
        }}
      >
        <p>© 2025 Mohammad Hassan Momtazi — Frontend Engineer</p>
        <p
          style={{
            fontSize: "12px",
            marginTop: "8px",
            color: darkMode ? "#6b7280" : "#9ca3af",
          }}
        >
          Specializing in React, Next.js, and n8n automation. Crafted with
          precision and passion using Next.js & TailwindCSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
