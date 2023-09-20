import { ContactProvider } from "@common/store/useContactStore";
import { Theme, ThemeProvider } from "@emotion/react";
import "@styles/index.css";

const theme: Theme = {
  colors: {
    primaryColor: "#435334",
    secondaryColor: "#CEDEBD",
  },
  padding: {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ContactProvider>
        <p>Init</p>
      </ContactProvider>
    </ThemeProvider>
  );
}

export default App;
