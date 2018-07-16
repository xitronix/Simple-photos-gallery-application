import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home'
import IconButton from '@material-ui/core/IconButton';
import FilterIcon from '@material-ui/icons/FilterList';
import Search from './Search'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  appBar: {
    alignText: 'center',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ExtendedAppBar(props) {
  const { classes, search, handleSearch } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <FilterIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Simple photos gallery
          </Typography>
          <Search search={search} handleChange={handleSearch}/>
          <IconButton aria-label="Home" href="/">
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ExtendedAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  search: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default withStyles(styles)(ExtendedAppBar);