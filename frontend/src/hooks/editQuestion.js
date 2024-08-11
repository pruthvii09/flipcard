import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
const editQuestion = async ({ id, data }) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BASE_URL}/questions/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

export const useEditQuestion = () => {
  return useMutation({
    mutationFn: editQuestion,
    onSuccess: (data) => {
      toast.success("Edited successfully");
    },
    onError: (error) => {
      toast.error("Error occoured while editing");
    },
  });
};
