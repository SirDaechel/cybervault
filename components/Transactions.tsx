type TransactionsProps = {
  transactions: string[];
};

const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  return (
    <section className="w-full flex flex-col gap-4 mt-2">
      {transactions.length > 0 ? (
        transactions.map((transaction, index) => (
          <p
            key={index}
            className="w-full pb-4 border-b border-b-zinc-200 text-sm text-green-600"
          >
            {transaction}
          </p>
        ))
      ) : (
        <p className="text-sm text-center">No transactions yet.</p>
      )}
    </section>
  );
};

export default Transactions;
