import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

class Image extends Component {
  constructor(props) {
    super(props)
    this.state = {
      src: this.props.src,
      loading: true,
    }
  }

  handleImageChange = () => this.setState(prevState => ({ loading: !prevState.loading }))

  componentDidUpdate(prevProps) {
    if (this.props.src !== prevProps.src) {
      this.setState({src: this.props.src})
      this.handleImageChange()
    }
  }

  render() {
    const { src } = this.state
    return (
      <div>
        {this.state.loading && <Spinner />}
        <img
          alt={src}
          src={src}
          onLoad={this.handleImageChange}
          onError={this.handleImageChange}
        />
      </div>
    )
  }
}


Image.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Image;