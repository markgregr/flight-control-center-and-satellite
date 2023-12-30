import { FC } from "react";

import { IconType } from "../../App.typig";

export const SearchIcon: FC<IconType> = (props) => {
  const { fill } = props;

  return (
    <svg
      width={"100%"}
      height={"100%"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g clipPath="url(#clip0_15_152)">
          <rect width="24" height="24" fill="none"></rect>
          <circle
            cx="10.5"
            cy="10.5"
            r="6.5"
            stroke={fill || "black"}
            strokeLinejoin="round"
          ></circle>
          <path
            d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z"
            fill={fill || "black"}
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_15_152">
            <rect width="24" height="24" fill="white"></rect>
          </clipPath>
        </defs>
      </g>
    </svg>
  );
};
