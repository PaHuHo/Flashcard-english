interface FlashcardActionsProps {
  status: "approve" | "pending";
  onApprove?: () => void;
  onDelete?: () => void;
}

export default function FlashcardActions({
  status,
  onApprove,
  onDelete,
}: FlashcardActionsProps) {
  if (status === "pending") {
    return (
      <div className="flex">
        {/* Chấp nhận */}
        <button
          onClick={onApprove}
          className="flex items-center gap-1 rounded-l-lg bg-green-500 px-3 py-1 text-white shadow-md transition hover:bg-green-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"/></svg>
        </button>

        {/* Huỷ */}
        <button
          onClick={onDelete}
          className="flex items-center gap-1 rounded-r-lg bg-red-500 px-3 py-1 text-white shadow-md transition hover:bg-red-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m5 19l7-7m0 0l7-7m-7 7L5 5m7 7l7 7"/></svg>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onDelete}
      className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1 text-white shadow-md transition hover:bg-red -400"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z"/></svg>
    </button>
  );
}
