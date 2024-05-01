type LoadingProps = {
  classname?: string;
};

const Loading: React.FC<LoadingProps> = ({ classname }) => {
  return (
    <section className="w-full flex items-center justify-center">
      <span className={classname ? classname : "loader"}></span>
    </section>
  );
};

export default Loading;
