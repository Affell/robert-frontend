import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
  X,
} from "lucide-react";
import "./Profile.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78",
    address: "123 Rue de la Paix, 75001 Paris",
    dateOfBirth: "1990-05-15",
    bio: "Développeur passionné par les nouvelles technologies et l'intelligence artificielle.",
    company: "Tech Solutions Inc.",
    position: "Développeur Senior",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // Ici on pourrait envoyer les données à l'API
    console.log("Données sauvegardées:", profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Réinitialiser les données (ou les récupérer depuis l'API)
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <User size={80} />
          </div>
          <div className="profile-info">
            <h1>
              {profileData.firstName} {profileData.lastName}
            </h1>
            <p className="profile-position">
              {profileData.position} chez {profileData.company}
            </p>
            <div className="profile-actions">
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="edit-btn">
                  <Edit3 size={16} />
                  Modifier le profil
                </button>
              ) : (
                <div className="edit-actions">
                  <button onClick={handleSave} className="save-btn">
                    <Save size={16} />
                    Sauvegarder
                  </button>
                  <button onClick={handleCancel} className="cancel-btn">
                    <X size={16} />
                    Annuler
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2>Informations personnelles</h2>
            <div className="info-grid">
              <div className="info-item">
                <Mail size={20} />
                <div className="info-content">
                  <label>Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{profileData.email}</span>
                  )}
                </div>
              </div>

              <div className="info-item">
                <Phone size={20} />
                <div className="info-content">
                  <label>Téléphone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{profileData.phone}</span>
                  )}
                </div>
              </div>

              <div className="info-item">
                <MapPin size={20} />
                <div className="info-content">
                  <label>Adresse</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{profileData.address}</span>
                  )}
                </div>
              </div>

              <div className="info-item">
                <Calendar size={20} />
                <div className="info-content">
                  <label>Date de naissance</label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={profileData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>
                      {new Date(profileData.dateOfBirth).toLocaleDateString(
                        "fr-FR"
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>Informations professionnelles</h2>
            <div className="info-grid">
              <div className="info-item">
                <User size={20} />
                <div className="info-content">
                  <label>Entreprise</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="company"
                      value={profileData.company}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{profileData.company}</span>
                  )}
                </div>
              </div>

              <div className="info-item">
                <User size={20} />
                <div className="info-content">
                  <label>Poste</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="position"
                      value={profileData.position}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{profileData.position}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>À propos</h2>
            <div className="bio-section">
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Parlez-nous de vous..."
                />
              ) : (
                <p>{profileData.bio}</p>
              )}
            </div>
          </div>

          <div className="profile-section">
            <h2>Statistiques d'utilisation</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>127</h3>
                <p>Conversations</p>
              </div>
              <div className="stat-card">
                <h3>2,543</h3>
                <p>Messages envoyés</p>
              </div>
              <div className="stat-card">
                <h3>45h</h3>
                <p>Temps d'utilisation</p>
              </div>
              <div className="stat-card">
                <h3>Premium</h3>
                <p>Plan actuel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
