import React, { Component } from "react";
import axios from "axios";
class User extends Component {
  state = {
    userInfo: null
  };
  componentDidMount() {
    const { username } = this.props.match.params;
    const uri = `https://cnodejs.org/api/v1/user/${username}`;
    axios
      .get(uri)
      .then(res => {
        this.setState({
          userInfo: res.data.data
        });
      })
      .catch(err => {
        this.setState({
          userInfo: "nouser"
        });
      });
  }

  render() {
    const { userInfo } = this.state;
    console.log(userInfo);
    return (
      <div>
        {userInfo
          ? userInfo === "nouser"
            ? "nouser"
            : userInfo.loginname
          : "请稍等"}
      </div>
    );
  }
}

export default User;
