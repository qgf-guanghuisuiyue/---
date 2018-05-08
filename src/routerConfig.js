import React from 'react'
import {Router,hashHistory,Route,IndexRoute,Redirect} from 'react-router'

import App from './components/App'
import Home from './components/Home'
import PoliciesRegulations from './components/policiesRegulations'
import PopleInterview from './components/popleInterview'
import Article from './components/Article'

const RouterConfig=()=>{
    return(<Router history={hashHistory}>
        <Redirect from="/" to="home" />
        <Route path="/" component={App}> 
            <IndexRoute component={Home}/>
            <Route path="home" component={Home}/>
            <Route path="policiesRegulations" component={PoliciesRegulations}/>
            <Route path="popleInterview" component={PopleInterview}/>
            <Route path="article" component={Article}>
                <Route path=":aid" component={Article}/>
            </Route>
        </Route>
    </Router>)
}
export default RouterConfig


