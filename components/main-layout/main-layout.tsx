import Head from "next/head";
import { useContext } from "react";

import AppFeedbackContext from "@/app-state/app-feedback/app-feedback-context";
import Footer from "../footer";
import Header from "../header/header";
import Hero from "../hero";
import MainLayoutProps from "./MainLayoutProps";
import Modal from "../modal/modal";
import styles from "./main-layout.module.css";

export default function MainLayout({
  children,
  page,
  themeColor,
}: MainLayoutProps) {
  const { modal } = useContext(AppFeedbackContext);

  return (
    <>
      <Head>
        {/* TODO add og:image, and a twitter card meta here (maybe one different for each page) */}
        {/* example OpenGraph image
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle,
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
        */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="msapplication-TileColor" content={themeColor} />
        <meta name="theme-color" content={themeColor}></meta>
      </Head>
      <Header page={page} />
      <main className="max-w-4xl mx-auto min-h-screen">
        {page && page == "home" && <Hero />}
        {children}
      </main>
      <Footer />
      {modal && modal.isOpen && (
        <Modal>
          <div>
            <p>{modal.text}</p>
          </div>
        </Modal>
      )}
    </>
  );
}
