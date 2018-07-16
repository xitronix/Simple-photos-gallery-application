import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Image from './Image';
import Spinner from './Spinner';

const styles = {
  card: {
    backgroundColor: '#616161',
    maxWidth: 'inherit',
  },
  media: {
    paddingTop: '56.25%', // 16:9
  },
};

const FullSizePhotoCard = (props) => {
  const { classes, photoInfo } = props
  const { farm, server, id, secret, title, owner, description } = photoInfo 
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          component={() => photoInfo
            ? <Image src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_b.jpg`} />
            : <Spinner />}
          title={title && title._content}
          src="img"
        />
        {
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
             Author: {owner.username}
            </Typography>
            <Typography component="p">
              Description: {description && 'empty'}
            </Typography>
          </CardContent>
        }
      </Card>
    </div>
  )
}



FullSizePhotoCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullSizePhotoCard);