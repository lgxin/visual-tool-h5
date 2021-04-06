import { Tabs } from 'antd';
import {useState, useImperativeHandle} from 'react'
import template from '../BasicShop/BasicComponents/template';
import schemaH5 from '../../components/BasicShop/schema';
import attribute from './../../components/BasicShop/BasicComponents/attribute';
// import schema from './../../components/BasicShop/BasicComponents/schema';
const {TabPane} = Tabs;
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { HighlightOutlined, PlayCircleOutlined, PieChartOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import styles from '../../styles/componentMenu.module.css';
import TargetBox from './../TargetBox'; // 拖拽容器

let canvasId = 'js_canvas';

// tab 列表
const TabsList = [
	{
		icon: <HighlightOutlined style={{marginRight:0}}/>,
		key: 'BASED_COMPONENT',
		title: '基础组件'
	},
	{
		icon: <PlayCircleOutlined style={{marginRight:0}}/>,
		key: 'BASED_PLAY',
		title: '媒体组件'
	},
	{
		icon: <PieChartOutlined style={{marginRight:0}}/>,
		key: 'BASED_CHART',
		title: '可视化组件'
	}
]
const getDrapList = () => {
	return useSelector(
	  (state) => ({
		drapList: state.drapList
	  }),
	  shallowEqual
	)
  }
export default function LeftMenu({setDrapItem,childRef}) {
	const dispatch = useDispatch();
	// const {drapList} = getDrapList();
	const [cardList, setCardList] = useState([]);
	const changeCardList = (list) => {
		setCardList([...list]);
		setDrapItem([...list]);
		dispatch({type: 'ADD_DRAP_LIST',drapItem:cardList})
	}
	useImperativeHandle(childRef, () => ({
		setDrapList: (id) => {
			console.log(id)
		}
	  }));
    return <>
        <Tabs className={styles.tabs_menu} defaultActiveKey="2" tabPosition='left' size="small" style={{height: '100%'}}>
			{
				TabsList.map(({icon, key, title})=> {
					return (<TabPane tab={icon} key={key}>
					<h4 style={{margin:'20px 0'}}>{title}</h4>
                    <div className={styles.template_list}>
                        {template.map((value, i) => {
                            return (
								<TargetBox 
									config={schemaH5[value.type]}
									item={{
										...value,
										component:schemaH5[value.type],
										config: attribute[value.type]?attribute[value.type].config:'',
										editableEl:  attribute[value.type]?attribute[value.type].editData:''
									}}
									key={i} 
									canvasId={canvasId}
									cardList={ cardList }
									changeCardList={ changeCardList }
									> 
                                    <div>组件</div>
                                </TargetBox>
                            );
                        })}
                    </div>
				</TabPane>)
				})
			}
        </Tabs>
		<DoubleLeftOutlined style={{marginRight:0,position:'absolute',bottom:'40px',left: '20px'}}/>
    </>
}