import Image from "next/image";
import Link from "next/link";

const TransactionTypes = () => {
  return (
    <span className="w-full flex items-center gap-4 justify-between">
      <Link
        href="/receive"
        type="button"
        className="w-full flex gap-3 items-center justify-center py-3 px-4 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition"
      >
        <Image src="/receive.svg" width={17} height={17} alt="receive" />
        <p>Receive</p>
      </Link>
      <Link
        href="/send"
        type="button"
        className="w-full flex gap-3 items-center justify-center py-3 px-4 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition"
      >
        <Image src="/send.svg" width={17} height={17} alt="receive" />
        <p>Send</p>
      </Link>
      <Link
        href="/swap"
        className="w-full flex gap-3 items-center justify-center py-3 px-4 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition"
      >
        <Image src="/swap.svg" width={17} height={17} alt="receive" />
        <p>Swap</p>
      </Link>
    </span>
  );
};

export default TransactionTypes;
