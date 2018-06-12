import React, { Component } from "react";
import axios from "axios";
class TopicCreate extends Component {
  state = {
    title: "",
    content: ""
  };
  handleChange = (text, e) => {
    this.setState({
      [text]: e.target.value
    });
  };
  handelSubmit = () => {
    const { title, content } = this.state;
    if (title.trim().length >= 7 && content.trim()) {
      const contentobj = {
        accesstoken: sessionStorage.accesstoken,
        title: title,
        content: content,
        tab: "dev"
      };
      const uri = "https://cnodejs.org/api/v1/topics";
      axios.post(uri, contentobj).then(res => {
        this.setState({
          text: "",
          content: ""
        });
        this.props.history.push(`/topic/${res.data.topic_id}`);
      });
    } else {
      alert("请输入正确信息");
    }
  };
  render() {
    const { title, content } = this.state;

    return (
      <div>
        <input
          type="text"
          value={title}
          onChange={e => this.handleChange("title", e)}
        />
        <textarea
          value={content}
          onChange={e => this.handleChange("content", e)}
        />
        <button onClick={this.handelSubmit}>提交</button>
      </div>
    );
  }
}

export default TopicCreate;
