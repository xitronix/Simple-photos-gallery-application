import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import ResizeIcon from '@material-ui/icons/PhotoSizeSelectLarge';
import Image from './Image';
import Spinner from './Spinner';
import { api_key } from '../config';
import PhotoCard from './PhotoCard'

const styles = {
  gridTile: {
    imgFullHeight: '300px',
    imgFullWidth: '300px',
    minWidth: '100px',
    backgroundColor: '#263238',
    margin: '10px 0',
  },
  subheader: {
    width: '100%',
  },
};

class GridTile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      photo: null,
    }
  }

  componentDidMount() {
    fetch(` https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${api_key}&photo_id=${this.props.photoId}&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(({ photo }) => this.setState({ photo }))
      .catch(err => console.log(`Fetch error: ${err}`))
  }

  render() {
    const { classes, handleOpenPhoto } = this.props
    const { farm, server, id, secret, title, owner } = this.state.photo || {}
    return <GridListTile className={classes.gridTile} >
      {this.state.photo
        ? <Image src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_n.jpg`} />
        : <Spinner />
      }
      <GridListTileBar
        title={title && title._content}
        subtitle={owner && <span>by: {owner.username}</span>}
        actionIcon={
          <IconButton className={classes.icon} onClick={() => handleOpenPhoto(this.state.photo)}>
            <ResizeIcon />
          </IconButton>
        }
      />
    </GridListTile>
  }
}

PhotoCard.propTypes = {
  classes: PropTypes.object.isRequired,
  handleOpenPhoto: PropTypes.func.isRequired,
};


export default withStyles(styles)(GridTile)