import React from 'react';
import ReactDOM from 'react-dom';
import CountryList from './CountryList';
import data from '.././celebrityRichList.json';

it('Country list renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CountryList items={data.celebrityList} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
