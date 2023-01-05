import React, { Component } from 'react'


import {  Carousel, List, Card } from 'antd';
import {RightCircleOutlined} from '@ant-design/icons'



export default class Recommed extends Component {
    state = {
        // 轮播
        banners :[],
        // 推荐
        recommmedList : [],
        // 新歌
        newSong: []
    }
    
    render() {
        return (
            <div>
                  {/* 轮播 */}
                <Carousel 
                className="lun" 
                afterChange={(event) => this.onChange(event)}
                autoplay={true}
                >
                        { 
                        // 这里为什么不是引号了？？
                            this.state.banners.map(item =>(
                                <div key={item.encodeId}>
                                    <img src={item.imageUrl} alt=""/>
                                </div>
                            ))
                        }
                    </Carousel>
                    <div className="wrap">
                        <div className="selet"></div>
                        <h3>推荐歌单</h3>
                    </div>
                    <List
                        grid={{ gutter: 16, column: 3 }}
                        dataSource={this.state.recommmedList}
                        renderItem={item => (
                            <List.Item>
                                {/* 这里不加箭头函数绑定this，会直接跳转，而不是点击跳转 */}
                                <Card onClick={()=>this.props.history.push(`/songlist/${item.id}`)}>
                                    <img src={item.picUrl} alt="" />
                                    <p>{item.name.substr(0,6)}...</p>
                                </Card>
                            </List.Item>
                        )}
                    />
                    <div className="wrap">
                        <div className="selet"></div>
                        <h3>最新音乐</h3>
                    </div>
                    <List
                        size="large" 
                        bordered
                        dataSource={this.state.newSong}
                        renderItem={item => 
                        <List.Item
                        onClick={()=>this.props.history.push(`/play/${item.id}`)}
                        actions={[<RightCircleOutlined  style={{fontSize:24}}/>]}
                        >
                            {item.name}
                        </List.Item>}
                    />
            </div>
        )
    }
    // 注意这个回调要放在类组件里面，
    // 这里还有问题
    onChange(event) {
        console.log(event);
    }
    componentWillMount(){
        // console.log(this.$http)
        this.getBanners()
        this.getRecommedList()
        this.getNewSong()
    }
    async getBanners(){
        // 这为什么加了api？
        const res = await this.$http.get('/banner');
        // console.log(res)
        // 没有写code
        if(res.code == 200){
            this.setState({banners:res.banners})
        }
    }
    async getRecommedList(){
        const res = await this.$http.get(`/personalized`)
        // console.log(res)
        if(res.code == 200){
            this.setState({recommmedList:res.result})
        }
    }
    async getNewSong(){
        const res = await this.$http.get(`/personalized/newsong`)
        // console.log(res)
        if(res.code == 200){
            this.setState({newSong:res.result})
        }
    }
    // 卸载
    componentWillUnmount(){
        this.setState = () =>false
    }
}
