import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({
  isOpen,
  onClose,
  onLogin,
  passwordError,
  setPasswordError,
  onSignupClick,
}) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});
 

  useEffect(() => {
  if (isOpen) {
    setValues({
      email: "",
      password: "",
    });
    setErrors({});
    setIsValid(false);
  }
}, [isOpen]);

  const handleChange = (e) => {
    setPasswordError("");
    const { name, value, validationMessage, validity } = e.target;

    const newValues = { ...values, [name]: value };
    setValues(newValues);

     if (name === "email") {
    setErrors((prev) => ({ ...prev, email: validationMessage }));
  }

    const isFormValid =
      newValues.email.trim() !== "" && newValues.password.trim() !== "";
    setIsValid(isFormValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  return (
    <ModalWithForm
      title="Log In"
      name="login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Log In"
      extraAction={
        <button type="button" className="modal__link" onClick={onSignupClick}>
          or Register
        </button>
      }
      isValid={isValid}
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="modal__input"
          value={values.email}
          onChange={handleChange}
          required
          autoComplete="username"
        />
         <span className="modal__error">{errors.email}</span>
      </label>

      <label
        className={`modal__label ${passwordError ? "modal__label_error" : ""}`}
      >
        {passwordError || "Password*"}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="modal__input"
          value={values.password}
          onChange={handleChange}
          required
           autoComplete="current-password"
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;