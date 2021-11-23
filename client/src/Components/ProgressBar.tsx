import React from "react";

type ProgressBarProps = {
  width: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ width }): JSX.Element => {
  return (
    <div className="overflow-hidden  h-2 text-xs flex rounded bg-green-200">
      <div
        style={{ width: `${width}%` }}
        className="
        shadow-none
        flex flex-col
        text-center
        whitespace-nowrap
        text-white
        justify-center
        bg-green-500
      "
      ></div>
    </div>
  );
};
export default ProgressBar;
