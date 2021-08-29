import React from "react";
import Error from "next/error";
import axios from "axios";
import StoryList from "../components/storylist";
import Layout from "../components/Layout";
import Link from "next/link";

class Index extends React.Component {
    static async getInitialProps({ req, res, query }) {
        let stories = [];
        let page;

        try {
            page = Number(query.page) || 1;
            const response = await axios.get(`https://node-hnapi.herokuapp.com/news?page=${page}`);
            stories = response.data;
        } catch (error) {
            console.log(error);
        }

        return { page, stories };
    }

    render() {
        const { page, stories } = this.props;
        if (stories.length === 0) {
            return <Error statusCode={503} />;
        }
        return (
            <Layout title="Hacker News" description="A Hacker news clone" backButton={true}>
                <StoryList stories={stories} />

                <footer>
                    <Link href={`/?page=${page + 1}`}>
                        <a> Next Page ({page + 1})</a>
                    </Link>
                </footer>
                <style jsx>
                    {`
                        footer {
                            padding: 1em;
                        }
                        footer a {
                            font-weight: bold;
                            color: black;
                            text-decoration: none;
                        }
                    `}
                </style>
            </Layout>
        );
    }
}

export default Index;
