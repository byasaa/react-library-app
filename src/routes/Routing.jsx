import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "../containers/Layout"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import DetailBook from "../pages/DetailBook"

class Routing extends Component {
    render() {
        return (
            <>
                <Router>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/book/:bookName' component={DetailBook} />
                </Router>
            </>
        )
    }
}

export default Routing