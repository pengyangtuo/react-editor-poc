import React, {PropTypes} from 'react';
import Frame from 'react-frame-component';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as controlActions from '../../actions/controlActions';
import TinyMCE from 'react-tinymce';

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

  handleEditorChange(e) {
    this.props.actions.updateElementContent({
      id: 1,
      title: 'element-1',
      content: e.target.getContent()
    });
    console.log('Content was updated:', e.target.getContent());
  }

  render() {
    return (
      <div>
        <button onClick={this.createElement}>Add new element</button>
        <TinyMCE
          content="<p>This is the initial content of the editor</p>"
          config={{
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
          }}
          onChange={this.handleEditorChange}
        />
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