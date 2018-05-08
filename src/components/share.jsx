import React from 'react';
import DownSelect from 'components/downSelect';

export default class Share extends React.Component{
    appDownLoad = () => {
        this.props.showAppDownLoad()
    }
    weibo = () => {
        var sharesinastring='http://v.t.sina.com.cn/share/share.php?title=51金融圈内容精选&url='+window.location.href+'&content=utf-8&sourceUrl='+window.location.href;
        window.open(sharesinastring);
    }
    linked = () => {
        window.open('http://www.linkedin.com/shareArticle?spm= &mini=true&url='+window.location.href+'title=51金融圈内容精选');    
    }
    render(){
        const {query , showAppDownLoad,backTop , showFindJob} = this.props;
        return(
            <div>
                <div className="share" ref="share">
                    <img id="wechat" src="static/images/wechat.png"/>
                    <a onClick={this.weibo}>
                        <img src="static/images/Weibo.png"/>
                    </a>
                    <a onClick={this.linked}>
                        <img src="static/images/in.png"/>
                    </a>
                </div>
                <DownSelect 
                    showAppDownLoad= {showAppDownLoad}
                    showFindJob = {showFindJob}
                />
                <div className="foot">
                    ©2014 51jrq.com 沪ICP备14045153号-1
                    <div className="backTop" onClick={backTop}>
                        <img src="static/images/feiji.png"/>
                    </div>
                </div>
            </div>
        )
    }
}