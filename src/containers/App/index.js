import React, { Component } from "react";
import { Route, Switch, Redirect, BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import HomePage from '../HomePage/Loadable';
import NotFound from '../../components/404'
import Header from '../../components/Header'
// eslint-disable-next-line import/no-webpack-loader-syntax
import Theme from '../../components/Theme/Loadable'; // to get the components

const AppWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

class App extends Component {
    render() {
        return (
        <Router>
            <AppWrapper>
                <Header/>
                    <Switch>
                        <Redirect exact from="/notfound" to="/" />
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/theme" component={Theme} />
                        <Route exact path="/r/:subreddit" component={HomePage} />
                        <Route path="*" component={NotFound} />
                    </Switch>
            </AppWrapper>
        </Router>
        );
    }
}

export default App;
