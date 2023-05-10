import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="en"
      className="sm:scroll-smooth"
      prefix="og: https://ogp.me/ns#"
    >
      <Head />
      <body
        className={`min-h-screen bg-template-lbg dark:bg-template-dbg dark:text-template-dneutral`}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
