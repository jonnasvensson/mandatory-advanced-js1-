import React from 'react';
import './App.css';
import Login from './Login.js'
import Chatview from './Chatview.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: ""
    }
      this.onSubmit = this.onSubmit.bind(this);  
      this.logOut = this.logOut.bind(this);  

    }
    onSubmit(username) {
      //e.preventDefault();
      console.log('username', this.state.username)
      this.setState({ username: username, loggedIn: true });
    }
    logOut() {
      this.setState({loggedIn: false});
    }

  render() {
    return (
      <>
      <div className="App">
        {this.state.loggedIn ? <Chatview username={this.state.username} logOut={this.logOut} /> : <Login onSubmit={this.onSubmit} />} 
        </div>
      </>
    );
  }
}

export default App;