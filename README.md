[![Stories in Ready](https://badge.waffle.io/d3ming/coach-session.png?label=ready&title=Ready)](https://waffle.io/d3ming/coach-session)
# COACH-SESSION

Effortlessly book a coaching session

# Develop:
`make install` to install
`make start` to start server

# Testing
`make lint` to run linters
`make test` to run tests

# Problem
- 1:1 client / coach relationship
- Monthly appointments, for one year
- User need to supply phone number
- Booked times become unavailable to others

## Assumptions for MVP:
- Client logged in (no login needed)
- Client already mapped to a designated coach
- A coach will have at most ~160 clients (not a huge set)
- Fixed time slots: can only book hourly appointments on the hour

## Framework Decisions
- Client:
  - [ReactJS](https://facebook.github.io/react/)
    - [react-infinite-calendar](http://clauderic.github.io/react-infinite-calendar/#/?_k=1tjrjo)
    - [react-select](https://github.com/JedWatson/react-select)
    - [react-bootstrap](https://react-bootstrap.github.io/)
- Server
  - [Flask](http://flask.pocoo.org/)
    - [flask-restful](https://github.com/flask-restful/flask-restful)
