type InputboxProps = {
  inputRegister?: any;
  label: string;
  htmlFor: string;
  inputType: string;
  error?: any;
};

const Inputbox = ({
  inputRegister,
  label,
  htmlFor,
  inputType,
  error,
}: InputboxProps) => {
  return (
    <section className="w-full flex flex-col">
      <label className="text-base text-white font-light" htmlFor={htmlFor}>
        {label}
      </label>
      <input
        {...inputRegister}
        className="p-3 transition border-[1px] rounded bg-zinc-800 text-white border-white text-sm focus:border-[#2398F5] focus:transition focus:outline-none"
        type={inputType}
        id={htmlFor}
      />
      {error}
    </section>
  );
};

export default Inputbox;
