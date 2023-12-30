import {
  createGlobalStyle,
  ThemeProvider as StyledThemeProvider,
  DefaultTheme,
} from "styled-components";
import React, { ReactNode, createContext, useContext } from "react";
import { useSelector } from "./core";
import { isDarkThemeSelector } from "./core/slices/appSlice";

interface ThemeProviderProps {
  children: ReactNode;
}

const GlobalStyle = createGlobalStyle`
:root {
  --background_color: ${(props) => props.theme.backgroundColor};
  --primary_color: ${(props) => props.theme.primaryColor};
  --secondary_color: ${(props) => props.theme.secondaryColor};
  --accent_color: ${(props) => props.theme.accentColor};
  --error_color: ${(props) => props.theme.errorColor};
  --success_color: ${(props) => props.theme.successColor};
  --text_color: ${(props) => props.theme.textColor};
  --error_text_color: ${(props) => props.theme.errorTextColor};
  --success_text_color: ${(props) => props.theme.successTextColor};
}
`;

interface Theme {
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  errorColor: string;
  successColor: string;
  errorTextColor: string;
  successTextColor: string;
  textColor: string;
}

const lightTheme: Theme = {
  backgroundColor: "#fbfbfb",
  primaryColor: "#6ebaeb",
  secondaryColor: "#f49474",
  accentColor: "#ec4c1c",
  errorColor: "#f30f11",
  successColor: "#40ca6e",
  errorTextColor: "#fbfbfb",
  successTextColor: "#fbfbfb",
  textColor: "#070707",
};

const darkTheme: Theme = {
  backgroundColor: "#141414",
  primaryColor: "#575c67",
  secondaryColor: "#e85c2c",
  accentColor: "#fb341a",
  errorColor: "#f30f11",
  successColor: "#0ab844",
  errorTextColor: "white",
  successTextColor: "white",
  textColor: "white",
};

const ThemeContext = createContext<DefaultTheme | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): DefaultTheme => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const darkMode = useSelector(isDarkThemeSelector);

  const theme: DefaultTheme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={theme}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
