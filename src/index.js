import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import icon from './icon/icon.png';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#5cb7d8',
        },
        secondary: orange,
    },
    background: "#5cb7d8"
});


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleHamMenu = this.handleHamMenu.bind(this)
        this.handleCloseMenu = this.handleCloseMenu.bind(this)
    }
    handleHamMenu(e) {
        let element = e.target;
        element.previousSibling.style.right = "0%"
    }
    handleCloseMenu(e) {
        let element = e.target;
        element.parentElement.style.right = "-45%"
    }
    render() {
        return (
            <div className="header">
                <div className="headWrapper">
                    <a className="logo" href="/">
                        <h1>
                            <img src={icon} alt="Phileas" />
                        </h1>
                    </a>
                    <div className="rightSection">
                        <a className="explore" href="/">
                            Explorer
                        </a>
                        <div className="closeMenu" onClick={e => { this.handleCloseMenu(e) }}></div>
                    </div>
                    <div className="hamButton" onClick={e => { this.handleHamMenu(e) }}></div>
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <App />
</ThemeProvider>

, document.getElementById('root'));
