import React from "react";
import {render} from "react-dom";
import {MuiThemeProvider, CssBaseline} from "@material-ui/core";
import {BrowserRouter as Router} from "react-router-dom";
import theme from "./theme";
import App from "./App";

render(
    <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
            <App/>
        </Router>
    </MuiThemeProvider>,
    document.getElementById("root")
);
