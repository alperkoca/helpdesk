import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class ContentWrapper extends Component {
  
  render() {
    return <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">{this.props.title}</h1>
            </div>
           {
             this.props.backText &&
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                   {
                     this.props.backTo ? <Link to={this.props.backTo}>{this.props.backText}</Link> : this.props.backText
                   }
                </li>
              </ol>
            </div>
          }
           
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    </div>
  }
}
