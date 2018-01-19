import React from 'react'
import ReactDOM from 'react-dom'
import { Transition} from 'react-transition-group'

const duration = 300;

const defaultStyle = {
  position: 'relative',
  left: '0px',
//  width : '100px',
 // border: '1px solid #73AD21',
  transition: 'left 1s'
}

const transitionStyles = {
  entering: { left: '0px' },
  entered: { left: '400px' },
};

const Slide = ({ in: inProp }) => (
  <Transition in={inProp} timeout={duration}>
    {(state) => (
      <div class="demo0-block" style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
      </div>
    )}
  </Transition>
);

export default class SlideInOut extends React.Component {
  state = { show: false }

  handleToggle() {
    this.setState(({ show }) => ({
      show: !show
    }))
  }
  
  render() {
    const { show } = this.state
    return (
      <div>
        <button onClick={() => this.handleToggle()}>
          Sliding effect using transition-group
        </button>
        <div class="demo0">
          <Slide in={!!show} />
        </div>
      </div>
    )
  }
}   