import React, { Component } from 'react';

class PagePart extends Component {
    render() {
        return (
            <div className="fill">
                <h3 className="page-title pull-left">{this.props.title}</h3>
                <div className="page-content">
                    {this.props.children}
                </div>    
            </div>
        );
    }
}

export default PagePart;