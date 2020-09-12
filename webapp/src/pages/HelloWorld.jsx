import React from 'react';
import SteedosComponent from '../components/SteedosComponent';

class HelloWorld extends React.Component {
  render() {
    return (
      <div>hello world.
        <SteedosComponent template="creator_about"/>
      </div>
    )
  }
}

export default HelloWorld