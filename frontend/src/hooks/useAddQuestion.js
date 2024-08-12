import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
const addQuestion = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/questions`,
    data,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

export const useAddQuestion = () => {
  return useMutation({
    mutationFn: addQuestion,
    onSuccess: (data) => {
      toast.success("Question added successfully!");
    },
    onError: (error) => {},
  });
};
