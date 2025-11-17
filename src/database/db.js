// Simple database using localStorage for persistence
class Database {
  constructor() {
    this.PROFILE_IMAGE_KEY = "portfolio_profile_image";
    this.PROJECTS_KEY = "portfolio_projects";
    this.SKILLS_KEY = "portfolio_skills";
    this.EXPERIENCES_KEY = "portfolio_experiences";
    this.TESTIMONIALS_KEY = "portfolio_testimonials";
  }

  // Profile Image methods
  saveProfileImage(imageData) {
    try {
      localStorage.setItem(this.PROFILE_IMAGE_KEY, imageData);
      return true;
    } catch (error) {
      console.error("Error saving profile image:", error);
      return false;
    }
  }

  loadProfileImage() {
    try {
      return (
        localStorage.getItem(this.PROFILE_IMAGE_KEY) ||
        "https://placehold.co/150x150/25233a/7c3aed?text=MHM"
      );
    } catch (error) {
      console.error("Error loading profile image:", error);
      return "https://placehold.co/150x150/25233a/7c3aed?text=MHM";
    }
  }

  deleteProfileImage() {
    try {
      localStorage.removeItem(this.PROFILE_IMAGE_KEY);
      return true;
    } catch (error) {
      console.error("Error deleting profile image:", error);
      return false;
    }
  }

  // Projects methods
  saveProjects(projects) {
    try {
      localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(projects));
      return true;
    } catch (error) {
      console.error("Error saving projects:", error);
      return false;
    }
  }

  // Resume methods
  saveResume(resumeData) {
    try {
      localStorage.setItem("portfolio_resume", JSON.stringify(resumeData));
      return true;
    } catch (error) {
      console.error("Error saving resume:", error);
      return false;
    }
  }

  loadResume() {
    try {
      const resume = localStorage.getItem("portfolio_resume");
      return resume ? JSON.parse(resume) : null;
    } catch (error) {
      console.error("Error loading resume:", error);
      return null;
    }
  }

  deleteResume() {
    try {
      localStorage.removeItem("portfolio_resume");
      return true;
    } catch (error) {
      console.error("Error deleting resume:", error);
      return false;
    }
  }

  loadProjects() {
    try {
      const projects = localStorage.getItem(this.PROJECTS_KEY);
      return projects
        ? JSON.parse(projects)
        : [
            {
              id: 1,
              title: "DigiatekAI",
              description:
                "An AI-powered platform for automating business workflows with custom agents.",
              technologies: ["React", "Next.js", "TailwindCSS", "n8n"],
              image:
                "https://placehold.co/600x400/25233a/7c3aed?text=DigiatekAI",
            },
            {
              id: 2,
              title: "PortfolioPro",
              description:
                "A customizable portfolio builder for developers with real-time preview.",
              technologies: ["React", "Framer Motion", "TailwindCSS"],
              image:
                "https://placehold.co/600x400/25233a/7c3aed?text=PortfolioPro",
            },
            {
              id: 3,
              title: "FlowTask",
              description:
                "Task automation tool integrating with popular APIs using n8n workflows.",
              technologies: ["Next.js", "n8n", "TypeScript", "TailwindCSS"],
              image: "https://placehold.co/600x400/25233a/7c3aed?text=FlowTask",
            },
          ];
    } catch (error) {
      console.error("Error loading projects:", error);
      return [
        {
          id: 1,
          title: "DigiatekAI",
          description:
            "An AI-powered platform for automating business workflows with custom agents.",
          technologies: ["React", "Next.js", "TailwindCSS", "n8n"],
          image: "https://placehold.co/600x400/25233a/7c3aed?text=DigiatekAI",
        },
        {
          id: 2,
          title: "PortfolioPro",
          description:
            "A customizable portfolio builder for developers with real-time preview.",
          technologies: ["React", "Framer Motion", "TailwindCSS"],
          image: "https://placehold.co/600x400/25233a/7c3aed?text=PortfolioPro",
        },
        {
          id: 3,
          title: "FlowTask",
          description:
            "Task automation tool integrating with popular APIs using n8n workflows.",
          technologies: ["Next.js", "n8n", "TypeScript", "TailwindCSS"],
          image: "https://placehold.co/600x400/25233a/7c3aed?text=FlowTask",
        },
      ];
    }
  }

  addProject(project) {
    const projects = this.loadProjects();
    projects.push(project);
    return this.saveProjects(projects);
  }

  deleteProject(projectId) {
    const projects = this.loadProjects();
    const filteredProjects = projects.filter(
      (project) => project.id !== projectId
    );
    return this.saveProjects(filteredProjects);
  }

  // Skills methods
  saveSkills(skills) {
    try {
      localStorage.setItem(this.SKILLS_KEY, JSON.stringify(skills));
      return true;
    } catch (error) {
      console.error("Error saving skills:", error);
      return false;
    }
  }

  loadSkills() {
    try {
      const skills = localStorage.getItem(this.SKILLS_KEY);
      return skills
        ? JSON.parse(skills)
        : [
            { id: 1, name: "HTML5", level: "Advanced", icon: "🔥" },
            { id: 2, name: "CSS3", level: "Advanced", icon: "🎨" },
            { id: 3, name: "JavaScript", level: "Advanced", icon: "🧠" },
            { id: 4, name: "React", level: "Advanced", icon: "⚛️" },
            { id: 5, name: "Next.js", level: "Intermediate", icon: "🚀" },
            { id: 6, name: "TailwindCSS", level: "Advanced", icon: "🌊" },
            { id: 7, name: "n8n", level: "Intermediate", icon: "🤖" },
            { id: 8, name: "Git", level: "Intermediate", icon: "🐙" },
            { id: 9, name: "Docker", level: "Beginner", icon: "🐳" },
          ];
    } catch (error) {
      console.error("Error loading skills:", error);
      return [
        { id: 1, name: "HTML5", level: "Advanced", icon: "🔥" },
        { id: 2, name: "CSS3", level: "Advanced", icon: "🎨" },
        { id: 3, name: "JavaScript", level: "Advanced", icon: "🧠" },
        { id: 4, name: "React", level: "Advanced", icon: "⚛️" },
        { id: 5, name: "Next.js", level: "Intermediate", icon: "🚀" },
        { id: 6, name: "TailwindCSS", level: "Advanced", icon: "🌊" },
        { id: 7, name: "n8n", level: "Intermediate", icon: "🤖" },
        { id: 8, name: "Git", level: "Intermediate", icon: "🐙" },
        { id: 9, name: "Docker", level: "Beginner", icon: "🐳" },
      ];
    }
  }

  addSkill(skill) {
    const skills = this.loadSkills();
    skills.push(skill);
    return this.saveSkills(skills);
  }

  updateSkill(skillId, updatedSkill) {
    const skills = this.loadSkills();
    const index = skills.findIndex((skill) => skill.id === skillId);
    if (index !== -1) {
      skills[index] = { ...skills[index], ...updatedSkill };
      return this.saveSkills(skills);
    }
    return false;
  }

  deleteSkill(skillId) {
    const skills = this.loadSkills();
    const filteredSkills = skills.filter((skill) => skill.id !== skillId);
    return this.saveSkills(filteredSkills);
  }

  // Experiences methods
  saveExperiences(experiences) {
    try {
      localStorage.setItem(this.EXPERIENCES_KEY, JSON.stringify(experiences));
      return true;
    } catch (error) {
      console.error("Error saving experiences:", error);
      return false;
    }
  }

  loadExperiences() {
    try {
      const experiences = localStorage.getItem(this.EXPERIENCES_KEY);
      return experiences
        ? JSON.parse(experiences)
        : [
            {
              id: 1,
              title: "Computer Science Student",
              period: "2023 - Present",
              description:
                "Studying computer science fundamentals with focus on web technologies and AI",
              icon: "🎓",
            },
            {
              id: 2,
              title: "Freelance Frontend Developer",
              period: "2022 - Present",
              description:
                "Building responsive web applications for clients using modern frameworks",
              icon: "💼",
            },
            {
              id: 3,
              title: "AI Automation Specialist",
              period: "2024 - Present",
              description:
                "Developing AI agents and workflow automations using n8n and LLMs",
              icon: "🖥️",
            },
          ];
    } catch (error) {
      console.error("Error loading experiences:", error);
      return [
        {
          id: 1,
          title: "Computer Science Student",
          period: "2023 - Present",
          description:
            "Studying computer science fundamentals with focus on web technologies and AI",
          icon: "🎓",
        },
        {
          id: 2,
          title: "Freelance Frontend Developer",
          period: "2022 - Present",
          description:
            "Building responsive web applications for clients using modern frameworks",
          icon: "💼",
        },
        {
          id: 3,
          title: "AI Automation Specialist",
          period: "2024 - Present",
          description:
            "Developing AI agents and workflow automations using n8n and LLMs",
          icon: "🖥️",
        },
      ];
    }
  }

  addExperience(experience) {
    const experiences = this.loadExperiences();
    experiences.push(experience);
    return this.saveExperiences(experiences);
  }

  updateExperience(experienceId, updatedExperience) {
    const experiences = this.loadExperiences();
    const index = experiences.findIndex(
      (experience) => experience.id === experienceId
    );
    if (index !== -1) {
      experiences[index] = { ...experiences[index], ...updatedExperience };
      return this.saveExperiences(experiences);
    }
    return false;
  }

  deleteExperience(experienceId) {
    const experiences = this.loadExperiences();
    const filteredExperiences = experiences.filter(
      (experience) => experience.id !== experienceId
    );
    return this.saveExperiences(filteredExperiences);
  }

  // Testimonials methods
  saveTestimonials(testimonials) {
    try {
      localStorage.setItem(this.TESTIMONIALS_KEY, JSON.stringify(testimonials));
      return true;
    } catch (error) {
      console.error("Error saving testimonials:", error);
      return false;
    }
  }

  loadTestimonials() {
    try {
      const testimonials = localStorage.getItem(this.TESTIMONIALS_KEY);
      return testimonials
        ? JSON.parse(testimonials)
        : [
            {
              id: 1,
              name: "Sarah Johnson",
              role: "Product Manager",
              company: "TechCorp",
              content:
                "Mohammad delivered an exceptional portfolio website that perfectly captured our brand vision. His attention to detail and modern design approach exceeded our expectations.",
              avatar: "https://placehold.co/64x64/7c3aed/ffffff?text=SJ",
            },
            {
              id: 2,
              name: "Alex Chen",
              role: "Lead Developer",
              company: "StartupXYZ",
              content:
                "Working with Mohammad was a pleasure. His React expertise and clean code practices helped us launch our product ahead of schedule. Highly recommended!",
              avatar: "https://placehold.co/64x64/7c3aed/ffffff?text=AC",
            },
            {
              id: 3,
              name: "Emma Rodriguez",
              role: "UI/UX Designer",
              company: "DesignStudio",
              content:
                "Mohammad's ability to translate complex designs into pixel-perfect implementations is outstanding. The collaboration was smooth and the results were amazing.",
              avatar: "https://placehold.co/64x64/7c3aed/ffffff?text=ER",
            },
          ];
    } catch (error) {
      console.error("Error loading testimonials:", error);
      return [
        {
          id: 1,
          name: "Sarah Johnson",
          role: "Product Manager",
          company: "TechCorp",
          content:
            "Mohammad delivered an exceptional portfolio website that perfectly captured our brand vision. His attention to detail and modern design approach exceeded our expectations.",
          avatar: "https://placehold.co/64x64/7c3aed/ffffff?text=SJ",
        },
        {
          id: 2,
          name: "Alex Chen",
          role: "Lead Developer",
          company: "StartupXYZ",
          content:
            "Working with Mohammad was a pleasure. His React expertise and clean code practices helped us launch our product ahead of schedule. Highly recommended!",
          avatar: "https://placehold.co/64x64/7c3aed/ffffff?text=AC",
        },
        {
          id: 3,
          name: "Emma Rodriguez",
          role: "UI/UX Designer",
          company: "DesignStudio",
          content:
            "Mohammad's ability to translate complex designs into pixel-perfect implementations is outstanding. The collaboration was smooth and the results were amazing.",
          avatar: "https://placehold.co/64x64/7c3aed/ffffff?text=ER",
        },
      ];
    }
  }

  addTestimonial(testimonial) {
    const testimonials = this.loadTestimonials();
    testimonials.push(testimonial);
    return this.saveTestimonials(testimonials);
  }

  updateTestimonial(testimonialId, updatedTestimonial) {
    const testimonials = this.loadTestimonials();
    const index = testimonials.findIndex(
      (testimonial) => testimonial.id === testimonialId
    );
    if (index !== -1) {
      testimonials[index] = { ...testimonials[index], ...updatedTestimonial };
      return this.saveTestimonials(testimonials);
    }
    return false;
  }

  deleteTestimonial(testimonialId) {
    const testimonials = this.loadTestimonials();
    const filteredTestimonials = testimonials.filter(
      (testimonial) => testimonial.id !== testimonialId
    );
    return this.saveTestimonials(filteredTestimonials);
  }
}

export const db = new Database();
