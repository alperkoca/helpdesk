import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';

class ActiveLink extends Component {
    render() {
        return <Route path={this.props.to} exact={this.props.exact} children={routeProps => {
            const baseClasses = this.props.className || 'nav-link';
            const activeClass = this.props.activeClass || 'active';
            const finalClasses = `${baseClasses} ${routeProps.location.pathname === routeProps.match?.url ? activeClass : ""}`;            
            return <Link to={this.props.to} className={finalClasses}>
                {this.props.children}
            </Link>
        }} />
    }
}


export default ActiveLink;