import React, { Component } from 'react'


import '../../assets/css/serch.css'
import { Input ,Button ,Divider ,List , message} from 'antd';
import { SearchOutlined , RightCircleOutlined} from '@ant-design/icons';


export default class Serch extends Component {
    
    state = {
        serchResult : [],
        keywords:'',
        hotKeywords:[]
    }
    render() {
        return (
            <div className="serch-list">
                <div className="section">
                    <Input 
                    value={this.state.keywords}
                    placeholder="请输入内容" 
                    onKeyUp={(e) => this.submit(e)}
                    onChange={(e) => this.inputUpdate(e)}
                    size="large" 
                    prefix={<SearchOutlined /> } 
                    />
                </div>
                <Divider/>
                <div className="section btnwrap">
                    {
                        this.state.hotKeywords.map( item => (
                        <Button 
                        type="default" shape="round" 
                        key={item.first}
                        onClick={()=>this.handerClick(item.first)}
                        >{item.first.substr(0,4)}</Button>
                        ))
                    }
                </div>
                <Divider/>
                <div className="section">
                <List
                        size="large" 
                        dataSource={this.state.serchResult}
                        renderItem={item => 
                        <List.Item
                        onClick={()=>this.props.history.push(`/play/${item.id}`)}
                        actions={[<RightCircleOutlined  style={{fontSize:24}}/>]}
                        >
                            {item.name}
                        </List.Item>}
                    />
                </div>
            </div>
        )
    }
    // 这个页面写的还有问题
    componentWillMount(){
        this.getHot()
    }
    // 
    inputUpdate(event){
        // console.log(event)
        let keywords = event.target.value
        this.setState({keywords})
    }

    // 提交
    submit(event){
        if(event.keyCode == 13){
            this.serch()
        }
        // console.log(event.keyCode)
    }
    
    handerClick(keywords){
        // 更新状态中的关键词，并搜索
        

        /***********************************************************
         *   这里为什么不能传递keywords参数呢？                      *
         *   this.setState({keywords},()=>{this.serch(keywords)}  *            
         *   传了反而出大错                                       *
         *   只是方法的调用，传什么参？？？                         *
         *   上面的setState更新歌名就好了                           *
         *   无论是一个方法还是参数，都必须有出处和必要性！！！        *
         ***********************************************************/
        this.setState({keywords},()=>{this.serch()}
        )
        // console.log(keywords)
        // console.log(this.state.keywords)
        // this.setState({keywords:cahu})
        // console.log(this.state.keywords)
    }
    // 搜索
    async serch(){
        // 因为trim()没有加()导致接口无法获得搜索关键字，打印报undefined
        const keywords = this.state.keywords.trim()
        // console.log(keywords)
        if(keywords === ''){
            return message.error('请输入内容')
        }
        const res = await this.$http.get('/search',{ params : {keywords} })
        // console.log(res)
        // console.log(res.result.songs)
        if(res.code === 200 ){
            this.setState({serchResult:res.result.songs})
        }
    }
    // 热歌列表
    async getHot(){
        const res = await this.$http.get('/search/hot')
        // console.log(res)
        if(res.code === 200){
            this.setState({hotKeywords:res.result.hots})
        }
    }
}
