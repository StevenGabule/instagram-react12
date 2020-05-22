import React, {useState} from "react";
import {useProfilePageStyles} from "../styles";
import Layout from "../components/shared/Layout";
import {defaultCurrentUser} from "../data";
import {Card, CardContent, Dialog, Hidden, Zoom} from "@material-ui/core";
import ProfilePicture from "../components/shared/ProfilePicture";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {GearIcon} from "../icons";
import Divider from "@material-ui/core/Divider";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import ProfileTabs from "../components/profile/ProfileTabs";

function ProfilePage() {
    const classes = useProfilePageStyles();
    const [showOptionsMenu, setOptionsMenu] = useState(false);
    const isOwner = true;

    function handleOptionsMenuClick() {
        setOptionsMenu(true);
    }

    function handleCloseMenu() {
        setOptionsMenu(false);
    }

    return (
        <Layout title={`${defaultCurrentUser.name} (@${defaultCurrentUser.username})`}>
            <div className={classes.container}>
                <Hidden xsDown>
                    <Card className={classes.cardLarge}>
                        <ProfilePicture isOwner={isOwner}/>
                        <CardContent className={classes.cardContentLarge}>
                            <ProfileNameSection
                                handleOptionsMenuClick={handleOptionsMenuClick}
                                user={defaultCurrentUser}
                                isOwner={isOwner}/>
                            <PostCountSection user={defaultCurrentUser}/>
                            <NameBioSection user={defaultCurrentUser}/>
                        </CardContent>
                    </Card>
                </Hidden>
                <Hidden smUp>
                    <Card className={classes.cardSmall}>
                        <CardContent>
                            <section className={classes.sectionSmall}>
                                <ProfilePicture size={77} isOwner={isOwner}/>
                                <ProfileNameSection handleOptionsMenuClick={handleOptionsMenuClick}
                                                    user={defaultCurrentUser} isOwner={isOwner}/>
                            </section>
                            <NameBioSection user={defaultCurrentUser}/>
                        </CardContent>
                        <PostCountSection user={defaultCurrentUser}/>
                    </Card>
                </Hidden>
                {showOptionsMenu && <OptionsMenu handleCloseMenu={handleCloseMenu}/>}
                <ProfileTabs user={defaultCurrentUser} isOwner={isOwner} />
            </div>
        </Layout>);
}

function ProfileNameSection({user, isOwner, handleOptionsMenuClick}) {
    const classes = useProfilePageStyles();
    const [showUnFollowDialog, setUnFollowDialog] = useState(false);

    let followButton;
    const isFollowing = true;
    const isFollower = false;
    if (isFollowing) {
        followButton = (
            <Button onClick={() => setUnFollowDialog(true)} variant={'outlined'} className={classes.button}>
                Following
            </Button>
        );
    } else if (isFollower) {
        followButton = (
            <Button variant={'contained'} color={"primary"} className={classes.button}>
                Follow Back
            </Button>
        );
    } else {
        followButton = (
            <Button variant={'contained'} color={"primary"} className={classes.button}>
                Follow
            </Button>
        );
    }
    return (
        <>
            <Hidden xsDown>
                <section className={classes.usernameSection}>
                    <Typography className={classes.username} component={'span'}>
                        {user.username}
                    </Typography>
                    {isOwner ? (
                        <>
                            <Link to={"/accounts/edit"}>
                                <Button variant={"outlined"}>
                                    Edit Profile
                                </Button>
                            </Link>
                            <div onClick={handleOptionsMenuClick} className={classes.settingsWrapper}>
                                <GearIcon className={classes.settings}/>
                            </div>
                        </>
                    ) : (
                        <>
                            {followButton}
                        </>
                    )}
                </section>
            </Hidden>
            <Hidden smUp>
                <section>
                    <div className={classes.usernameDivSmall}>
                        <Typography className={classes.username} component={'span'}>
                            {user.username}
                        </Typography>
                        {isOwner && (
                            <div onClick={handleOptionsMenuClick} className={classes.settingsWrapper}>
                                <GearIcon className={classes.settings}/>
                            </div>
                        )}
                    </div>
                    {isOwner ? (
                        <Link to={"/accounts/edit"}>
                            <Button variant={"outlined"} style={{width: '100%'}}>
                                Edit Profile
                            </Button>
                        </Link>
                    ) : followButton}
                </section>
            </Hidden>
            {showUnFollowDialog && <UnFollowDialog user={user} onClose={() => setUnFollowDialog(false)}/>}
        </>
    )
}


function UnFollowDialog({onClose, user}) {
    const classes = useProfilePageStyles();
    return (
        <Dialog
            open
            classes={{
                scrollPaper: classes.unfollowDialogScrollPaper,
            }}
            onClose
            TransitionComponent={Zoom}>
            <div className={classes.wrapper}>
                <Avatar
                    src={user.profile_image}
                    alt={`${user.username}'s avatar`}
                    className={classes.avatar}
                />
            </div>
            <Typography
                className={classes.unfollowDialogText}
                align={"center"}
                variant={"body2"}>
                Unfollow @{user.username}
            </Typography>

            <Divider/>
            <Button className={classes.unfollowButton}>
                Unfollow
            </Button>
            <Divider/>
            <Button onClick={onClose} className={classes.cancelButton}>
                Cancel
            </Button>

        </Dialog>
    )
}

function PostCountSection({user}) {
    const classes = useProfilePageStyles();
    const options = ["posts", "followers", "following"];

    return (
        <>
            <Hidden smUp>
                <Divider />
            </Hidden>
            <section className={classes.followingSection}>
                {options.map(option => (
                    <div key={option} className={classes.followingText}>
                        <Typography className={classes.followingCount}>
                            {user[option].length}
                        </Typography>
                        <Hidden xsDown>
                            <Typography>
                                {option}
                            </Typography>
                        </Hidden>
                        <Hidden smUp>
                            <Typography color={"textSecondary"}>
                                {option}
                            </Typography>
                        </Hidden>
                    </div>
                ))}
            </section>
        </>
    )
}

function NameBioSection({user}) {
    const classes = useProfilePageStyles();
    return (
        <section className={classes.section}>
            <Typography className={classes.typography}>
                {user.name}
            </Typography>
            <Typography>{user.bio}</Typography>
            <a href={user.website}
               target="_blank"
               rel={"noopener noreferrer"}>
                <Typography color={"secondary"} className={classes.typography}>
                    {user.website}
                </Typography>
            </a>
        </section>
    )
}

function OptionsMenu({handleCloseMenu}) {
    const classes = useProfilePageStyles();
    const [showLogOutMessage, setLogOutMessage] = useState(false);

    function handleLogoutClick() {
        setLogOutMessage(true);
    }

    return (
        <Dialog open classes={{
            scrollPaper: classes.dialogScrollPaper,
            paper: classes.dialogScrollPaper
        }}
                TransitionComponent={Zoom}
        >
            {showLogOutMessage ? (
                <DialogTitle className={classes.dialogTitle}>
                    Logging Out
                    <Typography component={'div'} color={'textSecondary'}>
                        You need to log back in to continue using instagram.
                    </Typography>
                </DialogTitle>
            ) : (
                <>
                    <OptionsItem text={'Change password'}/>
                    <OptionsItem text={'Nametag'}/>
                    <OptionsItem text={'Authorized apps'}/>
                    <OptionsItem text={'Notifications'}/>
                    <OptionsItem text={'Privacy and Security'}/>
                    <OptionsItem text={'Logout'} onClick={handleLogoutClick}/>
                    <OptionsItem text={'Cancel'} onClick={handleCloseMenu}/>
                </>
            )}
        </Dialog>
    )
}

function OptionsItem({text, onClick}) {
    return (
        <>
            <Button style={{padding: '12px 8px'}} onClick={onClick}>
                {text}
            </Button>
            <Divider/>
        </>
    )
}

export default ProfilePage;
