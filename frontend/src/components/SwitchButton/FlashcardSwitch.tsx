import { useState } from "react";

interface FlashcardSwitchProps {
  onChange: (status: "approve" | "pending") => void;
}



function FlashcardSwitch({ onChange }: FlashcardSwitchProps) {
  const [status, setStatus] = useState<"approve" | "pending">("approve");

  const toggleStatus = () => {
    const newStatus = status === "approve" ? "pending" : "approve";
    setStatus(newStatus);
    onChange(newStatus);
  };

  return (
    <div className="flex items-center gap-3">
      <span className={status === "approve" ? "font-semibold text-green-600" : "text-gray-500"}>
        Approve
      </span>
      
      <button
        onClick={toggleStatus}
        className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
          status === "approve" ? "bg-green-500" : "bg-yellow-500"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
            status === "approve" ? "translate-x-7" : "translate-x-0"
          }`}
        />
      </button>

      <span className={status === "pending" ? "font-semibold text-yellow-600" : "text-gray-500"}>
        Pending
      </span>
    </div>
  );
}

export default FlashcardSwitch