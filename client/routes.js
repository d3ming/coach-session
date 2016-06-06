var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Main = require('./components/Main');
var Home = require('./components/Home');
var BookingContainer = require('./components/BookingContainer');
var hashHistory = ReactRouter.hashHistory;

var routes = (
    <Router history={hashHistory}>
        <Route path='/' component={Main}>
            <IndexRoute component={Home} />
            <Route path='booking' component={BookingContainer} />
        </Route>
    </Router>
);

module.exports = routes;
