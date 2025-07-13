import "./SaveModal.css";

import { Link } from "react-router-dom";

export default function SaveModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <h2>Pokémon Saved!</h2>
        <p>Your Pokémon has been added to your favorites.</p>
        <Link to="/profile" className="modal__link" onClick={onClose}>
          Go to My Pokémon
        </Link>
        <button onClick={onClose} className="modal__close">
          Close
        </button>
      </div>
    </div>
  );
}
