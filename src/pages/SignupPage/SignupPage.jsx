import { useState } from 'react';

import {
    Button,
    Form,
    Grid,
    Header,
    Segment,
    Message,
} from "semantic-ui-react";

import { useNavigate, Link } from 'react-router-dom';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import userService from "../../utils/userService";


// define the function of what happens on this page
function SignUpPage({ handleSignUpOrLogin }) {

    // define the state variables and the set terminology
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        passwordConf: '',
    })

    // define the error state and its set terminology
    const [error, setError] = useState('')

    const navigate = useNavigate();

    // define what happens when the submit button is pressed
    async function handleSubmit(e) {
        // prevent the default action of a HTTP get request
        e.preventDefault();
        
        try{
            // sign up with information in state
            await userService.signup(state);

            // get user token
            handleSignUpOrLogin();
            
            // navigate to home page
            navigate("/");
        } catch (err) {
            console.log(err.message);
            // Set the state of error message in preparation for it to be displayed via the line of code below.
            setError("Try signing up again.");
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
                    Sign Up for Grocery Tracker
                </Header>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input
                            name="username"
                            placeholder="username"
                            value={state.username}
                            onChange={handleChange}
                            required
                        />
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
                        <Form.Input
                            name="passwordConf"
                            type="password"
                            placeholder="confirm password"
                            value={state.passwordConf}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" className="btn">
                            Signup
                        </Button>
                    </Segment>
                    <Message>
                        Already a member? <Link to="/login">Login!</Link>
                    </Message>
                    {error ? <ErrorMessage error={error} /> : null}
                </Form>
            </Grid.Column>
        </Grid>
    );
}

export default SignUpPage;