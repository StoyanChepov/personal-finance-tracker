import { useForm } from "../../hooks/useForm";
import { LoginHook } from "../../hooks/useAuthHook";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const login = LoginHook();
  const navigate = useNavigate();
  const { values, changeHandler, submitHandler } = useForm(
    { email: "", password: "" },
    async ({ email, password }) => {
      try {
        await login(email, password);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  );

  return (
    <section id="login">
      <h1>Login</h1>
      <form id="login" onSubmit={submitHandler}>
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
        <button className="button" type="submit">
          Login
        </button>
      </form>
    </section>
  );
}
