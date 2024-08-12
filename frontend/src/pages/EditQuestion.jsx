import { Loader2, Trash2, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { tags } from "../constants/data";
import { Navigate, useParams } from "react-router-dom";
import useGetQuestionById from "../hooks/getQuestionById";
import { useEditQuestion } from "../hooks/editQuestion";
import ConformModal from "../components/ConformModal";
import { useDeleteQuestion } from "../hooks/deleteQuestion";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const EditQuestion = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredTags, setFilteredTags] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef(null);
  const { data: questionData } = useGetQuestionById(id);

  const [data, setData] = useState({
    question: questionData?.text || "",
    answer: questionData?.answer || "",
    tag: questionData?.tag || "",
  });
  useEffect(() => {
    if (questionData) {
      setData({
        question: questionData.text || "",
        answer: questionData.answer || "",
        tag: questionData.tag || "",
      });
    }
  }, [questionData]);

  useEffect(() => {
    if (inputValue) {
      const filtered = tags.filter((tag) =>
        tag.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredTags(filtered);
      setIsDropdownOpen(true);
    } else {
      setFilteredTags([]);
      setIsDropdownOpen(false);
    }
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTagSelect = (tag) => {
    setData({ ...data, tag: tag });
    setInputValue("");
    setIsDropdownOpen(false);
  };
  const editMutation = useEditQuestion();
  const deleteMutation = useDeleteQuestion();
  const handleConfirm = () => {
    deleteMutation.mutate(id);
  };
  const handleAddQuestion = () => {
    if (!data.question || !data.answer || !data.tag) {
      return toast.error("All fields required");
    }
    editMutation.mutate({ id, data });
  };
  const { user } = useSelector((store) => store.user);
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="pb-8 pt-24  flex items-center justify-center text-white">
      <div className="md:w-2/5 w-4/5 md:px-10 px-3 py-4 bg-[#191919] text-white rounded-xl border border-[#27272a]">
        <div>
          <h1 className="text-2xl ">Edit a Question</h1>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <div>
            <label className="text-sm mb-1">
              Question <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={data.question}
              onChange={(e) => setData({ ...data, question: e.target.value })}
              className="text-zinc-200 bg-transparent outline-none w-full py-2 rounded-md px-2 border border-[#27272a]"
              placeholder=""
            />
          </div>
          <div className="relative">
            <label className="text-sm mb-1">
              Tag <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              disabled={data.tag}
              className={`text-zinc-200 bg-transparent outline-none w-full py-2 rounded-md px-2 border border-[#27272a] ${
                data.tag && "cursor-not-allowed"
              }`}
              placeholder="Start typing... (ex: JavaScrpit)"
              ref={inputRef}
            />
            {isDropdownOpen && filteredTags.length > 0 && (
              <ul className="absolute border border-[#27272a] bg-[#0f0f0f] text-zinc-200 rounded-md mt-1 w-full max-h-60 overflow-y-auto z-10">
                {filteredTags.map((tag) => (
                  <li
                    key={tag}
                    onClick={() => handleTagSelect(tag)}
                    className="px-2 py-1 cursor-pointer hover:bg-[#1c1c1c]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            {data.tag && (
              <div className="mt-2 px-3 py-0.5 border border-zinc-700 w-fit rounded-full flex items-center gap-2">
                <div className="text-sm">{data.tag}</div>
                <X
                  size={14}
                  className="cursor-pointer"
                  onClick={() => setData({ ...data, tag: "" })}
                />
              </div>
            )}
          </div>
          <div>
            <label className="text-sm">
              Answer <span className="text-red-600">*</span>
            </label>
            <textarea
              className="text-zinc-200 bg-transparent outline-none w-full py-2 rounded-md px-2 border border-[#27272a] resize-none overflow-auto"
              placeholder="Answer here..."
              value={data.answer}
              onChange={(e) => setData({ ...data, answer: e.target.value })}
              rows={8}
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-8">
          <button
            onClick={() => setOpen(true)}
            className="flex-1 flex items-center justify-center gap-1 px-4 w-full py-2 border border-red-500 rounded-xl"
          >
            <Trash2 size={16} className="text-red-500" />
            Delete
          </button>
          <button
            disabled={editMutation.isPending}
            onClick={handleAddQuestion}
            className="px-4 w-full py-2 bg-[#e11d48] border-2 border-[#be123c] text-zinc-200 rounded-xl flex-1"
          >
            {editMutation.isPending ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              "Edit"
            )}
          </button>
        </div>
      </div>
      {open && <ConformModal setOpen={setOpen} handleConfirm={handleConfirm} />}
    </div>
  );
};

export default EditQuestion;
