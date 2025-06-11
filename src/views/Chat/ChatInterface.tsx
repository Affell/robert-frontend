import { useAuth } from "../../core/auth/AuthContext";
import ChatComponent from "../../components/ChatComponent/ChatComponent";
import "./ChatInterface.css";
import { ClipLoader } from "react-spinners";

export default function ChatInterface() {
  const { isAuthenticated, loading } = useAuth();

  // Si en cours de chargement, afficher un loader
  if (loading) {
    return (
      <div className="chat-interface-loading">
        <ClipLoader size={24} color="#f97316" aria-label="Loading..." />
      </div>
    );
  }

  // Utiliser le ChatComponent unifié pour tous les cas
  return <ChatComponent isAuthenticated={isAuthenticated} />;
}
