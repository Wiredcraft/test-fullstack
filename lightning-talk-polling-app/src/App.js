import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

class App extends Component {
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
