import React from 'react';
import history from '../../routes/history';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { useBeforeFirstRender } from '../../hooks/useBeforeFirstRender';
import { DefaultProps, DefaultRootState, DIFFICULTIES } from '../../types/proof';
import ResumeStyle from './style';

const Resume: React.FC<DefaultProps> = ({proofs}: DefaultProps) => {
    const classes = ResumeStyle();
    
    const selectedCategory = history.location.state != null ? history.location.state.category : null;
    const proof = proofs.find((proofItem) => proofItem.category.id == selectedCategory.id);

    useBeforeFirstRender(() => {
        if(selectedCategory == null || proofs.length < 1){
            history.push({
                pathname: '/',
            });
        }
    })

    const backToHome = () => {
        history.push({
            pathname: '/',
        })
    }

    const easyQuestions = proof?.questions.filter((question) => question.difficulty == DIFFICULTIES.EASY);
    const mediumQuestions = proof?.questions.filter((question) => question.difficulty == DIFFICULTIES.MEDIUM);
    const hardQuestions = proof?.questions.filter((question) => question.difficulty == DIFFICULTIES.HARD);

    const onlyCorrectQuestions = proof?.questions.filter((question) => question.correct);
    const onlyWrongQuestions = proof?.questions.filter((question) => !question.correct);

    return (
        <div>
            <Box className={[classes.header, classes.colorWhite].join(' ')}>
                <Container>
                    <Typography variant="h3">
                        Resume
                    </Typography>
                </Container>
            </Box>
            <Box p={2} textAlign={'center'}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Paper className={[classes.geralPaper, classes.colorWhite].join(' ')}>
                            <Box p={1}><Typography variant='h5'>Overall</Typography></Box>
                            <Box p={1}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Typography variant='h5'>{onlyCorrectQuestions?.length}</Typography>
                                            <Typography variant='h6'>Correct</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Typography variant='h5'>{onlyWrongQuestions?.length}</Typography>
                                            <Typography variant='h6'>Wrong</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className={[classes.detailPaper, classes.colorWhite].join(' ')}>
                            <Box p={1}>
                                <Box p={1}><Typography variant='h5'>Details</Typography></Box>
                                <Box textAlign={'left'}>
                                    <Grid container spacing={5}>
                                        <Grid item lg={4}>
                                            <Typography variant='h6'>Easy</Typography>
                                            <Box> 
                                                <span>Correct: {easyQuestions?.filter((easyQuestion) => easyQuestion.correct).length }</span>
                                            </Box>
                                            <Box> 
                                                <span>Wrong: {easyQuestions?.filter((easyQuestion) => !easyQuestion.correct).length }</span>
                                            </Box>
                                        </Grid>
                                        <Grid item lg={4}>
                                            <Typography variant='h6'>Medium</Typography>
                                            <Box> 
                                                <span>Correct: {mediumQuestions?.filter((mediumQuestion) => mediumQuestion.correct).length }</span>
                                            </Box>
                                            <Box> 
                                                <span>Wrong: {mediumQuestions?.filter((mediumQuestion) => !mediumQuestion.correct).length }</span>
                                            </Box>
                                        </Grid>
                                        <Grid item lg={4}>
                                            <Typography variant='h6'>Hard</Typography>
                                            <Box> 
                                                <span>Correct: {hardQuestions?.filter((hardQuestion) => hardQuestion.correct).length }</span>
                                            </Box>
                                            <Box> 
                                                <span>Wrong: {hardQuestions?.filter((hardQuestion) => !hardQuestion.correct).length }</span>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
                <Button variant="contained"  className={[classes.colorWhite, classes.buttonHome].join(' ')} color={'secondary'} onClick={() => backToHome()}>BACK TO HOME</Button>
            </Box>
        </div>
    )

}

export default withRouter(connect((state: DefaultRootState) => ({ proofs: state.proofs }))(Resume));