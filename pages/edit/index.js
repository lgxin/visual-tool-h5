import { Layout} from 'antd';
import {useState, useCallback, useRef, useEffect} from 'react'
const { Header, Footer, Sider, Content } = Layout;
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import ComponentMenu from './../../components/LeftMenu';
import Scaleplate from './../../components/Scaleplate';
import ResultsShow from './../../components/ResultsShow';
import Configuration from './../../components/Configuration';
import PictureImage from './../../components/PictureImage';
import styles from '../../styles/index.module.css'
import { Menu, Item, MenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

const getRightMenu = () => {
  return useSelector(
    (state) => ({
      drapList: state.drapList,
      rightMenu: state.rightMenu
    }),
    shallowEqual
  )
}

export default function Edit() {
    const childRef = useRef();
    const dispatch = useDispatch();
    const {drapList} = getRightMenu();
    const [drapItem, setDrapItem] = useState([]);
    const changeCardList = (list) => {
      setDrapItem([...list]);
      dispatch({type: 'ADD_DRAP_LIST',drapItem:[...list]})
    }
    const {rightMenu} = getRightMenu();
    const handleContextMenuDel = () => {
        if (rightMenu.status) {
          dispatch({type: 'DELECT_DRAP_ITEM',rightMenu})
          console.log(drapItem, '==drapItem')
          // childRef.current.setDrapList(rightMenu.id);
        }
      };
    
      const handleContextMenuCopy = () => {
        if (rightMenu.status) {
            console.log('拷贝')
        }
      };
      const onConTextClick = (type) => {
        if (type === 'del') {
          handleContextMenuDel();
        } else if (type === 'copy') {
          handleContextMenuCopy();
        }
      };
    const MyAwesomeMenu = useCallback(
        () => (
          <Menu id="menu_id">
            <Item onClick={() => onConTextClick('copy')}>复制</Item>
            <Item onClick={() => onConTextClick('del')}>删除</Item>
          </Menu>
        ),
        [onConTextClick],
      );
    return <>
        <Layout>
        <Header className={styles.header}>
          <PictureImage/>
        </Header>
        <Layout className={styles.layout}>
            <Sider theme="light" width="340">
                <ComponentMenu childRef={childRef} drapItem={drapItem} setDrapItem={setDrapItem}/>
            </Sider>
            <Content className={styles.content}>
                <Scaleplate direction="up"/>
                <MenuProvider id="menu_id">
                  <div>
                    <ResultsShow drapItem = {drapItem} changeCardList={changeCardList}/>
                  </div>
                </MenuProvider>
                <Scaleplate direction="left"/>
                <Configuration drapItem = {drapItem}/>
                <MyAwesomeMenu/>
            </Content>
        </Layout>
        {/* <Footer>Footer</Footer> */}
        </Layout>
    </>
}