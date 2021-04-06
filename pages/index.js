import Head from 'next/head'
import { AppleOutlined, CodeOutlined } from '@ant-design/icons';

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>H5-可视化编辑</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Visual-Tool-H5可视化编辑器
        </h1>
        <div className={styles.grid}>
          <a href="/edit" className={styles.card}>
            <h3><AppleOutlined /></h3>
            <p>制作h5页面</p>
          </a>
          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3><CodeOutlined /></h3>
            <p>在线 编程</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
