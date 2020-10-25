import { makeStyles } from "@material-ui/core";

const QuestionStyle = makeStyles((theme) => ({
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
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: '1rem',
            marginBottom: 5,
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

export default QuestionStyle;