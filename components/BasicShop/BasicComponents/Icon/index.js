import { MenuOutlined } from '@ant-design/icons';
import React from 'react';
const Icon = (props) => {
  const {align,fontSize,color} = props;
  // const {baseHeight, width, height, baseRadius,baseRotate, baseScale,baseLeft,baseTop, role} = props;
  const style = {
    fontSize: fontSize,
    color: color
  }
  return (
    <div style={{textAlign: align}}>
       <MenuOutlined style={style}/>
    </div>
  );
};

export default Icon;
