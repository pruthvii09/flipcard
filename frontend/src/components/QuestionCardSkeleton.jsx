import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const QuestionCardSkeleton = () => (
  <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <div className="bg-[#181818] border relative border-[#27272a] rounded-md px-4 py-5">
      <Skeleton height={20} width="80%" />
      <Skeleton height={15} width="60%" className="mt-2" />
      <Skeleton height={15} width="40%" className="mt-2" />
    </div>
  </SkeletonTheme>
);

export default QuestionCardSkeleton;
