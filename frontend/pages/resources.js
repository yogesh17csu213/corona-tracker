import React,{ useState,useEffect } from 'react'
import Resources from '@/components/resources'
import Base from 'layout/base';
import { getWebsiteData } from 'store/actions/home'
import {initializeStore} from 'store'

const ResourcesHome=(props)=> {
  const {news,resources}=props
  return(
    <div>
        <Base>
            <Resources news={news} resources={resources}/>
        </Base>
    </div>
    ) 
  }
  export async function getServerSideProps(ctx){
    const reduxStore = initializeStore()
    await reduxStore.dispatch(getWebsiteData())
    const state = reduxStore.getState()
    if(state?.homeData?.site_data){
      return {
        props: {
          news:state?.homeData?.site_data?.news,
          resources:state?.homeData?.site_data?.resources,
        }
      }
    }
    return {
      notFound: true
    }
}

export default ResourcesHome
  