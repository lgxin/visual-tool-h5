
  import { baseConfig, baseDefault } from '../../common';

  const Icon= {
    editData: [
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
        key: 'color',
        name: '图标颜色',
        type: 'Color',
      },
      {
        key: 'fontSize',
        name: '字体大小',
        type: 'Number',
      }
    ],
    config: {
      align: 'center',
      fontSize: 20,
      color: 'rgba(0,0,0,1)',
    //   ...baseDefault,
    },
  };
  
  export default Icon;
  