import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FlashSkeleton = () => (
  <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <div className="flex items-center justify-center h-full cursor-pointer">
      <div className="flip-card md:w-[600px] w-[300px] h-[360px] rounded-md">
        <div className="flip-card-inner w-full h-full bg-[#191919]">
          <div className="flip-card-front w-full h-full bg-cover border rounded-xl border-[#27272a] p-4 text-white flex flex-col justify-between bg-gradient-to-br from-gray-900 to-gray-800 relative">
            <div className="bg-[#191919] p-2 rounded absolute top-2">
              <Skeleton width={100} height={30} />
            </div>
            <div className="flex-grow flex items-center justify-center">
              <Skeleton width={200} height={40} />
            </div>
            <div className="text-xs text-gray-600 text-center">
              <Skeleton width={150} height={20} />
            </div>
          </div>
          <div className="flip-card-back w-full h-full bg-cover border border-[#27272a] rounded-xl text-black p-4">
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <Skeleton height={20} count={6} />
            </SkeletonTheme>
          </div>
        </div>
      </div>
    </div>
  </SkeletonTheme>
);

export default FlashSkeleton;
