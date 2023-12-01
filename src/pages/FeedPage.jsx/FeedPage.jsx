import { useState, useEffect } from "react";

import PageHeader from "../../components/PageHeader/PageHeader";
import GrocerySummaryFeed from "../../components/GrocerySummaryFeed/GrocerySummaryFeed";

import tokenService from "../../utils/tokenService";
import { Grid } from "semantic-ui-react";

function FeedPage({ loggedUser, handleLogout }) {

    const [groceries, setGroceries] = useState([]);

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
                    <PageHeader loggedUser={loggedUser} handleLogout={handleLogout} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <GrocerySummaryFeed
                        groceries={groceries}
                        addGrocery={addGrocery}
                        loggedUser={loggedUser}
                        itemsPerRow={1}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}


export default FeedPage;