import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import "./Account.css";

export default function Account() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Logique de connexion
      console.log("Connexion:", {
        email: formData.email,
        password: formData.password,
      });
    } else {
      // Logique de création de compte
      console.log("Création de compte:", formData);
    }
  };

  return (
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
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
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
          )}

          {isLogin && (
            <div className="form-options">
              <a href="#" className="forgot-password">
                Mot de passe oublié ?
              </a>
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
          </button>
        </div>
      </div>
    </div>
  );
}
