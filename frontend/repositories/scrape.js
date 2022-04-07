import axios from "axios"

export const getWebsiteDataRepo = (data) => {
    return axios({
      method: 'GET',
      url:'http://127.0.0.2/site-data',
    })
}

export const getTableDataRepo = (data) => {
    return axios({
      method: 'GET',
      url:'http://127.0.0.2/table-data',
    })
}