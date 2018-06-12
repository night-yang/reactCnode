import React, { Component } from "react";
// import axios from "axios";
import Header from "./Header";
import { BrowserRouter as Router } from "react-router-dom";
import Section from "./Section";
class App extends Component {
  componentDidMount() {
    // const uri = "https://cnodejs.org/api/v1/accesstoken";
    // axios.post(uri, "021967c1-502a-4f0d-9261-e6b9cb754a5f").then(res => {
    //   console.log(res.data);
    // });
  }
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Section />
        </div>
      </Router>
    );
  }
}

export default App;
