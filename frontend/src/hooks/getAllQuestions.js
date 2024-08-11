import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAllQuestions = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/questions/all`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

const useGetAllQuestions = () => {
  return useQuery({
    queryKey: ["allQuestions"],
    queryFn: getAllQuestions,
  });
};

export default useGetAllQuestions;
