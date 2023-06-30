import axios from "axios";

const token = localStorage.getItem(token)

export default class HttpService {
    url = "http://10.10.49.124/api"

     token = localStorage.getItem(token)

    postData = async (added_url, item, tokenId = "") => {
        return axios.post(this.url + added_url, item,
            {
                headers: {
                    'Content-Type': 'application/json',


                }

            })
    }

    getData = async (added_url, item = null, tokenId = "") => {
        return axios.get(this.url + added_url, item,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + token


                }

            })
    }



}