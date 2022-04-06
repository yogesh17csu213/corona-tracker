import React,{ useState,useEffect } from 'react'
import { connect } from 'react-redux'
import { getWebsiteData,getTableData } from 'store/actions/home'
import Resources from '@/components/resources'
import Base from 'layout/base';

const ResourcesHome=(props)=> {

  return(
    <div>
        <Base>
            <Resources />
        </Base>
    </div>
    ) 
  }

export default ResourcesHome
  