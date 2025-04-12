"use client";
import { useSettings } from "@/services/SettingsProvider";
import { signIn } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import bcrypt from "bcryptjs";
import axios from "axios";

const AuthForms = () => {
  const { userData, colors, setUserData } = useSettings();

  // States
  const [loginMode, setLoginMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  //   Effects
  useEffect(() => {
    if (userData?.name) setName(userData?.name);
  }, [userData]);

  // Memos
  const inputStyle = useMemo(
    () => ({
      outlineColor: colors.accent,
      borderColor: colors.accent,
    }),
    [colors]
  );

  //   Functions
  // Login Function
  const login = async (e) => {
    e.preventDefault();

    let password = e.target?.password?.value;

    if (password?.length < 8)
      return toast(
        "Please enter the valid password which contains at least 8 characters"
      );

    try {
      let executeSignIn = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (executeSignIn?.ok) {
        return toast.success("Login successful");
      } else {
        return toast.error(
          executeSignIn?.error ||
            "Registration failed with code " + `${executeSignIn?.status}`
        );
      }
    } catch (error) {
      return toast.error(error?.message || "Sign in failed");
    }
  };

  // Register Function
  const register = async (e) => {
    e.preventDefault();

    let password = e.target?.password?.value;
    let rePassword = e.target?.re_password?.value;

    if (password?.length < 8)
      return toast("Password must be 8 characters long");

    if (password !== rePassword) return toast("Passwords do not match");

    let hashedPassword = bcrypt.hashSync(password, 12);

    let data = {
      uid: userData?.uid,
      name,
      email,
      password: hashedPassword,
    };

    const res = await axios.post("/api/auth/register", data);

    if (!res?.data?.ok)
      return toast.error(res?.data?.message || "Operation failed");

    try {
      let latestUserData = { ...userData, ...data };
      localStorage.setItem("user", JSON.stringify(latestUserData));
      console.log("Set user data to latest: ", latestUserData);

      setTimeout(async () => {
        let executeSignIn = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (executeSignIn?.ok) {
          // setUserData(latestUserData);
          return toast.success("Registration successful");
        } else {
          return toast.error(
            executeSignIn?.error ||
              "Registration failed with code " + `${executeSignIn?.status}`
          );
        }
      }, 120);
    } catch (error) {
      return toast.error(error?.message || "Sign in failed");
    }
  };

  return (
    <>
      <div className="w-full max-w-[320px] flex flex-col gap-3 items-center text-sm">
        {/* Auth Forms Nav - Buttons */}
        <div className="w-full p-3 rounded-lg bg-white flex items-center gap-3 text-sm font-medium">
          {/* Login Button */}
          <button
            onClick={() => setLoginMode(true)}
            className={`w-full px-3 py-2 rounded-lg border-2 cursor-pointer ${
              !loginMode ? "shadow-sm" : "shadow-none"
            }`}
            style={{
              color: !loginMode ? "#525252" : colors?.accent,
              backgroundColor: loginMode ? colors?.shade : "#ffffff",
              borderColor: loginMode ? colors?.accent : "transparent",
            }}
          >
            Login
          </button>

          {/* Register Button */}
          <button
            onClick={() => setLoginMode(false)}
            className={`w-full px-3 py-2 rounded-lg border-2 cursor-pointer ${
              loginMode ? "shadow-sm" : "shadow-none"
            }`}
            style={{
              color: loginMode ? "#525252" : colors?.accent,
              backgroundColor: !loginMode ? colors?.shade : "#ffffff",
              borderColor: !loginMode ? colors?.accent : "transparent",
            }}
          >
            Register
          </button>
        </div>

        {/* Register Form */}
        {!loginMode && (
          <form
            onSubmit={register}
            className="bg-white p-5 rounded-lg shadow-sm flex flex-col gap-3 w-full fade"
          >
            {/* Form Title */}
            <span
              className="text-2xl font-medium block text-center px-3 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[2px] before:h-[15px] before:bg-[#ff6302] before:rounded-sm after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-[2px] after:h-[15px] after:bg-[#ff6302] after:rounded-sm"
              style={{
                color: colors?.accent,
                borderColor: colors?.primary,
              }}
            >
              REGISTER
            </span>

            {/* Name Input */}
            <div>
              <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                Name
              </span>
              <input
                type="text"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target?.value)}
                placeholder="Your full name"
                className="input w-full"
                style={inputStyle}
              />
            </div>

            {/* Email Input */}
            <div>
              <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                Email
              </span>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target?.value)}
                placeholder="Your email"
                className="input w-full"
                style={inputStyle}
              />
            </div>

            {/* Password Input */}
            <div>
              <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                Password (Min. 8 characters long)
              </span>
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                className="input w-full"
                style={inputStyle}
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                Confirm Password
              </span>
              <input
                type="password"
                name="re_password"
                required
                placeholder="Retype Password"
                className="input w-full"
                style={inputStyle}
              />
            </div>

            <span className="text-slate-400 block text-center text-xs">
              Your personal information is secured.
            </span>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full text-sm font-semibold flex flex-row gap-1 items-center justify-center text-center px-2 py-[8px] rounded-sm active:scale-[92%] mt-1 cursor-pointer text-white border-2"
              style={{
                backgroundColor: colors?.primary,
                borderColor: colors?.primary,
              }}
            >
              Register
            </button>
          </form>
        )}

        {/* Login Form */}
        {loginMode && (
          <form
            onSubmit={login}
            className="bg-white p-5 rounded-lg shadow-sm flex flex-col gap-3 w-full max-w-[320px] fade"
          >
            {/* Form Title */}
            <span
              className="text-2xl font-medium block text-center px-3 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[2px] before:h-[15px] before:bg-[#ff6302] before:rounded-sm after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-[2px] after:h-[15px] after:bg-[#ff6302] after:rounded-sm"
              style={{
                color: colors?.accent,
                borderColor: colors?.primary,
              }}
            >
              LOGIN
            </span>

            {/* Email Input */}
            <div>
              <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                Email
              </span>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target?.value)}
                placeholder="Your email"
                className="input w-full"
                style={inputStyle}
              />
            </div>

            {/* Password Input */}
            <div>
              <span className="text-sm font-normal block text-left text-slate-600 mb-1">
                Password (Min. 8 characters long)
              </span>
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                className="input w-full"
                style={inputStyle}
              />
            </div>

            <span className="text-slate-400 block text-center text-xs">
              Your personal information is secured.
            </span>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full text-sm font-semibold flex flex-row gap-1 items-center justify-center text-center px-2 py-[8px] rounded-sm active:scale-[92%] mt-1 cursor-pointer text-white border-2"
              style={{
                backgroundColor: colors?.primary,
                borderColor: colors?.primary,
              }}
            >
              Login
            </button>
          </form>
        )}
      </div>
    </>
  );
};
export default AuthForms;
