import '@styles/index.sass'
import 'es6-promise/auto'

import React from 'react'
import { render } from 'react-dom'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './App'

const ComponentToRender = () => (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <App />
    </MuiThemeProvider>
)

render(<ComponentToRender />, document.getElementById('app'))
