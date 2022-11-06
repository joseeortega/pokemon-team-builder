import { CSSProperties, useState } from "react";
import { Button } from "primereact/button";
import { getRandomImage } from "../helpers/Helper";

function Intro(props: { loading: number; disableLoadingScreen: () => void }) {
  const [randomImage] = useState(getRandomImage());

  const getRandomStyle = () => {
    return {
      ...entryStyle,
      backgroundImage: `url(${randomImage})`,
    };
  };

  const entryStyle: CSSProperties = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return (
    <div id="LoadApp" style={getRandomStyle()}>
      <div>
        <h1>Pokemon Team Builder</h1>
        <h3>Developed by Jose Ortega Marquez</h3>
        <p>Loading.. {props.loading}%</p>
        <Button onClick={props.disableLoadingScreen}>
          Button loading screen
        </Button>
      </div>
    </div>
  );
}

export default Intro;
