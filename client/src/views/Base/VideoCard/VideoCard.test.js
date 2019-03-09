import React from 'react';
import ReactDOM from 'react-dom';
import VideoCard from './VideoCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Jumbotrons />, div);
  ReactDOM.unmountComponentAtNode(div);
});
