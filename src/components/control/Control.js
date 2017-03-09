import React, {PropTypes} from 'react';
import Frame from 'react-frame-component';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as controlActions from '../../actions/controlActions';

class Control extends React.Component {
  constructor(props, context){
    super(props, context);

    this.createElement = this.createElement.bind(this);
  }

  createElement() {
    const id = this.props.elements.length + 1;
    const newElement = {
      id,
      title: `element-${id}`
    };
    this.props.actions.createElement(newElement);
  }

  render() {
    return (
      <div>
        <button onClick={this.createElement}>Add new element</button>
      </div>
    );
  }
}

Control.propTypes = {
  actions: PropTypes.object.isRequired,
  elements: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    elements: state.elements
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(controlActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Control);