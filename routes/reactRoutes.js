import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom'
import Loading from 'components/common/loader'
import dynamic from 'next/dynamic'

const Home = dynamic(() => import('@/components/home'),{ ssr: false, loading: () => <Loading />});
const Page404 = dynamic(() => import('@/components/common/page404'),{ ssr: false, loading: () => <Loading />});
const Detail = dynamic(() => import('@/components/detail'),{ ssr: false, loading: () => <Loading />});

const ReactRoutes =(props)=>{
    const {user}=props     
    const userPermission=props.permission?.data
    const ROUTES=[   
        {path:'/', exact:true, component:Home ,application:''},
        {path:'/:id/detail', exact:true, component:Detail ,application:''},
        {path:'*', exact:false, component:Page404 ,application:''},

    ]

    return(
            <>
                <Switch>
                        {ROUTES.map((obj,index)=>{
                            let flag=userPermission?.find((permission)=>{
                                if(obj.application==permission.content_type){
                                    return true
                                }
                            })
                            if(flag || (obj.application=='')){
                                return( 
                                    <Route 
                                        key={index}
                                        path={obj.path} 
                                        exact={obj.exact} 
                                        render={(props) => <obj.component {...props} user={user} permission={userPermission}/>}
                                    /> )
                            }
                        })}
                </Switch>
           </>
       
    )
}
export default ReactRoutes