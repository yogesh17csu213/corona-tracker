import axios from "axios"

export const getWebsiteDataRepo = (data) => {
    return axios({
      method: 'GET',
      url:'http://localhost:8080/site-data',
    })
}

export const getTableDataRepo = (data) => {
    return axios({
      method: 'GET',
      url:'http://localhost:8080/table-data',
    })
}