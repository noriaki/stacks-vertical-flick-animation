import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
// import { DragDropContextProvider } from 'react-dnd';
import { DragDropManager } from 'dnd-core';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';

import StackItem from './StackItem';

class Stack extends Component {
  static propTypes = {
    stack: PropTypes.arrayOf(PropTypes.number).isRequired,
    isMobile: PropTypes.bool.isRequired,
  }

  state = { stack: this.props.stack }

  backend = this.props.isMobile ? TouchBackend : HTML5Backend

  buildStackItem = (item, i) => (
    <li key={item}>
      <StackItem
        isLast={this.state.stack.length - 1 === i}
        index={i}
        size={this.state.stack.length}
        id={item}
        moveItem={this.moveItem} />
    </li>
  )

  moveItem = (dragIndex, hoverIndex) => {
    const { stack } = this.state;
    const dragItem = stack[dragIndex];
    const nextStack = [...stack];

    nextStack.splice(dragIndex, 1);
    nextStack.splice(hoverIndex, 0, dragItem);

    this.setState({ stack: nextStack });
  }

  render = () => (
    <DragDropContextProvider isMobile={this.props.isMobile}>
      <ul style={styles.ul}>{this.state.stack.map(this.buildStackItem)}</ul>
    </DragDropContextProvider>
  )
}

export default Stack;

const styles = {
  ul: {
    listStyleType: 'none',
    paddingLeft: 0,
    width: '100%',
  },
};

let dndBackendManager;
const getBackendManager = (isMobile) => {
  if (dndBackendManager === undefined) {
    dndBackendManager = new DragDropManager(isMobile ? TouchBackend : HTML5Backend);
  }
  return dndBackendManager;
};

class DragDropContextProvider extends Component {
  static propTypes = {
    isMobile: PropTypes.bool.isRequired,
  }
  static childContextTypes = {
    dragDropManager: PropTypes.object.isRequired,
  }

  getChildContext = () => ({
    dragDropManager: getBackendManager(this.props.isMobile),
  })

  render = () => Children.only(this.props.children)
}
