import { useState } from "react";
import "../assets/login.css";
import { useForm } from "react-hook-form";
import URL_API from "../stores/api";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, type LoginFormData } from "../validation/loginSchema";
import { registerSchema, type RegisterFormData } from "../validation/registerSchema";


function SocialBar() {
  return (
    <>
      <div className="social-icons">
        <a href="#" className="icon">
          <i className="fa-brands fa-google-plus-g"></i>
        </a>
        <a href="#" className="icon">
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a href="#" className="icon">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href="#" className="icon">
          <i className="fa-brands fa-linkedin-in"></i>
        </a>
      </div>
    </>
  );
}

function LoginPage() {
  const [active, setActive] = useState(false);
  const registerForm = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });
  const loginForm = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmitRegister = async (data: RegisterFormData) => {
    console.log("Register data:", data);

    try {
      const res = await URL_API.post("register", data);
      toast.success(res.data.message, { position: "top-center" });
      setActive(!active);
    } catch (err) {
      toast.error(err.response.data.message ?? "Error");
    }
  };
  const onSubmitLogin = async (data: LoginFormData) => {
    console.log("Login data:", data);
    try {
      const res = await URL_API.post("login", data);

      toast.success(res.data.token, { position: "top-center" });
    } catch (err) {
      toast.error(err.response.data.message ?? "Error");
    }
  };
  const onError = (errors: Record<string, any>) => {
    // Hiển thị tất cả lỗi validation bằng toast
    Object.values(errors).forEach((err) => {
      toast.error(err?.message || "Có lỗi xảy ra");
    });
  };
  return (
    <>
      <div className={`container ${active ? "active" : ""}`} id="container">
        <div className="form-container sign-up">
          <form onSubmit={registerForm.handleSubmit(onSubmitRegister,onError)}>
            <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>
            <SocialBar></SocialBar>
            <p>or use your email for registeration</p>
            <input
              type="text"
              placeholder="User Name"
              {...registerForm.register("username")}
            />
            <input
              type="email"
              placeholder="Email"
              {...registerForm.register("email")}
            />
            <input
              type="password"
              placeholder="Password"
              {...registerForm.register("password")}
            />
            <span>What account are you?</span>
            <div className="radio-group">
              <div className="radio-group">
                <input
                  type="radio"
                  id="teacher"
                  value="1"
                  {...registerForm.register("role")}
                />
                <label htmlFor="teacher">Teacher</label>
              </div>
              <div className="radio-group">
                <input
                  type="radio"
                  id="student"
                  value="2"
                  {...registerForm.register("role")}
                />
                <label htmlFor="student">Student</label>
              </div>
            </div>

            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={loginForm.handleSubmit(onSubmitLogin,onError)}>
            <h1>Sign In</h1>
            <SocialBar></SocialBar>
            <span>or use your email password</span>
            <input
              type="email"
              placeholder="Email"
              {...loginForm.register("email")}
            />
            <input
              type="password"
              placeholder="Password"
              {...loginForm.register("password")}
            />
            <a href="#">Forget Your Password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button
                className="hidden"
                id="login"
                onClick={() => setActive(!active)}
              >
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button
                className="hidden"
                id="register"
                onClick={() => setActive(!active)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
