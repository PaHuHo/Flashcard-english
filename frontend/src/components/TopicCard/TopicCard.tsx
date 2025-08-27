import { useNavigate } from "react-router-dom";

interface TopicCardProps {
  id: string;
  name: string;
  description: string;
  username: string;
  totalCard: string;
}
function TopicCard({
  id="",
  name = "name1",
  description = "description",
  username = "user_name",
  totalCard = "",
}: TopicCardProps) {
  const navigate = useNavigate();
  
  const goToTopicPage=()=>{
    navigate(`/topic/${id}`)
  }
  return (
    <>
      <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md w-auto">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
            {name}
          </h3>
        </div>

        <p className="mb-3 line-clamp-2 text-sm text-gray-600">{description}</p>
        <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <i className="fa-regular fa-clone" />
              {totalCard} cards
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">by {username}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer" onClick={goToTopicPage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4m-8-2l8-8m0 0v5m0-5h-5"
              />
            </svg>
            Open
          </button>
        </div>
      </div>
    </>
  );
}

export default TopicCard;
