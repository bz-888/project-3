import { useState, useEffect } from "react";

import { useLocation } from 'react-router-dom';

import tokenService from "../../utils/tokenService";

import PageHeader from "../../components/PageHeader/PageHeader";
import GroceryList from "../../components/GroceryList/GroceryList";
import AddGroceryForm from "../../components/AddGroceryForm/AddGroceryForm";
import {
    Grid
} from "semantic-ui-react";

function ListPage() {

    const [groceries, setGroceries] = useState([]);

    const location = useLocation();
    console.log(location.state.groceries, "<-- a user's grocery list")

    useEffect(() => {
        getGroceries();
    }, []);


    // C(R)UD -> r or read in CRUD operations
    async function getGroceries() {
        try {
            const response = await fetch("/api/groceries", {
                method: "GET",
                headers: {
                    // Send the token, so the server knows who is making the request
                    Authorization: "Bearer " + tokenService.getToken(),
                    // Define content type
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();
            // AFTER THIS WE HAVE THE DATA BACK FROM SERVER
            // CHECK THE DATA then update state!
            console.log(data, "<--- data from getGroceries");
            setGroceries(data.groceries);
        } catch (err) {
            console.log(err);
        }
    }

    // (C)RUD -> c or create in CRUD operations
    // send grocery to the server
    async function addGrocery(grocery) {
        try {

            // HTTP request is going to the server
            // make the API call
            const response = await fetch("/api/groceries", {
                method: "POST",
                headers: {
                    // get the token
                    Authorization: "Bearer " + tokenService.getToken(),
                    // designate the content type as json
                    'Content-Type': 'application/json'
                },

                // stringify grocery and set it to body
                body: JSON.stringify(grocery),
            });

            // HTTP cycle is complete and we received a response from the server (aka data)
            // parse the json
            const data = await response.json();
            console.log(data, "<--- data from addGrocery");
            // add new grocery item to the groceries array, including the existing items
            setGroceries([data.grocery, ...groceries])

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <GroceryList
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <AddGroceryForm addGrocery={addGrocery} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}


export default ListPage;