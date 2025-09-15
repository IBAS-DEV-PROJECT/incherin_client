import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/theme";

export default function App() {
    return (
        <ThemeProvider theme={theme}>

        </ThemeProvider>
    )
}