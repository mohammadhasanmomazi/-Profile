export const getThemeStyles = (darkMode) => ({
  container: {
    minHeight: "100vh",
    backgroundColor: darkMode ? "#111827" : "#ffffff",
    color: darkMode ? "#f3f4f6" : "#111827",
    fontFamily: "system-ui, sans-serif",
    transition: "background-color 0.3s, color 0.3s",
  },
  nav: {
    backdropFilter: "blur(8px)",
    backgroundColor: darkMode
      ? "rgba(17, 24, 39, 0.8)"
      : "rgba(255, 255, 255, 0.8)",
    borderBottom: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`,
  },
  card: {
    backgroundColor: darkMode ? "#1f2937" : "#ffffff",
    border: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`,
    borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  input: {
    backgroundColor: darkMode ? "#374151" : "#f9fafb",
    border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
    color: darkMode ? "#f3f4f6" : "#111827",
  },
  buttonPrimary: {
    backgroundColor: "#7c3aed",
    color: "white",
  },
  buttonSecondary: {
    backgroundColor: darkMode ? "#374151" : "#f3f4f6",
    color: darkMode ? "#f3f4f6" : "#374151",
  },
});
