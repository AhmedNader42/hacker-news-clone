import Link from "next/link";
import Head from "next/head";

const Layout = ({ children, title, description }) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Head>
        <div className="container">
            <nav>
                <Link href="/">
                    <a>
                        <span className="main-title">Hacker News</span>
                    </a>
                </Link>
            </nav>

            {children}
        </div>

        <style jsx>{`
            .container {
                background: #f6f6ef;
            }
            nav {
                background: #f60;
                padding: 1em;
            }
            nav > * {
                display: inline-block;
                color: black;
            }
            nav a {
                text-decoration: none;
            }
            nav .main-title {
                font-weight: bold;
                font-size: xx-large;
            }
        `}</style>

        <style global jsx>
            {`
            body {
                background: white:
                font-family: Verdana, Geneva, Sans-serif;
            }
            `}
        </style>
    </div>
);

export default Layout;
