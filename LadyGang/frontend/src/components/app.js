import React, { Component } from "react";
import { render } from "react-dom";

export default class App extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <h1> Testing React Code </h1>
        );
    }
}

//find the app div on the page
const appDiv = document.getElementById("app");
//render app component in app div
render(<App/>, appDiv)