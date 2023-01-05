import React, { Component } from 'react'

import '../../assets/css/hot.css'

import { Skeleton , List} from 'antd';
import {RightCircleOutlined} from '@ant-design/icons'
export default class Hot extends Component {

    constructor(){
        super()
    }
    state =  {
        loading:true,
        hotList:[],
        banners:''
    }
    render() {
        // 这里不能是字符串，必须是对象键值对
        const bannerStyle = {
            backgroundImage:`url(${this.state.banners})`
        }
        return (
            <Skeleton loading={this.state.loading} active={true}> 
                <div className="hot-contain">
                    {/*  这种样式写法，需要记一下 */}
                    <div className="banners" style={bannerStyle}></div>
                    {/* 歌单列表 */}
                    <List
                        size="large" 
                        dataSource={this.state.hotList}
                        renderItem={item => 
                        <List.Item
                        onClick={()=>this.props.history.push(`/play/${item.id}`)}
                        actions={[<RightCircleOutlined  style={{fontSize:24}}/>]}
                        >
                            {item.name}
                        </List.Item>}
                    />
                </div>
            </Skeleton>
        )
    }
    componentWillMount(){
        this.getHotsongList()
    }
    // 请求热歌列表
    async getHotsongList(){
        const res = await this.$http.get(`/top/list?idx=1`)
        this.setState({hotList:res.playlist.tracks, banners:res.playlist.coverImgUrl,loading:false})
    }
    // 组件将要卸载
    componentWillUnmount(){
        this.setState = ()=>false
    }
}
