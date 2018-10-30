import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import data from '.././celebrityRichList.json';

it('Filtered list renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <List 
    items={data.celebrityList} 
    currency="$AUD" 
    rate="0.92"  
    />, div);
  ReactDOM.unmountComponentAtNode(div);
});