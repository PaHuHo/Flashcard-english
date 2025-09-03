import { useState } from "react";

interface TopicCardProps {
  front: string;
  back: string;
}

function FlashCard({ front = "", back = "" }: TopicCardProps) {
  const [showBack, setShowBack] = useState(false);

  return (
    <>
      <div className="rounded-2xl shadow hover:shadow-xl transition cursor-pointer">
        <div className="p-4">
          <h3 className="font-semibold text-[20px] mb-[10px]">{front}</h3>
          <p
            className={`text-gray-500 mt-2 text-[20px] mb-[10px] ${
              showBack ? "" : "hidden"
            }`}
          >
            {back}
          </p>

          <button
            className="inline-flex items-center gap-2 rounded-xl bg-[#53DBF2] px-3 py-2 text-sm font-medium text-white shadow-sm transition  hover:bg-[#8CBFEF] focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            onClick={() => setShowBack(!showBack)}
          >
            Show answer
          </button>
        </div>
      </div>
    </>
  );
}

export default FlashCard;
