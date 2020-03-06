import React, { Component } from "react";
import DisplayThumbnail from "./pages/DisplayThumbnail";
import {BrowserRouter as Router} from "react-router-dom";
import DynamicData from "./pages/DynamicData";
import {Route} from "react-router-dom";
class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div id="container">
                        <header>
                            Code Development Project
                        </header>
                        <div id="main" role="main">
                            <Route path="/:thumbnail" component={DynamicData}/>
                            <Route path="/" component={DisplayThumbnail}/>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;