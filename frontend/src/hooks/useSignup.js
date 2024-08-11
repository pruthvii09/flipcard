import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import toast from "react-hot-toast";
const signupUser = async (credentials) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/users/signup`,
    credentials
  );
  return response.data;
};

export const useSignupMutation = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", JSON.stringify(data.token));
      dispatch(setUser(data));
      toast.success("Signup in Successfully!!");
    },
    onError: (error) => {
      toast.error(error?.response.data.message);
    },
  });
};
