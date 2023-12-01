   
import { Header, Segment, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

function PageHeader({ loggedUser, handleLogout }) {

    return (
        <Segment clearing>
            <Header as="h2" floated="right">
                <Link to="/">
                    <Icon name="home" />
                </Link>
                <Link to="/add">
                    <Icon name="food" />
                </Link>
                <Link to="" onClick={handleLogout}>
                    Logout
                </Link>
            </Header>
        </Segment>
    )

}

export default PageHeader;