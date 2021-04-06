import React, { CSSProperties, useCallback,useState } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import update from 'immutability-helper';
import DndList from './dndList';

const style = {
    width: '375px',
    minHeight: '664px',
    backgroundColor: '#fff',
    boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.2)',
    border: '1px solid #cccccc',
    marginBottom: '200px'
}
const getDrapList = () => {
    return useSelector(
      (state) => ({
        drapList: state.drapList
      }),
      shallowEqual
    )
  }
export default function ResultsShow({changeCardList}) {
    // 第一个参数是 collect 方法返回的对象，第二个参数是一个 ref 值，赋值给 drop 元素
    const {drapList:drapItem} = getDrapList();
    const [collectProps, droper] = useDrop({
        // accept 是一个标识，需要和对应的 drag 元素中 item 的 type 值一致，否则不能感应
        accept: 'Box',
        // collect 函数，返回的对象会成为 useDrop 的第一个参数，可以在组件中直接进行使用
        collect: (minoter) => ({
            isOver: minoter.isOver()
        })
    }) 
    // setCardList(props||[])
    // 拖拽判断
    // if (drapItem.drapStatus) {
    //   const index = cardList.findIndex(item => { return item.type == drapItem.item.type})
    //   if (index == -1){
    //     setCardList([...cardList, {id: 3, category: drapItem.item.config, type: drapItem.item.type, bg: 'green'}])
    //   }
    // }
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        /**
         * 1、如果此时拖拽的组件是 Box 组件，则 dragIndex 为 undefined，则此时修改，则此时修改 cardList 中的占位元素的位置即可
         * 2、如果此时拖拽的组件是 Card 组件，则 dragIndex 不为 undefined，此时替换 dragIndex 和 hoverIndex 位置的元素即可
         */
        if (dragIndex === undefined) {
            const lessIndex = drapItem.findIndex((item) => item.id === -1);
            changeCardList(update(drapItem, {
                $splice: [[lessIndex, 1], [hoverIndex, 0, { bg: "aqua", category: '放这里', id: -1 }]],
            }));
        } else {
            const dragCard = drapItem[dragIndex];
            changeCardList(update(drapItem, {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
            }));
        }
    }, [drapItem])
    // const bg = collectProps.isOver ? 'deeppink' : 'white';
    return <div style={{
        position: 'absolute',
        height: '110vh',
        left: '30%',
        top: '-100px',
        width: '100%',
        paddingTop: '200px',
        overflowY: 'auto',
        overflowX: 'hidden',
    }}>
            <div ref={ droper } style={{...style}} >
                {
                    drapItem.length <= 0 ? <div style={{ lineHeight: '60px' }}></div>
                        : drapItem.map((item, index) => <DndList index={ index } key={ item.id } moveCard={ moveCard } { ...item } />)
                }
            </div>
            <div style={{opacity: 0}}>
                <div style={{...style,borderWidth:0, width: '380px'}} >
                    <div id="resultsShow">
                        {
                            drapItem.length <= 0 ? <div style={{ lineHeight: '60px' }}></div>
                                : drapItem.map((item, index) => <DndList index={ index } key={ item.id } moveCard={ moveCard } { ...item } />)
                        }
                    </div>
                </div>
            </div>
           
    </div>
}