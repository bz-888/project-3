import {
    Table,
    Card
} from "semantic-ui-react";

import { Link } from "react-router-dom";

function GrocerySummary({groceries}) {

    console.log(groceries, "<-- groceries in GrocerySummary");

    // empty array to store dates
    const dateList = [];

    // taking each grocery object within groceries array
    groceries.map(grocery => {
        // add just the expirationDate of each grocery object
        // to the dateList array
        dateList.push(grocery.expirationDate);
    })

    // defined sortedDate as dateList sorted in chronological order
    const sortedDate = dateList.sort((a, b) => {
        return(
            new Date(a) - new Date(b)
        )
    });

    // expirationDate's value is in the following format
    // 2023-12-04T00:00:00.000Z
    // take the string of the earliest date
    // split the string and make it array
    // first value of the array is just the date
    // second value of the array is just the time
    // take the first value AKA just the date and set that
    // equal to summaryDate
    const summaryDate = sortedDate[0].split("T")[0];

    // create an array of all items with an expirationDate
    // that matches the earliest date in sortedDate array
    const expiringItems = groceries.filter(grocery => {
        return(
            grocery.expirationDate === sortedDate[0]
        )
    })

    return (
        <Card>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Person</Table.HeaderCell>
                        <Table.HeaderCell>Item Count</Table.HeaderCell>
                        <Table.HeaderCell>Upcoming Expiration</Table.HeaderCell>
                        <Table.HeaderCell>Expiring Item</Table.HeaderCell>
                        <Table.HeaderCell>Details</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            {groceries[0].user.username}
                        </Table.Cell>

                        <Table.Cell>
                            {groceries.length}
                        </Table.Cell>

                        <Table.Cell>
                            {summaryDate}
                        </Table.Cell>

                        <Table.Cell>
                            {expiringItems[0].itemName}
                        </Table.Cell>

                        <Table.Cell>
                            <Link to={`/groceries/${groceries[0].user.username}`} state={{groceries}}>
                                See Grocery List
                            </Link>
                        </Table.Cell>
                    </Table.Row>
                </Table.Header>
            </Table>
        </Card>
    )
}

export default GrocerySummary;