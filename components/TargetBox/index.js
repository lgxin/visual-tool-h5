import React, { useMemo,useState, memo, ReactNode, useContext, CSSProperties } from 'react';
import { useDrag,DragSource } from 'react-dnd';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

const getDrapList = () => {
  return useSelector(
    (state) => ({
      drapList: state.drapList
    }),
    shallowEqual
  )
}

let id = 1;
const TargetBox = (props) => {
    const { item,getDragItem,config,cardList, changeCardList } = props;
    const [{ isDragging }, drager] = useDrag({
      item:{
        type: 'Box'
      },
      begin(monitor) {
        const useless = cardList.find((item) => item.id === -1);
        // 拖拽开始时，向 cardList 数据源中插入一个占位的元素，如果占位元素已经存在，不再重复插入
        if (!useless) {
            changeCardList([{ bg: "aqua", category: '放这里',...item, id: -1 }, ...cardList]);
        }
        return item;
      },
      end(_, monitor) {
        // monitor.didDrop() false 鼠拖拽结束没在放置区域
        // getDragItem({item:{...item,config},drapStatus: monitor.didDrop()})
        const uselessIndex = cardList.findIndex((item) => item.id === -1);
        /**
         * 拖拽结束时，判断是否将拖拽元素放入了目标接收组件中
         *  1、如果是，则使用真正传入的 box 元素代替占位元素
         *  2、如果否，则将占位元素删除
         */
        if (monitor.didDrop()) {
            cardList.splice(uselessIndex, 1, { ...monitor.getItem(), id: id++ });
        } else {
            cardList.splice(uselessIndex, 1);
        }
        // 更新 cardList 数据源
        changeCardList(cardList);
      },
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    })
    const containerStyle = useMemo(
      () => ({
        opacity: isDragging? 0.4:1,
        cursor: 'move',
        height: '140px',
      }),
      [isDragging],
    );
    return (
      <>
        <div>
          <div ref={ drager }  style={{ ...containerStyle }}>
            <div
              style={{
                height: '110px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {props.children}
            </div>
            <div
              style={{
                height: '30px',
                lineHeight: '30px',
                textAlign: 'center',
                backgroundColor: 'rgba(245, 245, 245, 1)',
                color: 'rgba(118, 118, 118, 1)',
              }}
            >
              {props.item.displayName}
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default TargetBox;