import React, {Component} from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import Header from "../../../frontend/src/components/layouts/Header";

export class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Header/>
        );
    }
}

export default App;

ReactDOM.render(<App/>, document.querySelector("#app"));