import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const deleteQuestion = async (id) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_BASE_URL}/questions/${id}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

export const useDeleteQuestion = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: deleteQuestion,
    onSuccess: (data) => {
      navigate("/dashboard");
      toast.success("Deleted successfullt!");
    },
    onError: (error) => {
      toast.error("Could not delete");
    },
  });
};
