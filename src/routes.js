import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import Box from "./pages/Box";


export default function Routes(){
    
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/boxes/:id" component={Box} />

            </Switch>

        </BrowserRouter>
    );
}

