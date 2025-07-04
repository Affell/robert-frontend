import { useState, useEffect } from "react";
import {
  User,
  Mail,
  MessageSquare,
  Calendar,
  Edit3,
  Save,
  X,
  Check,
  AlertCircle,
  History,
  Trash2,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import "./Profile.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../core/auth/AuthContext";
import { getUserInfo, type UserData } from "../../core/api/APIManager";
import { postFetch } from "../../core/api/fetch";
import { useChatSessions } from "../../core/hooks/useChatSessions";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { token, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  // États pour la suppression de compte
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [showDeletePassword, setShowDeletePassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  // Hook pour gérer l'historique des conversations
  const {
    sessions,
    loading: sessionsLoading,
    error: sessionsError,
    deleteSession,
  } = useChatSessions({
    token: token || undefined,
    isAuthenticated,
  }); // Stats calculées basées sur les vraies données
  const stats = {
    totalMessages: sessions?.length || 0,
    sessionsThisMonth:
      sessions?.filter((session) => {
        const sessionDate = new Date(session.created_at);
        const currentDate = new Date();
        return (
          sessionDate.getMonth() === currentDate.getMonth() &&
          sessionDate.getFullYear() === currentDate.getFullYear()
        );
      }).length || 0,
  };

  // Formatage des dates pour l'affichage
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Gérer la suppression d'une session
  const handleDeleteSession = async (sessionId: number) => {
    const success = await deleteSession(sessionId);
    if (success) {
      // Optionnel: afficher un message de succès
    }
  };
  // Récupérer les données utilisateur au chargement
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setError("Token manquant");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getUserInfo(token);
        if (data) {
          setUserData(data);
          setEditData({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
          });
          setError(null);
        } else {
          setError("Impossible de récupérer les données utilisateur");
        }
      } catch (err) {
        setError("Erreur lors du chargement des données");
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  // Gérer les changements dans les champs d'édition
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Commencer l'édition
  const startEditing = () => {
    if (userData) {
      setEditData({
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
      });
      setIsEditing(true);
      setUpdateError(null);
      setUpdateSuccess(false);
    }
  };

  // Annuler l'édition
  const cancelEditing = () => {
    setIsEditing(false);
    setUpdateError(null);
    setUpdateSuccess(false);
    if (userData) {
      setEditData({
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
      });
    }
  };
  // Sauvegarder les modifications
  const saveChanges = async () => {
    if (!token) return;

    setUpdateLoading(true);
    setUpdateError(null);
    setUpdateSuccess(false);

    const response = await postFetch("/auth/me", editData, {
      "Robert-Connect-Token": token,
    });

    if (response.status === 200) {
      if (userData) {
        setUserData({
          ...userData,
          ...editData,
          id: userData.id,
        });
      }
      setUpdateSuccess(true);
      setIsEditing(false);
    } else {
      setUpdateError("Erreur lors de la mise à jour des données");
    }
    setUpdateLoading(false);
  };

  // Fonctions pour la suppression de compte
  const handleDeleteAccount = async () => {
    if (!token || !deletePassword.trim()) {
      toast.error("Veuillez saisir votre mot de passe.");
      return;
    }

    setIsDeleting(true);

    try {
      const response = await postFetch(
        "/auth/signout",
        { password: deletePassword },
        {
          "Robert-Connect-Token": token,
        }
      );
      if (response.status === 200) {
        setShowDeleteModal(false);
        navigate("/");
        toast.success("Votre compte a été supprimé avec succès.");
      } else {
        setShowDeleteModal(false);
        toast.error(
          response?.data?.message || "Erreur lors de la suppression du compte."
        );
      }
    } catch (error) {
      setShowDeleteModal(false);
      toast.error(
        "Une erreur s'est produite lors de la suppression du compte."
      );
    } finally {
      setIsDeleting(false);
      setDeletePassword("");
    }
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
    setDeletePassword("");
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletePassword("");
  };

  if (loading) {
    return (
      <div className="profile-page">
        <Header />
        <main className="profile-main">
          <div className="profile-container">
            <ClipLoader
              loading={true}
              size={24}
              color="#f97316"
              aria-label="Loading..."
            />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="profile-page">
        <Header />
        <main className="profile-main">
          <div className="profile-container">
            <div className="error-message">
              <p>❌ {error || "Aucune donnée utilisateur disponible"}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <ToastContainer />
      <Header />
      <main className="profile-main">
        <div className="profile-container">
          {" "}
          {/* En-tête du profil */}
          <div className="profile-header">
            <div className="profile-avatar">
              <User size={80} />
            </div>
            <div className="profile-info">
              <h1>
                {userData.firstname} {userData.lastname}
              </h1>
              <p className="profile-email">{userData.email}</p>{" "}
              {/* Actions de profil */}
              <div className="profile-actions">
                {!isEditing ? (
                  <>
                    <button onClick={startEditing} className="edit-btn">
                      <Edit3 size={16} />
                      Modifier le profil
                    </button>
                    <button onClick={openDeleteModal} className="delete-btn">
                      <Trash2 size={16} />
                      Supprimer le compte
                    </button>
                  </>
                ) : (
                  <div className="edit-actions">
                    <button
                      onClick={saveChanges}
                      disabled={updateLoading}
                      className="save-btn"
                    >
                      <Save size={16} />
                      {updateLoading ? "Sauvegarde..." : "Sauvegarder"}
                    </button>
                    <button onClick={cancelEditing} className="cancel-btn">
                      <X size={16} />
                      Annuler
                    </button>
                  </div>
                )}
              </div>
              {/* Messages de feedback */}
              {updateSuccess && (
                <div className="success-message">
                  <Check size={16} />
                  Informations mises à jour avec succès !
                </div>
              )}
              {updateError && (
                <div className="error-message">
                  <AlertCircle size={16} />
                  {updateError}
                </div>
              )}
            </div>
          </div>
          {/* Informations principales */}
          <div className="profile-content">
            {" "}
            <div className="profile-section">
              <h2>Informations personnelles</h2>
              <div className="info-grid">
                <div className="info-item">
                  <User size={20} />
                  <div className="info-content">
                    <label>Prénom</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="firstname"
                        value={editData.firstname}
                        onChange={handleInputChange}
                        className="edit-input"
                        placeholder="Votre prénom"
                      />
                    ) : (
                      <span>{userData.firstname}</span>
                    )}
                  </div>
                </div>

                <div className="info-item">
                  <User size={20} />
                  <div className="info-content">
                    <label>Nom</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="lastname"
                        value={editData.lastname}
                        onChange={handleInputChange}
                        className="edit-input"
                        placeholder="Votre nom"
                      />
                    ) : (
                      <span>{userData.lastname}</span>
                    )}
                  </div>
                </div>

                <div className="info-item">
                  <Mail size={20} />
                  <div className="info-content">
                    <label>Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleInputChange}
                        className="edit-input"
                        placeholder="votre.email@exemple.com"
                      />
                    ) : (
                      <span>{userData.email}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Statistiques d'utilisation */}
            <div className="profile-section">
              <h2>Statistiques d'utilisation</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <MessageSquare size={24} />
                  <h3>{stats.totalMessages.toLocaleString()}</h3>
                  <p>Messages envoyés</p>
                </div>

                <div className="stat-card">
                  <Calendar size={24} />
                  <h3>{stats.sessionsThisMonth}</h3>
                  <p>Sessions ce mois</p>
                </div>
              </div>{" "}
              <div className="favorite-topics">
                <h3>Sujets de discussion favoris</h3>
              </div>
            </div>
            {/* Historique des conversations */}
            <div className="profile-section">
              <h2>
                <History size={24} />
                Historique des conversations
              </h2>

              {sessionsLoading && (
                <div className="loading-sessions">
                  <ClipLoader
                    size={24}
                    color="#f97316"
                    aria-label="Loading..."
                  />
                </div>
              )}

              {sessionsError && (
                <div className="error-message">
                  <AlertCircle size={16} />
                  {sessionsError}
                </div>
              )}

              {!sessionsLoading && !sessionsError && (
                <div className="chat-history-section">
                  {!sessions || sessions.length === 0 ? (
                    <div className="no-sessions">
                      <MessageSquare size={48} />
                      <h3>Aucune conversation sauvegardée</h3>
                      <p>
                        Commencez une conversation pour la voir apparaître ici.
                      </p>
                    </div>
                  ) : (
                    <div className="sessions-list">
                      {sessions.slice(0, 10).map((session) => (
                        <div key={session.id} className="session-item">
                          <div className="session-info">
                            <h4>{session.title}</h4>
                            <p className="session-date">
                              {formatDate(session.created_at)}
                            </p>
                          </div>
                          <button
                            className="delete-session-btn"
                            onClick={() => handleDeleteSession(session.id)}
                            title="Supprimer cette conversation"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}

                      {sessions.length > 10 && (
                        <div className="sessions-overflow">
                          <p>
                            Et {sessions.length - 10} conversation(s) de plus...
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal de suppression de compte */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <div
            className="modal-content delete-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Supprimer définitivement le compte</h2>
              <button className="modal-close" onClick={closeDeleteModal}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="warning-section">
                <AlertCircle className="warning-icon" />
                <div className="warning-content">
                  <h3>⚠️ Action irréversible</h3>
                  <p>
                    La suppression de votre compte entraînera la perte
                    définitive de :
                  </p>
                  <ul>
                    <li>Toutes vos conversations et historique</li>
                    <li>Vos préférences et paramètres</li>
                    <li>Toutes les données associées à votre compte</li>
                  </ul>
                  <p className="warning-text">
                    <strong>Cette action ne peut pas être annulée.</strong>
                  </p>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="delete-password">
                  Saisissez votre mot de passe pour confirmer :
                </label>
                <div className="input-with-icon">
                  <Lock className="input-icon" />
                  <input
                    type={showDeletePassword ? "text" : "password"}
                    id="delete-password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    autoFocus
                    disabled={isDeleting}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowDeletePassword(!showDeletePassword)}
                    disabled={isDeleting}
                  >
                    {showDeletePassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeDeleteModal}
                disabled={isDeleting}
              >
                Annuler
              </button>
              <button
                type="button"
                className={`btn btn-danger ${isDeleting ? "loading" : ""}`}
                onClick={handleDeleteAccount}
                disabled={isDeleting || !deletePassword.trim()}
              >
                {isDeleting ? "Suppression..." : "Supprimer définitivement"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
