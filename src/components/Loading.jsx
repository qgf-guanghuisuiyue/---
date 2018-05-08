import React from 'react'
class Loading extends React.Component{
    render(){
        return(
            <div className="load-wrapper">
                <div className="wrapper">
                    <div className="line1 line"></div>
                    <div className="line2 line"></div>
                    <div className="line3 line"></div>
                    <div className="line4 line"></div>
                    <div className="line5 line"></div>
                    <div className="line6 line"></div>
                    <div className="line7 line"></div>
                    <div className="line8 line"></div>
                    <div className="line9 line"></div>
                    <div className="line10 line"></div>
                    <div className="line11 line"></div>
                    <div className="line12 line"></div>
                </div>
                <div className="load">正在加载...</div>
            </div>
        )
    }
}
export default Loading