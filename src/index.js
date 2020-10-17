import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/home/App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

// React Router
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

// Custom SCSS and Bootstrap
import './custom.scss';

// Components/Pages
import Navbar from './common/Navbar';
import Layout from './layouts/default'

ReactDOM.render(
    <Router>
        <div>
            <Navbar />
            <Provider store={ store }>
                <Switch>
                    <Route exact path="/">
                        <Layout>
                            <App />
                        </Layout>
                    </Route>
                </Switch>
            </Provider>
        </div>
    </Router>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
