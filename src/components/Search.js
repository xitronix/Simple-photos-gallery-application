import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

class ComposedTextField extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchText: props.search
    }
  }

  handleChange = event => this.setState({ searchText: event.target.value })

  render() {
    const { classes, handleChange } = this.props
    const { searchText } = this.state
    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name-simple">Search</InputLabel>
          <Input id="name-simple" value={searchText} onChange={this.handleChange}
            endAdornment={<InputAdornment position="end">
              <IconButton
                aria-label="Search photos"
                onClick={() => handleChange(this.state.searchText)}
              //onMouseDown={this.handleMouseDownPassword}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>}
          />
        </FormControl>
      </div>
    );
  }
}

ComposedTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComposedTextField);