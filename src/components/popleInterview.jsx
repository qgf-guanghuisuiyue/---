import React from 'react'
import Loading from "components/Loading";
import {AjaxByToken} from 'utils/ajax';
import moment from 'moment';
import {Link} from 'react-router';
import {Pagination , Modal} from 'antd';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class PeopleInterview extends React.Component{
    constructor(){
        super();
        this.state={
            infoList:[],
            numFound:"",
            isEmpty:false,
            currentPage:1
        }  
    }
    componentDidMount(){
        this.getPersonInfoList('0');
    }
    componentWillUnmount(){
        this.props.cancelListIndex();
    }
    //获取人物专访信息列表
    getPersonInfoList = (num) => {
        this.setState({
            isLoading:true
        })
        const { article ,page} = this.props;
        AjaxByToken('/mobile/api/ad_show/getWxInfo',{
            head: {
                transcode: 'F00012',
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
            });
            const {num , article} = this.props;
            if(article){
                window.scroll(0,num*200) 
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
            window.scroll(0,0);
            this.getPersonInfoList(`${((page-1)*10)}`);
        },100)
        
    }
    backTop = () => {
        window.scroll(0,0)
    }
    getListIndex = (index) => {
        const { page } = this.props;
        this.props.scrollTo(index , page)
    }
   
    render(){
        const {infoList , numFound , isLoading ,isEmpty , currentPage} = this.state;
        const {page , article} = this.props
        return(
            <div className="contentSelect">
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
                    { 
                        infoList.length !==0 && 
                        infoList.map((item , index)=>{
                            return(
                                <div className="contentList">
                                    <Link 
                                        className="peopleImg" 
                                        onClick= {this.getListIndex.bind(this,index)}
                                        to={{
                                            pathname:"article",
                                            query:{
                                                id:`${item.famousPersonId}`,
                                                title:"人物专访",
                                                people:true
                                            }
                                        }}
                                    >
                                        <img src={item.imageUrl?item.imageUrl:""} alt={item.name}/>
                                    </Link>
                                    <div className="people">
                                        <h2>
                                            <Link 
                                                onClick= {this.getListIndex.bind(this,index)}
                                                to={{
                                                    pathname:"article",
                                                    query:{
                                                        id:`${item.famousPersonId}`,
                                                        title:"人物专访",
                                                        people:true
                                                    }
                                                }}
                                            >
                                                {item.name?item.name:""}
                                            </Link>
                                        </h2>
                                        <p>
                                            <Link 
                                                onClick= {this.getListIndex.bind(this,index)}
                                                to={{
                                                    pathname:"article",
                                                    query:{
                                                        id:`${item.famousPersonId}`,
                                                        title:"人物专访",
                                                        people:true
                                                    }
                                                }}
                                            >
                                                {item.profile?`${item.profile.slice(0,40)} . . . . . .`:""}
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        infoList.length !==0 &&
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
    getpage: bindActionCreators(Actions.HomeActions.getpage, dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PeopleInterview);