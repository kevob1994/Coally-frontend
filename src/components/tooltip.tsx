import React, { useState } from "react";

interface ITooltipProps {
  children: React.ReactNode;
  content: string;
}

export function ToolTip({ children, content }: ITooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className='relative inline-block'>
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>
      {visible && (
        <div
          role='tooltip'
          className='absolute z-10 inline-block px-2 py-1 text-sm font-medium text-white bg-gray-900 rounded-md shadow-md w-max'
          style={{
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginTop: "5px",
          }}
        >
          {content}
          <div
            className='absolute w-2 h-2 bg-gray-900 transform rotate-45'
            style={{ top: "-3px", left: `calc(50% - 4px)` }}
          />
        </div>
      )}
    </div>
  );
}
