import React, {PropTypes} from 'react';
import interactjs from 'interactjs';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as controlActions from '../../actions/controlActions';

class Element extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.createInteractElement = this.createInteractElement.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.onMoveEnd = this.onMoveEnd.bind(this);
    this.selectElement = this.selectElement(this);
  }

  onMoveEnd(event) {
    if(event.dx == 0 && event.dy == 0){
      console.log('not moving');
      return;
    }
    var textEl = event.target.querySelector('p');

    textEl && (textEl.textContent =
      'moved a distance of '
      + (Math.sqrt(event.dx * event.dx +
        event.dy * event.dy)|0) + 'px');

    const x = event.target.getAttribute('data-x');
    const y = event.target.getAttribute('data-y');

    const newElement = Object.assign({}, this.element, {
      x, y
    });
    this.props.actions.updateElementContent(newElement);
  }

  createInteractElement(node) {
    console.log("creating interact", node);
    this.interactElement = interactjs(node)
      .draggable({
        enabled: false,
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
          restriction: "parent",
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: function(event) {
          var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

          // translate the element
          target.style.webkitTransform =
            target.style.transform =
              'translate(' + x + 'px, ' + y + 'px)';

          // update the posiion attributes
          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
        },
        // call this function on every dragend event
        onend: this.onMoveEnd
      })
      .resizable({
        preserveAspectRatio: true,
        edges: { left: true, right: true, bottom: true, top: true }
      })
      .on('resizemove', function (event) {
        var target = event.target,
          x = (parseFloat(target.getAttribute('data-x')) || 0),
          y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width  = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
          'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
      });
  }

  selectElement(e) {
    console.log('selecting ', this.props.element);
  }

  renderContent() {
    return {__html: this.props.element.content};
  }

  render() {
    const style = {
      height: 'auto',
      width: 'auto',
      border: '1px solid black',
      transform: `translate(${this.props.element.x}px, ${this.props.element.y}px)`
    };

    return (
      <div
        onClick={this.selectElement}
        data-x={this.props.element.x}
        data-y={this.props.element.y}
        style={style}
        ref={this.createInteractElement}
        dangerouslySetInnerHTML={this.renderContent()}>
      </div>
    );
  }
}

Element.propTypes = {
  element: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapActionToProps(dispatch) {
  return {
    actions: bindActionCreators(controlActions, dispatch)
  };
}
export default connect(
  mapStateToProps,
  mapActionToProps
)(Element);