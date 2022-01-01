import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body className="bg-slate-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
