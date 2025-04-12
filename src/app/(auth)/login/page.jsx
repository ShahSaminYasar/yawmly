"use client";
import GoogleLogin from "@/components/auth/GoogleLogin";
import { useSettings } from "@/services/SettingsProvider";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const { colors } = useSettings();
  const { status } = useSession();

  // States
  const [loggingIn, setLoggingIn] = useState(false);

  //   Effetcs
  useEffect(() => {
    document.title = `Login — YAWMLY`;

    if (status === "authenticated") {
      return redirect("/");
    }
  }, [status]);

  // Memos
  const inputStyle = useMemo(
    () => ({
      outlineColor: colors.accent,
      borderColor: colors.accent,
    }),
    [colors]
  );

  // Functions
  // Login Function
  const login = async (e) => {
    e.preventDefault();

    setLoggingIn(true);

    let email = e.target?.email?.value;
    let password = e.target?.password?.value;

    if (password?.length < 8) {
      setLoggingIn(false);
      return toast(
        "Please enter the valid password which contains at least 8 characters"
      );
    }

    try {
      let executeSignIn = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (executeSignIn?.ok) {
        setLoggingIn(false);
        return toast.success("Login successful");
      } else {
        setLoggingIn(false);
        return toast.error(
          executeSignIn?.error ||
            "Registration failed with code " + `${executeSignIn?.status}`
        );
      }
    } catch (error) {
      setLoggingIn(false);
      return toast.error(error?.message || "Sign in failed");
    }
  };

  return (
    <form onSubmit={login} className="flex flex-col gap-3 w-full fade p-2">
      {/* Form Title */}
      <span
        className="text-2xl font-medium block text-center px-3"
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

      {/* Login Button */}
      <button
        type="submit"
        className="w-full text-sm font-semibold flex flex-row gap-1 items-center justify-center text-center px-2 py-[8px] rounded-sm active:scale-[92%] mt-1 cursor-pointer text-white border-2 disabled:opacity-50 disabled:grayscale-[60%]"
        style={{
          backgroundColor: colors?.primary,
          borderColor: colors?.primary,
        }}
        disabled={loggingIn}
      >
        {loggingIn ? (
          <div className="flex flex-row justify-center items-center gap-2">
            <span className="loading loading-spinner loading-sm"></span>
            SIGNING IN
          </div>
        ) : (
          "SIGN IN"
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center justify-center w-full max-w-[300px] mx-auto gap-2 text-xs text-[#bababa]">
        <span className="w-full rounded-sm h-[1px] bg-[#bababa]"></span>
        <span>OR</span>
        <span className="w-full rounded-sm h-[1px] bg-[#bababa]"></span>
      </div>

      <GoogleLogin className={`sm:max-w-full py-2`} />

      <Link
        href="/welcome"
        className="block text-center text-sm text-slate-600 underline my-2"
      >
        I don&apos;t have an account
      </Link>
    </form>
  );
};
export default page;
