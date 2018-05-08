import React from 'react';
import {AjaxByToken} from 'utils/ajax';
import moment from 'moment';
import {Link} from 'react-router';

class Slider extends React.Component{
    componentDidMount(){
        const  mySwipe=new Swipe(
                    $('.swiper-container')[0],
                    {
                        auto:5000,
                        continuous:true,
                        stopPropation:true,
                        callback:function (index,element){
                            $('.swiper-container .swiper-pagination li').removeClass('actve');
                            $('.swiper-container .swiper-pagination li').eq(index).addClass("actve");
                        }
                });
    }
    
    render(){
        const {photolist} = this.props;
        return (
            <div className="swiper-container">
                <ul className="swiper-wrapper">
                    {photolist.length!=0 ?
                        photolist.map((item , index)=>{
                            return(
                                <li className="swiper-slide">
                                    <img src={item.photourl}/>
                                    <div className="text-box">
                                        <h2>{item.title}</h2>
                                        
                                        <p onClick={this.enterRead.bind(this,item.id)}>
                                            <Link 
                                                className="slide-btn" 
                                                //onClick= {this.getListIndex.bind(this,index)}
                                                to={{
                                                    pathname:"article",
                                                    query:{
                                                        id:`${item.id}`,
                                                        title:"热点资讯",
                                                    }
                                                }}
                                            >
                                                进入阅读
                                            </Link>
                                        </p>
                                    </div>
                                </li>
                            )
                        }):<li><img src="static/images/banner.jpg"/></li>
                    }
                    
                </ul>
                <div className="swiper-pagination">
                    {photolist.length!=0 &&
                        photolist.map((item,index)=> {
                            return(
                                <li className={index===0 && "actve"}></li>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default Slider