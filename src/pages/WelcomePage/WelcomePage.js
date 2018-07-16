import React from 'react';
import Button from '@material-ui/core/Button';

const styles = {
  div: {
    alignContent: 'center',
    maxHeight: 'inherit',
    border: 'red solid 1px',
    textAlign: 'center',
    padding: '20px 0',
    
    //backgroundColor:'green',
  },
  button: {
    borderRadius: '5px',
    border: 0,
    color: '#424242',
    fontSize: 'larger',
    height: 48,
    margin: '10px 0',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px #9a0007',
    cursor: 'pointer',
  },
  wall: {
    padding: 0,
    margin: '10% 0 0 0',
    fontFamily: 'Oxygen, sans-serif',
    width: '100%',
    height: '100%',
    position: 'relative',
    textAlign: 'center',
    backgroundImage: "url('/pages/WelcomePage/WelcomePageBackground.png)",
  },
  h3: {
    color: '#464444',
    margin: '0',
    fontSize: '34px',
  },
}

const MainPage = () =>
  <div style={styles.wall}>
    <h3 style={styles.h3}>Welcome to the library!</h3>
    <Button style={styles.button} href="/library"> Get started! </Button>
  </div>

export default MainPage