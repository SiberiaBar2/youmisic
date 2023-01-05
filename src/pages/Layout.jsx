import React, { Component, Suspense } from 'react'

import { PageHeader, Spin, Affix } from 'antd';
import '../assets/css/layout.css'
import { HashRouter as Router, NavLink } from 'react-router-dom'


import routes from '../router/router'
import Routerview from '../router/Routerview'

export default class Layout extends Component {
    render() {

        return (
            <Router>
                <div>
                    <Affix>
                        <div>
                            {/* 头部 */}
                            <div className="headercontain">
                                <PageHeader
                                    className="site-page-header"
                                    title="悠米音乐"
                                />
                                <button className="btn">下载APP</button>
                            </div>
                            {/* 导航栏 */}
                            <div className="navaba">
                                <NavLink className="#ff4b00" to="/recommed">推荐</NavLink>
                                <NavLink to="/hot">热歌</NavLink>
                                <NavLink to="/serch">搜索</NavLink>
                            </div>
                        </div>
                    </Affix>
                    <Suspense fallback={<div style={{ textAlign: 'center' }}><Spin size="large" /></div>}>
                        <Routerview routes={routes} />
                    </Suspense>
                </div>
            </Router>
        )
    }
}
