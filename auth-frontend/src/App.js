import { Component } from 'react'
import SignupForm from './pages/SignupForm'
import LoginForm from './pages/LoginForm'
import HomePage from './pages/HomePage'
import PrivateRoute from './components/PrivateRoute'
import {Route, Switch} from 'react-router-dom'
import './App.css';

const baseURL = "http://localhost:3000/"
class App extends Component {
  state = {
    user: {},
    error: '' 
  }


  componentDidMount(){
    let token = localStorage.getItem('token')
    if(token){
      fetch(baseURL + 'profile', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(result => {
        if(result.id){
          this.setState({
            user: result
          })
        }
      })
    }
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

  login = (username, password, history) => {
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
      if(result.token){
        localStorage.setItem('token', result.token)
      this.setState({user: result.user
      })
      history.push('/')
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
        <Switch>
          {/* <Route exact path='/' render={(routerProps) => <HomePage />} /> */}
          <Route path='/signup' render={(routerProps) => <SignupForm signUp={this.signUp} {...routerProps}/>} />
          <Route path='/login' render={(routerProps) => <LoginForm login={this.login} error={this.state.error} {...routerProps}/>} />
          <PrivateRoute path='/' component={HomePage} user={this.state.user} />
        </Switch>
      </div>
    );
  }
}

export default App;
