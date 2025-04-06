import {
  amber,
  blue,
  cyan,
  deepOrange,
  deepPurple,
  green,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  teal,
} from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./Components/footer";
import Kitchen from "./Components/kitchen";

// 🌈
const colors = [
  amber,
  blue,
  cyan,
  deepOrange,
  deepPurple,
  green,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  teal,
];

const theme = createTheme({
  palette: {
    primary: colors[Math.floor(Math.random() * colors.length)],
  },
});

export default function App() {
  if (window.self === window.top) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          maxHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ThemeProvider theme={theme}>
          <Kitchen />
        </ThemeProvider>
        <Footer />
      </div>
    );
  }
}
