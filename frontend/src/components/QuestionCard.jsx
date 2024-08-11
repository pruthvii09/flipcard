import React from "react";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
const QuestionCard = ({ question }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/dashboard/edit-question/${question.id}`)}
      className=" px-4 py-5 cursor-pointer bg-[#181818] border border-[#27272a] md:w-[400px] w-full text-white rounded-xl relative group"
    >
      <div className="flex items-center gap-3">
        <h1 className="text-zinc-200 text-xl">{question?.text}</h1>
        <span className="text-xs  border-pink-500 border rounded-full px-2 py-0.5">
          {question.tag}
        </span>
      </div>
      <p
        className="text-sm text-justify"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          WebkitLineClamp: 4,
        }}
      >
        {question?.answer}
      </p>
      <div className="absolute top-3 right-3">
        <Edit
          onClick={() => navigate(`/dashboard/edit-question/${question.id}`)}
          strokeWidth={1.5}
          size={18}
          className="cursor-pointer group-hover:block hidden"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
