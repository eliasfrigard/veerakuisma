import React from 'react';
import Script from 'next/script';
import { Montserrat } from 'next/font/google';
import { ParallaxProvider } from 'react-scroll-parallax'; // Import ParallaxProvider
import '../styles/globals.css';
import Player from '../components/Player';

// Define Montserrat font
const mont = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-mont',
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <ParallaxProvider>
      <Player />

      <div id="__next" className={`${mont.className} font-mont`}>
        <Script src="/static/script.js" />
        <Component {...pageProps} />
      </div>
    </ParallaxProvider>
  );
};

export default MyApp;
