import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister, onLoginClick }) {
  const [values, setValues] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
  if (isOpen) {
    setValues({
      name: "",
      avatar: "",
      email: "",
      password: "",
    });
    setErrors({});
    setIsValid(false);
  }
}, [isOpen]);

  const handleChange = (e) => {
    const { name, value, validationMessage, validity } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validationMessage }));
    setIsValid(validity.valid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  return (
    <ModalWithForm
      title="Sign Up"
       buttonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
       extraAction={
    <button type="button" className="modal__link" onClick={onLoginClick}>
      or Log in
    </button>
  }
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          required
          value={values.email || ""}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.email}</span>
      </label>

      <label className="modal__label">
        Password*
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          required
          value={values.password || ""}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.password}</span>
      </label>

      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.name}</span>
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={values.avatar || ""}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.avatar}</span>
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
