import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Router from './components/Router/Router';
import Footer from './components/Footer/Footer';
import {BrowserRouter} from 'react-router-dom';
import {Auth} from "aws-amplify/lib/index";

class App extends Component {
    // componentWillMount() {
    //     const {onIcrementCounter} = this.props;
    //     // Get use's info
    //     Auth.currentAuthenticatedUser()
    //         .then(response => {
    //
    //                 onIcrementCounter();
    //
    //
    //             }
    //         )
    //         .catch(error => console.log('Error retrieving user\' info: ', error));
    //
    //     // this.props.onIcrementCounter();
    //
    // }
  render() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar/>
                <Footer/>
            </div>
        </BrowserRouter>
    );
  }
}
export default App;
