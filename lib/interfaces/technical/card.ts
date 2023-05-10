import Image from "./image";

interface Card {
  image?: Image;
  title: string;
  subtext1: string;
  subtext2?: string;
}

export default Card;
