import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
class Header extends Component {
  state = {
    userInfo: null,
    text: ""
  };
  componentDidMount() {
    const accesstoken = sessionStorage.accesstoken;
    if (accesstoken) {
      const uri = "https://cnodejs.org/api/v1/accesstoken";
      axios.post(uri, { accesstoken: accesstoken }).then(res => {
        this.setState({ userInfo: res.data });
      });
    }
  }
  handelInput = e => {
    this.setState({
      text: e.target.value
    });
  };
  handelLogin = () => {
    const { text } = this.state;
    if (text.trim()) {
      const uri = "https://cnodejs.org/api/v1/accesstoken";
      axios
        .post(uri, { accesstoken: text })
        .then(res => {
          this.setState({
            userInfo: res.data,
            text: ""
          });
          sessionStorage.accesstoken = text;
          sessionStorage.loginname = res.data.loginname;
        })
        .catch(err => {
          alert("密码错误");
        });
    }
  };
  handelLogout = () => {
    this.setState({ userInfo: null });
    sessionStorage.removeItem("accesstoken");
    sessionStorage.removeItem("loginname");
  };
  0;
  render() {
    const { userInfo, text } = this.state;
    return (
      <Head>
        <header>
          <Link to="/">
            <img
              className="log"
              src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg"
              alt=""
            />
          </Link>

          {userInfo ? (
            <div className="login">
              <Link to="/topic/create">发布话题</Link>
              <img className="tou" src={userInfo.avatar_url} alt="" />
              <span onClick={this.handelLogout}>退出</span>
            </div>
          ) : (
            <div className="login">
              <input type="text" value={text} onChange={this.handelInput} />
              <span onClick={this.handelLogin}>登录</span>
            </div>
          )}
        </header>
      </Head>
    );
  }
}

export default Header;
const Head = styled.div`
  background-color: #3e3e3e;
  header {
    display: flex;
    justify-content: space-between;
    width: 1180px;
    align-items: center;
    margin: 0 auto;
  }
  .tou {
    width: 25px;
    height: 25px;
  }
  .log {
    width: 180px;
  }
  .login {
    margin-left: 35px;
    width: 180px;
    height: 30px;
    display: flex;
    justify-content: flex-end;
    input {
      width: 138px;
    }
  }
`;
