import { Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

function PageHeader() {

    return(
        <Segment>
            <Header as="h2">
                This is the header!
            </Header>
        </Segment>
    )

}

export default PageHeader;