import React, { Component } from 'react'

import '../../assets/css/hot.css'

import { Skeleton , List} from 'antd';
import {RightCircleOutlined} from '@ant-design/icons'

/**
 * 歌单详情页，和热歌页几乎一摸一样，所以我直接复制了，改了状态中的数组(容器名)
 * 歌单详情页面，根据<推荐>中<歌曲推荐>的Card的路由跳转this.props.history.push 和route.js定义的动态路由，跳转而来;
 * Recommed.jsx ====> onClick={()=>this.props.history.push(`/songlist/${item.id}`)}
 * item.id 是antd标签List的 数据dataSource={this.state.recommmedList} 每一个对象{}的id
 * renderItem 的返回值  是数据dataSource的每一个对象
 * antd的list标签，不仅为我们提供了传入数据显示列表，还可以像循环一样，拿到这个“数组”的id
 */

/**
  * react组件为什么每次都需要卸载组件呢？
  */
export default class Songlist extends Component {
    state =  {
        loading:true,
        songList:[],
        banner:''
    }
    render() {
        // 这里不能是字符串，必须是对象键值对
        const bannerStyle = {
            backgroundImage:`url(${this.state.banner})`
        }
        return (
            <Skeleton loading={this.state.loading} active={true}> 
                <div className="hot-contain">
                    {/*  这种样式写法，需要记一下 */}
                    <div className="banners" style={bannerStyle}></div>
                    {/* 歌单列表 */}
                    <List
                        size="large" 
                        dataSource={this.state.songList}
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
        this.getSongList()
    }
    // 请求歌单详情列表
    async getSongList(){
        const id = this.props.match.params.id
        // 注意拼接字符串这里，一定要有=号
        const res = await this.$http.get( '/playlist/detail?id='+id)
        // 延迟加载
        setTimeout(() => {
            if(res.code === 200 ){
                this.setState({songList:res.playlist.tracks, banner:res.playlist.coverImgUrl,loading:false})
            }
        }, 500);
    }
    // 组件将要卸载
    componentWillUnmount(){
        this.setState = ()=>false
    }
}
