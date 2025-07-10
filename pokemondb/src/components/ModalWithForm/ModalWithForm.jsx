import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  isValid,
  extraAction
}) {
  const handleBackgroundClick = (event) => {
    if (event.target.classList.contains("modal_opened")) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleBackgroundClick}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__action-wrapper">
            <button type="submit" className="modal__submit" disabled={!isValid}>
              {buttonText}
            </button>
            {extraAction && <div className="modal__alt-action">{extraAction}</div>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;