import { useState, useMemo} from 'react';
import { Drawer, Button, Result } from 'antd';
import update from 'immutability-helper';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { DoubleLeftOutlined,DoubleRightOutlined } from '@ant-design/icons';
import FormEditor from './../FormEditor'
import styles from './styles.module.css';

const getStore = () => {
  return useSelector(
    (state) => ({
      drapList: state.drapList,
      rightMenu: state.rightMenu
    }),
    shallowEqual
  )
}
const Configuration = (props) => {
  const dispatch = useDispatch();
  const [visible, setWisible] = useState(false);
  const [drapItem, setDrapItem] = useState({});
  const {drapList, rightMenu} = getStore();
  useMemo(()=>{
    if (rightMenu.status) {
      console.log(rightMenu)
      setWisible(true);
      const pointData = drapList.filter(item => item.id === rightMenu.id);
      console.log(drapItem, '====');
      setDrapItem(...pointData);
      
    }
  },[rightMenu]);
  const onSave = (item) => {
    const drapItemIndex = drapList.findIndex((item) => item.id === rightMenu.id);
    const drapItem = drapList[drapItemIndex]; // 当前在拖拽元素
    drapItem.config = item;
    const updateDrapList = update(drapList, {
      $splice: [[drapItemIndex, 1], [drapItemIndex, 0, drapItem]],
    })
    dispatch({type: 'ADD_DRAP_LIST',drapItem:updateDrapList})
  }
  return (
    <>
        <div className={styles.drawer_show} 
        style={{right:visible?'300px':'0px',transition:'right .31s'}} onClick={()=>{setWisible(!visible);}}>{!visible?(<DoubleLeftOutlined />):(<DoubleRightOutlined />)}</div>
        <Drawer
          title="属性设置"
          placement="right"
          closable={false}
          mask={false}
          width={300}
          onClose={()=>{setWisible(!visible)}}
          visible={visible}
          className='form_editor_drawer'
          footer={<Button type="primary" value="small" style={{width:'100%'}}>删除组件</Button>}
          key="Drawer"
        >
          {
            Object.keys(drapItem).length&&rightMenu.id?(
              <>
                <h4>属性设置</h4>
                <FormEditor
                  config={drapItem.editableEl}
                  onSave = {onSave}
                  defaultValue={drapItem.config}
                  // uid={curPoint.id}
                  // defaultValue={curPoint.item.config}
                  // onSave={handleFormSave}
                  // onDel={handleDel}
                  // rightPannelRef={ref}
                  />
              </>
            ):(
              <>
                <div style={{ paddingTop: '100px',transform: 'scale(0.8)' }}>
                  <Result
                    status="404"
                    title="还没有数据哦"
                    subTitle="赶快拖拽组件来生成你的H5页面吧～"
                  />
                </div>
              </>
            )
          }
        </Drawer>
    </>
  );
};

export default Configuration;
