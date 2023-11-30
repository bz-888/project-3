import { Table } from "semantic-ui-react";

function GroceryItem({ loggedUser, grocery }) {
    
    console.log(grocery, "<-- grocery in GroceryItem")
    
    return (
        <Table.Row>
            <Table.Cell>{grocery.itemName}</Table.Cell>
            <Table.Cell>{grocery.quantity}</Table.Cell>
            <Table.Cell>{grocery.expirationDate}</Table.Cell>
        </Table.Row>
    )
}

export default GroceryItem;