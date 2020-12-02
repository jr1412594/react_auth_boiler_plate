import { Component } from 'react'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import './App.css';

const baseURL = "http://localhost:3000/"
class App extends Component {
  state = {
    user: {},
    error: '' 
  }

  signUp = user => {
    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user: {
          first_name: user.firstName,
          last_name: user.lastName,
          username: user.username,
          password: user.password
        }
      })
    })
    .then(response => response.json())
    .then(user => this.setState({ user }))
  }

  login = (username, password) => {
    fetch(baseURL + 'login', {
      method: "POST",
      headers: {
        "Content-type": 'application/json',
      },
        body: JSON.stringify({
          user: {
            username,
            password
          }
        })
    })
    .then(response => response.json())
    .then(result => {
      localStorage.setItem('token', result.token)
      if(result.token){
      this.setState({user: result.user
      })
    } else {
      this.setState({
        error: result.error
      })
    }
    })
  }
  render (){

    return (
      <div className="App">
        {
          this.state.user.username
          ? <h2>Welcome! {this.state.user.first_name}</h2>
          :  (
            <>
              <SignupForm signUp={this.signUp}/>
              <LoginForm login={this.login} error={this.state.error}/>
            </>
          )
        }
      </div>
    );
  }
}

export default App;
