import { MouseEvent } from "react";

type TransactionTabs = {
  setTransactionType: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  currentTransactionType: string | null;
};

const TransactionTabs: React.FC<TransactionTabs> = ({
  setTransactionType,
  currentTransactionType,
}) => {
  return (
    <section className="flex items-center justify-between gap-3">
      <button
        type="button"
        className={`px-3 py-1 bg-blue-200 text-blue-600 rounded text-center hover:bg-blue-600 hover:text-white transition text-sm ${
          currentTransactionType === "swapped" && "bg-blue-500 text-white"
        }`}
        onClick={(e) => setTransactionType(e)}
      >
        Swapped
      </button>
      <button
        type="button"
        className={`px-3 py-1 bg-blue-200 text-blue-600 rounded text-center hover:bg-blue-600 hover:text-white transition text-sm ${
          currentTransactionType === "sent" && "bg-blue-500 text-white"
        }`}
        onClick={(e) => setTransactionType(e)}
      >
        Sent
      </button>
      <button
        type="button"
        className={`px-3 py-1 bg-blue-200 text-blue-600 rounded text-center hover:bg-blue-600 hover:text-white transition text-sm ${
          currentTransactionType === "received" && "bg-blue-500 text-white"
        }`}
        onClick={(e) => setTransactionType(e)}
      >
        Received
      </button>
    </section>
  );
};

export default TransactionTabs;
