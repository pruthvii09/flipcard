import React, { useState } from "react";
import Logo from "../assets/Logo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/userSlice";
import { Menu, X } from "lucide-react";
import RightSheet from "./RightSheet";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const [sheet, setSheet] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(logoutUser());
  };
  return (
    <div className="text-white fixed z-20 w-full px-3 py-4 bg-black flex items-center justify-between">
      <Link to="/">
        <Logo />
      </Link>
      <div className="mr-4 md:flex items-center gap-2 hidden">
        {user && (
          <Link
            to="/dashboard"
            className="px-6 py-2 bg-[#191919] border-2 border-zinc-800 text-zinc-200 rounded-xl"
          >
            Dashboard
          </Link>
        )}
        {user ? (
          <Link
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 border-2 border-red-600  text-zinc-200 rounded-xl"
          >
            Logout
          </Link>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-[#e11d48] border-2 border-[#be123c] text-zinc-200 rounded-xl"
          >
            Login
          </Link>
        )}
      </div>
      {user ? (
        <>
          {!sheet ? (
            <div className="md:hidden block">
              <Menu onClick={() => setSheet(true)} />
            </div>
          ) : (
            <div className="md:hidden block">
              <X onClick={() => setSheet(false)} />
            </div>
          )}
          {sheet && <RightSheet sheet={sheet} setSheet={setSheet} />}
        </>
      ) : (
        <Link
          to="/login"
          className="px-4 md:hidden block py-2 bg-[#e11d48] border-2 border-[#be123c] text-zinc-200 rounded-xl"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
