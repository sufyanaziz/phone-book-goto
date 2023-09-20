import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primaryColor: string;
      secondaryColor: string;
    };
    padding: {
      1: "4px";
      2: "8px";
      3: "12px";
      4: "16px";
    };
  }
}
