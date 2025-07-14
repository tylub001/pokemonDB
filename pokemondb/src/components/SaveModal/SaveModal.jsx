import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SaveModal.css";

export default function SaveModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (isOpen) {
      window.scrollTo(0, 0);
    }
  }, [isOpen]);

  const handleGoToProfile = () => {
    onClose();
    navigate("/profile");
  };

  if (!isOpen) return null;

  return (
    <div className="modal__overlay">
      <div className="modal__content modal__content_type_save">
        <h2 className="modal__message">Pokémon Saved!</h2>
        <p className="modal__info">
          Your Pokémon has been added to your favorites.
        </p>
        <button onClick={handleGoToProfile} className="modal__save-link">
          Go to My Pokémon
        </button>
        <button onClick={onClose} className="modal__close"></button>
      </div>
    </div>
  );
}
