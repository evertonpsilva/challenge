import { createBrowserHistory } from 'history';
import React, { Suspense } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import * as Pages from '../pages'
import history from './history';

const Routes = () => {

    return(
        <Suspense fallback={<div>Loading...</div>}>
            <Router history={history}>
                <Switch>
                    <Route path="/question" exact component={Pages.Question} />
                    <Route path="/resume" exact component={Pages.Resume} />
                    <Route path="/" strict={false} exact component={Pages.Home} />
                </Switch>
            </Router>
        </Suspense>
    );

}

export default Routes;