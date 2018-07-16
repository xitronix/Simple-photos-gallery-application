import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Snackbar from '../../components/Snackbar';
import GridTile from '../../components/GridTile';
import { api_key } from '../../config';
import ExtendedAppBar from '../../components/ExtendedAppBar';
import PhotoDialog from '../../components/PhotoDialog';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    contentAlign: 'center',
    justifyContent: 'space-around',
  },
  subheader: {
    width: '100%',
  },
});

class Library extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pages: null,
      photos: null,
      openPhoto: false,
      snackbarOpen: false,
      snackbarMessage: 'Empty',
    }
    this.search = 'dogs'
    this.currentPhotoInfo = null
  }

  componentDidMount() {
    this.pages = 1
    window.addEventListener('scroll', this.onScroll, false)
    this.fetchPhotos(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&text=${this.search}&format=json&nojsoncallback=1&per_page=100&page=1`)
  }

  handleOpenPhoto = (photoInfo) => {
    this.currentPhotoInfo = photoInfo
    this.setState({
      openPhoto: true,
    })
  }

  handleClosePhoto = () => this.setState({ openPhoto: false })

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpen: false });
  }

  fetchPhotos = url => {
    this.loading = true
    fetch(url)
      .then(res => res.json())
      .then(({ photos }) => {
        this.loading = false
        this.setState(prevState => ({
          photos: prevState.photos ? prevState.photos.concat(photos.photo) : photos.photo,
          pages: photos.pages
        }))
      })
      .catch(err => { this.loading = false; console.log(`Fetch error: ${err}`) })
  }

  refreshFetchPhotos = (url) => {
    this.loading = true
    fetch(url)
      .then(res => res.json())
      .then(({ photos }) => {
        this.loading = false
        this.setState(({
          photos: photos.photo,
          pages: photos.pages,
        }))
        if (!(photos.photo.length > 0))
          this.handleEmptyResponse()
      })
      .catch(err => { this.loading = false; console.log(`Fetch error: ${err}`) })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false)
  }
  onScroll = () => {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) && !this.loading && this.pages < this.state.pages
    ) {
      this.pages++
      this.fetchPhotos(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&text=${this.search}&format=json&nojsoncallback=1&per_page=100&page=${this.pages}`)
    }
  }

  handleSearch = search => {
    this.search = search
    if (this.search) {
      this.refreshFetchPhotos(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&text=${this.search}&format=json&nojsoncallback=1&per_page=100&page=${this.pages}`,
      )
    } else {
      this.setState(({ snackbarOpen: true, snackbarMessage: 'Search input is empty!', }))
    }
  }

  handleEmptyResponse = () => this.setState(({ snackbarOpen: true, snackbarMessage: 'Nothing to show, try again!', }))

  render() {
    const { classes } = this.props
    const { photos } = this.state
    const cols = Math.ceil(window.innerWidth / 280)
    return (
      <div className={classes.root}>
        <ExtendedAppBar search={this.search} handleSearch={this.handleSearch} />
        {photos && <GridList className={classes.gridList} cols={cols} cellHeight='auto' alignitems='center' >
          {
            photos.map((singlePhoto, key) => <GridTile key={key + singlePhoto.id} photoId={singlePhoto.id} secret={singlePhoto.secret} handleOpenPhoto={this.handleOpenPhoto} />)
            //photos.map((singlePhoto, key) => <PhotoCard key={key} photoId={singlePhoto.id} secret={singlePhoto.secret} />)
          }
        </GridList>}
        <PhotoDialog open={this.state.openPhoto} photoInfo={this.currentPhotoInfo} handleClosePhoto={this.handleClosePhoto} />
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          handleClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}

Library.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Library);