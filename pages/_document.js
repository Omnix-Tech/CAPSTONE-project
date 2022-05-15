import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel='manifest' href='/manifest.json' />
                    <link rel='apple-touch-icon' href='/icon.png' />
                    <meta name='theme-color' content='#fff' />
                    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core"></script>
                    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter"></script>
                    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl"></script>
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument