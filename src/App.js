import React, { Component } from 'react';
import './App.css';
import data from './celebrityRichList.json';
import List from './components/List';
import CountryList from './components/CountryList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialItems: data.celebrityList, //initial list
      items: [], //filtered/result list
      birthplace: "all", //birthplace status : default by all
      currentCurrency: "$USD", //currency symbol : default by $USD
      currentRate: 1, //currency rate : default by 1
      searchText: "", //input search text : default by empty
      orderBy: "Rank" //order status : default by Rank
    }
  }

  /**
   * Summary. update searchText state and filter the list
   * @param {event} event the input change event
   */
  searchList(event) {
    //update the searchText state
    this.setState({ searchText: event.target.value });
    //filter the list
    this.filterList(event.target.value, this.state.birthplace);
  }

  /**
   * update birthplace state and filter the list
   * @param {event} event the selection event
   */
  filterByCountry(event) {
    //update the birthplace state
    this.setState({ birthplace: event.target.value });
    //filter the list
    this.filterList(this.state.searchText, event.target.value);
  }

  /**
   * Summary. filter list by search text and birthplace selection
   * @param {string} searchText users'input text
   * @param {string} country    users' birthplace selection
   */
  filterList(searchText, country) {
    //the filtered list keep changes, so get the initial list everytime
    var filteredList = this.state.initialItems;
    //filter the list
    filteredList = filteredList.filter(item => {
      //get value of each item and save them into an array
      let fullDetails = [];
      for (var key in item){
        fullDetails.push(item[key]);
      }
      //search input against the full value and filter by country
      return (fullDetails.toString().toLowerCase().search(
        searchText.toLowerCase()) !== -1 && (country === "all" ? true : item.country === country));
    });
    //update the items state to filtered list
    this.setState({ items: filteredList });
  }

  /**
   * Summary. convert currency by selection
   * @param {event} event currency selection event
   */
  convertCurrency(event) {
    //update the currentRate state and currentCurrency state
    this.setState({ 
      currentRate: event.target.value,
      currentCurrency: event.target.options[event.target.selectedIndex].dataset.symbol
    });
  }

  /**
   * Summary. sort current list by selection
   * @param {event} event order selection event
   */
  changeOrder(event) {
    //get current list
    var currentList = this.state.items;
    //sort current list by selection
    currentList.sort((a,b) => {
      switch(event.target.value) {
        case 'rank': return a.rank - b.rank;
        case 'name': return a.name.localeCompare(b.name);
        case 'age' : return a.age - b.age;
        default    : return a.rank - b.rank;
      }
    })
    //update items state
    this.setState({ items: currentList });

  }

  //initialise the list when app loaded
  componentWillMount() {
    this.setState({ items: this.state.initialItems });
  }

  render() {
    return (
      <div className="App">
      {/* App header */}
        <header className="App-header">
          <h1>{data.pageTitleH1}</h1>
          <h2>{data.pageTitleH2}</h2>
          <p>
            {data.description}
          </p>
          <p>Reference:
          <a
              className="App-link"
              href={data.referenceLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.referenceLink}
            </a>
          </p>
        </header>
        {/* End of App header */}
        <main>
          <div className="container">
            <div className="container-contents">
              <div className="content-container">
                <div className="row">
                  <div className="col-sm">
                  {/* Birthplace filter */}
                    <label>Birthplace:</label>
                    <select onChange={this.filterByCountry.bind(this)}>
                      <option value="all">Show All</option>
                      <CountryList items={this.state.initialItems} />
                    </select>
                    {/* End of Birthplace filter */}
                  </div>
                  <div className="col-sm">
                  {/* Currency converter */}
                    <label>Currency Converter:</label>
                    <select name="currencyList" onChange={this.convertCurrency.bind(this)}>
                      <option value={data.usDollarValue} data-symbol="$USD">US Dollar</option>
                      <option value={data.australianDollarValue} data-symbol="$AUD">Australian Dollar</option>
                      <option value={data.euroValue} data-symbol="€">Euro</option>
                    </select>
                    {/* End of Currency converter */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm">
                    {/* Full text Search */}
                    <label>Search:</label>
                    <input placeholder="Search" onChange={this.searchList.bind(this)} />
                    {/* End of Full text Search */}
                  </div>
                  <div className="col-sm">
                    {/* Order controller */}
                    <label>Order By:</label>
                    <select onChange={this.changeOrder.bind(this)}>
                      <option value="rank">Rank</option>
                      <option value="name">Name</option>
                      <option value="age">Age</option>
                    </select>
                    {/* End of Order controller */}
                  </div>
                </div>
                <div className="list-container">
                {/** Result List
                    @items: the filtered list
                    @currency: the current currency selection
                    @rate: the current rate selection
                */}
                  <List 
                  items={this.state.items} 
                  currency={this.state.currentCurrency} 
                  rate={this.state.currentRate} 
                  />
                  {/* End of Result List */}
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
