import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Image from './Image';
import Spinner from './Spinner';
import { api_key } from '../config';

const styles = {
  card: {
    maxWidth: 300,
    margin: '5px',
    backgroundColor: '#616161',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

class PhotoCard extends React.Component {
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
    const { classes } = this.props
    const { farm, server, id, secret, title, owner } = this.state.photo || {}
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            component={() => this.state.photo
              ? <Image src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_n.jpg`} />
              : <Spinner />}
            title={title && title._content}
            src="img"
          />
          {
            <CardContent>


              <Typography gutterBottom variant="headline" component="h2">
                {title && title._content} 
              </Typography>
              <Typography component="p">
                {owner && <span>by: {owner.username}</span>}
              </Typography>

            </CardContent>
          }
        </Card>
      </div>
    );
  }
}


PhotoCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhotoCard);