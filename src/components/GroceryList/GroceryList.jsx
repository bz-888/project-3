import GroceryItem from "../GroceryItem/GroceryItem";

import { Table } from "semantic-ui-react";

function GroceryList({ loggedUserGroceries }) {


    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Item</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Expiration Date</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                
            </Table.Body>
        </Table>
    )
}

export default GroceryList;