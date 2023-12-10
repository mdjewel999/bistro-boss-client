import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoginImg from "../../../src/assets/Login/login.webp";
import { AuthContext } from "../../providers/AuthProvider";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const saveUser = { name: data.name, email: data.email };
          fetch(
            "https://bistro-boss-server-p0h64m7td-mdjewel999.vercel.app/users",
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(saveUser),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                console.log("user profile info updated");
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User created successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              }
            });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <Helmet>
        <title>Pizza Potpourri Palace | Sign Up</title>
      </Helmet>
      <div className="hero p-12 bg-cover bg-no-repeat shadow-2xl bg-[url('https://imageservice.sky.com/pcms/d77bf0c2-bbf8-11e8-b772-67d2e06521b0/AGG_SOURCE?territory=GB&proposition=SBO_SPORT&language=eng')] text-white ">
        <div className="hero-content grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="text-center">
              <h1 className="text-5xl font-bold">SignUp now!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
            </div>

            <div>
              <img
                src={LoginImg}
                alt=""
                className="w-[350px] h-[350px] items-center"
              />
            </div>
          </div>
          <div className="card  bg-[#161616] border border-white input-bordered  shadow-2xl">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body m-0 text-white"
            >
              <div className="form-control">
                <label className="label">
                  <span className="text-white">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-white">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
                {errors.photoURL && (
                  <span className="text-red-600">Photo URL is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-white">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-white">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password must be less than 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one Uppercase one lower case, one number
                    and one special character.
                  </p>
                )}
                <label className="label">
                  <a href="#" className="text-white link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control w-full ">
                <input
                  className="btn bg-custom"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
            <p className="px-8 py-4">
              <small>
                Already have an account <Link to="/login">SignUp</Link>
              </small>
            </p>
            {/* <div className="divider mt-5">OR</div> */}
            <div className="">
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
