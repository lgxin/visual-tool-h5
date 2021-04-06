// import { Tabs } from 'antd';
import {useState, useImperativeHandle} from 'react'
import styles from './style.module.css'

export default function Loading({}) {
	// const dispatch = useDispatch();

    return <>
		<div>
            <div class={styles.spinner}></div>
        </div>
    </>
}