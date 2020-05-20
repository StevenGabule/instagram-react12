import React, {useState} from "react";
import {useFeedPostStyles} from "../../styles";
import UserCard from "../shared/UserCard";
import {CommentIcon, LikeIcon, MoreIcon, RemoveIcon, SaveIcon, ShareIcon, UnlikeIcon} from "../../icons";
import {Link} from "react-router-dom";
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import {Typography, Button, Hidden, TextField, Divider} from "@material-ui/core";
import FollowSuggestions from "../shared/FollowSuggestions";
import OptionsDialog from "../shared/OptionsDialog";

function FeedPost({post, index}) {
    const classes = useFeedPostStyles();
    const [showCaption, setCaption] = useState(false);
    const [showOptionsDialog, setOptionsDialog] = useState(false);
    const {media, id, likes, user, caption, comments} = post;
    const showFollowSuggestions = index === 1;

    return (
        <>
            <article className={classes.article} style={{
                marginBottom: showFollowSuggestions && 30
            }}>
                {/* Feed Post Header */}
                <div className={classes.postHeader}>
                    <UserCard user={user}/>
                    <MoreIcon
                        onClick={() => setOptionsDialog(true)}
                        className={classes.moreIcon}/>
                </div>
                {/*Feed Post Image*/}
                <div>
                    <img src={media} alt="Post media" className={classes.image}/>
                </div>
                {/*Feed Post Buttons*/}
                <div className={classes.postButtonsWrapper}>
                    <div className={classes.postButtons}>
                        <LikeButton/>
                        <Link to={`/p/${id}`}>
                            <CommentIcon/>
                        </Link>
                        <ShareIcon/>
                        <SaveButton/>
                    </div>
                    <Typography
                        className={classes.likes}
                        variant={"subtitle2"}
                        component={"span"}
                    >
                        {likes === 1 ? "1 like" : `${likes} likes`}
                    </Typography>
                    <div className={showCaption ? classes.expanded : classes.collapsed}>
                        <Link to={`/${user.username}`}>
                            <Typography
                                variant={"subtitle2"}
                                component={"span"}
                                className={classes.username}
                            >
                                {user.username}
                            </Typography>
                        </Link>
                        {showCaption ? (
                            <Typography
                                component={"span"}
                                variant={"body2"}
                                dangerouslySetInnerHTML={{__html: caption}}
                            />
                        ) : (
                            <div className={classes.captionWrapper}>
                                <HTMLEllipsis
                                    unsafeHTML={caption}
                                    className={classes.caption}
                                    maxLine={'0'}
                                    ellipsis={'...'}
                                    basedOn={'letters'}
                                />
                                <Button
                                    className={classes.moreButton}
                                    onClick={() => setCaption(true)}
                                >
                                    more
                                </Button>
                            </div>
                        )}
                    </div>
                    <Link to={`/p/${id}`}>
                        <Typography className={classes.commentsLink} variant={'body2'} component={'div'}>
                            View all {comments.length} comments
                        </Typography>
                    </Link>
                    {comments.map(comment => (
                        <div key={comment.id}>
                            <Link to={`/${comment.user.username}`}>
                                <Typography
                                    className={classes.commentUsername}
                                    component={'span'}
                                    variant={'subtitle2'}>
                                    {comment.user.username}
                                </Typography>{" "}
                                <Typography variant={'body2'} component={'span'}>
                                    {comment.content}
                                </Typography>
                            </Link>
                        </div>
                    ))}
                    <Typography component={'span'} color={'textSecondary'} className={classes.datePosted}>
                        5 DAYS AGO
                    </Typography>
                </div>
                <Hidden xsDown>
                    <Divider/>
                    <Comment/>
                </Hidden>
            </article>
            {showFollowSuggestions && <FollowSuggestions/>}
            {showOptionsDialog && <OptionsDialog onClose={() => setOptionsDialog(false)} />}
        </>
    );
}

function LikeButton() {
    const classes = useFeedPostStyles();
    const [liked, setLiked] = useState(false);
    const Icon = liked ? UnlikeIcon : LikeIcon;
    const className = liked ? classes.liked : classes.like;
    const onClick = liked ? handleUnlike : handleLike;

    function handleLike() {
        console.log('like');
        setLiked(true);
    }

    function handleUnlike() {
        console.log('unlike');
        setLiked(false);
    }

    return <Icon className={className} onClick={onClick}/>
}

function SaveButton() {
    const classes = useFeedPostStyles();
    const [saved, setSaved] = useState(false);
    const Icon = saved ? RemoveIcon : SaveIcon;
    const onClick = saved ? handleRemove : handleSave;

    function handleSave() {
        console.log('save');
        setSaved(true);
    }

    function handleRemove() {
        console.log('unsaved');
        setSaved(false);
    }

    return <Icon className={classes.saveIcon} onClick={onClick}/>
}

function Comment() {
    const classes = useFeedPostStyles();
    const [content, setContent] = useState('');
    return (
        <div className={classes.commentContainer}>
            <TextField
                fullWidth
                value={content}
                placeholder={'Add a comment...'}
                multiline
                rowsMax={2}
                rows={1}
                onChange={event => setContent(event.target.value)}
                className={classes.textField}
                InputProps={{
                    classes: {
                        root: classes.root,
                        underline: classes.underline
                    }
                }}
            />
            <Button color={'primary'} disabled={!content.trim()} className={classes.commentButton}>
                Post
            </Button>
        </div>
    )
}


export default FeedPost;
