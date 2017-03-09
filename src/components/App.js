import React, {PropTypes} from 'react';
import Canvas from './canvas/Canvas';
import Control from './control/Control';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: {
        elements: [

        ]
      }
    };
  }

  render () {
    return (
      <div>
        <div>
          <Canvas/>
        </div>
        <div>
          <h1>I'm control panel</h1>
          <Control/>
        </div>
      </div>
    );
  }
}

export default App;