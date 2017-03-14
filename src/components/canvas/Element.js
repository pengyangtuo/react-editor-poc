import React, {PropTypes} from 'react';
import interactjs from 'interactjs';

class Element extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.createInteractElement = this.createInteractElement.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  createInteractElement(node) {
    console.log("creating interact", node);
    interactjs(node)
      .draggable({
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
        onend: function (event) {
          var textEl = event.target.querySelector('p');

          textEl && (textEl.textContent =
            'moved a distance of '
            + (Math.sqrt(event.dx * event.dx +
              event.dy * event.dy)|0) + 'px');
        }
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

  renderContent() {
    return {__html: this.props.content};
  }

  render() {
    const style = {
      height: 'auto',
      width: 'auto',
      border: '1px solid black'
    };

    return (
      <div
        style={style}
        ref={this.createInteractElement}
        dangerouslySetInnerHTML={this.renderContent()}>
      </div>
    );
  }
}

Element.propTypes = {
  content: PropTypes.string.isRequired
};

export default Element;