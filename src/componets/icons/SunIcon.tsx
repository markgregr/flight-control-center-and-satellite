import { FC } from "react";

import { IconType } from "../../App.typig";

export const SunIcon: FC<IconType> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fill } = props;

  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M12 2V3"
          stroke={fill || "#1C274C"}
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
        <path
          d="M12 21V22"
          stroke={fill || "#1C274C"}
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
        <path
          d="M22 12L21 12"
          stroke={fill || "#1C274C"}
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
        <path
          d="M3 12L2 12"
          stroke={fill || "#1C274C"}
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
        <path
          d="M19.0708 4.92969L18.678 5.32252"
          stroke={fill || "#1C274C"}
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
        <path
          d="M5.32178 18.6777L4.92894 19.0706"
          stroke={fill || "#1C274C"}
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
        <path
          d="M19.0708 19.0703L18.678 18.6775"
          stroke={fill || "#1C274C"}
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
        <path
          d="M5.32178 5.32227L4.92894 4.92943"
          stroke={fill || "#1C274C"}
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
        <path
          d="M6.34141 10C6.12031 10.6256 6 11.2987 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C11.2987 6 10.6256 6.12031 10 6.34141"
          stroke={fill || "#1C274C"}
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
      </g>
    </svg>
  );
};
