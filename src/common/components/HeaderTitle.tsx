import React from "react";
import Text from "./Text";
import { SerializedStyles, css } from "@emotion/react";

type THeaderTitle = {
  title: string;
  className?: string;
  css?: Partial<SerializedStyles>;
};

const HeaderTitle: React.FC<THeaderTitle> = ({ title, ...rest }) => {
  const headerTitleStyle = () => {
    return css({
      marginBottom: "16px",
      display: "flex",
      ".icon-left": {
        marginRight: "8px",
      },
      ...rest.css,
    });
  };

  return (
    <div className={rest.className} css={headerTitleStyle}>
      <Text text={title} size="large" type="bold" margin="0 0 8px 0" />
    </div>
  );
};

HeaderTitle.defaultProps = {
  css: undefined,
};

export default HeaderTitle;
