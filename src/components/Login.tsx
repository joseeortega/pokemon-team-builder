import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { encodeB64, generateGuid, getRandomImage } from "../helpers/Helper";
import { ILoginUser, IUser } from "../models/user.model";
import { UseFormReturn } from "react-hook-form/dist/types";
import { NICKNAME_REGEX, PASSWORD_REGEX } from "../defs/regex";
import { createUser, loginUser } from "../services/JSONServerApi";
import { PokemonContext } from "./PokemonContext";
import { AuthContext } from "./AuthContext";

function Login() {
  const [randomImage] = useState(getRandomImage());
  const { login } = useContext(AuthContext);

  const getRandomStyle = () => {
    return {
      backgroundImage: `url(${randomImage})`,
    };
  };

  let navigate = useNavigate();

  const loginForm = useForm<ILoginUser>({
    defaultValues: {
      name: "",
      password: "",
    },
    mode: "onChange",
  });

  const registerForm = useForm<IUser>({
    defaultValues: {
      id: generateGuid(),
      name: "",
      password: "",
    },
    mode: "onChange",
  });

  const [signUpMode, setSignUpMode] = useState(true);

  const togglePanelActive = () => {
    setSignUpMode(!signUpMode);
  };

  const nameFieldDef = () => {
    return {
      required: true,
      minLength: 3,
      maxLength: 15,
      pattern: NICKNAME_REGEX,
    };
  };

  const passwordFieldDef = (isLogin: boolean) => {
    return {
      required: true,
      minLength: !isLogin ? 5 : undefined,
      maxLength: !isLogin ? 20 : undefined,
      pattern: !isLogin ? PASSWORD_REGEX : undefined,
    };
  };

  const getNameInput = (form: UseFormReturn<any, any>) => {
    console.log("klk");
    const errors = form.formState.errors;
    return (
      <div>
        <input
          type="text"
          placeholder="Name"
          {...form.register("name", nameFieldDef())}
        />
        <div>
          {errors.name?.type == "required" && (
            <span>This field is required</span>
          )}
          {errors.name?.type == "minLength" && (
            <span>This field is should be minimum 3 characters</span>
          )}
          {errors.name?.type == "maxLength" && (
            <span>This field is should be maximum 15 characters</span>
          )}
          {errors.name?.type == "pattern" && (
            <span>This field only accepts number, characters and dots</span>
          )}
        </div>
      </div>
    );
  };

  const getPasswordInput = (
    form: UseFormReturn<any, any>,
    isLogin: boolean
  ) => {
    const errors = form.formState.errors;
    return (
      <div>
        <input
          type="password"
          placeholder="Password"
          {...form.register("password", passwordFieldDef(isLogin))}
        />
        <div>
          {errors.password?.type == "required" && (
            <span>This field is required</span>
          )}
          {errors.password?.type == "minLength" && (
            <span>This field is should be minimun 5 characters</span>
          )}
          {errors.password?.type == "maxLength" && (
            <span>This field is should be maximun 20 characters</span>
          )}
          {errors.password?.type == "pattern" && (
            <span>
              Should contain at least 8 characters, 1 number, 1 upper and 1
              lowercase
            </span>
          )}
        </div>
      </div>
    );
  };

  const submitLogin = () => {
    const user: ILoginUser = loginForm.getValues();
    user.password = encodeB64(user.password);
    loginUser(user).then((data) => {
      if (data.data.length) {
        login(data.data[0]);
        navigate("/teams");
      }
    });
  };

  const submitSignUp = () => {
    const user: IUser = registerForm.getValues();
    user.password = encodeB64(user.password);
    createUser(user).then((data) => {
      togglePanelActive();
    });
  };

  return (
    <div className="login-ctr" style={getRandomStyle()}>
      <h2>Pokemon Team Builder</h2>
      <div
        id="container"
        className={!signUpMode ? "container right-panel-active" : "container"}
      >
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
            {getNameInput(registerForm)}
            {getPasswordInput(registerForm, false)}
            <button
              type={"button"}
              disabled={!registerForm.formState.isValid}
              onClick={submitSignUp}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            {getNameInput(loginForm)}
            {getPasswordInput(loginForm, true)}
            <button
              type={"button"}
              disabled={!loginForm.formState.isValid}
              onClick={submitLogin}
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn" onClick={togglePanelActive}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={togglePanelActive}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <p>
          Created with <i className="fa fa-heart"></i> by
          <a target="_blank" href="https://florin-pop.com">
            Florin Pop
          </a>
          - Read how I created this and how you can join the challenge
          <a
            target="_blank"
            href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/"
          >
            here
          </a>
          .
        </p>
      </footer>
    </div>
  );
}

export default Login;
