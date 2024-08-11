import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getQuestionById = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/questions/${id}`
  );
  return response.data;
};

const useGetQuestionById = (id) => {
  return useQuery({
    queryKey: ["getQuestionById", id],
    queryFn: () => getQuestionById(id),
    enabled: !!id, // Ensures the query only runs if username is truthy
  });
};

export default useGetQuestionById;
