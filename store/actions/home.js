import { getWebsiteDataRepo,getTableDataRepo } from "repositories/scrape"

export const getWebsiteData = ()=> {
    return (dispatch) => {
        dispatch({type:'GET_WEBISTE_DATA_REQUEST'})
        getWebsiteDataRepo()
            .then((response) => {
                if(response && response.status== 200){
                    dispatch({type:'GET_WEBISTE_DATA_SUCCESS',payload:response && response.data})
                }else{
                    dispatch({type:'GET_WEBISTE_DATA_FAILURE',payload:response && response.data})
                }
            })
            .catch(error => {
                  if(error){
                    dispatch({type:'GET_WEBISTE_DATA_FAILURE',payload:error && error})
                  }
            })
    }
}
export const getTableData = ()=> {
    return (dispatch) => {
        dispatch({type:'GET_TABLE_DATA_REQUEST'})
        getTableDataRepo()
            .then((response) => {
                if(response && response.status== 200){
                    dispatch({type:'GET_TABLE_DATA_SUCCESS',payload:response && response.data})
                }else{
                    dispatch({type:'GET_TABLE_DATA_FAILURE',payload:response && response.data})
                }
            })
            .catch(error => {
                  if(error){
                    dispatch({type:'GET_TABLE_DATA_FAILURE',payload:error && error})
                  }
            })
    }
}