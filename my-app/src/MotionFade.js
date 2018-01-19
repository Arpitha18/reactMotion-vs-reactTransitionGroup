import React from 'react';
import {Motion, TransitionMotion, spring,presets} from 'react-motion';

export default class MotionExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  };

  handleMouseDown = () => {
    this.setState({open: !this.state.open});
  };

  handleTouchStart = (e) => {
    e.preventDefault();
    this.handleMouseDown();
  };
  
  getStyles = () =>{
    let styles = {};
      if(this.state.open){
        styles.opacity = spring(1,presets.gentle);
      }else {
        styles.opacity = spring(0,presets.gentle);
      }
    return [
      { key: 'one', style: styles, data: 'Fade Transition!'}
    ];
  }

  render() {
    return (
      <div>
        <button
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}>
          Fading effect using react-motion
        </button>

        <TransitionMotion
            defaultStyles={[
              { 
                /*key: 'one', style: {
                  opacity: 0
                }*/
              } 
            ]}
            styles={this.getStyles}
          >
            {(styles) => (
              <div>
                { styles.map(({ key, style, data}) => (
                  <div key={key} style={{
                  padding: 20,
                  display: 'inline-block',
                  backgroundColor: '#8787d8',
                  ...style
                  }}>{ data }</div>
                ))}
              </div>
            )}
          </TransitionMotion>
      </div>
    );
  };
}
