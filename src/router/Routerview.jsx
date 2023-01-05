import {Switch, Route, Redirect} from 'react-router-dom'



function Routerview(props) {
    return (
        <Switch>
            {
                props.routes.map( (item,index) =>{
                    if(item.component){
                        return <Route key={index} path={item.path} exact={item.exact} component={item.component}/>
                    }else{
                        return <Route key={index} path={item.path} exact={item.exact}>
                            <Redirect to={item.to} />
                        </Route>
                    }
                })
            }
        </Switch>
    )
}

export default Routerview
