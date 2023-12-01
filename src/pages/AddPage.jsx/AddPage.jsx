import { useState } from "react";

import AddGroceryForm from "../../components/AddGroceryForm/AddGroceryForm";
import PageHeader from "../../components/PageHeader/PageHeader";

import { Grid } from "semantic-ui-react";
import tokenService from "../../utils/tokenService";

function AddPage({ loggedUser, handleLogout }) {

    const [groceries, setGroceries] = useState();
    
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


    return(
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader loggedUser={loggedUser} handleLogout={handleLogout} />
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

export default AddPage;