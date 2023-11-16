import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../../theme';
import '@mantine/core/styles.css';

export const metadata = {
  title: 'Raven Stone',
  description: 'Raven Stone',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=yes"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}