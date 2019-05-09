import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePost } from "../actions/postActions";
import { Link } from "react-router-dom";

class Post extends Component {
  state = {
    showInfo: false
  };

  onDeleteClick = id => {
    this.props.deletePost(id);
  };
  render() {
    const { id, title, body } = this.props.post;
    const { showInfo } = this.state;

    return (
      <div className="card card-body mb-3">
        <h4>
          {title}{" "}
          <i
            className="fas fa-sort-down"
            style={{ cursor: "pointer" }}
            onClick={() => this.setState({ showInfo: !this.state.showInfo })}
          />
          <i
            className="fas fa-times"
            style={{
              cursor: "pointer",
              float: "right",
              color: "red"
            }}
            onClick={this.onDeleteClick.bind(this, id)}
          />
          <Link to={`/edit/${id}`}>
            <i
              className="fas fa-pencil-alt"
              style={{
                cursor: "pointer",
                float: "right",
                color: "black",
                marginRight: "1rem"
              }}
            />
          </Link>
        </h4>
        {showInfo ? (
          <ul className="list-group">
            <li className="list-group-item">
              <p className="lead">{body}</p>
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired
};

export default connect(
  null,
  { deletePost }
)(Post);
