import React, { Component } from 'react';

/**
 * Summary. get the country list from existing data set
 */
class CountryList extends Component {
    //use option tag as the view
    CountryOption(props) {
        return (<option>{props.item}</option>);
    }
    //render the full country list from existing data set
    render() {
        const countryList = [];
        return (
            this.props.items.map(c => {
                if (countryList.indexOf(c.country) === -1) {
                    countryList.push(c.country)
                    return (
                    <this.CountryOption 
                        key={c.country}
                        item={c.country}
                    />)
                }
                return null;
            })
        )
    }
}

export default CountryList;