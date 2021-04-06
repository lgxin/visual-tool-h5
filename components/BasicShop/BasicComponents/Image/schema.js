
  import { baseConfig, baseDefault } from '../../common';

  const Image= {
    editData: [
      ...baseConfig,
      {
        key: 'translate',
        name: '文字偏移',
        type: 'Pos',
      },
      {
        key: 'align',
        name: '对齐方式',
        type: 'Select',
        range: [
          {
            key: 'left',
            text: '左对齐',
          },
          {
            key: 'center',
            text: '居中对齐',
          },
          {
            key: 'right',
            text: '右对齐',
          },
        ],
      },
      {
        key: 'titText',
        name: '标题文字',
        type: 'Text',
      },
      {
        key: 'titFontSize',
        name: '标题大小',
        type: 'Number',
      },
      {
        key: 'titColor',
        name: '标题颜色',
        type: 'Color',
      },
      {
        key: 'titFontWeight',
        name: '标题粗细',
        type: 'Select',
        range: [
          {
            key: '300',
            text: '300 x 300',
          },
          {
            key: '400',
            text: '400 x 400',
          },
          {
            key: '500',
            text: '500 x 500',
          },
          {
            key: '600',
            text: '600 x 600',
          },
        ],
      },
      {
        key: 'subTitText',
        name: '副标题文字',
        type: 'Text',
      },
      {
        key: 'subTitFontSize',
        name: '副标题大小',
        type: 'Number',
      },
      {
        key: 'subTitColor',
        name: '副标题颜色',
        type: 'Color',
      },
      {
        key: 'subTitFontWeight',
        name: '副标题粗细',
        type: 'Select',
        range: [
          {
            key: '300',
            text: '300 x 300',
          },
          {
            key: '400',
            text: '400 x 400',
          },
          {
            key: '500',
            text: '500 x 500',
          },
          {
            key: '600',
            text: '600 x 600',
          },
        ],
      },
      {
        key: 'imgUrl',
        name: '上传图片',
        type: 'Upload',
        isCrop: false,
      },
      {
        key: 'round',
        name: '圆角',
        type: 'Number',
      },
    ],
    config: {
      translate: [0, 0],
      align: 'center',
      titText: '',
      titFontSize: 20,
      titColor: 'rgba(0,0,0,1)',
      titFontWeight: '400',
      subTitText: '',
      subTitFontSize: 16,
      subTitColor: 'rgba(0,0,0,1)',
      subTitFontWeight: '400',
      imgUrl: {
        uid: '001',
        name: 'image.png',
        status: 'done',
        url: 'https://pic2.zhimg.com/v2-0ddee254f0dca6a0d2a76374bf0e3345_qhd.jpg?source=172ae18b',
      },
      round: 0,
      ...baseDefault,
    },
  };
  
  export default Image;
  