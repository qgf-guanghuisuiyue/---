import React from 'react'
import {Link} from 'react-router'

class Navbar extends React.Component{
    render(){
        return(
            <div className="nav">
                <ul>
                    <li><Link to="home" activeClassName="active">金融圈</Link></li>
                    <li><Link to="policiesRegulations" activeClassName="active">政策法规</Link></li>
                    <li><Link to="popleInterview" activeClassName="active" >人物专访</Link></li>
                </ul>
            </div>
        )
    }
}
export default Navbar

