import { makeStyles } from "@material-ui/core";

const ResumeStyle = makeStyles((theme) => ({
    header: {
        background: theme.palette.primary.main,
        padding: '5px 0'
    },
    geralPaper: {
        textAlign: 'center',
        backgroundColor: theme.palette.secondary.main,
        height: '100%'
    },
    detailPaper: {
        textAlign: 'center',
        backgroundColor: theme.palette.primary.main,
        height: '100%'
    },
    buttonHome: {
        marginTop: 20
    },
    colorWhite: {
        color: 'white',
    }
}));

export default ResumeStyle;