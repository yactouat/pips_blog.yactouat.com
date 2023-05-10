import AppData from "./lib/interfaces/business/app-data";

// we use this variable while apps configuration is not dynamic
const STATIC_APP_DATA: AppData = {
  description: process.env.APP_DESCRIPTION ?? "",
  landingImages: {
    hero: {
      alt: "Yacine Touati's picture",
      src: `https://cdn.jsdelivr.net/gh/yactouat/yactouat@master/yactouat.jpg`,
    },
  },
  legalInfo: {
    city: "Strasbourg",
    country: "France",
    email: "yacine.touati.pro@gmail.com",
    name: process.env.APP_TITLE ?? "",
    postalCode: "67000",
  },
  mainHeadingHighlightedExpression: "blog",
  mainHeadingText: "My personal blog and website",
  navLinks: [
    {
      href: "/#articles",
      label: "Articles",
    },
  ],
  mainHeadingSubText1:
    "👋 Welcome to my personal website, in which I talk about technical stuff mostly, and also whatever comes across my mind !",
  mainHeadingSubText2:
    "I'm Yacine, and I'm a generalist web developer who is driven by curiosity, positivity, and a can-do attitude. My objectives are to learn, to have fun, and to solve problems.",
  theme: process.env.APP_THEME ?? "",
  themeColor: process.env.APP_THEME_COLOR ?? "",
  title: process.env.APP_TITLE ?? "",
  url: process.env.APP_URL ?? "",
};

export default STATIC_APP_DATA;
