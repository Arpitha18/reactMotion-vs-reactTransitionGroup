import React from 'react';
import { findDOMNode } from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import Overlay from 'react-overlays/lib/Overlay';

import Transition, { ENTERED, ENTERING } from 'react-transition-group/Transition';

import injectCss from './injectCss';
const FADE_DURATION = 200;

injectCss(`
  .fade {
    opacity: 0;
    transition: opacity ${FADE_DURATION}ms linear;
  }
  .in {
    opacity: 1;
  }
  .transition-example-modal {
    position: fixed;
    z-index: 1040;
    top: 0; bottom: 0; left: 0; right: 0;
  }
  .transition-example-backdrop {
    position: fixed;
    top: 0; bottom: 0; left: 0; right: 0;
    background-color: #000;
  }
  .transition-example-backdrop.fade.in {
    opacity: 0.5;
  }
  .transition-example-dialog {
    position: absolute;
    width: 400;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #e5e5e5;
    background-color: white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
    padding: 20px;
  }
`);

const fadeStyles = {
  [ENTERING]: 'in',
  [ENTERED]: 'in',
};

const Fade = ({ children, ...props }) => {
  return (
    <Transition {...props} timeout={FADE_DURATION}>
      {(status, innerProps) => React.cloneElement(children, {
        ...innerProps,
        className: `fade ${fadeStyles[status]} ${children.props.className}`,
      })}
    </Transition>
  );
}

// Styles Mostly from Bootstrap
const TooltipStyle = {
  position: 'absolute',
  padding: '0 5px'
};

const TooltipInnerStyle = {
  padding: '3px 8px',
  color: '#fff',
  textAlign: 'center',
  borderRadius: 3,
  backgroundColor: '#000',
  opacity: .75
};

const TooltipArrowStyle = {
  position: 'absolute',
  width: 0, height: 0,
  borderRightColor: 'transparent',
  borderLeftColor: 'transparent',
  borderTopColor: 'transparent',
  borderBottomColor: 'transparent',
  borderStyle: 'solid',
  opacity: .75
};

const PlacementStyles = {
  left: {
    tooltip: { marginLeft: -3, padding: '0 5px' },
    arrow: {
      right: 0, marginTop: -5, borderWidth: '5px 0 5px 5px', borderLeftColor: '#000'
    }
  },
  right: {
    tooltip: { marginRight: 3, padding: '0 5px' },
    arrow: { left: 0, marginTop: -5, borderWidth: '5px 5px 5px 0', borderRightColor: '#000' }
  },
  top: {
    tooltip: { marginTop: -3, padding: '5px 0' },
    arrow: { bottom: 0, marginLeft: -5, borderWidth: '5px 5px 0', borderTopColor: '#000' }
  },
  bottom: {
    tooltip: { marginBottom: 3, padding: '5px 0' },
    arrow: { top: 0, marginLeft: -5, borderWidth: '0 5px 5px', borderBottomColor: '#000' }
  }
};

const ToolTip = props => {
  let placementStyle = PlacementStyles[props.placement];

  let {
    style,
    arrowOffsetLeft: left = placementStyle.arrow.left,
    arrowOffsetTop: top = placementStyle.arrow.top,
    children
  } = props;

  return (
    <div style={{...TooltipStyle, ...placementStyle.tooltip, ...style}}>
      <div style={{...TooltipArrowStyle, ...placementStyle.arrow, left, top }}/>
      <div style={TooltipInnerStyle}>
        {children}
      </div>
    </div>
  );
};

class OverlayExample extends React.Component {

  state = { show: false };

  toggle = () => {
    let show = this.state.show;
    let placements = ['left', 'top', 'right', 'bottom'];
    let placement = this.state.placement;

    placement = placements[placements.indexOf(placement) + 1];

    if (!show) {
      show = true;
      placement = placements[0];
    }
    else if (!placement) {
      show = false;
    }

    return this.setState({ show, placement });
  }

  render(){

    return (
      <div className='overlay-example'>
        <Button
          bsStyle='primary'
          ref={(c) => { this.target = c; }}
          onClick={this.toggle}
        >
          I am an Overlay target
        </Button>
        <p>
          keep clicking to see the overlay placement change
        </p>

        <Overlay
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
          placement={this.state.placement}
          container={this}
          target={() => findDOMNode(this.target)}
          transition={Fade}
        >
          <ToolTip>
            I&rsquo;m placed to the: <strong>{this.state.placement}</strong>
          </ToolTip>
        </Overlay>
      </div>
    );
  }
}

export default OverlayExample;
