const initialState = {
    loading: false,
    error: '',
    site_data:null,
    site_data_error:null,
    table_data:null,
    table_data_error:null
}

const Home = (state = initialState, action) => {
    switch(action.type){
        case 'LOADING':
            return {
                ...state,
                loading: action.payload
            }
        case 'GET_WEBISTE_DATA_REQUEST':
            return {
                ...state,
                loading:true,
            }
        case 'GET_WEBISTE_DATA_SUCCESS':
            return {    
                ...state,
                loading:false,
                site_data:action.payload,
            }
        case 'GET_WEBISTE_DATA_FAILURE':
            return {
                ...state,
                loading:false,
                site_data_error:action.payload,
            }

        case 'GET_TABLE_DATA_REQUEST':
            return {
                ...state,
                loading:true,
            }
        case 'GET_TABLE_DATA_SUCCESS':
            return {    
                ...state,
                loading:false,
                table_data:action.payload,
            }
        case 'GET_TABLE_DATA_FAILURE':
            return {
                ...state,
                loading:false,
                table_data_error:action.payload,
            }
        
        default: return state
    }
}

export default Home