import { FC } from "react";
import { IconType } from "../../App.typig";

const CloseIcon: FC<IconType> = (props) => {
  const { fill } = props;
  return (
    <svg
      width={"100%"}
      height={"100%"}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.25 1.8075L10.1925 0.75L6 4.9425L1.8075 0.75L0.75 1.8075L4.9425 6L0.75 10.1925L1.8075 11.25L6 7.0575L10.1925 11.25L11.25 10.1925L7.0575 6L11.25 1.8075Z"
        fill={fill ? fill : "#ADB5C5"}
      />
    </svg>
  );
};

export { CloseIcon };
