import axios from 'axios';

const axiosOrdersInstance=axios.create({
    baseURL:'https://my-react-burger-app-744b2.firebaseio.com/'
})

export default axiosOrdersInstance