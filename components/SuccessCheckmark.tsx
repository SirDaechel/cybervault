import { useState } from "react";

const SuccessCheckmark = () => {
  const [showIcon, setShowIcon] = useState(true);

  return (
    <div>
      <div className={`success-checkmark ${showIcon ? "" : "hide"}`}>
        <div className="check-icon">
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
        </div>
      </div>
      <p className="text-center text-lg">Transaction successful</p>
    </div>
  );
};

export default SuccessCheckmark;
