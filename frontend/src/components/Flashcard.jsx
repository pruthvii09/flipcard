import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const Flashcard = ({
  question,
  questionId,
  answer,
  index,
  isFlipped,
  setIsFlipped,
  length,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };

  const handleShare = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const url = window.location.href;
    console.log("url => ", url);
    const copyText = url + "share/" + questionId;
    console.log("copyText => ", copyText);
    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        toast.success("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };

  return (
    <>
      <div className="flex items-center justify-center h-full cursor-pointer relative">
        <div
          className="flip-card md:w-[600px] w-[300px] h-[360px] rounded-md"
          onClick={handleFlip}
        >
          <motion.div
            className="flip-card-inner w-full h-full bg-[#191919] "
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            onAnimationComplete={() => setIsAnimating(false)}
          >
            <div className="flip-card-front w-full h-full bg-cover border rounded-xl border-[#27272a] p-4 text-white flex flex-col justify-between bg-gradient-to-br from-gray-900 to-gray-800 relative">
              <div className="bg-[#191919] p-2 rounded absolute top-2">
                <h1 className="text-3xl">
                  <span className="text-5xl text-[#e11d48] font-semibold">
                    #{index + 1}
                  </span>
                  /{length}
                </h1>
              </div>
              <div className="flex-grow flex items-center justify-center">
                <div className="text-2xl text-center font-bold">{question}</div>
              </div>
              <div className="text-xs text-gray-600 text-center">
                Click to reveal answer
              </div>
              <div
                onClick={handleShare}
                className="absolute z-50  top-5 right-5"
              >
                <Share2 size={20} className="text-zinc-200" />
              </div>
            </div>
            <div className="flip-card-back w-full h-full bg-cover border border-[#27272a] rounded-xl text-black p-4">
              {isFlipped ? (
                <>
                  <div className="text-zinc-200">{answer}</div>
                </>
              ) : (
                <div className="space-y-2 p-4"></div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Flashcard;
