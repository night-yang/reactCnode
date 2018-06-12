import React, { Component } from "react";
import styled from "styled-components";
import Show from "./show";
class Main extends Component {
  state = {
    tab: "all",
    show: 0
  };
  tabChange = (tab, index) => {
    this.setState({
      tab: tab,
      show: index
    });
  };
  render() {
    const tabs = [
      { tab: "all", tabtext: "全部" },
      { tab: "good", tabtext: "精华" },
      { tab: "ask", tabtext: "提问" },
      { tab: "share", tabtext: "分享" },
      { tab: "job", tabtext: "招聘" }
    ];
    const activeStyle = { color: "#fff", backgroundColor: "#80bd01" };
    const tabsList = tabs.map((t, index) => (
      <li key={index}>
        <span
          className="top"
          style={this.state.show === index ? activeStyle : {}}
          onClick={() => this.tabChange(t.tab, index)}
        >
          {t.tabtext}
        </span>
      </li>
    ));
    return (
      <Wrapper>
        <div className="main-con">
          <nav>
            <ul>{tabsList}</ul>
          </nav>
          <Show tab={this.state.tab} />
        </div>
      </Wrapper>
    );
  }
}

export default Main;
const Wrapper = styled.div`
  padding-top: 25px;
  background-color: #e1e1e1;
  .main-con {
    width: 1180px;
    margin: 0 auto;
  }
  .main-con nav {
    border-radius: 8px;
    background-color: #f6f6f6;
  }
  .main-con nav ul {
    width: 350px;
    display: flex;
    justify-content: space-around;
    font-size: 16px;
    line-height: 35px;
  }
  .top {
    padding: 3px 4px;
    cursor: pointer;
  }
`;
