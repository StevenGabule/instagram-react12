import React from "react";
import { useExploreSuggestionsStyles } from "../../styles";
import {Hidden} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FollowSuggestions from "../shared/FollowSuggestions";

function ExploreSuggestions() {
  const classes = useExploreSuggestionsStyles();

  return (
      <Hidden xsDown>
        <div className={classes.container}>
          <Typography color={'textSecondary'}
                      variant={'subtitle2'}
                      component={'h2'}
                      className={classes.typography}>
            Discover People
          </Typography>
          <FollowSuggestions hideHeader={true}/>
        </div>
      </Hidden>
  )
}

export default ExploreSuggestions;
