import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Send } from "lucide-react";
import { getThemeStyles } from "../styles/theme";
import emailjs from "@emailjs/browser";

const ContactSection = ({ darkMode }) => {
  const styles = getThemeStyles(darkMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const clearMessage = () => {
    setSubmitMessage("");
  };

  return (
    <section
      id="contact"
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
          Get In Touch
        </h2>
        <p
          style={{
            color: darkMode ? "#d1d5db" : "#4b5563",
            maxWidth: "672px",
            margin: "0 auto",
          }}
        >
          Have a project in mind or just want to say hello? I'd love to hear
          from you!
        </p>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "48px",
          maxWidth: "1024px",
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          <div
            style={{
              ...styles.card,
              padding: "24px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Contact Information
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                textAlign: "left",
              }}
            >
              <p style={{ display: "flex", alignItems: "flex-start" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "32px",
                    color: "#8b5cf6",
                  }}
                >
                  ✉️
                </span>
                <span style={{ color: darkMode ? "#d1d5db" : "#4b5563" }}>
                  mohammadhasan025096@gmail.com
                </span>
              </p>
              <p style={{ display: "flex", alignItems: "flex-start" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "32px",
                    color: "#8b5cf6",
                  }}
                >
                  📱
                </span>
                <span style={{ color: darkMode ? "#d1d5db" : "#4b5563" }}>
                  +98933 125 6765
                </span>
              </p>
            </div>
          </div>

          <div
            style={{
              ...styles.card,
              padding: "24px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Connect With Me
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "24px",
              }}
            >
              <motion.a
                href="https://github.com/mohammadhasanmomazi"
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
                <Github style={{ width: "24px", height: "24px" }} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/mohammad-hasan-momtazi-aa1b54377/"
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
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            setSubmitMessage("");

            const formData = new FormData(e.target);
            const name = formData.get("name");
            const email = formData.get("email");
            const message = formData.get("message");

            const fullMessage = `Name: ${name}
Email: ${email}
Time: ${new Date().toLocaleString("fa-IR", { timeZone: "Asia/Tehran" })}

Message:
${message}`;

            try {
              await emailjs.send(
                "mohammadhasan025096gmail", // EmailJS service ID
                "template_qczdoau", // EmailJS template ID
                {
                  from_name: name,
                  from_email: email,
                  message: fullMessage,
                  to_email: "mohammadhasan25096@gmail.com",
                },
                "Fj2S5qn5Ir44Mw0yl" // EmailJS public key
              );

              setSubmitMessage(
                "Message sent successfully! I'll get back to you soon."
              );
              e.target.reset();
              setTimeout(clearMessage, 5000);
            } catch (error) {
              console.error("Email send error:", error);
              setSubmitMessage("Failed to send message. Please try again.");
              setTimeout(clearMessage, 5000);
            } finally {
              setIsSubmitting(false);
            }
          }}
          style={{
            ...styles.card,
            padding: "24px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div>
              <label
                htmlFor="name"
                style={{
                  display: "block",
                  color: darkMode ? "#d1d5db" : "#374151",
                  marginBottom: "4px",
                }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                style={{
                  ...styles.input,
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  outline: "none",
                }}
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  color: darkMode ? "#d1d5db" : "#374151",
                  marginBottom: "4px",
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                style={{
                  ...styles.input,
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  outline: "none",
                }}
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                style={{
                  display: "block",
                  color: darkMode ? "#d1d5db" : "#374151",
                  marginBottom: "4px",
                }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="5"
                style={{
                  ...styles.input,
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  outline: "none",
                  resize: "vertical",
                }}
                placeholder="Your message here..."
              ></textarea>
            </div>
            {submitMessage && (
              <div
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  backgroundColor: submitMessage.includes("successfully")
                    ? "#10b981"
                    : "#ef4444",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "16px",
                }}
              >
                {submitMessage}
              </div>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: isSubmitting ? "#6b7280" : "#7c3aed",
                color: "white",
                fontWeight: 500,
                borderRadius: "12px",
                transition: "background-color 0.3s",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
