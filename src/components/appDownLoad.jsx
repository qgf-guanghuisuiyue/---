import React, {Component} from 'react';
import ReactDom from 'react-dom';

export default class AppDoanLoad extends Component {
    goBack = () => {
        this.props.hideAppDownLoad();
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
                <h1>金融人才求职招聘</h1>
                <p>51金融圈-金融职业专家</p>
                <div className="personal">
                    <a href="https://itunes.apple.com/cn/app/51%E9%87%91%E8%9E%8D%E5%9C%88/id1015900207?mt=8">个人版下载</a>
                </div>
                <div className="company">
                    <a href="https://itunes.apple.com/cn/app/51%E9%87%91%E8%9E%8D%E5%9C%88%E4%BC%81%E4%B8%9A%E7%89%88/id1135406729?mt=8">企业版下载
                    </a>
                </div>
                <div className="appDownLoad-img">
                    <img src="static/images/phone.png"/>
                </div>
            </div>
        )
    }


}