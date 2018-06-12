import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
class ShowTopic extends Component {
  state = {
    topic: null,
    is_collect: false,
    reply: ""
  };
  getTopic = () => {
    const { id } = this.props.match.params;
    const { accesstoken } = sessionStorage;
    const params = accesstoken ? `?accesstoken=${accesstoken}` : "";
    const uri = `https://cnodejs.org/api/v1/topic/${id}${params}`;
    axios.get(uri).then(res => {
      this.setState({
        topic: res.data.data,
        is_collect: accesstoken ? res.data.data.is_collect : false
      });
    });
  };
  componentDidMount() {
    this.getTopic();
  }
  collectChange = topic_id => {
    if (sessionStorage.accesstoken) {
      const { is_collect } = this.state;
      const uriLast = is_collect ? "de_collect" : "collect";
      const uri = `https://cnodejs.org/api/v1/topic_collect/${uriLast}`;
      axios
        .post(uri, {
          accesstoken: sessionStorage.accesstoken,
          topic_id
        })
        .then(res => {
          this.setState({ is_collect: !is_collect });
        });
    }
  };
  handleChange = e => {
    this.setState({ reply: e.target.value });
  };
  greatUp = id => {
    const uri = `https://cnodejs.org/api/v1/reply/${id}/ups`;
    axios.post(uri, { accesstoken: sessionStorage.accesstoken }).then(res => {
      this.getTopic();
    });
  };
  replyCommit = topic_id => {
    const uri = `https://cnodejs.org/api/v1/topic/${topic_id}/replies`;
    const replyCon = {
      accesstoken: sessionStorage.accesstoken,
      content: this.state.reply
    };
    axios.post(uri, replyCon).then(res => {
      this.getTopic();
    });
  };
  render() {
    const { topic, is_collect, reply } = this.state;
    const goodstyle = { color: "#fff", backgroundColor: "#80bd01" };
    const content = !topic ? (
      "请稍等"
    ) : (
      <div>
        <header>
          <h3>
            {topic.top ? (
              <span style={goodstyle}>置顶</span>
            ) : topic.good ? (
              <span style={goodstyle}>精华</span>
            ) : (
              ""
            )}
            {topic.title}
          </h3>
          <p>
            ·作者 {topic.author.loginname} ·访问人数 {topic.visit_count}
          </p>
          <button
            onClick={() => {
              this.collectChange(topic.id);
            }}
          >
            {is_collect ? "取消收藏" : "收藏"}
          </button>
        </header>
        <hr />
        <Content dangerouslySetInnerHTML={{ __html: topic.content }} />
      </div>
    );
    const replayList = !topic ? (
      "请稍等"
    ) : (
      <div>
        {topic.replies.length === 0
          ? "评论为空"
          : topic.replies.map(t => (
              <Reply key={t.id}>
                <div className="author-content">
                  <img className="tou" src={t.author.avatar_url} alt="" />{" "}
                  <span className="replyname">{t.author.loginname}</span>
                  <span className="great" onClick={() => this.greatUp(t.id)}>
                    赞{t.ups.length}
                  </span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: t.content }} />
              </Reply>
            ))}
      </div>
    );
    return (
      <Wrapper>
        {content}
        <hr />
        {replayList}
        <h4>添加回复</h4>
        <textarea value={reply} onChange={this.handleChange} />
        <button onClick={() => this.replyCommit(topic.id)}>回复</button>
      </Wrapper>
    );
  }
}

export default ShowTopic;
const Wrapper = styled.div`
  width: 1180px;
  margin: 0 auto;
  header {
    height: 80px;
    span {
      float: left;
      width:38px;
      height:32px
      display:block;
    }
    button {
      float: right;
      margin-top:-26px;
    }
    p {
      color: #bbb;
      font-size: 14px
      line-height:20px;
      margin-top:15px;
    }
    h3{
      line-height:35px
    }
  }
  .tou {
    width: 30px;
    height: 30px;
    margin-top:5px;
  }
`;
const Content = styled.div`
  img {
    display: block;
  }
`;
const Reply = styled.div`    
    border:1px solid #d8d4d4;
    margin-top:11px;
  .author-content {
    height:35px; 

  }
  img{
    float:left;
  }
  p {
    margin-left: 30px;
  }
  .replyname{
    margin-left:15px;
    line-height:35px;
     float:left;
  }
  .great{
    float:right;
  }
}
`;
