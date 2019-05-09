import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost, updatePost } from "../actions/postActions";
import classnames from "classnames";

class EditPost extends Component {
  state = {
    title: "",
    body: "",
    errors: {}
  };

  addToState = e => this.setState({ [e.target.name]: e.target.value });

  componentWillReceiveProps(nextProps, nextState) {
    const { title, body } = nextProps.post;

    this.setState({
      title: title,
      body: body
    });
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPost(id);
  }

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

    const { id } = this.props.match.params;

    const updPost = {
      id: id,
      title: title,
      body: body
    };

    this.props.updatePost(updPost);

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
        <div className="card-header">Edit Post</div>
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
                rows="5"
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
              value="Edit Post"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

EditPost.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post.post
});

export default connect(
  mapStateToProps,
  { getPost, updatePost }
)(EditPost);
