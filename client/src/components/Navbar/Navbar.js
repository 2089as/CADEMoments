import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//mport { jwtDecode as decode } from 'jwt-decode';
import cadmoments from '../../images/cadmoments.png'
import memories from '../../images/cadekisame.jpg';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('profile'));
    if (storedUser) {
      setUser(storedUser.result);
    }
  }, [location]);

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    localStorage.removeItem('profile');
    setUser(null);
    navigate('/auth');
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img  src={cadmoments} alt="icon" height="100px" />
        <img className={classes.image} src={memories} alt="icon" height="80" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.name} src={user.imageUrl}>
              {user.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.name}
            </Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
