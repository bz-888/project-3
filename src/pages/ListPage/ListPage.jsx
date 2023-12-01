import { useState, useEffect } from "react";

import { useLocation } from 'react-router-dom';

import tokenService from "../../utils/tokenService";

import PageHeader from "../../components/PageHeader/PageHeader";
import GroceryList from "../../components/GroceryList/GroceryList";
import AddGroceryForm from "../../components/AddGroceryForm/AddGroceryForm";
import {
    Grid
} from "semantic-ui-react";

function ListPage({ loggedUser, handleLogout }) {

    const location = useLocation();
    const [selectedList, setSelectedList] = useState(location.state.groceries);

    // const selectedList = location.state.groceries;

    // useEffect(() => {
    //     getGroceries();
    // }, []);


    // C(R)UD -> r or read in CRUD operations
    // async function getGroceries() {
    //     try {
    //         const response = await fetch("/api/groceries", {
    //             method: "GET",
    //             headers: {
    //                 // Send the token, so the server knows who is making the request
    //                 Authorization: "Bearer " + tokenService.getToken(),
    //                 // Define content type
    //                 'Content-Type': 'application/json'
    //             },
    //         });

    //         const data = await response.json();
    //         // AFTER THIS WE HAVE THE DATA BACK FROM SERVER
    //         // CHECK THE DATA then update state!
    //         console.log(data, "<--- data from getGroceries");
    //         setGroceries(data.groceries);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

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
            setSelectedList([data.grocery, ...selectedList])
            console.log(location, "<-- location in AddGrocery in ListPage")
        } catch (err) {
            console.log(err);
        }
    }

    async function removeGrocery(groceryId) {
        try {
          const responseFromTheServer = await fetch(`/api/groceries/${groceryId}`, {
            method: "DELETE",
            headers: {
              // convention for sending jwts in a fetch request
              Authorization: "Bearer " + tokenService.getToken(),
              // We send the token, so the server knows who is making the
              // request
            },
          });
    
          const data = await responseFromTheServer.json(); // <- taking the json from server
          // and turning into a regular object
          setSelectedList(selectedList.filter(grocery => {
            return grocery._id !== groceryId
          }))
          console.log(data);
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
                    <GroceryList 
                    groceries={selectedList}
                    removeGrocery={removeGrocery}
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