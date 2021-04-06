import { DndProvider } from 'react-dnd';
import { Provider } from 'react-redux'
import {HTML5Backend} from 'react-dnd-html5-backend';
import { useStore } from '../redux/store'

import '../styles/globals.css'
import 'antd/dist/antd.css';
function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  return <>
      <Provider store={store}>
        <DndProvider backend={ HTML5Backend }>
          <Component {...pageProps} /> 
        </DndProvider>
      </Provider>
  </>
}

export default MyApp
