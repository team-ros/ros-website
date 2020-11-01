import { rosapi } from "ros-sdk-js"

// connection mit unserer api
const api = new rosapi('https://ros-api-v2.herokuapp.com')

//export für components
export default api