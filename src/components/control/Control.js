import React, {PropTypes} from 'react';
import Frame from 'react-frame-component';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as controlActions from '../../actions/controlActions';
//import TinyMCE from 'react-tinymce';
import TinyMCEInput from 'react-tinymce-input';

class Control extends React.Component {
  constructor(props, context){
    super(props, context);

    this.createElement = this.createElement.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  createElement() {
    const id = this.props.elements.length + 1;
    const newElement = {
      id,
      title: `element-${id}`,
      content: '<h3>new element</h3>'
    };
    this.props.actions.createElement(newElement);
  }

  handleEditorChange(newValue) {
    const newElement = Object.assign({}, this.props.currentElement, {
      content: newValue
    });
    this.props.actions.updateElementContent(newElement);
  }

  render() {
    return (
      <div className="lce-control">
        <button onClick={this.createElement}>Add new element</button>
        <TinyMCEInput
          value={this.props.currentElement == null ? "Change me" : this.props.currentElement.content}
          tinymceConfig={{
            plugins: 'link image code',
            toolbar: 'fontselect | undo redo | bold italic | alignleft aligncenter alignright | code',
            font_formats: 'Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n'
          }}
          onChange={this.handleEditorChange}
        />
      </div>
    );
  }
}

Control.propTypes = {
  actions: PropTypes.object.isRequired,
  elements: PropTypes.array.isRequired,
  currentElement: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    elements: state.elements,
    currentElement: state.currentElement
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
