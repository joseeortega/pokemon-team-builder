import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import LoadApp from "./pages/LoadApp";

function App() {
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (loading !== 100) {
        setLoading(loading + 20);
      }
    }, 500);
  }, [loading]);

  return (
    <main>{loading < 100 ? <LoadApp loading={loading} /> : <Home />}</main>
  );
}

export default App;
