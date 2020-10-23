import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import history from '../../routes/history';
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Category, DefaultProps, DefaultRootState, Proof } from '../../types/proof';
import HomeStyle from './style';
import { useBeforeFirstRender } from '../../hooks/useBeforeFirstRender';
import CategoriesService from '../../service/categories.service';
import { Loading } from '../../components';
import Actions from '../../store/actions';

const Home: React.FC<DefaultProps> = ({ proofs, dispatch }: DefaultProps) => {

    const classes = HomeStyle();
    
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [loading, setLoading] = React.useState(true);
    
    const selectCategoryAndGo = (category: Category) => {

        if(isFinished(category)){
            history.push({
                pathname: '/resume',
                state: {
                    category: category,
                }
            })
        }else{
            dispatch(Actions.selectCategory(category));
            history.push({
                pathname: '/question',
                state: {
                    category: category,
                }
            })
        }

    }

    function isFinished(category: Category): boolean{

        const finishedProof = proofs.find((proof: Proof) => proof.category.id === category.id);
        return finishedProof != null ? finishedProof.finished : false;

    }

    useEffect(() => {
        getApiData();
    }, [])

    async function getApiData(){
        const categoriesData = await CategoriesService.getCategories();
        setCategories(categoriesData);
        setLoading(false);
    }

    if(loading){
        return (<Loading></Loading>);
    }
    
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
                                    <Paper className={[classes.paper, isFinished(category) ? classes.finished : '' ].join(' ')}>
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