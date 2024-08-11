import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getQuestions = async (tag) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/questions?tag=${tag}`
  );
  return response.data;
};

const useGetQuestion = (tag) => {
  return useQuery({
    queryKey: ["getQuestions", tag],
    queryFn: () => getQuestions(tag),
    enabled: !!tag, // Ensures the query only runs if username is truthy
  });
};

export default useGetQuestion;
