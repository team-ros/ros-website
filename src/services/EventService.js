import axios from 'axios'
    
    const apiClient = axios.create({  
      baseURL: `http://localhost:3000`,
      withCredentials: false, // This is the default
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    
    export default {
      getDirectorys() {
        return apiClient.get('/directorys')
      },
      getFiles() {
        return apiClient.get('/files')
      }
    }