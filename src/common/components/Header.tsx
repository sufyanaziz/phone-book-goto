import { Theme, css } from "@emotion/react";
import Text from "./Text";
import { NavLink } from "react-router-dom";
import { TEXT_SIZE, TEXT_TYPE } from "@common/constants/text";

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
      ".text-link": {
        fontSize: "12px",
        display: "flex",
        color: theme.colors.primaryColor,
        textDecoration: "none",
        ":hover": {
          textDecoration: "underline",
        },
        "&.active": {
          fontFamily: TEXT_TYPE.bold,
          textDecoration: "underline",
        },
        "@media (min-width: 576px)": {
          fontSize: TEXT_SIZE.medium,
        },
      },
    });
  };
  return (
    <header css={headerStyle}>
      <Text text="Phone Book Project" type="bold" />
      <div css={{ display: "flex", gap: "8px" }}>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            `text-link ${isPending ? "pending" : isActive ? "active" : ""}`
          }
        >
          Contact List
        </NavLink>
        <NavLink
          to="/form"
          className={({ isActive, isPending }) =>
            `text-link ${isPending ? "pending" : isActive ? "active" : ""}`
          }
        >
          Form Contact
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
