import '@ant-design/v5-patch-for-react-19'  //سازگاری انت5 با ریکت19
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import store from './store/store.jsx'
import fa_IR from 'antd/locale/fa_IR'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider direction="rtl" locale={fa_IR}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
)