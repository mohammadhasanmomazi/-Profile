import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Cpu,
  Camera,
  Sun,
  Moon,
  ChevronDown,
  Github,
  Linkedin,
  Send,
  Plus,
  X,
  Download,
  AlertTriangle,
  ImageIcon,
  Save,
  Trash2,
} from "lucide-react";
import { getThemeStyles } from "../styles/theme";
import NavBar from "../components/NavBar";
import HomeSection from "../components/HomeSection";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ExperienceSection from "../components/ExperienceSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ProfileImageModal from "../components/ProfileImageModal";
import AdminPanel from "../components/AdminPanel";
import { useAppContext } from "../context/AppContext";

const Portfolio = () => {
  const {
    darkMode,
    setDarkMode,
    projects,
    skills,
    deleteSkill,
    profileImage,
    setProfileImage,
    addProject,
  } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isEditingProfileImage, setIsEditingProfileImage] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
    imagePreview: null,
    imageFile: null,
  });
  const [imageError, setImageError] = useState("");

  // اضافه کردن استایل‌های اینلاین برای حل مشکل
  const styles = {
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
  };

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

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
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
    addProject(newProject);
    resetProjectForm();
    setShowAdminPanel(false);
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

  return (
    <div style={styles.container}>
      <style>
        {`
          @media (min-width: 768px) {
            .desktop-nav { display: flex !important; }
            .mobile-menu { display: none !important; }
          }
          @media (max-width: 767px) {
            .desktop-nav { display: none !important; }
            .mobile-menu { display: flex !important; }
          }
        `}
      </style>
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
        <div
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "80px",
            }}
          >
            <motion.div
              style={{
                position: "relative",
                cursor: showAdminPanel ? "pointer" : "default",
              }}
              onClick={() => showAdminPanel && setIsEditingProfileImage(true)}
              whileHover={showAdminPanel ? { scale: 1.05 } : {}}
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
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    opacity: 0,
                    transition: "opacity 0.3s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Camera
                    style={{ width: "20px", height: "20px", color: "white" }}
                  />
                </div>
              </div>
            </motion.div>

            <div
              style={{ display: "flex", alignItems: "center", gap: "40px" }}
              className="desktop-nav"
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

            <div
              style={{ display: "flex", alignItems: "center" }}
              className="mobile-menu"
            >
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
                  onClick={() => scrollToSection(section)}
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
                >
                  {section}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      <HomeSection
        darkMode={darkMode}
        scrollToSection={scrollToSection}
        setShowAdminPanel={setShowAdminPanel}
        profileImage={profileImage}
      />

      <AboutSection
        darkMode={darkMode}
        scrollToSection={scrollToSection}
        profileImage={profileImage}
      />

      <SkillsSection
        darkMode={darkMode}
        skills={skills}
        setShowAdminPanel={setShowAdminPanel}
        deleteSkill={deleteSkill}
        isAdmin={showAdminPanel}
      />

      <ProjectsSection darkMode={darkMode} projects={projects} />

      <TestimonialsSection darkMode={darkMode} />

      <ExperienceSection darkMode={darkMode} />

      <ContactSection darkMode={darkMode} />

      <Footer darkMode={darkMode} />

      <ProfileImageModal
        darkMode={darkMode}
        isEditingProfileImage={isEditingProfileImage}
        setIsEditingProfileImage={setIsEditingProfileImage}
        profileImage={profileImage}
        isAdmin={showAdminPanel}
      />

      <AdminPanel
        darkMode={darkMode}
        showAdminPanel={showAdminPanel}
        setShowAdminPanel={setShowAdminPanel}
        newProject={newProject}
        setNewProject={setNewProject}
        imageError={imageError}
        handleImageUpload={handleImageUpload}
        handleProjectSubmit={handleProjectSubmit}
        resetProjectForm={resetProjectForm}
      />
    </div>
  );
};

export default Portfolio;
