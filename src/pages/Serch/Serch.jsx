import React, { useMemo, useState } from 'react'


import '../../assets/css/serch.css'
import { Input ,Button ,Divider ,List , message} from 'antd';
import { SearchOutlined , RightCircleOutlined} from '@ant-design/icons';
import { useDebounce , useMount, useStateSync, useSyncCallback } from '../../hooks/index';
import {$http} from '../../utils/http';

const Serch = (props) =>  {
    const [serchResult, setSerchResult] = useState([]);
    const [hotKeywords, sethotKeywords] = useState([]);

    const [keywords, setKeywords] = useStateSync('');
    const syncKeywords = useSyncCallback(() => {
        serchMethod();
    });

    const debouncedKeywords = useDebounce(keywords, 700);
    // const $http = React.Component.prototype.$http;

    useMemo(() => {
        (async() => {
            if(debouncedKeywords.trim() === ''){
                return;
            }
            const res = await $http.get('/search',{ params : {keywords: debouncedKeywords} })
            if(res.code === 200 ){
                setSerchResult(res.result.songs);
            }
        })()
    }, [$http, debouncedKeywords]);

    useMount(() => {
        getHot();
    });
    const inputUpdate = async (event) => {
        let keywords = event.target.value
        setKeywords(keywords);
    };

    // 提交
    const submit = (event) => {
        if(event.keyCode === 13){
            serchMethod()
        }
    }
    
    const handerClick = (keywords) => {
            setKeywords(keywords);
            syncKeywords();
    };
    // 搜索
    const serchMethod = async () =>  {
        if(keywords.trim() === ''){
            return message.error('请输入内容')
        }
        const res = await $http.get('/search',{ params : {keywords} })
        if(res.code === 200 ){
            setSerchResult(res.result.songs);
        }
    }

    // 热歌列表
    const  getHot = async () => {
        const res = await $http.get('/search/hot')
        if(res.code === 200){
            sethotKeywords(res.result.hots);
        }
    }

    return (
        <div className="serch-list">
            <div className="section">
                <Input 
                    value={keywords}
                    placeholder="请输入内容" 
                    onKeyUp={(e) => submit(e)}
                    onChange={(e) => inputUpdate(e)}
                    size="large" 
                    prefix={<SearchOutlined /> } 
                />
            </div>
            <Divider/>
            <div className="section btnwrap">
                {
                    hotKeywords.map(item => (
                        <Button 
                            style={{fontSize: '14rem'}}
                            type="default" shape="round" 
                            key={item.first}
                            onClick={()=>handerClick(item.first)}
                        >
                            {item.first.substr(0,4)}
                        </Button>
                    ))
                }
            </div>
            <Divider/>
            <div className="section">
            <List
                size="large" 
                dataSource={serchResult}
                renderItem={item => 
                <List.Item
                onClick={()=> props.history.push(`/play/${item.id}`)}
                actions={[<RightCircleOutlined  style={{fontSize:24}}/>]}
                >
                    {item.name}
                </List.Item>}
                />
            </div>
        </div>
    )
};

export default Serch;
