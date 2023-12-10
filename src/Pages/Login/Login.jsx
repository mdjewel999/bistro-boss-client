import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import LoginImg from "../../../src/assets/Login/login.webp";
import "./Login.css";

const Login = () => {
  const [setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "User Login Successful.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      navigate(from, { state: { from: location } });
    });
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Pizza Potpourri Palace | Login</title>
      </Helmet>
      <div className="hero p-12 bg-cover bg-no-repeat shadow-2xl bg-[url('https://imageservice.sky.com/pcms/d77bf0c2-bbf8-11e8-b772-67d2e06521b0/AGG_SOURCE?territory=GB&proposition=SBO_SPORT&language=eng')] text-white ">
        <div className="hero-content grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="text-center">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
            </div>

            <div>
              <img src={LoginImg} alt="" className="w-[350px] h-[350px]" />
            </div>
          </div>

          <div className="card  bg-[#161616] border border-white input-bordered  shadow-2xl ">
            <form onSubmit={handleLogin} className="card-body m-0">
              <div className="form-control w-full">
                <label className="label">
                  <span className="text-white">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="input input-bordered border-b border-white "
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="text-white">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="text-white link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  onBlur={handleValidateCaptcha}
                  type="text"
                  name="captcha"
                  placeholder="Type the captcha above"
                  className="input input-bordered"
                />
              </div>
              {/* TODO: make button disabled for captcha */}
              <div className="form-control w-full">
                <input
                  disabled={false}
                  className="btn bg-custom"
                  type="submit"
                  value="Login"
                />
              </div>

              <p className="">
                  <small>
                    New Here? <Link to="/signup">Create an account</Link>{" "}
                  </small>
                </p>
              <div className="">
                <SocialLogin></SocialLogin>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
