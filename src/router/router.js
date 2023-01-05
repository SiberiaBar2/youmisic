
import React from 'react'

// lazy

const Recommed = React.lazy(()=>import('../pages/Recommed/Recommed'));
const Hot = React.lazy(()=>import('../pages/Hot/Hot'));
const Serch = React.lazy(()=>import('../pages/Serch/Serch'));

const routes = [
    // 重定
    {
        path:'/',
        to:'/recommed',
        exact:true
    },
    {
        path:'/recommed',
        component:Recommed,
        exact:false
    },
    {
        path:'/hot',
        component:Hot,
        exact:false
    },
    {
        path:'/serch',
        component:Serch,
        exact:false
    },
    {
        path:'/songlist/:id',
        component:React.lazy(()=>import('../pages/songlist/Songlist')),
        exact:false
    },
    {
        path:'/play/:id',
        component:React.lazy(()=>import('../pages/play/Play')),
        exact:false
    }
]

export default routes