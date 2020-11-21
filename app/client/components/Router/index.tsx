import React, { FunctionComponent } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from "../Home";
import Play from "../Play";
import Error from "../Error";
import About from "../About";
import FAQ from "../FAQ";
import Device from "../Device";

import GameStoreProvider from "../../state/GameStore";

const Router: FunctionComponent = () => {
    return (
        <GameStoreProvider>
            <Device />
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' >
                        <Home />
                    </Route>
                    {/* <Route exact path='/authorisation' >
                        <Authorisation />
                    </Route>
                    <Route exact path='/about' >
                        <About />
                    </Route>
                    <Route exact path='/faq' >
                        <FAQ />
                    </Route>*/}
                    <Route exact path='/play' component={Play} />
                    <Route>
                        <Error />
                    </Route>
                </Switch>
            </BrowserRouter>
        </GameStoreProvider>
    )
}

export default Router;