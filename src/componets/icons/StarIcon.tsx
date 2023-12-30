import { FC } from "react";

import { IconType } from "../../App.typig";

const StarIcon: FC<IconType> = (props) => {
  const { fill } = props;

  return (
    <svg
      width={"100%"}
      height={"100%"}
      viewBox="0 0 24.00 24.00"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="0.048"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M14.65 8.93274L12.4852 4.30901C12.2923 3.89699 11.7077 3.897 11.5148 4.30902L9.35002 8.93274L4.45559 9.68243C4.02435 9.74848 3.84827 10.2758 4.15292 10.5888L7.71225 14.2461L6.87774 19.3749C6.80571 19.8176 7.27445 20.1487 7.66601 19.9317L12 17.5299L16.334 19.9317C16.7256 20.1487 17.1943 19.8176 17.1223 19.3749L16.2878 14.2461L19.8471 10.5888C20.1517 10.2758 19.9756 9.74848 19.5444 9.68243L14.65 8.93274Z"
          stroke="#464455"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          fill={fill || ""}
        </path>
      </g>
    </svg>
  );
};

export { StarIcon };
