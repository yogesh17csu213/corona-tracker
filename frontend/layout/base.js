import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import SidebarComponent from './sidebar'
import Footer from 'components/common/footer'

const Base=(props)=>{
    return(     
        <>
            <SidebarComponent/> 

            {props.children}
            <Footer />
        </>
    )
}
const mapStateToProps=(state)=>{
    return {

    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Base)