import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group'
import './styles.css';


const Fade = ({ children, ...props }) => (
    <CSSTransition
      {...props}
      timeout={1000}
      classNames="fade"
    >
      {children}
    </CSSTransition>
  );
  
export default class FadeInAndOut extends React.Component {
    constructor(...args) {
      super(...args);
      this.state = { show: false }
  
      setInterval(() => {
        this.setState({ show: !this.state.show })
      }, 2000)
    }
    render() {
      return (
        <Fade in={this.state.show}>
          <div className='greeting'>Hello world</div>
        </Fade>
      )
    }
  }