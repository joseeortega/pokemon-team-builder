import { CSSProperties, useState } from 'react';

const getRandomImage = () => {
  return RANDOM_IMAGES[getRandomNumber(0, RANDOM_IMAGES.length)]
}

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * max) + min;
}

const RANDOM_IMAGES = [
'https://images3.alphacoders.com/127/thumb-1920-127579.jpg',
'https://wallpapercave.com/wp/wp2763459.jpg',
'https://i.pinimg.com/originals/7b/79/65/7b79657c3574b2d64a5f0a4d9402b41d.jpg',
]

function LoadApp(props : {loading: number}) {

  const [randomImage] = useState(getRandomImage())

  const getRandomStyle = () => {
    return {
      ...entryStyle,
      backgroundImage: `url(${randomImage})`,
    }
  }

  const entryStyle: CSSProperties = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  } 

  return (
    <div id="LoadApp" style={getRandomStyle()}>
      <div>
      <h1>Pokemon Team Builder</h1>
      <h3>Developed by Jose Ortega Marquez</h3>
      <p>Loading.. {props.loading}%</p>
      </div>
    </div>
  )
}

export default LoadApp
