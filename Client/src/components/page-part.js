import React, { Component } from 'react';

class PagePart extends Component {
    render() {
        return (
            <div className="div-title">
                <h3 className="page-title">{this.props.title}</h3>
                <div className="">
                    {this.props.children}
                </div>    
            </div>
        );
    }
}

export default PagePart;