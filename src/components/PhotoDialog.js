import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FullSizePhotoCard from './FullSizePhotoCard'
import { withMobileDialog } from '@material-ui/core';

const PhotoDialog = (props) => {
  const { handleClosePhoto, open, photoInfo } = props
  return < div >
    <Dialog
      open={open}
      onClose={handleClosePhoto}
      fullScreen={false}
      scroll={'body'}
      aria-labelledby="simple-dialog-title"
      maxWidth='md'
      PaperProps={{margin: 0}}
    >
      <DialogTitle id="simple-dialog-title">{photoInfo && photoInfo.title._content}</DialogTitle>
      <DialogContent >
        {photoInfo && <FullSizePhotoCard photoInfo={photoInfo} />}
        <DialogContentText>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClosePhoto} >
          Close
          </Button>
      </DialogActions>
    </Dialog>
  </div >
}

PhotoDialog.propTypes = {
  handleClosePhoto: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  photoInfo: PropTypes.object,
};


export default withMobileDialog()(PhotoDialog);