import { Component } from 'react'

export default class SignupForm extends Component {

    state = {
        firstName: "",
        lastName: "",
        username: "",
        password: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.signUp(this.state)
    }

    render() {
        return (
            
            <form onSubmit={this.handleSubmit}>
                <h1>Sign Up</h1>
                <lable>First Name</lable>
                <input name='firstName' value={this.state.firstName} onChange={this.handleChange} />
                <lable>Last Name</lable>
                <input name='lastName' value={this.state.lastName} onChange={this.handleChange} />
                <lable>Username</lable>
                <input name='username' value={this.state.username} onChange={this.handleChange} />
                <lable>Password</lable>
                <input type='password' value={this.state.password} name='password' onChange={this.handleChange} />
                <input type='submit' value='Sign Up' />
            </form>
        )
    }
}
