import GroceryItem from "../GroceryItem/GroceryItem";

import { Table } from "semantic-ui-react";

function GroceryList({ groceries, removeGrocery }) {

    const groceryItem = groceries.map((grocery, index) => {
        return <GroceryItem key={index} grocery={grocery} removeGrocery={removeGrocery} />
    })

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Item</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Expiration Date</Table.HeaderCell>
                    <Table.HeaderCell>Consumed/Trashed</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {groceryItem}
            </Table.Body>
        </Table>
    )
}

export default GroceryList;