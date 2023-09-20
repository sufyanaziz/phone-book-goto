export const ArrowLeft = ({
  color = "#435334",
  height = "24px",
  width = "20px",
}: {
  color?: string;
  height?: string;
  width?: string;
}) => {
  return (
    <svg
      fill={color}
      height={height}
      width={width}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 476.213 476.213"
      xml:space="preserve"
    >
      <polygon
        points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5 
  57.427,253.107 476.213,253.107"
      />
    </svg>
  );
};

export const AddIcon = ({
  color = "#435334",
  height = "24px",
  width = "20px",
}: {
  color?: string;
  height?: string;
  width?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Edit / Add_Plus">
        <path
          id="Vector"
          d="M6 12H12M12 12H18M12 12V18M12 12V6"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
};

export const MinusSquareIcon = ({
  color = "#435334",
  height = "24px",
  width = "20px",
}: {
  color?: string;
  height?: string;
  width?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
        stroke={color}
        stroke-width="1.5"
      />
      <path
        d="M15 12H9"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
};

export const AddSquareIcon = ({
  color = "#435334",
  height = "24px",
  width = "23px",
}: {
  color?: string;
  height?: string;
  width?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 12H15"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 9L12 15"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z"
        stroke={color}
        stroke-width="2"
      />
    </svg>
  );
};
