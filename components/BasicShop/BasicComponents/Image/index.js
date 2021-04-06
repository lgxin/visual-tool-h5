import { MenuOutlined } from '@ant-design/icons';
import React from 'react';
import {getBase64Image} from '../../../../utils'

const Image = (props) => {
  const {baseHeight, width, height, baseRadius,baseRotate, baseScale,baseLeft,baseTop, role, imgUrl} = props;
  console.log(imgUrl, '===imgUrl');
  return (
    <>
       <div style={{
        overflow:'hidden'
       }}>
           <img crossorigin="anonymous" style={{
             width:'100%',
             borderRadius:baseRadius,
             transform: `rotate(${baseRotate}deg) scale(${baseScale/100})`,
             marginLeft: baseLeft,
             marginTop: baseTop
           }}  src={imgUrl.url} alt="图片"/>
       </div>
    </>
  );
};

export default Image;
