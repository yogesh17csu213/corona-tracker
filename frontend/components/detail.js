import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from 'react-redux'
const Detail=(props)=>{
    const { id } = useParams();
    console.log(id)
    const state=props.tableData?.find((obj)=>{
        if(obj.state_code==id){
            return obj
        }
    })
    return(
        <div className="detail center">
             <h4>This is a detail page based on State</h4>
             <h1>{state?.state_name}</h1>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        tableData:state?.homeData?.table_data
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        dispatch
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Detail)