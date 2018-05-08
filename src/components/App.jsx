import React from 'react';
import Navbar from 'components/Navbar.jsx';
import Slider from 'components/Slider';
import Article from 'components/Article';
import DownSelect from 'components/downSelect';
import AppDownLoad from 'components/appDownLoad';
import FindJob from 'components/findJob';
import Loading from 'components/Loading';
import {AjaxByToken} from 'utils/ajax';
import Share from 'components/share'

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            btn:"show",
            switchState:true,
            isAppDownLoad:false,
            photolist:[],
            isBanner:false,
            isFindJob:false
        }
    }
    
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                isBanner:true
            });
        },300)
        //获取banner图片
        this.props.getBannerList();
       
    }
    functionBtn = () => {
        this.setState({
            btn:this.state.btn==="show"?"close":"show",
            switchState:!this.state.switchState
        });
        this.props.cancelCurrentPage();
    }
    
    goBack = () => {
        window.history.back(-1);
        this.props.getpath()
    }
    showAppDownLoad = () => {
        this.setState({
            isAppDownLoad:true
        })
    }
    hideAppDownLoad = () => {
        this.setState({
            isAppDownLoad:false
        })
    }
    showFindJob = () => {
        this.setState({
            isFindJob:true
        })
    }
    hideFindJob = () => {
        this.setState({
            isFindJob:false
        })
    }
    getBannerList = () => {
        AjaxByToken('/mobile/api/ad_show/getWxPhotoList',{
            head: {
                transcode: 'F00009',
                type:"h"
            }
        })
        .then(res=>{
            this.setState({
                photolist:res.data,
            })
        },err=>{
            console.log(err)
        });
    }
    backTop = () => {
        window.scrollTo(0,0);
    }
    
    render(){
        const {pathname , query} = this.props.location;
        let nav=true;
        let isDetails = true;
        if (/article/.test(pathname)){
            nav=false
            isDetails=false
        };
        const {btn,switchState,isAppDownLoad,isBanner,isFindJob} = this.state;
        const {photolist} = this.props;
        return(
            <div>  
                {
                    isAppDownLoad && <AppDownLoad hideAppDownLoad={this.hideAppDownLoad}/>
                }
                {
                    isFindJob && <FindJob hideFindJob={this.hideFindJob}/>
                }
                {
                    (!isAppDownLoad && !isFindJob) && 
                    <div className="top-contaner">
                        <div className="top">
                            {
                                !nav && 
                                <div 
                                    className="back"
                                    onClick={this.goBack}
                                >
                                    <img src="static/images/back.png"/>
                                </div>
                            }
                            <div 
                                className="top-img">
                                <img src="static/images/logo.png"/>
                            </div>
                            {
                                isDetails &&
                                <div 
                                    className="functionBtn"
                                    onClick={this.functionBtn}
                                >
                                    <img src={`static/images/${btn}.png`}/>
                                </div> 
                            }
                        </div>
                        { 
                            !isDetails && 
                            <Article 
                                showAppDownLoad= {this.showAppDownLoad.bind(this)}
                                query = {query}
                                pathname = {pathname}
                            />
                        }
                        { 
                            isDetails &&
                            <div className="article">
                                {
                                    !switchState && <DownSelect 
                                        showAppDownLoad= {this.showAppDownLoad.bind(this)}
                                        showFindJob = {this.showFindJob.bind(this)}
                                    /> 
                                }
                                {
                                    switchState && 
                                    <div className="bottom">
                                        {isBanner && <Slider photolist = {photolist}/> }
                                        <Navbar/>
                                        <div>
                                            {this.props.children}
                                        </div>
                                        <div className="article-content">
                                            <Share
                                                showAppDownLoad = {this.showAppDownLoad} 
                                                showFindJob = {this.showFindJob}
                                                backTop={this.backTop}
                                            />
                                        </div>
                                        
                                    </div>
                                }
                            </div>
                        }
                        
                    </div>
                }
            </div>
        )
    }
}
const mapStateToProps = state => ({
    photolist: state.Home.photolist,
    num: state.Home.num
})
const mapDispatchToProps = dispatch => ({
    getBannerList: bindActionCreators(Actions.HomeActions.getBannerList, dispatch),
    scrollTo: bindActionCreators(Actions.HomeActions.scrollTo, dispatch),
    getpath: bindActionCreators(Actions.HomeActions.getpath, dispatch),
    cancelCurrentPage: bindActionCreators(Actions.HomeActions.cancelCurrentPage, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App) 
