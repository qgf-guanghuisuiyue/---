import React from 'react'
import DownSelect from 'components/downSelect';
import {AjaxByToken} from 'utils/ajax';
import Loading from 'components/Loading';
import moment from 'moment';
import Share from 'components/share';
import {Modal} from 'antd';
//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';
class Article extends React.Component{
    constructor(){
        super();
        this.state={
            content:{},
            imgUrl:"",
            isLoading:false,
            isEmpty:false
        }
        this.getDetailData=this.getDetailData.bind(this)
    }
    componentDidMount(){
        const {query} = this.props;
        if(query.people){
            this.getDetailData('F00014');
        }else{
            this.getDetailData('F00013');
        }  
    }
    getDetailData(transcode){
        this.setState({
            isLoading:true
        })
        const { query } = this.props;
        AjaxByToken('/mobile/api/ad_show/getNewsInfo',{
            head: {
                transcode: `${transcode}`,
                type:"h"
            },
            data: {
                id:query.id
            }
        })
        .then(res=>{
            this.setState({
                content:res.data,
                imgUrl:res.imgurl,
                isLoading:false,
                isEmpty:true
            })
        },err=>{
            Modal.error({
                title: `${err.data.returnMsg}`,
              });
        });
    }
    backTop = () => {
        window.scroll(0,0)
    }
    render(){
        const {showAppDownLoad , query , page} = this.props;
        const { content , imgUrl , isLoading , isEmpty} = this.state;
        return(
            <div className="article detail">
                {isLoading && <Loading/>}
                {
                    !query.people && !isLoading &&
                    <div className="article-img">
                        <img src={imgUrl} alt={content.title}/>
                        <div className="timeandReadnum">
                            <span style={{color:"#A0A0A0"}}>
                                {content.pubdate?moment(content.pubdate).format("YYYY-MM-DD"):""}
                            </span>
                            &nbsp;&nbsp;&nbsp;
                            <span style={{color:"#A0A0A0"}}>
                                <span style={{color:"#000"}}>{content.redsum}</span>
                                &nbsp;阅读
                            </span>
                        </div>
                    </div>
                }
                {
                    query.people && !isLoading &&
                        <div className="article-img">
                            <img className="headImg" src={content.imageUrl} alt={content.title}/>
                        </div>
                }
                <div className="article-content">
                    {
                        !query.people && <h2 className="article-title">{content.title}</h2>
                    }
                    {
                        !query.people && 
                        <div 
                            className="content" 
                            dangerouslySetInnerHTML={{__html: content.text}}
                        >
                        </div>
                    }
                    
                    {
                        query.people && <div className="content personalContent">{content.profile}</div>
                    }

                    {
                        query.people && <div className="personalExperience" dangerouslySetInnerHTML={{__html: content.text}}></div>
                    }
                    {  
                        !content.text && isEmpty &&
                        <div className="emptyIcon">
                            <img src="static/images/emptyIcon.png"/>
                            <e className="emptyContent">暂时没有新的内容</e>
                        </div>
                    }
                    {
                        !isLoading  && 
                        <div>
                        {
                            query.people &&
                            <p style={{textAlign:"right",fontSize:"16px",lineHeight:"40px"}}>
                                <span>{moment(content.updatedate).format("YYYY-MM-DD")}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style={{color:"#000"}}>{content.redsum}</span>&nbsp;阅读数
                            </p>
                        }
                            <p className="lm">栏目：<span className="lmtitle">{query.title}</span></p>
                            <Share 
                                showAppDownLoad = {showAppDownLoad} 
                                backTop={this.backTop}
                            />
                        </div>
                        
                        
                    }   
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    page: state.Home.page
})
const mapDispatchToProps = dispatch => ({
    scrollTo: bindActionCreators(Actions.HomeActions.scrollTo, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Article);