import React, { useState } from "react";
import Flashcard from "../components/Flashcard";
import { useParams } from "react-router-dom";
import useGetQuestionById from "../hooks/getQuestionById";

const ShareCard = () => {
  const { id } = useParams();
  const { data } = useGetQuestionById(id);
  console.log("data => ", data);
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div className="flex pt-28 items-center justify-center h-full">
      <Flashcard
        index={0}
        question={data?.text}
        answer={data?.answer}
        isFlipped={isFlipped}
        length={1}
        setIsFlipped={setIsFlipped}
      />
    </div>
  );
};

export default ShareCard;
