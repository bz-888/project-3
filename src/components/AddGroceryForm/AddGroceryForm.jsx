import { useState } from "react";

import {
    Button,
    Form,
    Grid,
    Header,
    Segment,
} from "semantic-ui-react";

function AddGroceryForm({addGrocery}) {


    const [grocery, setGrocery] = useState({
        itemName: "",
        quantity: "",
        expirationDate: "",
    });

    function handleChange(e) {
        setGrocery({
            ...grocery,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        addGrocery(grocery);
    }

    return (
        <Grid textAlign="center">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="green" textAlign="center">
                    Add an Item to Your Fridge
                </Header>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input
                            name="itemName"
                            placeholder="item name"
                            value={grocery.itemName}
                            onChange={handleChange}
                            required
                        />
                        <Form.Input
                            name="quantity"
                            placeholder="quantity"
                            value={grocery.quantity}
                            onChange={handleChange}
                            required
                        />
                        <Form.Input
                            name="expirationDate"
                            type="date"
                            placeholder="expiration date"
                            value={grocery.expirationDate}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" className="btn">
                            Add Grocery Item
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );

}

export default AddGroceryForm;