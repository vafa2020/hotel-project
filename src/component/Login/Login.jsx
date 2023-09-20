import { useEffect, useState } from "react";
import useAuth from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const inputsHandler = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (formValue.userName && formValue.email && formValue.password) {
      login(formValue);
    } else {
      alert("fields is required");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      //navigate previous page after login
    //   navigate(-1);

    //   navigate to route /
        navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form className="form" onSubmit={submitHandler}>
        <div className="formControl">
          <label htmlFor="userName">UserName</label>
          <input
            type="text"
            name="userName"
            id="userName"
            value={formValue.userName}
            onChange={inputsHandler}
          />
        </div>
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={formValue.email}
            onChange={inputsHandler}
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            value={formValue.password}
            onChange={inputsHandler}
          />
        </div>
        <div className="buttons">
          <button type="submit" className="btn btn--primary">
            login
          </button>
        </div>
      </form>
    </div>
  );
};
