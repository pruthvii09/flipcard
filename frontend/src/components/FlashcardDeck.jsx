import React, { useEffect, useState } from "react";
import Flashcard from "./Flashcard";
import { tags } from "../constants/data";
import useGetQuestion from "../hooks/getQuestion";
import FlashSkeleton from "./FlashSkeleton";

const FlashcardDeck = () => {
  const [tag, setTag] = useState("random");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { data, isLoading } = useGetQuestion(tag);
  useEffect(() => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [data]);

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % data.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + data.length) % data.length
    );
    setIsFlipped(false);
  };
  console.log("data => ", data);

  return (
    <div className="pt-10 flex flex-col items-center">
      <div className="flex items-center justify-end w-full mb-4">
        <select
          onChange={(e) => setTag(e.target.value)}
          className={`text-zinc-200 bg-transparent outline-none py-2 rounded-md px-2 border border-[#27272a] `}
          placeholder="Select a tag"
        >
          <option className="bg-[#181818] py-1" value="random">
            Random
          </option>
          {tags.map((tag, i) => (
            <option key={i} className="bg-[#181818] py-1" value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <FlashSkeleton />
      ) : data.length === 0 ? (
        <div className="flip-card md:w-[600px] w-[300px] h-[360px] rounded-md">
          <div className="flip-card-inner w-full h-full bg-[#191919] flex items-center justify-center ">
            No Question for the selected category
          </div>
        </div>
      ) : (
        <Flashcard
          index={currentCardIndex}
          questionId={
            data[currentCardIndex]?._id?.$oid || data[currentCardIndex]?.id
          }
          question={data[currentCardIndex]?.text}
          answer={data[currentCardIndex]?.answer}
          isFlipped={isFlipped}
          length={data.length}
          setIsFlipped={setIsFlipped}
        />
      )}

      <div className="mt-4 flex items-center justify-between w-full">
        <button
          disabled={isLoading}
          onClick={prevCard}
          className="px-6 py-2 bg-[#191919] border-2 border-zinc-800 text-zinc-200 rounded-xl"
        >
          Previous
        </button>
        <button
          disabled={isLoading}
          onClick={nextCard}
          className="px-6 py-2 bg-[#e11d48] border-2 border-[#be123c] text-zinc-200 rounded-xl"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardDeck;
