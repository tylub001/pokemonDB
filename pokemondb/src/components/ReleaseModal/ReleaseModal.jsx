import "./ReleaseModal.css"

export default function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal__overlay">
      <div className="modal__content modal__content_type_release">
        <p>{message}</p>
        <div className="modal__actions">
          <button onClick={onConfirm} className="modal__confirm">Yes</button>
          <button onClick={onClose} className="modal__cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}