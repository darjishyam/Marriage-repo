import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/**
 * This file is web-only and used to configure the root HTML for every
 * web page during static rendering.
 * The contents of this function only run in Node.js environments and
 * do not have access to the DOM or browser APIs.
 */
export default function Root({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                {/* 
          This disables the pinch zoom on mobile devices which is generally
          the expected behavior for native-like apps. 
        */}
                <ScrollViewStyleReset />

                {/* Using raw CSS styles as an escape-hatch to ensure the background color never flickers in dark-mode. */}
                <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />

                {/* Google Identity Services Script */}
                <script src="https://accounts.google.com/gsi/client" async defer></script>
            </head>
            <body>{children}</body>
        </html>
    );
}

const responsiveBackground = `
body {
  background-color: #fff;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
  }
}`;
