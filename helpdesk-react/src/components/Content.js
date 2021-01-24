import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import TicketList from './ticket/TicketList';
import CategoryList from './category/CategoryList';
import CategoryAdd from './category/CategoryAdd';
import ContentWrapper from './ContentWrapper';
import CreateTicket from './ticket/CreateTicket';
import StatusList from './status/StatusList';
import StatusAdd from './status/StatusAdd';
import PriorityList from './priority/PriorityList';
import PriorityAdd from './priority/PriorityAdd';
import UserList from './user/UserList';
import UserAdd from './user/UserAdd';

class Content extends Component {

  render() {
    return <React.Fragment>
      <Switch>
        <Route path="/tickets" exact={true} render={(routeProps, props) => <ContentWrapper {...props} {...routeProps} title="Ticket List"> <TicketList /></ContentWrapper>} />
        <Route path="/tickets/create" exact={true} render={(routeProps, props) => <ContentWrapper {...props} {...routeProps} title="Create Ticket"><CreateTicket /></ContentWrapper>} />
        <Route path="/category" exact={true} render={(routeProps, props) => <ContentWrapper {...props} {...routeProps} title="Category List"><CategoryList /></ContentWrapper>} />
        <Route path="/category/add" render={(routeProps, props) => <ContentWrapper {...props} {...routeProps} title="Create Category" backText="Category List" backTo="/category"><CategoryAdd /></ContentWrapper>} />
        <Route path="/category/edit/:id" render={(routeProps, props) => <ContentWrapper {...props} {...routeProps} title="Edit Category" backText="Category List" backTo="/category"><CategoryAdd {...props} {...routeProps}/></ContentWrapper>} />
        <Route path="/status" exact={true} render={(routeProps, props) => <ContentWrapper {...props} {...routeProps} title="Status List"><StatusList /></ContentWrapper>} />
        <Route path="/status/add" exact={true} render={(routeProps, props) => <ContentWrapper {...props} {...routeProps} title="Create Status" backText="Status List" backTo="/status"><StatusAdd {...props} {...routeProps} /></ContentWrapper>} />
        <Route path="/status/edit/:id" exact={true} render={(routeProps, props) => <ContentWrapper {...props} {...routeProps} title="Edit Status" backText="Status List" backTo="/status"><StatusAdd {...props} {...routeProps} /></ContentWrapper>} />
        <Route path="/priority" exact={true} render={(routeProps, props) => <ContentWrapper {...props} {...routeProps} title="Priority List"><PriorityList /></ContentWrapper>} />
        <Route path="/priority/add" exact={true} render={(routeProps, props) => <ContentWrapper {...props} {...routeProps} title="Create Priority" backText="Priority List" backTo="/priority"><PriorityAdd {...props} {...routeProps} /></ContentWrapper>} />
        <Route path="/priority/edit/:id" exact={true} render={(routeProps, props) => <ContentWrapper {...props} {...routeProps} title="Edit Priority" backText="Priority List" backTo="/priority"><PriorityAdd {...props} {...routeProps} /></ContentWrapper>} />
        <Route path="/users" exact={true} render={(routeProps, props) => <ContentWrapper {...props} {...routeProps} title="User List"><UserList {...props} {...routeProps}/></ContentWrapper>} />
        <Route path="/users/add" exact={true} render={(routeProps, props) => <ContentWrapper {...props} {...routeProps} title="Create User" backText="User List" backTo="/users"><UserAdd {...props} {...routeProps}/></ContentWrapper>} />
        <Route path="/users/edit/:id" exact={true} render={(routeProps, props) => <ContentWrapper {...props} {...routeProps} title="Edit User" backText="User List" backTo="/users"><UserAdd {...props} {...routeProps}/></ContentWrapper>} />
      </Switch>
    </React.Fragment>
  }
}

export default Content;
