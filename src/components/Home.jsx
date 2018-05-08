import React from 'react';
import Slider from 'components/Slider';
import axios from 'axios';
import moment from 'moment';
import Loading from 'components/Loading';
import {Link} from 'react-router';
import {Pagination } from 'antd';

import {AjaxByToken} from 'utils/ajax';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class Home extends React.Component{
    constructor(){
        super();
        this.state={
            infoList:[],//金融圈信息列表
            numFound:"",//查询到的总数
            isLoading:false,
            isEmpty:false,
            currentPage:1
        }
    }
    getContents = () => {
        this.props.getContents()
    }
    componentDidMount(){
        this.getjrqInfoList('0');
        this.props.get()
    }
    //获取金融圈信息列表
    getjrqInfoList = (num) => {
        this.setState({
            isLoading:true,
        })
        const { article ,page} = this.props;
        AjaxByToken('/mobile/api/ad_show/getWxInfo',{
            head: {
                transcode: 'F00010',
                type:"h"
            },
            data: {
                startIndex:article?`${((page-1)*10)}`:num,
                pageNum:"10"
            }
        })
        .then(res=>{
            this.setState({
                infoList:res.data,
                numFound:res.numFound,
                isLoading:false,
                isEmpty:true
            });
            const {num , article,page} = this.props;
            if(article){
                window.scroll(0,num*380) 
            }else{
                window.scroll(0,0)
            } 
        },err=>{
            console.log(err)
        });
    }
    pageChange = (page, pageSize) => {
        this.setState({
            currentPage:page
        })
        this.props.getpage(page);
        this.props.cancelListIndex();
        setTimeout(()=>{
            window.scroll(0,0); 
            this.getjrqInfoList(`${((page-1)*10)}`);
        },100)
    }
    backTop = () => {
        window.scroll(0,0)
    }

    getListIndex = (index) => {
        const { page } = this.props;
        this.props.scrollTo(index, page)
    }
    componentWillUnmount(){
        this.props.cancelListIndex();
        //this.props.cancelCurrentPage();
    }
    render(){
        const { infoList , numFound , isLoading ,isEmpty , currentPage} = this.state;
        const {page , article} = this.props
        return(
            <div className="contentSelect" id="test">
                <div className="content">
                    {
                        isLoading && <Loading/>
                    }
                    {
                        infoList.length ===0 && isEmpty && 
                        <div className="emptyIcon">
                            <img src="static/images/emptyIcon.png"/>
                            <e className="emptyContent">暂时没有新的内容</e>
                        </div>
                    }
                    { infoList.length!==0 && 
                        infoList.map((item,index)=>{
                            return (
                                <div className="contentList">
                                    <Link 
                                        className="contentImg" 
                                        onClick= {this.getListIndex.bind(this,index)}
                                        to={{
                                            pathname:"article",
                                            query:{
                                                id:`${item.infoid}`,
                                                title:`${item.groupname}`,
                                                index:index
                                            }
                                        }}
                                    >
                                        <img src={item.photourl?item.photourl:""} alt={item.title}/>
                                    </Link>
                                    <div className="contentDate">
                                        {item.pubdate?moment(item.pubdate).format("YYYY-MM-DD"):"暂无日期"}
                                    </div>
                                        <h2>
                                            <Link  
                                                onClick= {this.getListIndex.bind(this,index)}
                                                to={{
                                                    pathname:"article",
                                                    query:{
                                                        id:`${item.infoid}`,
                                                        title:`${item.groupname}`
                                                    }
                                                }}
                                            >
                                                {item.title?item.title:""}
                                            </Link>
                                        </h2>
                                    
                                    <p>
                                        <Link 
                                            onClick= {this.getListIndex.bind(this,index)}
                                            to={{
                                                pathname:"article",
                                                query:{
                                                    id:`${item.infoid}`,
                                                    title:`${item.groupname}`
                                                }
                                            }}
                                        >
                                            {item.preview_text?`${item.preview_text.slice(0,70)}  . . . . . .`:""}
                                        </Link>
                                    </p>
                                </div>
                            )
                        })
                    }
                    {infoList.length !==0 &&
                        <div className="page">
                            <Pagination 
                                total={numFound} 
                                current={article ? page :currentPage}
                                onChange= {this.pageChange}
                            />
                        </div>
                    }
                </div>
                
            </div>
        )
    }
}
const mapStateToProps = state => ({
    num: state.Home.num,
    article: state.Home.article,
    page: state.Home.page
})
const mapDispatchToProps = dispatch => ({
    scrollTo: bindActionCreators(Actions.HomeActions.scrollTo, dispatch),
    cancelListIndex: bindActionCreators(Actions.HomeActions.cancelListIndex, dispatch),
    getpage: bindActionCreators(Actions.HomeActions.getpage, dispatch),
    cancelCurrentPage: bindActionCreators(Actions.HomeActions.cancelCurrentPage, dispatch),
    get: bindActionCreators(Actions.HomeActions.get, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);