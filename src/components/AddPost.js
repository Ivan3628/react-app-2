import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../actions/postActions";
import classnames from "classnames";

class AddPost extends Component {
  state = {
    title: "",
    body: "",
    errors: {}
  };

  addToState = e => this.setState({ [e.target.name]: e.target.value });

  submitPost = e => {
    e.preventDefault();
    const { title, body } = this.state;

    //Check for errors
    if (title === "") {
      this.setState({ errors: { title: "Title is required" } });
      return;
    }
    if (body === "") {
      this.setState({ errors: { body: "Post is required" } });
      return;
    }

    const newPost = {
      title: title,
      body: body
    };

    this.props.addPost(newPost);

    this.setState({
      title: "",
      body: "",
      errors: {}
    });

    this.props.history.push("/");
  };
  render() {
    const { title, body, errors } = this.state;
    return (
      <div className="card mb-3">
        <div className="card-header">AddPost</div>
        <div className="card-body">
          <form onSubmit={this.submitPost}>
            <div className="form-group">
              <label htmlFor={title}>Title</label>
              <input
                type="text"
                name="title"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.title
                })}
                value={title}
                onChange={this.addToState}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor={body}>Post</label>
              <textarea
                type="text"
                name="body"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.body
                })}
                value={body}
                onChange={this.addToState}
              />
              {errors.body && (
                <div className="invalid-feedback">{errors.body}</div>
              )}
            </div>
            <input
              type="submit"
              value="Add Post"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired
};
export default connect(
  null,
  { addPost }
)(AddPost);
