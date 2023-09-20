import React from "react";
import Text from "./Text";
import { SerializedStyles, css } from "@emotion/react";
import { ArrowLeft } from "assets/icon";

type THeaderTitle = {
  title: string;
  className?: string;
  onBack?: () => void;
  css?: Partial<SerializedStyles>;
};

const HeaderTitle: React.FC<THeaderTitle> = ({ title, onBack, ...rest }) => {
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
      {typeof onBack === "function" ? (
        <div className="icon-left" onClick={onBack}>
          <ArrowLeft />
        </div>
      ) : null}
      <Text text={title} size="large" type="bold" margin="0 0 8px 0" />
    </div>
  );
};

HeaderTitle.defaultProps = {
  onBack: undefined,
  css: undefined,
};

export default HeaderTitle;
