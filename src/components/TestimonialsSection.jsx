import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const TestimonialsSection = ({ darkMode }) => {
  const { testimonials } = useAppContext();

  return (
    <section
      id="testimonials"
      style={{
        padding: "80px 16px",
        backgroundColor: darkMode ? "#111827" : "#f9fafb",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
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
            What Clients Say
          </h2>
          <p
            style={{
              color: darkMode ? "#d1d5db" : "#4b5563",
              maxWidth: "672px",
              margin: "0 auto",
            }}
          >
            Feedback from clients and collaborators who have experienced my work
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "32px",
          }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              style={{
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                border: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`,
                borderRadius: "16px",
                padding: "32px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                position: "relative",
              }}
            >
              <Quote
                style={{
                  width: "32px",
                  height: "32px",
                  color: "#8b5cf6",
                  marginBottom: "16px",
                  opacity: 0.6,
                }}
              />
              <p
                style={{
                  color: darkMode ? "#d1d5db" : "#4b5563",
                  fontSize: "16px",
                  lineHeight: "1.6",
                  marginBottom: "24px",
                }}
              >
                "{testimonial.content}"
              </p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    marginRight: "16px",
                    border: "2px solid #8b5cf6",
                  }}
                />
                <div>
                  <h4
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: darkMode ? "#ffffff" : "#111827",
                      marginBottom: "2px",
                    }}
                  >
                    {testimonial.name}
                  </h4>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#8b5cf6",
                      fontWeight: 500,
                    }}
                  >
                    {testimonial.role}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: darkMode ? "#9ca3af" : "#6b7280",
                    }}
                  >
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
