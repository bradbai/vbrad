import React, { Component } from 'react';

/**
 * Summary. filtered result list
 */
class List extends Component {
    //list item view
    ListItem(props) {
        return (
            <div className="card bg-light">
                <div className="card-header">No. {props.item.rank}</div>
                <div className="card-body">
                    <p className="card-text">Name: {props.item.name}</p>
                    <p className="card-text">Net Worth: {props.currency} {(props.item.netWorth*props.rate).toLocaleString()}</p>
                    <p className="card-text">Age: {props.item.age}</p>
                    <p className="card-text">Country of Birth: {props.item.country}</p>
                </div>
            </div>
        ) 
    }

    render() {
        //check if there's any results
        if (this.props.items.length) {
            return (
                //render each item
                this.props.items.map(item => {
                    return <this.ListItem 
                        key={item.rank}
                        item = {item}
                        rate = {this.props.rate}
                        currency = {this.props.currency}
                    />
                }))
        }
        //return no result view
        return (
            <div className="card bg-light">
                <div className="card-header">No Results Found</div>
            </div>
        )
    }
}

export default List;