import Header from "@common/components/Header";
import { ContactProvider } from "@common/store/useContactStore";
import { Theme, ThemeProvider } from "@emotion/react";
import Contacts from "@pages/Contacts";
import { Route, Routes } from "react-router-dom";
import FormContact from "@pages/FormContact";
import { MessageProvider } from "@common/store/useMessageStore";
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
      <MessageProvider>
        <ContactProvider>
          <div className="app-phone-book">
            <Header />
            <Routes>
              <Route path="/" element={<Contacts />} />
              <Route path="/form" element={<FormContact />} />
            </Routes>
          </div>
        </ContactProvider>
      </MessageProvider>
    </ThemeProvider>
  );
}

export default App;
