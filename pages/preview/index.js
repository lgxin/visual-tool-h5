import { Layout} from 'antd';
import {useState, useCallback, useRef, useEffect} from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import ResultsShow from './../../components/ResultsShow';
import { Menu, Item, MenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

const getDrapList = () => {
  return useSelector(
    (state) => ({
      drapList: state.drapList
    }),
    shallowEqual
  )
}

export default function Edit() {
    const {drapList} = getDrapList();
    console.log(drapList)
    return <>
        <div style={{
            maxWidth: '750px',
            minWidth: '100%',
            height: '1000px',
            margin: '0 auto',
        }}>
            {drapList.length?drapList.map(item => <div>{item.component(item.config)}</div>):''}
        </div>
    </>
}

