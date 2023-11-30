import PageHeader from "../../components/PageHeader/PageHeader";
import GroceryItem from "../../components/GroceryItem/GroceryItem";
import AddGroceryForm from "../../components/AddGroceryForm/AddGroceryForm";
import {
    Grid,
    Header,
} from "semantic-ui-react";
import { useEffect, useState } from "react";
import tokenService from "../../utils/tokenService";

function ListPage() {

    const [groceries, setGroceries] = useState([]);

    useEffect(() => {
        getGroceries();
    }, []);

    async function getGroceries() {
        try {
            const response = await fetch("/api/groceries", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + tokenService.getToken(),
                    // Send the token, so the server knows who is making the request
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
                    <GroceryItem />
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