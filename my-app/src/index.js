import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import ModalExample from './ModalExample.js'
import FadeInAndOut from './FadeInOut.js'
import FadeOnClick from './FadeOnClick.js'
import TodoList from './TodoList.js'
import OverlayExample from './OverlayExample';
// Didn't work : import AnotherToDoList from './AnotherToDoList.js';
import MotionExample from './MotionExample.js';
import MotionFade from './MotionFade.js';
import SlideInOut from './SlideInOut.js';


var examplesComponent = React.createElement("div", {}, [
    <FadeOnClick/>,
    <MotionFade/>,
    <MotionExample/>,    
    <SlideInOut/>,
    <ModalExample/>,
    
  ]);
ReactDOM.render(examplesComponent, document.getElementById('root'))


//ReactDOM.render(<MotionExample />, document.getElementById('root'))
//ReactDOM.render(<ModalExample />, document.getElementById('root'))
//ReactDOM.render(<FadeInAndOut />, document.getElementById('root'))
