import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/lib/integration/react'
import {configurePersistor, configureStore} from './redux/store/store'
import * as serviceWorker from './serviceWorker'
import Loading from './components/loading/Loading'
import App from './App'

// CSS
import './assets/styles/style.css'
import 'antd/dist/antd.css'

// Redux setup
const store = configureStore()
const persistor = configurePersistor(store)
const wrapper = document.getElementById('root')

// store.dispatch(doInit());

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  wrapper,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
