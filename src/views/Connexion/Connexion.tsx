import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import "./Connexion.css";
import { postFetch } from "../../core/api/fetch";
import Header from "../../components/Header/Header";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../core/auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Logique de connexion
      if (!formData.email || !formData.password) {
        toast.error("Veuillez remplir tous les champs requis.");
        return;
      }

      try {
        const response = await postFetch("/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        if (response?.status === 200) {
          toast.success("Connexion réussie !");
          if (response.data.token) {
            login(response.data.token);
          }
          navigate("/profile");
        } else {
          toast.error(response?.data?.message || "Erreur de connexion");
        }
      } catch (error) {
        toast.error(
          "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
        );
      }
    } else {
      if (
        !formData.email ||
        !formData.password ||
        !formData.firstName ||
        !formData.lastName
      ) {
        toast.error("Veuillez remplir tous les champs requis!");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Les mots de passe ne correspondent pas !");
        return;
      }

      try {
        const response = await postFetch("/auth/signup", {
          email: formData.email,
          firstname: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
        });

        if (response?.status === 201) {
          toast.success("Inscription réussie !");
          setIsLogin(true);
        } else {
          toast.error(
            response?.data?.message || "Erreur lors de l'inscription"
          );
        }
      } catch (error) {
        toast.error(
          "Une erreur s'est produite lors de l'inscription. Veuillez réessayer."
        );
      }
    }
  };
  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail.trim()) {
      toast.error("Veuillez saisir une adresse email.");
      return;
    }

    try {
      const response = await postFetch("/auth/recover", {
        email: forgotPasswordEmail,
      });
      if (response?.status === 201) {
        toast.success("Un email de réinitialisation a été envoyé !");
        setShowForgotPasswordModal(false);
        setForgotPasswordEmail("");
      } else {
        toast.error(
          response?.data?.message ||
            "Erreur lors de la réinitialisation du mot de passe"
        );
      }
    } catch (error) {
      toast.error(
        "Une erreur s'est produite lors de la réinitialisation du mot de passe. Veuillez réessayer."
      );
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="account-container">
        <div className="account-card">
          <div className="account-header">
            <User className="account-icon" />
            <h1 className="account-title">
              {isLogin ? "Connexion" : "Créer un compte"}
            </h1>
            <p className="account-subtitle">
              {isLogin
                ? "Connectez-vous pour accéder à Robert AI"
                : "Rejoignez Robert AI dès aujourd'hui"}
            </p>
          </div>

          <form className="account-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">Prénom</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    placeholder="Votre prénom"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Nom</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    placeholder="Votre nom"
                  />
                </div>
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <Mail className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="votre@email.com"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <div className="input-with-icon">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </label>
                <div className="input-with-icon">
                  <Lock className="input-icon" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
            )}{" "}
            {isLogin && (
              <div className="form-options">
                <button
                  type="button"
                  className="forgot-password"
                  onClick={() => setShowForgotPasswordModal(true)}
                >
                  Mot de passe oublié ?
                </button>
              </div>
            )}
            <button type="submit" className="btn btn-primary btn-full">
              {isLogin ? "Se connecter" : "Créer le compte"}
            </button>
          </form>

          <div className="account-switch">
            <p>
              {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
              <button
                type="button"
                className="switch-mode-btn"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Créer un compte" : "Se connecter"}
              </button>
            </p>
          </div>

          <div className="divider">
            <span>ou</span>
          </div>

          <div className="social-login">
            <button className="btn btn-social btn-google">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuer avec Google
            </button>{" "}
          </div>
        </div>
      </div>

      {/* Modal pour mot de passe oublié */}
      {showForgotPasswordModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowForgotPasswordModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Mot de passe oublié</h2>
              <button
                className="modal-close"
                onClick={() => setShowForgotPasswordModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>
                Saisissez votre adresse email pour recevoir un lien de
                réinitialisation.
              </p>
              <div className="form-group">
                <label htmlFor="forgot-email">Email</label>
                <div className="input-with-icon">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    id="forgot-email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    placeholder="votre@email.com"
                    autoFocus
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowForgotPasswordModal(false)}
              >
                Annuler
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleForgotPassword}
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
