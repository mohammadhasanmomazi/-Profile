import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, AlertTriangle } from "lucide-react";
import { getThemeStyles } from "../styles/theme";
import { useAppContext } from "../context/AppContext";

const ProfileImageModal = ({
  darkMode,
  isEditingProfileImage,
  setIsEditingProfileImage,
  profileImage,
  isAdmin = false,
}) => {
  const { setProfileImage } = useAppContext();
  const [imageError, setImageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const styles = getThemeStyles(darkMode);

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setImageError("Please upload a valid image file (JPG, PNG, WEBP)");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size should be less than 5MB");
      e.target.value = "";
      return;
    }

    setImageError("");

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      setSuccessMessage("Profile image saved successfully!");
      setTimeout(() => {
        setIsEditingProfileImage(false);
        setSuccessMessage("");
      }, 2000);
    };

    reader.onerror = () => {
      setImageError("Error reading file. Please try again.");
      setProfileImage("https://placehold.co/150x150/25233a/7c3aed?text=MHM");
      setSuccessMessage("");
    };

    reader.readAsDataURL(file);
  };

  return (
    isEditingProfileImage &&
    isAdmin && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
        onClick={() => setIsEditingProfileImage(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            ...styles.card,
            maxWidth: "384px",
            width: "100%",
            padding: "24px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <Camera
              style={{
                width: "48px",
                height: "48px",
                margin: "0 auto 12px auto",
                color: "#8b5cf6",
              }}
            />
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: darkMode ? "#ffffff" : "#111827",
              }}
            >
              Change Profile Photo
            </h3>
            <p
              style={{
                color: darkMode ? "#d1d5db" : "#4b5563",
                marginTop: "4px",
              }}
            >
              Upload a new photo for your profile
            </p>
          </div>

          <div
            style={{
              border: "2px dashed #8b5cf6",
              borderRadius: "12px",
              padding: "32px",
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: darkMode
                ? "rgba(139, 92, 246, 0.1)"
                : "rgba(139, 92, 246, 0.05)",
              marginBottom: "16px",
            }}
            onClick={() =>
              document.getElementById("profile-image-upload").click()
            }
          >
            <div
              style={{
                width: "96px",
                height: "96px",
                margin: "0 auto 16px auto",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid #8b5cf6",
                }}
              >
                <img
                  src={profileImage}
                  alt="Current Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
            <p
              style={{
                color: darkMode ? "#e5e7eb" : "#374151",
                fontWeight: 500,
              }}
            >
              Click to select new photo
            </p>
            <p
              style={{
                fontSize: "14px",
                color: darkMode ? "#9ca3af" : "#6b7280",
                marginTop: "4px",
              }}
            >
              JPG, PNG or WEBP • Max 5MB
            </p>

            <input
              id="profile-image-upload"
              type="file"
              accept="image/jpeg, image/png, image/webp"
              style={{ display: "none" }}
              onChange={handleProfileImageUpload}
            />
          </div>

          {imageError && (
            <div
              style={{
                color: "#ef4444",
                fontSize: "14px",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertTriangle
                style={{ width: "16px", height: "16px", marginRight: "4px" }}
              />
              {imageError}
            </div>
          )}

          {successMessage && (
            <div
              style={{
                color: "#10b981",
                fontSize: "14px",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Camera
                style={{ width: "16px", height: "16px", marginRight: "4px" }}
              />
              {successMessage}
            </div>
          )}

          <div
            style={{ display: "flex", justifyContent: "center", gap: "16px" }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditingProfileImage(false)}
              style={{
                padding: "8px 16px",
                backgroundColor: darkMode ? "#374151" : "#f3f4f6",
                color: darkMode ? "#d1d5db" : "#374151",
                borderRadius: "12px",
                fontWeight: 500,
                transition: "background-color 0.3s",
              }}
            >
              Cancel
            </motion.button>
          </div>

          <p
            style={{
              fontSize: "12px",
              color: darkMode ? "#9ca3af" : "#6b7280",
              marginTop: "16px",
              textAlign: "center",
            }}
          >
            Your profile photo will be saved to the database and persist across
            page refreshes
          </p>
        </motion.div>
      </motion.div>
    )
  );
};

export default ProfileImageModal;
