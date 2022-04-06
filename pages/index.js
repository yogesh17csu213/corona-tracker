import React,{ useState,useEffect } from 'react'
import { connect } from 'react-redux'
import { getWebsiteData,getTableData } from 'store/actions/home'
import Base from 'layout/base';
import ReactRoutes from 'routes/reactRoutes';
const Home=(props)=> {
  const [selectedItem,setSlectedItem]=useState('Tickets')
  const [firstRender,setFirstRender]=useState('false')


  useEffect(()=>{
    setFirstRender(true)
    props.dispatch(getWebsiteData())
    props.dispatch(getTableData())  
  },[])
  
  useEffect(()=>{
 
  })
  
  return(
    <div>
        <Base>
          <ReactRoutes />
        </Base>
    </div>
    ) 
  }
const mapStateToProps=(state)=>{
  return{

  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    dispatch
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
  