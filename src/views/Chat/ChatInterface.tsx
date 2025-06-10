import { useAuth } from "../../core/auth/AuthContext";
import ChatComponent from "../../components/ChatComponent/ChatComponent";
import "./ChatInterface.css";

export default function ChatInterface() {
  const { isAuthenticated, loading } = useAuth();

  // Si en cours de chargement, afficher un loader
  if (loading) {
    return (
      <div className="chat-interface-loading">
        <div className="loading-spinner">Chargement...</div>
      </div>
    );
  }

  // Utiliser le ChatComponent unifié pour tous les cas
  return <ChatComponent isAuthenticated={isAuthenticated} />;
}
