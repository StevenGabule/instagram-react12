import React, {useState} from "react";
import {useFeedPageStyles} from "../styles";
import Layout from "../components/shared/Layout";
import {getDefaultPost} from "../data";
import FeedPost from "../components/feed/FeedPost";
import {Hidden} from "@material-ui/core";
import UserCard from "../components/shared/UserCard";
import FeedSideSuggestions from "../components/feed/FeedSideSuggestions";
import LoadingScreen from "../components/shared/LoadingScreen";
import {LoadingLargeIcon} from "../icons";

function FeedPage() {
    const classes = useFeedPageStyles();
    const [isEndOfFeed] = useState(false);
    let loading = false;
    if (loading) return <LoadingScreen/>;
    return (
        <Layout>
            <div className={classes.container}>
                <div>
                    {Array.from({length: 5}, () => getDefaultPost()).map((post, index) => (
                        <FeedPost key={post.id} post={post} index={index}/>
                    ))}
                </div>
                {/* SIDEBAR */}
                <Hidden smDown>
                    <div className={classes.sidebarContainer}>
                        <div className={classes.sidebarWrapper}>
                            <UserCard avatarSize={50}/>
                            <FeedSideSuggestions/>
                        </div>
                    </div>
                </Hidden>
                {!isEndOfFeed && <LoadingLargeIcon/>}
            </div>
        </Layout>
    );
}

export default FeedPage;
