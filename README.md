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
- Coach will have at most ~160 clients
- Can only book hourly on the hour

### Decisions
- Client:
  - ReactJS
  - Calendar: https://github.com/react-component/calendar
  - Select: http://jedwatson.github.io/react-select/
- Server
  - Flask + Flask-Restful
