import React from "react";
import { motion } from "framer-motion";
import { Plus, X, Save, Image as ImageIcon, AlertTriangle } from "lucide-react";
import { getThemeStyles } from "../styles/theme";

const AdminPanel = ({
  darkMode,
  showAdminPanel,
  setShowAdminPanel,
  newProject,
  setNewProject,
  imageError,
  handleImageUpload,
  handleProjectSubmit,
  resetProjectForm,
}) => {
  const styles = getThemeStyles(darkMode);

  return (
    showAdminPanel && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            ...styles.card,
            maxWidth: "672px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
              borderBottom: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`,
              padding: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: darkMode ? "#ffffff" : "#111827",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Plus
                style={{
                  width: "20px",
                  height: "20px",
                  color: "#8b5cf6",
                  marginRight: "8px",
                }}
              />
              Add New Project
            </h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                resetProjectForm();
                setShowAdminPanel(false);
              }}
              style={{
                padding: "8px",
                borderRadius: "50%",
                backgroundColor: darkMode ? "#374151" : "#f3f4f6",
                color: darkMode ? "#d1d5db" : "#374151",
                transition: "background-color 0.3s",
              }}
            >
              <X style={{ width: "20px", height: "20px" }} />
            </motion.button>
          </div>

          <div style={{ padding: "24px" }}>
            <form
              onSubmit={handleProjectSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              <div>
                <label
                  htmlFor="project-title"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: darkMode ? "#d1d5db" : "#374151",
                    marginBottom: "4px",
                  }}
                >
                  Project Title <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  id="project-title"
                  type="text"
                  required
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  style={{
                    ...styles.input,
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    outline: "none",
                  }}
                  placeholder="Project name"
                />
              </div>

              <div>
                <label
                  htmlFor="project-description"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: darkMode ? "#d1d5db" : "#374151",
                    marginBottom: "4px",
                  }}
                >
                  Description <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <textarea
                  id="project-description"
                  required
                  rows="3"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  style={{
                    ...styles.input,
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    outline: "none",
                    resize: "vertical",
                  }}
                  placeholder="Brief description of the project"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="project-technologies"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: darkMode ? "#d1d5db" : "#374151",
                    marginBottom: "4px",
                  }}
                >
                  Technologies <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  id="project-technologies"
                  type="text"
                  required
                  value={newProject.technologies}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      technologies: e.target.value,
                    }))
                  }
                  style={{
                    ...styles.input,
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    outline: "none",
                  }}
                  placeholder="React, Next.js, TailwindCSS (comma separated)"
                />
                <p
                  style={{
                    fontSize: "12px",
                    color: darkMode ? "#9ca3af" : "#6b7280",
                    marginTop: "4px",
                  }}
                >
                  Enter technologies separated by commas
                </p>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: darkMode ? "#d1d5db" : "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Project Image <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <div
                  style={{
                    border: "2px dashed",
                    borderColor: newProject.imagePreview
                      ? "#8b5cf6"
                      : darkMode
                      ? "#4b5563"
                      : "#d1d5db",
                    borderRadius: "12px",
                    padding: "32px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "border-color 0.3s",
                    backgroundColor: newProject.imagePreview
                      ? darkMode
                        ? "rgba(139, 92, 246, 0.1)"
                        : "rgba(139, 92, 246, 0.05)"
                      : "transparent",
                  }}
                  onClick={() =>
                    document.getElementById("image-upload").click()
                  }
                >
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/jpeg, image/png, image/webp"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />

                  {newProject.imagePreview ? (
                    <div style={{ position: "relative" }}>
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "192px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          marginBottom: "16px",
                        }}
                      >
                        <img
                          src={newProject.imagePreview}
                          alt="Preview"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: darkMode ? "#e5e7eb" : "#374151",
                          }}
                        >
                          {newProject.imageFile?.name}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            color: darkMode ? "#9ca3af" : "#6b7280",
                          }}
                        >
                          {(newProject.imageFile?.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          resetProjectForm();
                        }}
                        style={{
                          marginTop: "16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          padding: "8px",
                          backgroundColor: "#ef4444",
                          color: "white",
                          fontWeight: 500,
                          borderRadius: "8px",
                          transition: "background-color 0.3s",
                        }}
                      >
                        <X
                          style={{
                            width: "16px",
                            height: "16px",
                            marginRight: "8px",
                          }}
                        />
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div
                        style={{
                          width: "64px",
                          height: "64px",
                          backgroundColor: darkMode
                            ? "rgba(139, 92, 246, 0.2)"
                            : "rgba(139, 92, 246, 0.1)",
                          borderRadius: "16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 16px auto",
                        }}
                      >
                        <ImageIcon
                          style={{
                            width: "32px",
                            height: "32px",
                            color: "#8b5cf6",
                          }}
                        />
                      </div>
                      <p
                        style={{
                          color: darkMode ? "#d1d5db" : "#374151",
                          fontWeight: 500,
                          marginBottom: "4px",
                        }}
                      >
                        Click to upload project image
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          color: darkMode ? "#9ca3af" : "#6b7280",
                          marginBottom: "8px",
                        }}
                      >
                        JPG, PNG or WEBP • Max 10MB
                      </p>
                      <div
                        style={{
                          marginTop: "8px",
                          display: "inline-block",
                          backgroundColor: darkMode
                            ? "rgba(139, 92, 246, 0.2)"
                            : "rgba(139, 92, 246, 0.1)",
                          color: darkMode ? "#c4b5fd" : "#7c3aed",
                          fontSize: "12px",
                          padding: "4px 12px",
                          borderRadius: "9999px",
                        }}
                      >
                        Recommended: 1200 × 800 pixels
                      </div>
                    </div>
                  )}
                </div>

                {imageError && (
                  <div
                    style={{
                      marginTop: "8px",
                      color: "#ef4444",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AlertTriangle
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "4px",
                      }}
                    />
                    {imageError}
                  </div>
                )}

                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "12px",
                    color: darkMode ? "#9ca3af" : "#6b7280",
                  }}
                >
                  The image will be stored in browser memory and lost after page
                  refresh
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column-reverse",
                  justifyContent: "flex-end",
                  gap: "16px",
                  paddingTop: "16px",
                  borderTop: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`,
                }}
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    resetProjectForm();
                    setShowAdminPanel(false);
                  }}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: darkMode ? "#374151" : "#f3f4f6",
                    color: darkMode ? "#d1d5db" : "#374151",
                    fontWeight: 500,
                    borderRadius: "12px",
                    transition: "background-color 0.3s",
                  }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!newProject.imagePreview}
                  style={{
                    padding: "12px 24px",
                    borderRadius: "12px",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    transition: "background-color 0.3s",
                    ...(newProject.imagePreview
                      ? { ...styles.buttonPrimary }
                      : {
                          backgroundColor: darkMode ? "#4b5563" : "#d1d5db",
                          color: darkMode ? "#9ca3af" : "#6b7280",
                          cursor: "not-allowed",
                        }),
                  }}
                >
                  <Save
                    style={{
                      width: "16px",
                      height: "16px",
                      marginRight: "8px",
                    }}
                  />
                  Save Project
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    )
  );
};

export default AdminPanel;
