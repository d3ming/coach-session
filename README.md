# COACH-SESSION

Effortlessly book a coaching session

# Develop:
`make install` to install
`make start` to start server

# Testing
`make test` to run tests

## Problem
- 1:1 client / coach relationship
- Monthly appointments, for one year
- User need to supply phone number
- Booked times become unavailable to others

### Assumptions for MVP:
- Client logged in (no login needed)
- Client already mapped to a designated coach
- Client books an appointment for one month and it auto-recurs
- A coach will have at most ~160 clients
- Can only book hourly on the hour

### Decisions
- Client:
  - [ReactJS](https://facebook.github.io/react/)
    - [react-datepicker](https://github.com/Hacker0x01/react-datepicker)
    - [react-select](https://github.com/JedWatson/react-select)
- Server
  - [Flask](http://flask.pocoo.org/)
    - [flask-restful](https://github.com/flask-restful/flask-restful)
