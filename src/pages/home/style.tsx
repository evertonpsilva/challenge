import { makeStyles } from "@material-ui/core";

const HomeStyle = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
    },
    header: {
        background: theme.palette.primary.main,
        color: 'white',
        padding: '5px 0'
    },
    main: {
        marginTop: '65px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        display: 'flex',
        backgroundColor: theme.palette.primary.main
    },
    categoryTitle: {
        flex: 1,
        color: 'white',
        fontWeight: 700
    },
    icon: {
        borderRadius: '50%',
        backgroundColor: theme.palette.secondary.main,
        color: 'white'
    },
    finished: {
        backgroundColor: theme.palette.secondary.dark,
    }

}));

export default HomeStyle;