import React from "react";
import axios from "axios";
import Error from "next/error";
import Layout from "../components/Layout";
import CommentList from "../components/CommentList";

class Story extends React.Component {
    static async getInitialProps({ req, res, query }) {
        const storyID = query.id;
        let story;
        try {
            const response = await axios.get(`https://node-hnapi.herokuapp.com/item/${storyID}`);
            console.log(response);
            story = response.data;
        } catch (error) {
            console.log(error);
            story = null;
        }

        return { story };
    }
    render() {
        const { story } = this.props;
        if (!story) {
            return <Error statusCode={503}></Error>;
        }
        return (
            <Layout title={story.title}>
                <main>
                    <h1 className="story-title">
                        <a href={story.url}>{story.title}</a>
                    </h1>
                    <div className="story-details">
                        <strong>{story.points} Points</strong>
                        <strong> {story.comments_count} comments</strong>
                        <strong> {story.time_ago}</strong>
                    </div>
                    {story.comments.length > 0 ? (
                        <CommentList comments={story.comments} />
                    ) : (
                        <div>No comments for this post.</div>
                    )}
                </main>
                <style jsx>
                    {`
                        main {
                            padding: 1em;
                        }
                        .story-title {
                            font-size: 1.2rem;
                            margin: 0;
                            font-weight: 300;
                            padding-bottom: 0.5em;
                        }
                        .story-title a {
                            color: #333;
                            text-decoration: none;
                        }
                        .story-title a:hover {
                            text-decoration: underline;
                        }
                        .story-details {
                            font-size: 0.8rem;
                            padding-bottom: 1em;
                            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                            margin-bottom: 1em;
                        }
                        .story-details strong {
                            margin-right: 1em;
                        }
                        .story-details a {
                            color: #f60;
                        }
                    `}
                </style>
            </Layout>
        );
    }
}

export default Story;
