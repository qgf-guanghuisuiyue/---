import React from 'react'

export default class DownSelect extends React.Component{
    appDownLoad = () => {
        this.props.showAppDownLoad()
    }
    findJob = () => {
        this.props.showFindJob();
    }
    render(){
        return(
            <div className="functions">
                <ul className="functions-content">
                    <li onClick={this.findJob.bind(this)}>
                        <a>找工作</a>
                        <img src="static/images/arrowRight.png"/>
                    </li>
                    <li onClick={this.appDownLoad.bind(this)}>
                        <a>APP下载</a>
                        <img src="static/images/arrowRight.png"/>
                    </li>
                </ul>
            </div>
        )
    }
}