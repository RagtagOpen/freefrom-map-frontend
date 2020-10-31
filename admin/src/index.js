import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

// React Router
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

// Redux
import store from './app/store';

// Some common tools
import 'popper.js';
import 'jquery';
import 'bootstrap';
import 'lodash';

// CSS
import './index.css'
// Custom/Bootstrap SCSS
import './custom.scss';

// Components/Pages
import Navbar from './common/Navbar';
import DefaultLayout from './layouts/DefaultLayout'
import Home from './pages/home/Home';

// Categories
import Categories from './pages/categories/Categories';
import CategoryView from './pages/categories/CategoryView';
import CategoryEdit from './pages/categories/CategoryEdit';

// States
import States from './pages/states/States';
import StateView from './pages/states/StateView';
import StateEdit from './pages/states/StateEdit';

ReactDOM.render(
    <Router>
        <div>
            <Navbar />
            <Provider store={ store }>
                <Switch>
                    <Route exact path="/">
                        <DefaultLayout active="home">
                            <Home />
                        </DefaultLayout>
                    </Route>
                    <Route exact path="/categories">
                        <DefaultLayout active="categories">
                            <Categories />
                        </DefaultLayout>
                    </Route>
                    <Route exact path="/categories/new">
                        <DefaultLayout active="categories">
                            <CategoryEdit />
                        </DefaultLayout>
                    </Route>
                    <Route exact path="/categories/:id">
                        <DefaultLayout active="categories">
                            <CategoryView />
                        </DefaultLayout>
                    </Route>
                    <Route path="/categories/:id/edit">
                        <DefaultLayout active="categories">
                            <CategoryEdit />
                        </DefaultLayout>
                    </Route>
                    <Route exact path="/states">
                        <DefaultLayout active="states">
                            <States />
                        </DefaultLayout>
                    </Route>
                    <Route exact path="/states/new">
                        <DefaultLayout active="states">
                            <StateEdit />
                        </DefaultLayout>
                    </Route>
                    <Route exact path="/states/:id">
                        <DefaultLayout active="states">
                            <StateView />
                        </DefaultLayout>
                    </Route>
                    <Route path="/states/:id/edit">
                        <DefaultLayout active="states">
                            <StateEdit />
                        </DefaultLayout>
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
