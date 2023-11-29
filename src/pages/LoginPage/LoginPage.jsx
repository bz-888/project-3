import { useState } from 'react';
import React from 'react';
import './LoginPage.css';

import { useNavigate, Link } from 'react-router-dom';

import userService from '../../utils/userService';

import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message,
} from "semantic-ui-react";

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';



function LoginPage({ handleSignUpOrLogin }) {

  // define the state variables and the set terminology
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  // define state and setState for error
  const [error, setError] = useState('')

  //define useNavigate function that was imported above as navigate
  const navigate = useNavigate();


  // define what happens when the submit button is pressed
  async function handleSubmit(e) {
    // prevent the default action of a HTTP get request
    e.preventDefault();


    try {
      // login using the information stored in state
      await userService.login(state);

      // call handleSignUporLogin function from App.jsx
      // get user token
      handleSignUpOrLogin();

      // navigate to homepage
      navigate("/");
    } catch (err) {
      console.log(err.message);
      // Set the state of error message in preparation for it to be displayed via the line of code below.
      setError("Try logging in again.");
    }

  }


  // define what happens when the contents of the forms on the page changes
  function handleChange(e) {
    // update state variables and their values as the contents of the forms on the page changes
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }


  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="green" textAlign="center">
          Login to Use Grocery Tracker
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="btn">
              Signup
            </Button>
          </Segment>
          <Message>
            New to Grocery Tracker? <Link to="/signup">Sign up here!</Link>
          </Message>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default LoginPage;
