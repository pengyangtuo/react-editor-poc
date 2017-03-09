import React, {PropTypes} from 'react';
import Frame from 'react-frame-component';
import {connect} from 'react-redux';

class Canvas extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.renderElements = this.renderElements.bind(this);
  }

  renderElements(elements) {
    return elements.map((e, idx) => {
      return (<div key={idx}>{e.title}</div>);
    });
  }

  render() {
    return (
      <Frame>
        <h1>Inside iframe</h1>
        <div>
          {this.renderElements(this.props.elements)}
        </div>
      </Frame>
    );
  }
}

Canvas.propTypes = {
  elements: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps){
  return {
    elements: state.elements
  };
}

export default connect(
  mapStateToProps
)(Canvas);