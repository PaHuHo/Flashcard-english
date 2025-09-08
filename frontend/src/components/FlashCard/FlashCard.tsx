import { useState } from "react";
import FlashcardActions from "../FlashcardActions/FlashcardActions";
import URL_API from "../../stores/api";
import { toast } from "react-toastify";

interface TopicCardProps {
  id: string;
  front: string;
  back: string;
  user: string;
  status: "approve" | "pending";
  onLoadData?:()=>void
}

function FlashCard({
  id = "",
  front = "",
  back = "",
  user = "",
  status,
  onLoadData
}: TopicCardProps) {
  const [showBack, setShowBack] = useState(false);

  const approveFlashcard = async () => {
    const res = await URL_API.post("/flashcard/update", {
      id: id,
      status: "approve",
    });
    if (res.status === 200) {
      toast.success(res.data.message);
    }
    onLoadData?.()
  };

  const deleteFlashcard = async () => {
    const res = await URL_API.post("/flashcard/delete", { id: id });
    if (res.status === 204) {
      toast.success("Flashcard deleted successfully");
    } 
    onLoadData?.()
  };
  return (
    <>
      <div className="rounded-2xl shadow hover:shadow-xl transition cursor-pointer">
        <div className="p-4">
          <div className="flex justify-between">
            <h3 className="font-semibold text-[20px] mb-[10px]">{front}</h3>
            <span>By {user}</span>
          </div>
          <p
            className={`text-gray-500 mt-2 text-[20px] mb-[10px] ${
              showBack ? "" : "hidden"
            }`}
          >
            {back}
          </p>
          <div className="flex justify-between items-center">
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-[#53DBF2] px-3 py-2 text-sm font-medium text-white shadow-sm transition  hover:bg-[#8CBFEF] focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              onClick={() => setShowBack(!showBack)}
            >
              Show answer
            </button>
            {/* <button className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-3 py-2 transition hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path
                    stroke-dasharray="24"
                    stroke-dashoffset="24"
                    d="M12 20h5c0.5 0 1 -0.5 1 -1v-14M12 20h-5c-0.5 0 -1 -0.5 -1 -1v-14"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="0.4s"
                      values="24;0"
                    />
                  </path>
                  <path
                    stroke-dasharray="20"
                    stroke-dashoffset="20"
                    d="M4 5h16"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="0.4s"
                      dur="0.2s"
                      values="20;0"
                    />
                  </path>
                  <path
                    stroke-dasharray="8"
                    stroke-dashoffset="8"
                    d="M10 4h4M10 9v7M14 9v7"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="0.6s"
                      dur="0.2s"
                      values="8;0"
                    />
                  </path>
                </g>
              </svg>
              
            </button> */}
            <FlashcardActions
              status={status}
              onApprove={() => {
                if (status == "pending") {
                  approveFlashcard();
                }
              }}
              onDelete={deleteFlashcard}
            ></FlashcardActions>
          </div>
        </div>
      </div>
    </>
  );
}

export default FlashCard;
