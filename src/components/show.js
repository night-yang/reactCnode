import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
class show extends Component {
  state = {
    topics: []
  };
  getTabList = tab => {
    const uri = `https://cnodejs.org/api/v1/topics?tab=${tab}`;
    axios.get(uri).then(res => {
      this.setState({ topics: res.data.data });
    });
  };
  componentDidMount() {
    const { tab } = this.props;
    this.getTabList(tab);
  }
  componentWillReceiveProps(nextProps) {
    const { tab } = nextProps;
    this.getTabList(tab);
  }

  gettab = tab => {
    switch (tab) {
      case "ask":
        return "提问";
      case "share":
        return "分享";
      case "job":
        return "招聘";
      default:
        return null;
    }
  };
  render() {
    const { topics } = this.state;
    const goodstyle = { color: "#fff", backgroundColor: "#80bd01" };
    const normalstyle = { color: "#000", backgroundColor: "#ccc" };
    const topicsList =
      topics.length === 0
        ? "加载中"
        : topics.map(t => (
            <Wrapper key={t.id}>
              <Link to={`/user/${t.author.loginname}`}>
                <img
                  style={{ width: "40px" }}
                  src={t.author.avatar_url}
                  alt=""
                />
              </Link>
              <div className="number">
                <span title="回复数">{t.reply_count}</span>/
                <span title="浏览数">{t.visit_count}</span>
              </div>
              <span
                className="shuxing"
                style={t.top || t.good ? goodstyle : normalstyle}
              >
                {t.top ? "置顶" : t.good ? "精华" : this.gettab(t.tab)}
              </span>
              <h3>
                <Link
                  to={{
                    pathname: `/topic/${t.id}`,
                    state: topics.find(e => e.id === t.id)
                  }}
                >
                  {t.title}
                </Link>
              </h3>
            </Wrapper>
          ));
    return <div>{topicsList}</div>;
  }
}

export default show;
const Wrapper = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #c2c2c2;
  box-sizing: border-box;
  padding: 5px 5px;
  .number {
    width: 75px;
    text-align: center;
    word-break: break-all;
  }
  h3 {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 22px;
    color: #000;
  }
  > div {
    margin-left: 15px;
  }
  .shuxing {
    margin-left: 18px;
  }
`;
