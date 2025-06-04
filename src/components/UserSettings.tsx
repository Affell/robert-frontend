import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, Moon, Sun, Type, Palette, User } from "lucide-react";
import "./UserSettings.css";

export interface UserPreferences {
  theme: "light" | "dark" | "auto";
  fontSize: "small" | "medium" | "large";
  language: "fr" | "en";
  username: string;
  avatarColor: string;
}

interface UserSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onUpdatePreferences: (preferences: Partial<UserPreferences>) => void;
}

export default function UserSettings({
  isOpen,
  onClose,
  preferences,
  onUpdatePreferences,
}: UserSettingsProps) {
  const avatarColors = [
    "#f97316",
    "#3b82f6",
    "#10b981",
    "#8b5cf6",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#84cc16",
  ];

  const handleThemeChange = (theme: UserPreferences["theme"]) => {
    onUpdatePreferences({ theme });

    // Appliquer le thème immédiatement
    if (theme === "dark") {
      document.documentElement.classList.add("dark-theme");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark-theme");
    } else {
      // Auto - détection du thème système
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark-theme", prefersDark);
    }
  };

  const handleFontSizeChange = (fontSize: UserPreferences["fontSize"]) => {
    onUpdatePreferences({ fontSize });

    // Appliquer la taille de police
    const sizes = { small: "14px", medium: "16px", large: "18px" };
    document.documentElement.style.setProperty(
      "--base-font-size",
      sizes[fontSize]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="settings-overlay"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="settings-modal"
          >
            <div className="settings-header">
              <div className="settings-title">
                <Settings size={20} />
                <h2>Paramètres</h2>
              </div>
              <button className="close-btn" onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            <div className="settings-content">
              {/* Profil utilisateur */}
              <div className="settings-section">
                <h3>
                  <User size={16} />
                  Profil
                </h3>

                <div className="setting-item">
                  <label>Nom d'utilisateur</label>
                  <input
                    type="text"
                    value={preferences.username}
                    onChange={(e) =>
                      onUpdatePreferences({ username: e.target.value })
                    }
                    placeholder="Votre nom"
                    className="settings-input"
                  />
                </div>

                <div className="setting-item">
                  <label>Couleur d'avatar</label>
                  <div className="avatar-colors">
                    {avatarColors.map((color) => (
                      <button
                        key={color}
                        className={`avatar-color ${
                          preferences.avatarColor === color ? "active" : ""
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() =>
                          onUpdatePreferences({ avatarColor: color })
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Apparence */}
              <div className="settings-section">
                <h3>
                  <Palette size={16} />
                  Apparence
                </h3>

                <div className="setting-item">
                  <label>Thème</label>
                  <div className="theme-options">
                    <button
                      className={`theme-btn ${
                        preferences.theme === "light" ? "active" : ""
                      }`}
                      onClick={() => handleThemeChange("light")}
                    >
                      <Sun size={16} />
                      Clair
                    </button>
                    <button
                      className={`theme-btn ${
                        preferences.theme === "dark" ? "active" : ""
                      }`}
                      onClick={() => handleThemeChange("dark")}
                    >
                      <Moon size={16} />
                      Sombre
                    </button>
                    <button
                      className={`theme-btn ${
                        preferences.theme === "auto" ? "active" : ""
                      }`}
                      onClick={() => handleThemeChange("auto")}
                    >
                      <Settings size={16} />
                      Auto
                    </button>
                  </div>
                </div>

                <div className="setting-item">
                  <label>Taille du texte</label>
                  <div className="font-size-options">
                    <button
                      className={`font-btn ${
                        preferences.fontSize === "small" ? "active" : ""
                      }`}
                      onClick={() => handleFontSizeChange("small")}
                    >
                      <Type size={14} />
                      Petit
                    </button>
                    <button
                      className={`font-btn ${
                        preferences.fontSize === "medium" ? "active" : ""
                      }`}
                      onClick={() => handleFontSizeChange("medium")}
                    >
                      <Type size={16} />
                      Normal
                    </button>
                    <button
                      className={`font-btn ${
                        preferences.fontSize === "large" ? "active" : ""
                      }`}
                      onClick={() => handleFontSizeChange("large")}
                    >
                      <Type size={18} />
                      Grand
                    </button>
                  </div>
                </div>
              </div>

              {/* Langue */}
              <div className="settings-section">
                <h3>Langue</h3>
                <div className="setting-item">
                  <select
                    value={preferences.language}
                    onChange={(e) =>
                      onUpdatePreferences({
                        language: e.target.value as "fr" | "en",
                      })
                    }
                    className="settings-select"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="settings-footer">
              <button className="save-btn" onClick={onClose}>
                Enregistrer
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
