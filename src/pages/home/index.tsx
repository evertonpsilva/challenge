import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import history from '../../routes/history';
import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Category, DefaultProps, DefaultRootState } from '../../types/proof';

const useStyles = makeStyles((theme) => ({

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
    }

}));

function selectCategory(category: Category){

    return {
        type: 'SELECT_CATEGORY',
        category,
    };

}

const Home: React.FC<DefaultProps> = ({ proofs, dispatch }: DefaultProps) => {
    const classes = useStyles();

    const selectCategoryAndGo = (category: Category) => {

        dispatch(selectCategory(category));
        history.push({
            pathname: '/question',
            state: {
                category: category,
            }
        })

    }

    const [categories, setCategories] = React.useState([]);

    useEffect(() => {
        axios.get<any>('https://opentdb.com/api_category.php')
        .then((response) => {
            setCategories(response.data.trivia_categories);
        });
    }, []);
    
    return (
        <div>
            <Box className={classes.header}>
                <Container>
                    <Typography variant="h3">
                        Categories
                    </Typography>
                </Container>
            </Box>
            <Box p={5}>
                <Grid container spacing={4}>
                    {categories.map((category: Category, index: number) => {
                        return(
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <a onClick={() => selectCategoryAndGo(category) }>
                                    <Paper className={classes.paper}>
                                        <Typography className={classes.categoryTitle}>{category.name}</Typography>
                                        <ChevronRightIcon className={classes.icon} color="primary"></ChevronRightIcon>
                                    </Paper>
                                </a>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </div>
    );

};

export default withRouter(connect((state: DefaultRootState) => ({ proofs: state.proofs }))(Home));