import { SerializedStyles, Theme, css } from "@emotion/react";

type TContainer = {
  className?: string;
  children: React.ReactNode;
  css?: Partial<SerializedStyles>;
};

const Container: React.FC<TContainer> = ({ children, ...rest }) => {
  const containerStyle = (theme: Theme) => {
    return css({
      padding: theme.padding[4],
      ...rest.css,
    });
  };
  return (
    <div className={rest.className} css={containerStyle}>
      {children}
    </div>
  );
};

export default Container;
