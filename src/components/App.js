import React, {PropTypes} from 'react';
import Canvas from './canvas/Canvas';
import Control from './control/Control';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render () {
    return (
      <div>
        <Canvas/>
        <Control/>
      </div>
    );
  }
}

export default App;
