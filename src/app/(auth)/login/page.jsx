"use client";
import { useSettings } from "@/services/SettingsProvider";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

const page = () => {
  const { colors } = useSettings();
  const { status } = useSession();

  //   Effetcs
  useEffect(() => {
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

    let email = e.target?.email?.value;
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

      {/* Register Button */}
      <button
        type="submit"
        className="w-full text-sm font-semibold flex flex-row gap-1 items-center justify-center text-center px-2 py-[8px] rounded-sm active:scale-[97%] mt-1 cursor-pointer text-white border-2"
        style={{
          backgroundColor: colors?.primary,
          borderColor: colors?.primary,
        }}
      >
        Login
      </button>

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
