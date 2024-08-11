import { LayoutGrid, LogOut } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/userSlice";
const RightSheet = ({ sheet, setSheet }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(logoutUser());
  };
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: sheet ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-screen w-72 fixed bg-[#181818] z-40 right-0 top-[58px] px-4 pt-8 border-l border-zinc-800"
    >
      <div
        onClick={() => {
          setSheet(false);
          navigate("/dashboard");
        }}
        className="px-2 py-2 flex items-center gap-2"
      >
        <LayoutGrid size={18} />
        Dashboard
      </div>
      <div
        onClick={handleLogout}
        className="px-2 py-2 flex items-center gap-2 text-red-500"
      >
        <LogOut size={18} />
        Logout
      </div>
    </motion.div>
  );
};

export default RightSheet;
