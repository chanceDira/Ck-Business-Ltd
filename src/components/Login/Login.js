import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { databaseUser as database } from "../../config/db";
import { message } from "antd";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      image: "",
      redirectToReferrer: false,
      email: "",
      user: [],
    };
  }
  componentWillMount() {
    const data = this.state.user;
    database.on("child_added", (snap) => {
      data.push({
        id: snap.key,
        email: snap.val().email,
        password: snap.val().password,
      });
      this.setState({ user: data });
    });
  }
  onFinish = async (values) => {
    const user = this.state.user.find(
      (one) => one.email === values.email && one.password === values.password
    );
    if (!user) {
      message.error("Email or Password did not match!");
    }

    if (user) {
      this.setState({ redirectToReferrer: true });
      localStorage.setItem("user", JSON.stringify(user));
    }
  };
  render() {
    if (
      this.state.redirectToReferrer === true ||
      JSON.parse(localStorage.getItem("user"))
    ) {
    
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="ibarizo_home">
        <div className="container">
          <div className="dashboard_container mt-5 w-50 login">
            <h5 className="text-center">Login as administrator </h5>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input
                  type="email"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button w-50"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
