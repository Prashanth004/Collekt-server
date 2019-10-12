import React, { useState, useEffect } from 'react';
import Landing from './Landing/index';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import {checkLoginStatus} from '../actions/AuthAction';
import { Redirect} from 'react-router-dom';


function IndexHome(props) {
    const {checkLoginStatus,authAction,isLoggedin,
        username,activated} = props;
    useEffect(() => {
        if(!authAction)
        checkLoginStatus()
    }, [])
    return (authAction?
        ((isLoggedin && activated)?
            (<Redirect to={{ pathname: './@'+username+'/cards' }} />):(<Landing />)):
            (<p>loading</p>))
}
IndexHome.PropType = {
    checkLoginStatus: PropType.func.checkLoginStatus
  };
  const mapStateToProps = state => ({
    authAction : state.auth.authAction,
    isLoggedin : state.auth.isLoggedin,
    username:state.auth.username,
    activated : state.auth.activated,
  })
  
  export default connect(mapStateToProps, {checkLoginStatus})(IndexHome)
  
// export default IndexHome
