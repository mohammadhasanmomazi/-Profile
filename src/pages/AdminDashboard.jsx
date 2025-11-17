import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trash2,
  Edit,
  Plus,
  Save,
  X,
  Upload,
  FileText,
  Camera,
  ArrowLeft,
  Sun,
  Moon,
} from "lucide-react";
import { getThemeStyles } from "../styles/theme";
import ProfileImageModal from "../components/ProfileImageModal";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const {
    darkMode,
    setDarkMode,
    skills,
    addSkill,
    updateSkill,
    deleteSkill,
    projects,
    addProject,
    deleteProject,
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    experiences,
    addExperience,
    updateExperience,
    deleteExperience,
    profileImage,
    setProfileImage,
    resume,
    setResume,
  } = useAppContext();
  const [isEditingProfileImage, setIsEditingProfileImage] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [newSkill, setNewSkill] = useState({ name: "", level: "", icon: "" });
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
    imagePreview: null,
    imageFile: null,
  });
  const [imageError, setImageError] = useState("");
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    avatar: "",
  });
  const [showAddTestimonial, setShowAddTestimonial] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [newExperience, setNewExperience] = useState({
    title: "",
    period: "",
    description: "",
    icon: "",
  });
  const [showAddExperience, setShowAddExperience] = useState(false);

  const handleEditExperience = (experience) => {
    setEditingExperience(experience);
    setNewExperience({
      title: experience.title,
      period: experience.period,
      description: experience.description,
      icon: experience.icon,
    });
  };

  const handleSaveExperience = () => {
    if (editingExperience) {
      updateExperience(editingExperience.id, newExperience);
      setEditingExperience(null);
    } else {
      addExperience(newExperience);
      setShowAddExperience(false);
    }
    setNewExperience({ title: "", period: "", description: "", icon: "" });
  };

  const handleCancelExperienceEdit = () => {
    setEditingExperience(null);
    setShowAddExperience(false);
    setNewExperience({ title: "", period: "", description: "", icon: "" });
  };

  const styles = getThemeStyles(darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.backgroundColor = "#111827";
      document.documentElement.style.color = "#f3f4f6";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.backgroundColor = "#ffffff";
      document.documentElement.style.color = "#111827";
    }
  }, [darkMode]);

  const handleEditSkill = (skill) => {
    setEditingSkill(skill);
    setNewSkill({ name: skill.name, level: skill.level, icon: skill.icon });
  };

  const handleSaveSkill = () => {
    if (editingSkill) {
      updateSkill(editingSkill.id, newSkill);
      setEditingSkill(null);
    } else {
      addSkill(newSkill);
      setShowAddSkill(false);
    }
    setNewSkill({ name: "", level: "", icon: "" });
  };

  const handleCancelEdit = () => {
    setEditingSkill(null);
    setShowAddSkill(false);
    setNewSkill({ name: "", level: "", icon: "" });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setImageError("Image size must be less than 10MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setImageError("Please select a valid image file");
        return;
      }
      setImageError("");
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProject((prev) => ({
          ...prev,
          imagePreview: e.target.result,
          imageFile: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (
      !newProject.title ||
      !newProject.description ||
      !newProject.technologies ||
      !newProject.imagePreview
    ) {
      return;
    }
    const projectData = {
      title: newProject.title,
      description: newProject.description,
      technologies: newProject.technologies
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
      image: newProject.imagePreview,
    };
    addProject(projectData);
    resetProjectForm();
    setShowAddProject(false);
  };

  const resetProjectForm = () => {
    setNewProject({
      title: "",
      description: "",
      technologies: "",
      imagePreview: null,
      imageFile: null,
    });
    setImageError("");
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Resume size must be less than 10MB");
        return;
      }
      if (!file.type.includes("pdf") && !file.type.includes("word")) {
        alert("Please select a PDF or Word document");
        return;
      }
      setResume(file);
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 20px",
              backgroundColor: "#7c3aed",
              color: "white",
              borderRadius: "8px",
              fontWeight: 500,
              border: "none",
              fontSize: "16px",
            }}
          >
            <ArrowLeft style={{ width: "18px", height: "18px" }} />
            Back to Portfolio
          </motion.button>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
            }}
          >
            Admin Dashboard
          </h1>
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: "8px",
              borderRadius: "50%",
              backgroundColor: darkMode ? "#374151" : "#f3f4f6",
              color: darkMode ? "#d1d5db" : "#374151",
              transition: "background-color 0.3s",
              border: "none",
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

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              ...styles.card,
              padding: "24px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                My Expertise ({skills.length})
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddSkill(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  backgroundColor: "#7c3aed",
                  color: "white",
                  borderRadius: "8px",
                  fontWeight: 500,
                  transition: "background-color 0.3s",
                }}
              >
                <Plus style={{ width: "16px", height: "16px" }} />
                Add Skill
              </motion.button>
            </div>

            {(showAddSkill || editingSkill) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  ...styles.card,
                  padding: "16px",
                  marginBottom: "24px",
                  border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "16px",
                  }}
                >
                  {editingSkill ? "Edit Skill" : "Add New Skill"}
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Skill name"
                    value={newSkill.name}
                    onChange={(e) =>
                      setNewSkill({ ...newSkill, name: e.target.value })
                    }
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
                      backgroundColor: darkMode ? "#374151" : "#f9fafb",
                      color: darkMode ? "#f3f4f6" : "#111827",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Level (e.g., Beginner, Intermediate, Advanced, Expert)"
                    value={newSkill.level}
                    onChange={(e) =>
                      setNewSkill({ ...newSkill, level: e.target.value })
                    }
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
                      backgroundColor: darkMode ? "#374151" : "#f9fafb",
                      color: darkMode ? "#f3f4f6" : "#111827",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Icon (emoji or text)"
                    value={newSkill.icon}
                    onChange={(e) =>
                      setNewSkill({ ...newSkill, icon: e.target.value })
                    }
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
                      backgroundColor: darkMode ? "#374151" : "#f9fafb",
                      color: darkMode ? "#f3f4f6" : "#111827",
                    }}
                  />
                </div>
                <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSaveSkill}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#10b981",
                      color: "white",
                      borderRadius: "8px",
                      fontWeight: 500,
                    }}
                  >
                    <Save
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "4px",
                      }}
                    />
                    Save
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancelEdit}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      borderRadius: "8px",
                      fontWeight: 500,
                    }}
                  >
                    <X
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "4px",
                      }}
                    />
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              {skills.map((skill) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  style={{
                    ...styles.card,
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    position: "relative",
                    padding: "16px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      display: "flex",
                      gap: "4px",
                      opacity: 1,
                    }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEditSkill(skill)}
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
                      onClick={() => deleteSkill(skill.id)}
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div style={{ fontSize: "24px" }}>{skill.icon}</div>
                    <div>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          marginBottom: "4px",
                        }}
                      >
                        {skill.name}
                      </h3>
                      <span
                        style={{
                          color: "#8b5cf6",
                          fontWeight: 500,
                          fontSize: "14px",
                        }}
                      >
                        {skill.level}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              ...styles.card,
              padding: "24px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                Current Projects ({projects.length})
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddProject(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  backgroundColor: "#7c3aed",
                  color: "white",
                  borderRadius: "8px",
                  fontWeight: 500,
                  transition: "background-color 0.3s",
                }}
              >
                <Plus style={{ width: "16px", height: "16px" }} />
                Add Project
              </motion.button>
            </div>

            {showAddProject && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  ...styles.card,
                  padding: "16px",
                  marginBottom: "24px",
                  border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "16px",
                  }}
                >
                  Add New Project
                </h3>
                <form onSubmit={handleProjectSubmit}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Project title"
                      value={newProject.title}
                      onChange={(e) =>
                        setNewProject({ ...newProject, title: e.target.value })
                      }
                      style={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
                        backgroundColor: darkMode ? "#374151" : "#f9fafb",
                        color: darkMode ? "#f3f4f6" : "#111827",
                      }}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Technologies (comma-separated)"
                      value={newProject.technologies}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          technologies: e.target.value,
                        })
                      }
                      style={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
                        backgroundColor: darkMode ? "#374151" : "#f9fafb",
                        color: darkMode ? "#f3f4f6" : "#111827",
                      }}
                      required
                    />
                  </div>
                  <textarea
                    placeholder="Project description"
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        description: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
                      backgroundColor: darkMode ? "#374151" : "#f9fafb",
                      color: darkMode ? "#f3f4f6" : "#111827",
                      marginBottom: "16px",
                      minHeight: "80px",
                      resize: "vertical",
                    }}
                    required
                  />
                  <div style={{ marginBottom: "16px" }}>
                    <label
                      style={{
                        display: "inline-block",
                        padding: "8px 16px",
                        backgroundColor: "#7c3aed",
                        color: "white",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: 500,
                      }}
                    >
                      <Upload
                        style={{
                          width: "16px",
                          height: "16px",
                          marginRight: "4px",
                        }}
                      />
                      Upload Project Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                    </label>
                    {newProject.imagePreview && (
                      <div style={{ marginTop: "8px" }}>
                        <img
                          src={newProject.imagePreview}
                          alt="Preview"
                          style={{
                            width: "100px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                    )}
                    {imageError && (
                      <p
                        style={{
                          color: "#ef4444",
                          fontSize: "14px",
                          marginTop: "4px",
                        }}
                      >
                        {imageError}
                      </p>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#10b981",
                        color: "white",
                        borderRadius: "8px",
                        fontWeight: 500,
                        border: "none",
                      }}
                    >
                      <Save
                        style={{
                          width: "16px",
                          height: "16px",
                          marginRight: "4px",
                        }}
                      />
                      Add Project
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowAddProject(false);
                        resetProjectForm();
                      }}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#ef4444",
                        color: "white",
                        borderRadius: "8px",
                        fontWeight: 500,
                        border: "none",
                      }}
                    >
                      <X
                        style={{
                          width: "16px",
                          height: "16px",
                          marginRight: "4px",
                        }}
                      />
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  style={{
                    ...styles.card,
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      height: "160px",
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
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        opacity: 1,
                      }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteProject(project.id)}
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
                  <div style={{ padding: "16px" }}>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginBottom: "8px",
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        color: darkMode ? "#d1d5db" : "#4b5563",
                        fontSize: "14px",
                        marginBottom: "12px",
                      }}
                    >
                      {project.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                      }}
                    >
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          style={{
                            padding: "2px 8px",
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
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            style={{
              ...styles.card,
              padding: "24px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                Testimonials ({testimonials.length})
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddTestimonial(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  backgroundColor: "#7c3aed",
                  color: "white",
                  borderRadius: "8px",
                  fontWeight: 500,
                  transition: "background-color 0.3s",
                }}
              >
                <Plus style={{ width: "16px", height: "16px" }} />
                Add Testimonial
              </motion.button>
            </div>

            {(showAddTestimonial || editingTestimonial) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  ...styles.card,
                  padding: "16px",
                  marginBottom: "24px",
                  border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "16px",
                  }}
                >
                  {editingTestimonial
                    ? "Edit Testimonial"
                    : "Add New Testimonial"}
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Name"
                    value={newTestimonial.name}
                    onChange={(e) =>
                      setNewTestimonial({
                        ...newTestimonial,
                        name: e.target.value,
                      })
                    }
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
                      backgroundColor: darkMode ? "#374151" : "#f9fafb",
                      color: darkMode ? "#f3f4f6" : "#111827",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    value={newTestimonial.role}
                    onChange={(e) =>
                      setNewTestimonial({
                        ...newTestimonial,
                        role: e.target.value,
                      })
                    }
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
                      backgroundColor: darkMode ? "#374151" : "#f9fafb",
                      color: darkMode ? "#f3f4f6" : "#111827",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={newTestimonial.company}
                    onChange={(e) =>
                      setNewTestimonial({
                        ...newTestimonial,
                        company: e.target.value,
                      })
                    }
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
                      backgroundColor: darkMode ? "#374151" : "#f9fafb",
                      color: darkMode ? "#f3f4f6" : "#111827",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Avatar URL (optional)"
                    value={newTestimonial.avatar}
                    onChange={(e) =>
                      setNewTestimonial({
                        ...newTestimonial,
                        avatar: e.target.value,
                      })
                    }
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
                      backgroundColor: darkMode ? "#374151" : "#f9fafb",
                      color: darkMode ? "#f3f4f6" : "#111827",
                    }}
                  />
                </div>
                <textarea
                  placeholder="Testimonial content"
                  value={newTestimonial.content}
                  onChange={(e) =>
                    setNewTestimonial({
                      ...newTestimonial,
                      content: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
                    backgroundColor: darkMode ? "#374151" : "#f9fafb",
                    color: darkMode ? "#f3f4f6" : "#111827",
                    marginBottom: "16px",
                    minHeight: "80px",
                    resize: "vertical",
                  }}
                />
                <div style={{ display: "flex", gap: "8px" }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (editingTestimonial) {
                        updateTestimonial(
                          editingTestimonial.id,
                          newTestimonial
                        );
                        setEditingTestimonial(null);
                      } else {
                        addTestimonial(newTestimonial);
                        setShowAddTestimonial(false);
                      }
                      setNewTestimonial({
                        name: "",
                        role: "",
                        company: "",
                        content: "",
                        avatar: "",
                      });
                    }}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#10b981",
                      color: "white",
                      borderRadius: "8px",
                      fontWeight: 500,
                    }}
                  >
                    <Save
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "4px",
                      }}
                    />
                    Save
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setEditingTestimonial(null);
                      setShowAddTestimonial(false);
                      setNewTestimonial({
                        name: "",
                        role: "",
                        company: "",
                        content: "",
                        avatar: "",
                      });
                    }}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      borderRadius: "8px",
                      fontWeight: 500,
                    }}
                  >
                    <X
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "4px",
                      }}
                    />
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  style={{
                    ...styles.card,
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    position: "relative",
                    padding: "16px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      display: "flex",
                      gap: "4px",
                      opacity: 1,
                    }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setEditingTestimonial(testimonial);
                        setNewTestimonial({
                          name: testimonial.name,
                          role: testimonial.role,
                          company: testimonial.company,
                          content: testimonial.content,
                          avatar: testimonial.avatar,
                        });
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
                      onClick={() => deleteTestimonial(testimonial.id)}
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "12px",
                    }}
                  >
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        {testimonial.name}
                      </h3>
                      <p
                        style={{
                          color: "#8b5cf6",
                          fontSize: "14px",
                        }}
                      >
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <p
                    style={{
                      color: darkMode ? "#d1d5db" : "#4b5563",
                      fontSize: "14px",
                      lineHeight: "1.5",
                    }}
                  >
                    "{testimonial.content}"
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.525 }}
            style={{
              ...styles.card,
              padding: "24px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                Journey So Far ({experiences.length})
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddExperience(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  backgroundColor: "#7c3aed",
                  color: "white",
                  borderRadius: "8px",
                  fontWeight: 500,
                  transition: "background-color 0.3s",
                }}
              >
                <Plus style={{ width: "16px", height: "16px" }} />
                Add Experience
              </motion.button>
            </div>

            {(showAddExperience || editingExperience) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  ...styles.card,
                  padding: "16px",
                  marginBottom: "24px",
                  border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "16px",
                  }}
                >
                  {editingExperience ? "Edit Experience" : "Add New Experience"}
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Experience title"
                    value={newExperience.title}
                    onChange={(e) =>
                      setNewExperience({
                        ...newExperience,
                        title: e.target.value,
                      })
                    }
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
                      backgroundColor: darkMode ? "#374151" : "#f9fafb",
                      color: darkMode ? "#f3f4f6" : "#111827",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Period (e.g., 2023 - Present)"
                    value={newExperience.period}
                    onChange={(e) =>
                      setNewExperience({
                        ...newExperience,
                        period: e.target.value,
                      })
                    }
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
                      backgroundColor: darkMode ? "#374151" : "#f9fafb",
                      color: darkMode ? "#f3f4f6" : "#111827",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Icon (emoji or text)"
                    value={newExperience.icon}
                    onChange={(e) =>
                      setNewExperience({
                        ...newExperience,
                        icon: e.target.value,
                      })
                    }
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
                      backgroundColor: darkMode ? "#374151" : "#f9fafb",
                      color: darkMode ? "#f3f4f6" : "#111827",
                    }}
                  />
                </div>
                <textarea
                  placeholder="Experience description"
                  value={newExperience.description}
                  onChange={(e) =>
                    setNewExperience({
                      ...newExperience,
                      description: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: `1px solid ${darkMode ? "#4b5563" : "#d1d5db"}`,
                    backgroundColor: darkMode ? "#374151" : "#f9fafb",
                    color: darkMode ? "#f3f4f6" : "#111827",
                    marginTop: "16px",
                    marginBottom: "16px",
                    minHeight: "80px",
                    resize: "vertical",
                  }}
                />
                <div style={{ display: "flex", gap: "8px" }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSaveExperience}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#10b981",
                      color: "white",
                      borderRadius: "8px",
                      fontWeight: 500,
                    }}
                  >
                    <Save
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "4px",
                      }}
                    />
                    Save
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancelExperienceEdit}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      borderRadius: "8px",
                      fontWeight: 500,
                    }}
                  >
                    <X
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "4px",
                      }}
                    />
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {experiences.map((experience) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  style={{
                    ...styles.card,
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    position: "relative",
                    padding: "16px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      display: "flex",
                      gap: "4px",
                      opacity: 1,
                    }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEditExperience(experience)}
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
                      onClick={() => deleteExperience(experience.id)}
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div style={{ fontSize: "24px" }}>{experience.icon}</div>
                    <div>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          marginBottom: "4px",
                        }}
                      >
                        {experience.title}
                      </h3>
                      <span
                        style={{
                          color: "#8b5cf6",
                          fontWeight: 500,
                          fontSize: "14px",
                        }}
                      >
                        {experience.period}
                      </span>
                    </div>
                  </div>
                  <p
                    style={{
                      color: darkMode ? "#d1d5db" : "#4b5563",
                      fontSize: "14px",
                      marginTop: "12px",
                    }}
                  >
                    {experience.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              ...styles.card,
              padding: "24px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "24px",
              }}
            >
              Profile & Resume
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Profile Image
                </h3>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <img
                    src={profileImage}
                    alt="Profile"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditingProfileImage(true)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 16px",
                      backgroundColor: "#7c3aed",
                      color: "white",
                      borderRadius: "8px",
                      fontWeight: 500,
                      border: "none",
                    }}
                  >
                    <Camera style={{ width: "16px", height: "16px" }} />
                    Change Image
                  </motion.button>
                </div>
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Resume
                </h3>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  {resume ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <FileText
                        style={{
                          width: "24px",
                          height: "24px",
                          color: "#7c3aed",
                        }}
                      />
                      <span>{resume.name}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setResume(null)}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#ef4444",
                          color: "white",
                          borderRadius: "4px",
                          fontSize: "12px",
                          border: "none",
                        }}
                      >
                        Remove
                      </motion.button>
                    </div>
                  ) : (
                    <label
                      style={{
                        display: "inline-block",
                        padding: "8px 16px",
                        backgroundColor: "#7c3aed",
                        color: "white",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: 500,
                      }}
                    >
                      <Upload
                        style={{
                          width: "16px",
                          height: "16px",
                          marginRight: "4px",
                        }}
                      />
                      Upload Resume
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        style={{ display: "none" }}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ProfileImageModal
        darkMode={darkMode}
        isEditingProfileImage={isEditingProfileImage}
        setIsEditingProfileImage={setIsEditingProfileImage}
        profileImage={profileImage}
        isAdmin={true}
      />
    </div>
  );
};

export default AdminDashboard;
