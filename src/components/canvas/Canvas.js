import React, {PropTypes} from 'react';
import Frame from 'react-frame-component';
import {connect} from 'react-redux';
import Element from './Element';

class Canvas extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.renderElements = this.renderElements.bind(this);
  }

  renderElements(elements) {
    return elements.map((e, idx) => {
      return (<Element key={idx} content={e.content}>{e.title}</Element>);
    });
  }

  render() {
    const style = {
      width: 500,
      height: 500
    };

    return (
      <Frame style={style}>
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