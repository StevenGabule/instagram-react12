import React from "react";
import {useProfilePictureStyles} from "../../styles";
import {Person} from "@material-ui/icons";

function ProfilePicture({
  size,
  image = "https://images.unsplash.com/photo-1589877929074-9dd46c7e8cca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  isOwner
 }) {
    const classes = useProfilePictureStyles({size, isOwner});
    return (
        <section className={classes.section}>
          {image ? (
              <div className={classes.wrapper}>
                <img src={image} alt="User profile" className={classes.image}/>
              </div>
          ) : (
              <div className={classes.wrapper}>
                <Person className={classes.person} />
              </div>
          )}
        </section>
    )
}

export default ProfilePicture;
