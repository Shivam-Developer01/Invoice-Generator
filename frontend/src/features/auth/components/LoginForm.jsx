import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import PrimaryButton from "../../../components/ui/Button/PrimaryButton";
import useLogin from "../hooks/useLogin";
import { useAuth } from "../../../context/AuthContext";
import routes from "../../../config/routes";
import handleApiError from "../../../utils/handleApiError";

function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const loginMutation = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (formData) => {
    try {
      const response = await loginMutation.mutateAsync(formData);

      login({
        token: response.data.token,
        user: response.data.user,
        rememberMe: formData.rememberMe,
      });

      toast.success(response.message);

      navigate(routes.DASHBOARD, {
        replace: true,
      });
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="login-card">
      <h2>Welcome Back 👋</h2>

      <p>Sign in to continue to your account.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Email</label>

          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />

          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />

            <div className="invalid-feedback">{errors.password?.message}</div>

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="login-options">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="remember"
              {...register("rememberMe")}
            />

            <label className="form-check-label" htmlFor="remember">
              Remember Me
            </label>
          </div>

          <button type="button" className="forgot-btn">
            Forgot Password?
          </button>
        </div>

        <PrimaryButton
          type="submit"
          className="w-100 mt-4"
          loading={loginMutation.isPending}
        >
          Login
        </PrimaryButton>
      </form>
    </div>
  );
}

export default LoginForm;
