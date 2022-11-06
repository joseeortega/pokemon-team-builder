import { RANDOM_IMAGES } from "../defs/constants";

export const getRandomImage = () => {
  return RANDOM_IMAGES[getRandomNumber(0, RANDOM_IMAGES.length)];
};

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * max) + min;
};

export const generateGuid = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const encodeB64 = (text: string) => {
  return btoa(text);
};
export const decodeB64 = (text: string) => {
  return atob(text);
};
