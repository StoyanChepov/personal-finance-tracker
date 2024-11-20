import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { RegisterHook } from "../../hooks/useAuthHook";

export default function Register() {
  const [error, setError] = useState("");
  const register = RegisterHook();
  const navigate = useNavigate();
  const { values, changeHandler, submitHandler } = useForm(
    { email: "", password: "", rePassword: "" },
    async ({ email, password, rePassword }) => {
      if (password !== rePassword) {
        setError("Passwords do not match");
      } else if (password.length < 4) {
        setError("Password must be at least 4 characters long");
      } else {
        try {
          const result = await register(email, password, rePassword);
          if (result.errors) {
            setError(result.errors.error);
          } else {
            navigate("/");
          }
        } catch (error) {
          setError(error);
        }
      }
    }
  );

  return (
    <section id="register">
      <h1>Register</h1>
      <form id="register-form" onSubmit={submitHandler}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={values.email}
          onChange={changeHandler}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={changeHandler}
          required
        />
        <label htmlFor="re-password">Re-Password:</label>
        <input
          type="password"
          id="re-password"
          name="rePassword"
          placeholder="Re-enter your password"
          values={values.rePassword}
          onChange={changeHandler}
          required
        />
        {error && <div className="error">{error}</div>}
        <button className="button" type="submit">
          Register
        </button>
      </form>
    </section>
  );
}
