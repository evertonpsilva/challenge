import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import history from '../../routes/history';
import axios from 'axios';
import { Box, Button, Divider, FormControlLabel, LinearProgress, makeStyles, RadioGroup, Typography } from '@material-ui/core';
import { DialogAnswer, Loading, RadioButton } from '../../components';
import { useBeforeFirstRender } from '../../hooks/useBeforeFirstRender';
import { QuestionProof, AnswerData, DefaultProps, Proof, Category, DIFFICULTIES, DefaultRootState } from '../../types/proof';

const useStyles = makeStyles((theme) => ({
    main: {
        height: '100vh',
    },
    questionBox: {
        minHeight: '70%',
        width: '50%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: "translate(-50%, -50%)",
        borderRadius: 10,
        padding: '40px 80px',
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        textAlign: 'center', 
        fontWeight: 500,
        [theme.breakpoints.down("md")]: {
            padding: '40px 15px',
            width: '85%'
        }
    },
    progressBar: {
        height: 10
    },
    hideButton: {
        display:'none'
    },
    confirmButton: {
        color: 'white',
    },
    questionHeader: {
        marginBottom: 15,
        display: 'block'
    },
    questionContent: {
        lineHeight: 1.5,
        fontWeight: 600,
        marginBottom: 15,
        [theme.breakpoints.down("md")]: {
            fontSize: '1.05rem'
        }
    },
    radioGroup: {
        marginTop: 15,
    },
    questionAnswer:{
        wordBreak: 'break-word',
        textAlign: 'left',
        background: 'white',
        borderRadius: 10,
        marginBottom: 15,
        marginLeft: 0,
        marginRight: 0,
        color: theme.palette.primary.main,
        padding: 5,
        fontWeight: 700,
    },
    selectedAswer: {
        background: theme.palette.secondary.main,
        color: 'white'
    },
    iconAnswer: {
        fontSize: 64,
        textAlign: 'center',
        color: 'green'
    },
}));

function answerQuestion(answerData: AnswerData){
    return {
        type: 'ANSWER_QUESTION',
        answerData,
    }
}

function endProof(answerData: AnswerData){
    return {
        type: 'END_PROOF',
        answerData
    }
}

function changeDificulty(answerData: AnswerData){
    return {
        type: 'CHANGE_DIFFICULTY',
        answerData,
    }
}

const Question: React.FC<DefaultProps> = ({proofs, dispatch}: DefaultProps) => {
    const classes = useStyles();

    const selectedCategory: Category = history.location.state != null ? history.location.state.category : null;

    const [value, setValue] = React.useState<string>('');
    const [open, setOpen] = React.useState(false);
    const [questions, setQuestions] = React.useState<QuestionProof[]>([]);
    const [currentQuestion, setCurrentQuestion] = React.useState<QuestionProof>({});
    const [answerOptions, setAnswerOptions] = React.useState<string[]>([]);
    const [sucessAnswer, setSucessAnswer] = React.useState(false);
    const [questionIndicator, setQuestionIndicator] = React.useState(1);
    const [loading, setLoading] = React.useState(true);

    const proof: Proof = proofs.find(proofItem => proofItem.category.id === selectedCategory.id);

    const [hasQuestions, setHasQuestions] = React.useState(true);

    const handleChange = (event: any) => {
        setValue(event.target.value);
    };

    const handleLoading = (value: boolean) => {
        setLoading(value);
    }

    const backToHome = () => {
        history.push({
            pathname: '/',
        })
    }

    const handleClose = () => {
        if(proof.questions.length == 10){
            dispatch(endProof({category: {id: selectedCategory.id}}));
            history.push({
                pathname: '/resume',
                state: {
                    category: proof.category,
                }
            })
        }else{
            changeQuestion();
            setValue('');
            setOpen(false);
        }
        
    };

    function getApiData(){
        axios.get<any>('https://opentdb.com/api.php?amount=10&category=' + selectedCategory.id +'&difficulty=' + proof.currentDifficulty + '&type=multiple')
        .then((response) => {
            const questionsResponse = response.data.results;
            if(questionsResponse.length >= 1){
                const currentQuestionResponse = questionsResponse[Math.floor(Math.random() * questionsResponse.length)];

                questionsResponse.splice(questionsResponse.indexOf(currentQuestionResponse, 0), 1);   
                setQuestions(questionsResponse);
                setCurrentQuestion(currentQuestionResponse);
    
                const options: string[] = [currentQuestionResponse!.correct_answer, ...currentQuestionResponse!.incorrect_answers];
                setAnswerOptions(getRandomItems(options));

                
                setQuestionIndicator(proof.questions.length + 1 >= 10 ? 10 : proof.questions.length + 1);

            }else{
                setHasQuestions(false);
            }
            setLoading(false);
            
        });
        
    }

    useBeforeFirstRender(() => {
        const finishedProof: boolean = proof != null && proof.finished ;

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
    })
    
    function getRandomItems(options: string[]): string[]{

        var currentIndex = options.length, temporaryValue, randomIndex;

        while(currentIndex !== 0){
        
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = options[currentIndex];
            options[currentIndex] = options[randomIndex];
            options[randomIndex] = temporaryValue;

        }

        return options;

    }

    function isCorrectAnswer(selectedAnswer: string): boolean{
        if(currentQuestion?.correct_answer === selectedAnswer){
            return true;
        }
        return false;
    }

    function changeQuestion(){

        const positions = proof.correctAnswers.length;

        if(positions >= 2){
            const penultimateQuestion: QuestionProof = proof.questions[positions-2];
            const lastQuestion: QuestionProof = proof.questions[positions-1];

            if(lastQuestion.difficulty == penultimateQuestion.difficulty){
                if(lastQuestion.correct && penultimateQuestion.correct){
                    if(proof.currentDifficulty == DIFFICULTIES.MEDIUM){
                        dispatch(changeDificulty({category: {id: selectedCategory.id}, currentDifficulty: DIFFICULTIES.HARD}));
                    }else if(proof.currentDifficulty == DIFFICULTIES.EASY){
                        dispatch(changeDificulty({category: {id: selectedCategory.id}, currentDifficulty: DIFFICULTIES.MEDIUM}));
                    }
                }else if(!lastQuestion.correct && !penultimateQuestion.correct){
                    if(proof.currentDifficulty == DIFFICULTIES.HARD){
                        dispatch(changeDificulty({category: {id: selectedCategory.id}, currentDifficulty: DIFFICULTIES.MEDIUM}));
                    }else if(proof.currentDifficulty == DIFFICULTIES.MEDIUM){
                        dispatch(changeDificulty({category: {id: selectedCategory.id}, currentDifficulty: DIFFICULTIES.EASY}));
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
        setAnswerOptions(getRandomItems(options));

        setQuestionIndicator(proof.questions.length + 1 >= 10 ? 10 : proof.questions.length + 1);
    }

    const answer = (answerOption: string) => {
        setSucessAnswer(isCorrectAnswer(answerOption));
        setOpen(true);
        dispatch(answerQuestion({
            category: {id: selectedCategory.id}, 
            question: {...currentQuestion, correct: isCorrectAnswer(answerOption), difficulty: proof.currentDifficulty},
            currentDifficulty: proof.currentDifficulty
        }));
    }

    function decodeValue(valueToDecode: string){
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(valueToDecode, 'text/html').body.textContent;
        return decodedString != null ? decodedString : '';
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
                            <Typography variant="h6" className={classes.questionContent}>{ decodeValue(currentQuestion.question) }  </Typography>
                            <Divider color={'secondary'}></Divider>
                            <RadioGroup className={classes.radioGroup} aria-label={currentQuestion!.question} name="question" value={value} onChange={(event) => handleChange(event)}>
                                { answerOptions.map((answerOption, index) => {
                                    return( 
                                        <FormControlLabel key={index} value={answerOption} control={<RadioButton />} label={decodeValue(answerOption)} className={[classes.questionAnswer, value === answerOption ? classes.selectedAswer : ''].join(' ')}/>
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