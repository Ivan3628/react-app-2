import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../actions/postActions";
import Post from "./Post";

class Posts extends Component {
  componentDidMount() {
    if (this.props.posts.length === 0) {
      this.props.getPosts();
    }
  }

  render() {
    const { posts } = this.props;
    return (
      <div>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  posts: state.post.posts
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
