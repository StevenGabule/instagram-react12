import React, {useState} from "react";
import {useEditProfilePageStyles} from "../styles";
import Layout from "../components/shared/Layout";
import {Menu} from "@material-ui/icons";
import {List, Drawer, Hidden, ListItem, ListItemText, TextField} from "@material-ui/core";
import {defaultCurrentUser} from "../data";
import IconButton from "@material-ui/core/IconButton";
import ProfilePicture from "../components/shared/ProfilePicture";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

function EditProfilePage({history}) {
    const path = history.location.pathname;
    const classes = useEditProfilePageStyles();
    const [showDrawer, setDrawer] = useState(false);

    function handleToggleDrawer() {
        setDrawer(prev => !prev);
    }

    function handleSelected(index) {
        switch (index) {
            case 0:
                return path.includes('edit');
            default:
                break;
        }
    }

    function handleListClick(index) {
        switch (index) {
            case 0:
                history.push('/accounts/edit');
                break;
            default:
                break;
        }
    }

    const options = [
        "Edit Profile",
        "Change password",
        "Apps and Websites",
        "Email and SMS",
        "Push Notification",
        "Manage Contacts",
        "Privacy and Security",
        "Login Activity",
        "Emails from Instagram",
    ];

    const drawer = (
        <List>
            {options.map((option, index) => (
                <ListItem
                    key={option}
                    onClick={() => handleListClick(index)}
                    button
                    selected={handleSelected(index)}
                    classes={{
                        selected: classes.listItemSelected,
                        button: classes.listItemButton
                    }}>
                    <ListItemText primary={option}/>
                </ListItem>
            ))}
        </List>
    )

    return (
        <Layout title={"Edit Profile"}>
            <section className={classes.section}>
                <IconButton
                    className={classes.menuButton}
                    onClick={handleToggleDrawer}
                    edge={"start"}>
                    <Menu/>
                </IconButton>
                <nav>
                    <Hidden smUp implementation="css">
                        <Drawer variant="temporary"
                                classes={{
                                    paperAnchorLeft: classes.temporaryDrawer
                                }}
                                anchor="left"
                                open={showDrawer}
                                onClose={handleToggleDrawer}>
                            {drawer}
                        </Drawer>
                    </Hidden>

                    <Hidden xsDown
                            implementation="css"
                            className={classes.permanentDrawerRoot}>
                        <Drawer variant="permanent"
                                open
                                classes={{
                                    paper: classes.permanentDrawerPaper,
                                    root: classes.permanentDrawerRoot
                                }}>
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main>
                    {path.includes('edit') && <EditUserInfo user={defaultCurrentUser}/>}
                </main>
            </section>
        </Layout>
    )
}

function EditUserInfo({user}) {
    const classes = useEditProfilePageStyles();
    return (
        <section className={classes.container}>
            <div className={classes.pictureSectionItem}>
                <ProfilePicture size={38} user={user}/>
                <div className={classes.justifySelfStart}>
                    <Typography className={classes.typography}>
                        {user.username}
                    </Typography>
                    <Typography
                        color={"primary"}
                        variant={"body2"}
                        className={classes.typographyChangePic}>
                        Change Profile Photo
                    </Typography>
                </div>
            </div>
            <form className={classes.form}>
                <SectionItem text={"Name"} formItem={user.name}  />
                <SectionItem text={"Username"} formItem={user.username} />
                <SectionItem text={"Website"} formItem={user.website} />
                <div className={classes.sectionItem}>
                    <aside>
                        <Typography className={classes.bio}>BIO</Typography>
                    </aside>
                    <TextField variant={"outlined"}
                               multiline
                               rows={3}
                               fullWidth
                               value={user.bio}
                               rowsMax={3}  />
                </div>
                <div className={classes.sectionItem}>
                    <div />
                    <Typography
                        className={classes.justifySelfStart}
                        color={'textSecondary'}>
                        Personal Information
                    </Typography>
                </div>
                <SectionItem text={"Email"} formItem={user.email} type={"email"} />
                <SectionItem text={"Phone Number"} formItem={user.phone_number} />
                <div className={classes.sectionItem}>
                    <div />
                    <Button type={"submit"} variant={"contained"} color={"primary"}
                            className={classes.justifySelfStart}>
                        Submit
                    </Button>
                </div>
            </form>
        </section>
    )
}

function SectionItem({type = "text", text, formItem}) {
    const classes = useEditProfilePageStyles();
    return (
        <div className={classes.sectionItemWrapper}>
            <aside>
                <Hidden xsDown>
                    <Typography className={classes.typography} align={"right"}>
                        {text}
                    </Typography>
                </Hidden>
                <Hidden smUp>
                    <Typography className={classes.typography}>
                        {text}
                    </Typography>
                </Hidden>
            </aside>
            <TextField variant={"outlined"}
                       fullWidth
                       value={formItem}
                       type={type}
                       className={classes.textField}
                       inputProps={{
                           className: classes.textFieldInput
                       }}
            />
        </div>
    )
}

export default EditProfilePage;
