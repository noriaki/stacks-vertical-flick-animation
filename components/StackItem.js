import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  borderLeft: 'none',
  borderRight: 'none',
  padding: '0.5rem 0',
  marginBottom: '.5rem',
  backgroundColor: '#d0d0d0',
  height: 150,
  position: 'absolute',
  width: '100%',
};

const itemSource = {
  beginDrag: props => ({
    id: props.id,
    index: props.index,
  }),
};

const itemTarget = {
  hover: (props, monitor, component) => {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) { return; }
    // eslint-disable-next-line react/no-find-dom-node
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) { return; }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) { return; }

    props.moveItem(dragIndex, hoverIndex);
    // eslint-disable-next-line no-param-reassign
    monitor.getItem().index = hoverIndex;
  },
};

class StackItem extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isLast: PropTypes.bool.isRequired,
    isDragging: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    moveItem: PropTypes.func.isRequired,
  }

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      isLast,
      isDragging,
      index,
      size,
      id,
    } = this.props;
    const order = (size - 1 - index) * 4;
    const finalStyle = {
      ...style,
      cursor: isLast ? 'move' : 'default',
      opacity: isDragging ? 0 : 1,
      top: (32 * index) + 16,
      left: `${order}%`,
      width: `${100 - (order * 2)}%`,
    };
    const elem = <div style={finalStyle}>No. {id}</div>;
    return connectDropTarget(isLast ? connectDragSource(elem) : elem);
  }
}

const dropTarget = DropTarget('item', itemTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}));
const dragSource = DragSource('item', itemSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}));

export default dragSource(dropTarget(StackItem));
