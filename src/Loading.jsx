import React from "react";

const Loading = () => {
  return (
    <svg width="0" height="0" className="hidden">
      <symbol
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        id="fade-circles"
      >
        <circle
          fill="#000000"
          stroke="#000000"
          stroke-width="15"
          r="15"
          cx="40"
          cy="100"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.4"
          ></animate>
        </circle>
        <circle
          fill="#000000"
          stroke="#000000"
          stroke-width="15"
          r="15"
          cx="100"
          cy="100"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.2"
          ></animate>
        </circle>
        <circle
          fill="#000000"
          stroke="#000000"
          stroke-width="15"
          r="15"
          cx="160"
          cy="100"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="0"
          ></animate>
        </circle>
      </symbol>
    </svg>
  );
};

export default Loading;
