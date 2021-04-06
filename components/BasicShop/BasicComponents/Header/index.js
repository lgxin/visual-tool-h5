import { memo } from 'react';
import React from 'react';
const Header = (props) => {
  const { height, color, fontSize,text, textAlign,bgColor} = props;
  const style = {
    height,
    color,
    fontSize,
    textAlign,
    lineHeight: height+'px',
    background: bgColor,
  }
  return (
    <>
      <div style={style}>{text}</div>
    </>
  );
};

export default Header;
