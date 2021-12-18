import React, { Component } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { databaseTrainer as database, storage } from "../../config/db";
import Footer from "../Footer/Footer";
import { message } from "antd";

export default class TrainerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "",
      category: "",
      phone: "",
      file: "",
      error: "",
      loading: false,
      loading_: false,
      url: "",
      trainerList: "",
      typing: false,
    };
    this.register = this.register.bind(this);
  }
  componentWillMount() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, typing: true });
  };
  changeFile = (e) => {
    let url = e.target.files[0];
    this.setState({ file: url, error: "" });
  };
  async register(e) {
    e.preventDefault();
    this.setState({ loading_: true });
    if (this.state.name && this.state.location && this.state.category) {
      const data = {
        name: this.state.name,
        location: this.state.location,
        category: this.state.category,
        phone: this.state.phone,
        url: this.state.url,
      };
      await database.push().set({ data });
      this.setState({ url: "", error: "", loading_: false });
      message.success("You have been successfull registered to our system");
      document.getElementById("reset-form").reset();
    } else {
      this.setState({ error: "All fields are required!", loading_: false });
    }
  }
  upload = async () => {
    this.setState({ loading: true });
    if (this.state.file && this.state.name) {
      const random = Math.random().toString(36).slice(2);
      await storage
        .ref(`trainer/${this.state.name.slice(0, 3)}_${random}`)
        .put(this.state.file);
      await storage
        .ref(`trainer/${this.state.name.slice(0, 3)}_${random}`)
        .getDownloadURL()
        .then((url) => {
          this.setState({ file: "", error: "", loading: false, url: url });
        });
    } else {
      this.setState({
        error: "Please choose file first Or write your name ",
        loading: false,
      });
    }
  };
  render() {
    return (
      <div className="ibarizo_home">
        <div className="container-fluid">
          <div className="container">
            <div className="row mt-5">
              <div className="col-lg-5">
                <img
                  src="https://cdn.pixabay.com/photo/2019/07/08/15/20/hands-4324987_960_720.jpg"
                  className="w-100"
                  alt="introduct pic"
                />
              </div>
              <div className="col-lg-7">
                  <h5>C.K Business Trainers</h5>
                C.K Business Ltd  is providing high quality, evidence based training for individuals
                and organisations in the disability and community sector. We
                offer a wide range of trainings to a range of audiences via face
                to face. <br />
                We offer training for individuals and groups as well as our own
                staff. We also offer customised training to support in house
                training needs.
                <br /> <br/>
                <h5>Individuals </h5>
                 We have a large range of scheduled trainings for skill
                development. We also offer recognised qualifications
                to support your career development.  <br/><br/>
                 <h5>Groups </h5>
                 For Learning and Development and Human Resource Managers who need to
                organise group training we can help and can customise trainings to
                suit you.
              </div>
            </div>
          </div>
          <div className="container dashboard_container mt-5">
            <div className="row">
              <div className="col-12">
                {this.state.error && (
                  <div className="alert alert-danger" role="alert">
                    {this.state.error}
                  </div>
                )}
                <div>
                  <Form method="POST" onSubmit={this.register} id="reset-form">
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        onChange={this.handleChange}
                        placeholder="Enter Full name"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicprice">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        name="location"
                        onChange={this.handleChange}
                        type="text"
                        placeholder="Enter Location"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasiccategory">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        name="category"
                        onChange={this.handleChange}
                        type="text"
                        placeholder="Enter category"
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicphone">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        name="phone"
                        onChange={this.handleChange}
                        type="text"
                        placeholder="Enter Phone Number"
                      />
                    </Form.Group>
                    <div className="mb-5">
                      <div className="input-group mb-3">
                        <div
                          className="input-group-prepend"
                          onClick={this.upload}
                          style={{ cursor: "pointer" }}
                        >
                          <span className="input-group-text">
                            {this.state.loading && (
                              <Spinner size="sm" animation="border" />
                            )}
                            Upload
                          </span>
                        </div>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={this.changeFile}
                            className="custom-file-input"
                            id="inputGroupFile01"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="inputGroupFile01"
                          >
                            {this.state.file
                              ? this.state.file.name
                              : "Upload your profile optional"}
                          </label>
                        </div>
                      </div>
                    </div>
                    <Button variant="primary" className="w-25" type="submit">
                      {this.state.loading_ ? (
                        <>
                          {" "}
                          <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />{" "}
                          Loading...{" "}
                        </>
                      ) : (
                        " Submit"
                      )}
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
