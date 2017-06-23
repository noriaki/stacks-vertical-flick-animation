import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContextProvider } from 'react-dnd';
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
    <DragDropContextProvider backend={this.backend}>
      <ul style={styles.ul}>{this.state.stack.map(this.buildStackItem)}</ul>
    </DragDropContextProvider>
  )
}

export default Stack;

const styles = {
  ul: {
    listStyleType: 'none',
    paddingLeft: 0,
  },
};
