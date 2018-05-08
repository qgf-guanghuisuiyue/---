import React from 'react';
import ReactDom from 'react-dom';

// css文件
import './scss/main.scss';

import RouterConfig from './routerConfig'

// redux
import { createStore , applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

// 创建一个store
const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

ReactDom.render(
    <Provider store={store}>
        <RouterConfig/>
    </Provider>
,document.getElementById('app'));
