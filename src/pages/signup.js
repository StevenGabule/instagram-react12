import React from "react";
import {useSignUpPageStyles} from "../styles";
import SEO from "../components/shared/Seo";
import {Card, CardHeader, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {LoginWithFacebook} from "./login";

function SignUpPage() {
    const classes = useSignUpPageStyles();

    return (
        <>
            <SEO title={'Sign up'}/>
            <section className={classes.section}>
                <article>
                    <Card className={classes.card}>
                        <div className={classes.cardHeader}/>
                        <Typography component='' className={classes.cardHeaderSubHeader}>
                            Sign up to see photos and videos from your friends.
                        </Typography>
                        <LoginWithFacebook color={'primary'} iconColor={'white'} variant={'contained'}/>
                        <div className={classes.orContainer}>
                            <div className={classes.orLine}/>
                            <div>
                                <Typography variant={'body2'} color={'textSecondary'}>
                                    OR
                                </Typography>
                            </div>
                            <div className={classes.orLine}/>
                        </div>
                        <form>
                            <TextField
                                fullWidth
                                variant={'filled'}
                                type={'email'}
                                label={'Email'}
                                margin={'dense'}
                                className={classes.textField}
                            />
                            <TextField
                                fullWidth
                                variant={'filled'}
                                label={'Full name'}
                                margin={'dense'}
                                className={classes.textField}
                            />
                          <TextField
                              fullWidth
                              variant={'filled'}
                              label={'Username'}
                              margin={'dense'}
                              className={classes.textField}
                              autoComplete={'username'}
                          />
                          <TextField
                              fullWidth
                              variant={'filled'}
                              label={'Password'}
                              type={'password'}
                              margin={'dense'}
                              className={classes.textField}
                              autoComplete={'new-password'}
                          />
                            <Button
                                variant={'contained'}
                                fullWidth
                                color={'primary'}
                                className={classes.button}
                                type={'submit'}>
                                Sign Up
                            </Button>
                        </form>

                    </Card>
                    <Card className={classes.loginCard}>
                        <Typography align={'right'} variant={'body2'}>
                            Do have an account?
                        </Typography>
                        <Link to={'/accounts/login'}>
                            <Button color={'primary'} className={classes.signUpButton}>
                                Login
                            </Button>
                        </Link>
                    </Card>
                </article>
            </section>
        </>
    );
}

export default SignUpPage;
