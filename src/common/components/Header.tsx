import { Theme, css } from "@emotion/react";
import Text from "./Text";

const Header = () => {
  const headerStyle = (theme: Theme) => {
    return css({
      background: theme.colors.secondaryColor,
      paddingLeft: theme.padding[4],
      paddingRight: theme.padding[4],
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "64px",
      position: "sticky",
      top: 0,
      zIndex: 1,
    });
  };
  return (
    <header css={headerStyle}>
      <Text text="Phone Book Project" type="bold" />
      <div css={{ display: "flex" }}>
        <Text text="Contact List" margin="0 12px 0 0" />
        <Text text="Form Contact" />
      </div>
    </header>
  );
};

export default Header;
