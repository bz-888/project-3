import PageHeader from "../../components/PageHeader/PageHeader";
import GroceryItem from "../../components/GroceryItem/GroceryItem";
import AddGroceryForm from "../../components/AddGroceryForm/AddGroceryForm";
import { 
    Grid,
    Header,
} from "semantic-ui-react";
import { useEffect, useState } from "react";

function ListPage() {

    const [groceryItem, setGroceryItem] = useState();

    useEffect(() => {
        getGroceries();
    });

    async function addGrocery() {
        try{

            const response = await fetch("/api/groceries", {
                method: "POST",
                headers: {
                  // convention for sending jwts in a fetch request
                  Authorization: "Bearer " + tokenService.getToken(),
                  // We send the token, so the server knows who is making the
                  // request
                },
              });
        
              const data = await response.json();
              console.log(data);
              setPosts(data.posts);

        } catch(err) {
            console.log(err);
        }
    }

    return(
        <Grid> 
            <Grid.Row>
                <Grid.Column>
                    <PageHeader />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <AddGroceryForm />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}


export default ListPage;