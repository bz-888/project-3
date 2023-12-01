import { Table, Button, Icon } from "semantic-ui-react";

function GroceryItem({ grocery, removeGrocery }) {

    console.log(grocery, "<-- grocery in GroceryItem");

    return (
        <Table.Row>
            <Table.Cell>{grocery.itemName}</Table.Cell>
            <Table.Cell>{grocery.quantity}</Table.Cell>
            <Table.Cell>{grocery.expirationDate.split("T")[0]}</Table.Cell>
            <Table.Cell>
                <Button 
                animated
                onClick={() => removeGrocery(grocery._id)}
                >
                    <Button.Content visible>Remove</Button.Content>
                    <Button.Content hidden>
                        <Icon name='trash' />
                    </Button.Content>
                </Button>
            </Table.Cell>
        </Table.Row>
    )
}

export default GroceryItem;