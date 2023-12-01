import GrocerySummary from "../GrocerySummary/GrocerySummary";

import { Card } from "semantic-ui-react";

function GrocerySummaryFeed({
    groceries,
    itemsPerRow
}) {

    // filter groceries... aka return an array where conditions match
    // conditions being where groceries's user property's username value
    // matches the username provided as an argument
    // see below for the argument provided
    function filterGroceries(username) {
        return groceries.filter(grocery => {
            return grocery.user.username === username
        })
    }

    function filterUniqueObjects(value, index, self) {
        // value is the specific value that we are cycling through in the filter below
        // value would be one of the grocery items
        // index is which index position we are on in the filter below
        // self is groceries itself, which filter was applied to
        return (
            // find the index of the first matching username
            // compare that matching username's index to the index of the filter value
            // if it matches, add the object to the output array of filter
            // if it doesn't match, move on
            self.findIndex(
                // Modify this function as you desire. You may want to calculate uniqueness depending only on specific fields, not all
                (obj) => obj.user?.username === value.user?.username
            ) === index
        );
    }

    // define uniquePeople as an array of objects
    // each object is a single grocery object
    // no two objects share a user due to filterUniqueObjects
    // see above for explanation on how filterUniqueObjects works  
    const uniquePeople = groceries.filter(filterUniqueObjects);

    // return an array for each unique person
    // the array's content is defined by filterGroceries
    // filterGroceries, defined above, returns an array of objects
    // the array of objects is limited to when the person is matching the username of the grocery

    const allGroceryLists = uniquePeople.map(person => {
        return filterGroceries(person.user.username)
    })

    // take each person's grocery list, calling each one list
    // pass list as groceries to GrocerySummary
    // return GrocerySummary
    const grocerySummary = allGroceryLists.map((list, index) => {
        return <GrocerySummary key={index} groceries={list} />
    })

    // output grocerySummary which returns GrocerySummary
    return (
        <Card.Group itemsPerRow={itemsPerRow}>
            {grocerySummary}
        </Card.Group>
    )
}

export default GrocerySummaryFeed;