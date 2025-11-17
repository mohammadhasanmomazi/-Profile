import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../database/db.js";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [profileImage, setProfileImage] = useState(
    "https://placehold.co/150x150/25233a/7c3aed?text=MHM"
  );
  const [resume, setResume] = useState(null);

  useEffect(() => {
    // Load data from database on mount
    setProjects(db.loadProjects());
    setSkills(db.loadSkills());
    setTestimonials(db.loadTestimonials());
    setExperiences(db.loadExperiences());
    setProfileImage(db.loadProfileImage());
    setResume(db.loadResume());
  }, []);

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

  const addProject = (newProject) => {
    const projectData = {
      id: Date.now(),
      title: newProject.title,
      description: newProject.description,
      technologies: newProject.technologies,
      image: newProject.image,
    };
    setProjects((prev) => {
      const updated = [...prev, projectData];
      db.saveProjects(updated);
      return updated;
    });
  };

  const deleteProject = (id) => {
    setProjects((prev) => {
      const updated = prev.filter((project) => project.id !== id);
      db.saveProjects(updated);
      return updated;
    });
  };

  const addSkill = (newSkill) => {
    const skillData = {
      id: Date.now(),
      name: newSkill.name,
      level: newSkill.level,
      icon: newSkill.icon || "🛠️",
    };
    setSkills((prev) => {
      const updated = [...prev, skillData];
      db.saveSkills(updated);
      return updated;
    });
  };

  const updateSkill = (id, updatedSkill) => {
    setSkills((prev) => {
      const updated = prev.map((skill) =>
        skill.id === id ? { ...skill, ...updatedSkill } : skill
      );
      db.saveSkills(updated);
      return updated;
    });
  };

  const deleteSkill = (id) => {
    setSkills((prev) => {
      const updated = prev.filter((skill) => skill.id !== id);
      db.saveSkills(updated);
      return updated;
    });
  };

  const updateProfileImage = (imageData) => {
    setProfileImage(imageData);
    db.saveProfileImage(imageData);
  };

  const deleteProfileImage = () => {
    setProfileImage("https://placehold.co/150x150/25233a/7c3aed?text=MHM");
    db.deleteProfileImage();
  };

  const updateResume = (resumeData) => {
    setResume(resumeData);
    db.saveResume(resumeData);
  };

  const deleteResume = () => {
    setResume(null);
    db.deleteResume();
  };

  const addTestimonial = (newTestimonial) => {
    const testimonialData = {
      id: Date.now(),
      name: newTestimonial.name,
      role: newTestimonial.role,
      company: newTestimonial.company,
      content: newTestimonial.content,
      avatar:
        newTestimonial.avatar ||
        "https://placehold.co/64x64/7c3aed/ffffff?text=NA",
    };
    setTestimonials((prev) => {
      const updated = [...prev, testimonialData];
      db.saveTestimonials(updated);
      return updated;
    });
  };

  const updateTestimonial = (id, updatedTestimonial) => {
    setTestimonials((prev) => {
      const updated = prev.map((testimonial) =>
        testimonial.id === id
          ? { ...testimonial, ...updatedTestimonial }
          : testimonial
      );
      db.saveTestimonials(updated);
      return updated;
    });
  };

  const deleteTestimonial = (id) => {
    setTestimonials((prev) => {
      const updated = prev.filter((testimonial) => testimonial.id !== id);
      db.saveTestimonials(updated);
      return updated;
    });
  };

  const addExperience = (newExperience) => {
    const experienceData = {
      id: Date.now(),
      title: newExperience.title,
      period: newExperience.period,
      description: newExperience.description,
      icon: newExperience.icon || "🎓",
    };
    setExperiences((prev) => {
      const updated = [...prev, experienceData];
      db.saveExperiences(updated);
      return updated;
    });
  };

  const updateExperience = (id, updatedExperience) => {
    setExperiences((prev) => {
      const updated = prev.map((experience) =>
        experience.id === id
          ? { ...experience, ...updatedExperience }
          : experience
      );
      db.saveExperiences(updated);
      return updated;
    });
  };

  const deleteExperience = (id) => {
    setExperiences((prev) => {
      const updated = prev.filter((experience) => experience.id !== id);
      db.saveExperiences(updated);
      return updated;
    });
  };

  const value = {
    darkMode,
    setDarkMode,
    projects,
    setProjects,
    addProject,
    deleteProject,
    skills,
    setSkills,
    addSkill,
    updateSkill,
    deleteSkill,
    testimonials,
    setTestimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    experiences,
    setExperiences,
    addExperience,
    updateExperience,
    deleteExperience,
    profileImage,
    setProfileImage: updateProfileImage,
    deleteProfileImage,
    resume,
    setResume: updateResume,
    deleteResume,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
