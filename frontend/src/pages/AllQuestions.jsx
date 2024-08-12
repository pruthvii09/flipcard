import React, { useState } from "react";
import QuestionCard from "../components/QuestionCard";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useGetAllQuestions from "../hooks/getAllQuestions";
import QuestionCardSkeleton from "../components/QuestionCardSkeleton";
import { Plus, Search } from "lucide-react";
import { useSelector } from "react-redux";

const AllQuestions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllQuestions();
  const filteredQuestions = data?.filter((question) =>
    question.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const { user } = useSelector((store) => store.user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="pt-24 min-h-screen md:px-8 px-2 pb-10">
      <div className="flex flex-col md:flex-row w-full gap-3 items-center justify-between">
        <div className="w-full md:w-auto mb-4 relative">
          <Search size={18} className="absolute text-zinc-200 top-3 left-2" />
          <input
            type="text"
            className="text-zinc-200 pl-8 bg-transparent outline-none w-full md:w-64 py-2 rounded-md px-2 border border-[#27272a]"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div
          onClick={() => navigate("/dashboard/add-question")}
          className="fixed bottom-8 right-8 bg-red-500 z-10 h-14 w-14 rounded-full flex items-center justify-center md:hidden "
        >
          <Plus size={40} strokeWidth={1.5} className="text-white" />
        </div>
        <Link
          to="/dashboard/add-question"
          className="w-full md:w-auto hidden md:block mb-6 px-4 py-2 bg-[#e11d48] border-2 border-[#be123c] rounded-xl text-white cursor-pointer hover:bg-[#be123c] transition-colors whitespace-nowrap"
        >
          Add Question
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 9 }).map((_, index) => (
            <QuestionCardSkeleton key={index} />
          ))
        ) : filteredQuestions?.length > 0 ? (
          filteredQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        ) : (
          <p className="text-white text-center col-span-full">
            No questions found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllQuestions;
