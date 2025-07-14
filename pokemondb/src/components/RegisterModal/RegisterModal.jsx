import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useNavigate } from "react-router-dom";

export default function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onLoginClick,
  setCurrentUser,
  setIsLoggedIn,
}) {
  const [isValid, setIsValid] = useState(false)
  const [values, setValues] = useState({ email: "", password: "", name: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
  const emailIsValid = values.email.includes("@");
  const passwordIsValid = values.password.length >= 2;
  const nameIsValid = values.name.trim().length > 0;

  setIsValid(emailIsValid && passwordIsValid && nameIsValid);
}, [values]);

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "", name: "" });
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, validationMessage } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validationMessage }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.email || !values.password || !values.name) {
      alert("Please fill out all fields.");
      return;
    }
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const duplicate = existingUsers.find((user) => user.email === values.email);

    if (duplicate) {
      alert("A user with this email already exists.");
      return;
    }

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    localStorage.setItem("user", JSON.stringify(newUser));

    setCurrentUser(newUser);
    setIsLoggedIn(true);

    onRegister(newUser);
    onClose();
    navigate("/profile");
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      extraAction={
        <button type="button" className="modal__link" onClick={onLoginClick}>
          or Log in
        </button>
      }
      isValid={isValid}
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          required
          value={values.email}
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
          value={values.password}
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
          placeholder="Username"
          value={values.name}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.name}</span>
      </label>
    </ModalWithForm>
  );
}
