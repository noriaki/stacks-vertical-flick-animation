import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class extends Document {
  render() {
    return (
      <html lang="ja">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="/static/normalize.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
