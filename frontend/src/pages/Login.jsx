import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useLoginMutation } from "../hooks/useLogin";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Login = () => {
  const { user } = useSelector((store) => store.user);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const loginMutation = useLoginMutation();
  const handleLogin = () => {
    if (!data.email || !data.password) {
      return toast.error("All fields required");
    }
    loginMutation.mutate(data);
  };
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="md:w-2/5 w-4/5 md:px-10 px-3 py-4 bg-[#191919] text-white rounded-xl border border-[#27272a]">
        <div className="text-center">
          <h2 className="text-2xl">Welcome Back</h2>
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
            disabled={loginMutation.isPending}
            onClick={handleLogin}
            className="px-4 w-full py-2 bg-[#e11d48] border-2 border-[#be123c] text-zinc-200 rounded-xl"
          >
            {loginMutation.isPending ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              " Login"
            )}
          </button>
          <p className="mt-2 text-sm">
            Dont have account?
            <Link
              to="/signup"
              className="font-bold text-[#e11d48] cursor-pointer hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
