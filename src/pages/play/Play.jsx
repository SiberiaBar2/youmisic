import React, { Component } from 'react'

import '../../assets/css/play.css'
export default class Play extends Component {
    constructor(){
        super()
        this.state = {
            //  true是当前未播放，点击后播放的按钮
            //  false是当前正播放，点击后暂停按钮
            status : true,
            deg:'15deg',
            // 歌曲信息
            info:{},
            // 歌词
            lyric:[],
            // 音乐播放地址
            playUrl:[]
        }
    }
    render() {
        return (
            <>
                <div className="play-container">
                    {/* 音乐播放控件 */}
                    <div className="play-control" style={{transform: `rotate(${this.state.deg})`}}></div>
                    <div className="play-box">
                        <img className={this.state.status ? '' : 'rotate'} src={this.state.info.picUrl}></img>
                        <div 
                        onClick={()=>this.toggle()}
                        className={["btn",this.state.status?"play-btn":"pause-btn"].join(' ')}></div>
                    </div>
                    <audio src={this.state.playUrl} controls ref={(dom)=>this.music=dom} style={{display:'none'}}></audio>
                    <div className="content">
                        <h3>{this.state.info.name}</h3>
                        <div>
                            {
                                this.state.lyric.map((item, index) => <p key={index}>{item}</p>)
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
    componentDidMount(){
        this.getDetail()
        this.getPlayUrl()
        this.getLyric()
    }
    // 控制音乐的播放状态
    toggle(){
        /**
         * 1-按钮图标的变化
         * 2-音乐的播放暂停
         */
        const deg = this.state.status ? 0 : '15deg'
        this.setState({status :!this.state.status,deg})
        // if(this.state.status){}
        if(!this.state.status){
            // 如果是播放状态 ，点击后暂停
            // 为什么audio标签虚拟dom对象上有播放和暂停
            this.music.pause()
        }else{
            this.music.play()
        }
    }

    // 获取音乐详情
    async getDetail(){
        const ids = this.props.match.params.id
        // 这里为什么请求错误呢？因为params写错了
        const res = await this.$http.get('/song/detail',{ params : { ids } })
        // console.log(res)
        if(res.code === 200){
            this.setState({info:res.songs[0].al})
        }
    }

    // 获取音乐播放地址
    async getPlayUrl(){
        const id = this.props.match.params.id
        const res = await this.$http.get('/song/url',{ params : {id} })
        // console.log(res)
        if(res.code === 200){
            const playUrl = res.data[0].url
            this.setState({playUrl})
        }
    }

    // 获取歌词
    async getLyric(){
        const id = this.props.match.params.id
        const res = await this.$http.get(`/lyric`,{ params : { id } })
        // console.log(res.lrc.lyric)
        const lyric = this.lyricFmt(res.lrc.lyric)
        this.setState({lyric})
    }
    // 格式化歌词
    lyricFmt(lyric){
        const reg=/\[(.*)\](.*)/g;
        const arr=[];
        lyric.replace(reg,(a,b,c)=>{
            arr.push(c);
        });
        return arr;
    }
}
