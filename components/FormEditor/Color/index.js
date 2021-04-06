import React from 'react';
import { SketchPicker, ColorResult } from 'react-color';
import { rgba2Obj } from '../../../utils';
// import styles from './index.less'


class colorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    color: rgba2Obj(this.props.value),
  }
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };
  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };
  
  handleChange = (color) => {
    this.setState({ color: color.rgb });
    this.props.onChange &&
      this.props.onChange(`rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`);
  };

  render() {
    const color = rgba2Obj(this.props.value);
    return (
      <div>
        <div
          style={{
            // padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
          }}
          onClick={this.handleClick}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '2px',
              background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
            }}
          />
        </div>
        {this.state.displayColorPicker ? (
          <React.Fragment>
            <div
              style={{
                position: 'absolute',
                zIndex: 2000,
                right: '-20px'
              }}
            >
              <SketchPicker color={this.state.color} onChange={this.handleChange} />
            </div>
            <div
              style={{
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
                zIndex: 1000,
              }}
              onClick={this.handleClose}
            />
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

export default colorPicker;
