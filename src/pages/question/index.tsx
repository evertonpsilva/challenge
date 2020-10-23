import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import history from '../../routes/history';
import { Box, Button, Divider, FormControlLabel, LinearProgress, RadioGroup, Typography } from '@material-ui/core';
import { DialogAnswer, Loading, RadioButton } from '../../components';
import { useBeforeFirstRender } from '../../hooks/useBeforeFirstRender';
import QuestionService from '../../service/question.service';
import Utils from '../../utils';
import QuestionStyle from './style';
import Actions from '../../store/actions';
import { DefaultProps } from '../../types/default-props';
import { Category } from '../../types/category';
import { QuestionProof } from '../../types/question-proof';
import { Proof } from '../../types/proof';
import { DIFFICULTIES } from '../../types/difficulties';
import { DefaultRootState } from '../../types/default-root-state';


const Question: React.FC<DefaultProps> = ({proofs, dispatch}: DefaultProps) => {
    const classes = QuestionStyle();

    const selectedCategory: Category = history.location.state != null ? history.location.state.category : null;

    const [value, setValue] = React.useState<string>('');
    const [open, setOpen] = React.useState(false);
    const [questions, setQuestions] = React.useState<QuestionProof[]>([]);
    const [currentQuestion, setCurrentQuestion] = React.useState<QuestionProof>({} as QuestionProof);
    const [answerOptions, setAnswerOptions] = React.useState<string[]>([]);
    const [sucessAnswer, setSucessAnswer] = React.useState(false);
    const [questionIndicator, setQuestionIndicator] = React.useState(1);
    const [loading, setLoading] = React.useState(true);

    const proof: Proof = proofs.find(proofItem => proofItem.category.id === selectedCategory.id) as Proof;

    const [hasQuestions, setHasQuestions] = React.useState(true);

    const handleChange = (event: any) => {
        setValue(event.target.value);
    };

    const backToHome = () => {
        history.push({
            pathname: '/',
        })
    }

    const handleClose = () => {
        if(proof.questions.length == 10){
            dispatch(Actions.endProof({category: {id: selectedCategory.id}}));
            history.push({
                pathname: '/resume',
                state: {
                    category: proof.category,
                }
            })
        }else{
            changeQuestion();
            setValue('');
        }
        
    };

    async function getApiData(){
        const questionsData = await QuestionService.getQuestions(selectedCategory, proof.currentDifficulty);

        if(questionsData.length >= 1){
            const currentQuestionResponse = questionsData[Math.floor(Math.random() * questionsData.length)];

            questionsData.splice(questionsData.indexOf(currentQuestionResponse, 0), 1);   
            setQuestions(questionsData);
            setCurrentQuestion(currentQuestionResponse);

            const options: string[] = [currentQuestionResponse!.correct_answer, ...currentQuestionResponse!.incorrect_answers];
            setAnswerOptions(Utils.getRandomItems(options));

            
            setQuestionIndicator(proof.questions.length + 1 >= 10 ? 10 : proof.questions.length + 1);
        }else{
            setHasQuestions(false);
        }
        setLoading(false);
        setOpen(false);
    }

    function changeQuestion(){

        const positions = proof.correctAnswers.length;

        if(positions >= 2){
            const penultimateQuestion: QuestionProof = proof.questions[positions-2];
            const lastQuestion: QuestionProof = proof.questions[positions-1];
            if(lastQuestion.difficulty == penultimateQuestion.difficulty){
                if(lastQuestion.correct && penultimateQuestion.correct){
                    if(proof.currentDifficulty == DIFFICULTIES.MEDIUM){
                        dispatch(Actions.changeDificulty({category: {id: selectedCategory.id}, currentDifficulty: DIFFICULTIES.HARD}));
                    }else if(proof.currentDifficulty == DIFFICULTIES.EASY){
                        dispatch(Actions.changeDificulty({category: {id: selectedCategory.id}, currentDifficulty: DIFFICULTIES.MEDIUM}));
                    }
                }else if(!lastQuestion.correct && !penultimateQuestion.correct){
                    if(proof.currentDifficulty == DIFFICULTIES.HARD){
                        dispatch(Actions.changeDificulty({category: {id: selectedCategory.id}, currentDifficulty: DIFFICULTIES.MEDIUM}));
                    }else if(proof.currentDifficulty == DIFFICULTIES.MEDIUM){
                        dispatch(Actions.changeDificulty({category: {id: selectedCategory.id}, currentDifficulty: DIFFICULTIES.EASY}));
                    }
                }
                setQuestions([]);
                getApiData();
                return;
            }
            
        }

        const newQuestion: QuestionProof = questions[Math.floor(Math.random() * questions.length)];
        setCurrentQuestion(newQuestion);

        questions.splice(questions.findIndex((questionItem) => questionItem.question = newQuestion.question), 1); 
        setQuestions(questions);

        const options: string[] = [newQuestion.correct_answer, ...newQuestion.incorrect_answers]
        setAnswerOptions(Utils.getRandomItems(options));

        setQuestionIndicator(proof.questions.length + 1 >= 10 ? 10 : proof.questions.length + 1);
        setOpen(false);
    }

    useEffect(() => {
        const finishedProof: boolean = proof != null && proof.finished;

        if(finishedProof){
            history.push({
                pathname: '/resume',
                state: {
                    category: proof.category,
                }
            })
        }else{
            if(selectedCategory == null || proofs.length < 1){
                window.location.href = "/";
            }
            getApiData();
        }
    }, [])

    function isCorrectAnswer(selectedAnswer: string): boolean{
        if(currentQuestion?.correct_answer === selectedAnswer){
            return true;
        }
        return false;
    }

    const answer = (answerOption: string) => {
        setSucessAnswer(isCorrectAnswer(answerOption));
        setOpen(true);
        dispatch(Actions.answerQuestion({
            category: {id: selectedCategory.id}, 
            question: {
                ...currentQuestion,
                dateTimeAnswer: new Date(),
                correct: isCorrectAnswer(answerOption), 
                difficulty: proof.currentDifficulty
            },
            currentDifficulty: proof.currentDifficulty
        }));
    }

    if(loading){
        return (<Loading></Loading>);
    }

    return(
        <div>
            <Box className={classes.main}>
                <LinearProgress variant="determinate" className={classes.progressBar} value={(questionIndicator) * 10} color="primary"/>
                <div className={classes.questionBox}>
                    {hasQuestions ? (
                        <div>
                            <span className={classes.questionHeader}>Question {questionIndicator}/10 - {proof.currentDifficulty}</span>
                            <Typography variant="h6" className={classes.questionContent}>{ Utils.decodeValue(currentQuestion.question) }  </Typography>
                            <Divider color={'secondary'}></Divider>
                            <RadioGroup className={classes.radioGroup} aria-label={currentQuestion!.question} name="question" value={value} onChange={(event) => handleChange(event)}>
                                { answerOptions.map((answerOption, index) => {
                                    return( 
                                        <FormControlLabel key={index} value={answerOption} control={<RadioButton />} label={Utils.decodeValue(answerOption)} className={[classes.questionAnswer, value === answerOption ? classes.selectedAswer : ''].join(' ')}/>
                                    );
                                }) }
                            </RadioGroup>
                            <Button variant="contained" color="secondary" onClick={() => answer(value) } className={!value ? classes.hideButton : classes.confirmButton}>Confirm</Button>
                        </div>
                    ) : (
                        <div>
                            <Typography variant="h3" className={classes.questionContent}>There are no questions for this category</Typography>
                            <Button variant="contained" onClick={() => backToHome()} color="secondary">BACK TO HOME</Button>
                        </div>
                    )}

                    
                </div>
                <DialogAnswer onClose={() => handleClose()} open={open} sucess={sucessAnswer} ></DialogAnswer>
            </Box>
        </div>
    );

}

export default withRouter(connect((state: DefaultRootState) => ({proofs: state.proofs }))(Question));