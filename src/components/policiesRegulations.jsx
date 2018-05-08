import React from 'react';
import Loading from 'components/Loading';
import {AjaxByToken} from 'utils/ajax';
import moment from 'moment';
import {Link} from 'react-router';
import {Pagination,Modal } from 'antd';
import Share from 'components/share';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';
class PoliciesRegulations extends React.Component{
    constructor(){
        super();
        this.state={
            infoList:[],//政策法规信息列表
            numFound:"",//查询到的总数
            isLoading:false,
            isEmpty:false,
            currentPage:1
        }
    }
    componentDidMount(){
        this.getzcfgInfoList('0') ;
    }
    //获取政策法规信息列表
    getzcfgInfoList = (num) => {
        this.setState({
            isLoading: true
        })
        const { article ,page} = this.props;
        AjaxByToken('/mobile/api/ad_show/getWxInfo',{
            head: {
                transcode: 'F00011',
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
                isLoading: false,
                isEmpty:true
            })
            const {num , article} = this.props;
            if(article){
                window.scroll(0,num*380) 
            }else{
                window.scroll(0,0)
            } 
        },err=>{
            Modal.error({
                title: `${err.data.returnMsg}`,
              });
        });
    }
    pageChange = (page, pageSize) => {
        this.setState({
            currentPage:page
        })
        this.props.getpage(page);
        this.props.cancelListIndex();
        
        setTimeout(()=>{
            window.scroll(0,0)
            this.getzcfgInfoList(`${((page-1)*10)}`);
        },100)
    };
    backTop = () => {
        window.scroll(0,0)
    }

    getListIndex = (index) => {
        const { page } = this.props;
        this.props.scrollTo(index , page)
    }
    componentWillUnmount(){
        this.props.cancelListIndex();
    }
    render(){
        const {infoList , numFound , isLoading , isEmpty , currentPage} = this.state;
        const {page , article} = this.props
        return(
            <div className="contentSelect">
                <div className="content">
                    {
                        isLoading && <Loading/>
                    }
                    {
                        infoList.length ==0 && isEmpty && 
                        <div className="emptyIcon">
                            <img src="static/images/emptyIcon.png"/>
                            <e className="emptyContent">暂时没有新的内容</e>
                        </div>
                    }
                    { infoList.length !==0 &&
                        infoList.map((item , index)=>{
                            return(
                                <div className="contentList">
                                    <Link 
                                        className="contentImg" 
                                        onClick= {this.getListIndex.bind(this,index)}
                                        to={{
                                            pathname:"article",
                                            query:{
                                                id:`${item.infoid}`,
                                                title:`${item.groupname}`
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
                                        {item.preview_text?`${item.preview_text.slice(0,45)}. . . . . .`:""}
                                    </Link></p>
                                </div>
                            )
                        })
                    }
                    {infoList.length !==0 &&
                        <div className="page">
                            <Pagination 
                                current={article ? page :currentPage}
                                total={numFound} 
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
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PoliciesRegulations);