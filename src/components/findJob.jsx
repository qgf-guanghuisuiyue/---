import React, {Component} from 'react';
import ReactDom from 'react-dom';

export default class AppDoanLoad extends Component {
    goBack = () => {
        this.props.hideFindJob();
    }
    render(){
        return(
            <div className="appDownLoad">
               <div 
                    className="down-back"
                    onClick={this.goBack}
                >
                    <img src="static/images/back.png"/>
                </div>
                <div className="wxxcx">
                    <img src="static/images/wxxcx.jpg"/>
                </div>
                <div className="explain">
                    长按识别上图中的小程序码进入小程序
                </div>
            </div>
        )
    }


}