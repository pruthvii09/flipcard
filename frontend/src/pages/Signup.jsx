import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignupMutation } from "../hooks/useSignup";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const signupMutation = useSignupMutation();
  const handleSignup = () => {
    if (!data.email || !data.password) {
      return toast.error("All fields required");
    }
    signupMutation.mutate(data);
  };
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="md:w-2/5 w-4/5 md:px-10 px-3 py-4 bg-[#191919] text-white rounded-xl border border-[#27272a]">
        <div className="text-center">
          <h2 className="text-2xl">Ready to Begin Your Journey with</h2>
          <h1 className="text-4xl font-bold text-[#e11d48]">takeUforward</h1>
        </div>
        <div className="mt-8 flex items-center flex-col gap-4">
          <input
            type="text"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="text-zinc-200 bg-transparent outline-none w-full py-2 rounded-md px-2 border border-[#27272a]"
            placeholder="john@gmail.com"
          />
          <input
            type="text"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="text-zinc-200 bg-transparent outline-none w-full py-2 rounded-md px-2 border border-[#27272a]"
            placeholder="Password..."
          />
        </div>
        <div className="mt-8 text-center">
          <button
            disabled={signupMutation.isPending}
            onClick={handleSignup}
            className="px-4 w-full py-2 bg-[#e11d48] border-2 border-[#be123c] text-zinc-200 rounded-xl"
          >
            {signupMutation.isPending ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              "Signup"
            )}
          </button>
          <p className="mt-2 text-sm">
            Dont have account?{" "}
            <Link
              to="/login"
              className="font-bold text-[#e11d48] cursor-pointer hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
