import PageHeader from "../../components/PageHeader/PageHeader";
import GroceryFeed from "../../components/GrocerySummary/GrocerySummary";

import { Grid } from "semantic-ui-react";

function FeedPage() {

    const [summary, setSummary] = useState({
        username: "",
        itemCount: "",
        upcomingExpiration: "",
        expiringItem: "",
    })

    async function addSummary() {
        
    }
    
    return(
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <GroceryFeed />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}


export default FeedPage;