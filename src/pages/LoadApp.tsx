import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes } from "react-router-dom";
import { COOKIE_NO_LOAD_SCREEN } from "../defs/constants";
import { AppCookies } from "../models/cookie.model";
import Home from "./Home";
import Intro from "./Intro";
import Teams from "./Teams";
import CreateTeam from "./CreateTeam";
import { PokemonContextProvider } from "../components/PokemonContext";

function LoadApp() {
  const [cookies, setCookie, removeCookie] = useCookies([
    COOKIE_NO_LOAD_SCREEN,
  ]);

  const [loading, setLoading] = useState(getInitialLoadingValue(cookies));

  function getInitialLoadingValue(cookies: AppCookies) {
    return cookies?.[COOKIE_NO_LOAD_SCREEN] ? 100 : 0;
  }

  const disableLoadingScreen = () => {
    setCookie(COOKIE_NO_LOAD_SCREEN, true, []);
  };

  const enableLoadingScreen = () => {
    removeCookie(COOKIE_NO_LOAD_SCREEN);
  };

  useEffect(() => {
    console.log("App -> cookies", cookies);
    setTimeout(() => {
      if (loading !== 100) {
        setLoading(loading + 20);
      }
    }, 700);
  }, [loading]);

  return (
    <main>
      {loading < 100 ? (
        <Intro loading={loading} disableLoadingScreen={disableLoadingScreen} />
      ) : (
        <PokemonContextProvider>
          <Routes>
            <Route
              path="/"
              element={<Teams enableLoadingScreen={enableLoadingScreen} />}
            />
            <Route
              path="/teams"
              element={<Teams enableLoadingScreen={enableLoadingScreen} />}
            />
            <Route path="/create-team" element={<CreateTeam />} />
          </Routes>
        </PokemonContextProvider>
      )}
    </main>
  );
}

export default LoadApp;
