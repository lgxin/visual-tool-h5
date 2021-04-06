const Header = {
    editData: [
      {
        key: 'bgColor',
        name: '背景色',
        type: 'Color',
      },
      {
        key: 'height',
        name: '高度',
        type: 'Number',
      },
      {
        key: 'logo',
        name: 'logo',
        type: 'Upload',
        isCrop: true,
        cropRate: 1000 / 618,
      },
      {
        key: 'logoText',
        name: '文字',
        type: 'Text',
      },
      {
        key: 'text',
        name: '文字',
        type: 'Text',
      },
      {
        key: 'color',
        name: '文字颜色',
        type: 'Color',
      },
      {
        key: 'fontSize',
        name: '文字大小',
        type: 'Number',
      },
      {
        key: 'textAlign',
        name: '对齐方式',
        type: 'Radio',
        range: [
          {
            key: 'left',
            text: '左',
          },
          {
            key: 'center',
            text: '中',
          },
          {
            key: 'right',
            text: '右',
          }
        ]
      },
    ],
    config: {
      bgColor: 'rgba(0,0,0,1)',
      logo: [
        {
          uid: '001',
          name: 'image.png',
          status: 'done',
          url: 'http://49.234.61.19/uploads/3_1740be8a482.png',
        },
      ],
      logoText: '页头Header',
      fontSize: 20,
      text: 'header',
      color: 'rgba(255,255,255,1)',
      textAlign: 'center',
      height: 50
    },
  };
  
  export default Header;