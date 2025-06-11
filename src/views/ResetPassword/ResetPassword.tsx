import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import "./ResetPassword.css";
import { postFetch } from "../../core/api/fetch";
import Header from "../../components/Header/Header";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../../components/Footer/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Récupérer le token depuis l'URL
    const recoverToken = searchParams.get("recover_token");
    if (recoverToken) {
      setToken(recoverToken);
    } else {
      // Si pas de token, rediriger vers la page de connexion
      toast.error("Lien de réinitialisation invalide ou expiré.");
      navigate("/login");
    }
  }, [searchParams, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      toast.error("Token de récupération manquant.");
      return;
    }

    if (!formData.password || !formData.confirmPassword) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await postFetch("/auth/reset_password", {
        password: formData.password,
        token: token,
      });

      if (response?.status === 201) {
        setIsSuccess(true);
        toast.success("Mot de passe réinitialisé avec succès !");
        
        // Rediriger vers la page de connexion après 3 secondes
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else if (response?.status === 403) {
        toast.error("Lien de réinitialisation invalide ou expiré.");
        navigate("/login");
      } else {
        toast.error(
          response?.data?.message || "Erreur lors de la réinitialisation du mot de passe"
        );
      }
    } catch (error) {
      toast.error(
        "Une erreur s'est produite lors de la réinitialisation. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <Header />
        <ToastContainer />
        <div className="reset-password-container">
          <div className="reset-password-card success-card">
            <div className="reset-password-header">
              <CheckCircle className="success-icon" />
              <h1 className="reset-password-title">Mot de passe réinitialisé !</h1>
              <p className="reset-password-subtitle">
                Votre mot de passe a été mis à jour avec succès. Vous allez être redirigé vers la page de connexion.
              </p>
            </div>
            <div className="success-actions">
              <button
                className="btn btn-primary btn-full"
                onClick={() => navigate("/login")}
              >
                Se connecter maintenant
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="reset-password-container">
        <div className="reset-password-card">
          <div className="reset-password-header">
            <Lock className="reset-password-icon" />
            <h1 className="reset-password-title">Nouveau mot de passe</h1>
            <p className="reset-password-subtitle">
              Choisissez un nouveau mot de passe sécurisé pour votre compte
            </p>
          </div>

          <form className="reset-password-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">Nouveau mot de passe</label>
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
                  minLength={8}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="password-requirements">
                <div className={`requirement ${formData.password.length >= 8 ? 'valid' : ''}`}>
                  <div className="requirement-indicator"></div>
                  Au moins 8 caractères
                </div>
              </div>
            </div>

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
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <div className="error-message">
                  <AlertCircle size={16} />
                  Les mots de passe ne correspondent pas
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary btn-full ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
            </button>
          </form>

          <div className="reset-password-footer">
            <p>
              Vous vous souvenez de votre mot de passe ?
              <button
                type="button"
                className="link-button"
                onClick={() => navigate("/login")}
              >
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
