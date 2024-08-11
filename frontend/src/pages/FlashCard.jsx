import React from "react";
import FlashcardDeck from "../components/FlashcardDeck";

const FlashCard = () => {
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center">
      <FlashcardDeck />
    </div>
  );
};

export default FlashCard;
