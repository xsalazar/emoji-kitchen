import Footer from "./Components/footer";
import Kitchen from "./Components/kitchen";

function App() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        maxHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Kitchen />
      <Footer />
    </div>
  );
}

export default App;
