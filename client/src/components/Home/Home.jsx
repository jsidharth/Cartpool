import React, { Component } from 'react';
import requireAuth from './../RequireAuth/RequireAuth';

class Home extends Component {
    state = {  }
    render() { 
        return ( <div> I am Logged in</div> );
    }
}
 
export default requireAuth(Home);