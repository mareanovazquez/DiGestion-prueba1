import axios from "axios";


export default class HttpService {
    url = "http://10.10.49.124/api";

    postData = async (added_url, item, tokenId = "") => {
        return axios.post(this.url + added_url, item,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
    }

    getData = async (added_url, tokenId = "") => {
        return axios.get(this.url + added_url,
            {
                headers: {
                    'Authorization': 'Bearer ' + tokenId,
                    'Content-Type': 'application/json',
                }

            })
    }

    postData2 = async (added_url, item, tokenId = "") => {
        return axios.post(this.url + added_url, item,
            {
                headers: {
                    'Authorization': 'Bearer ' + tokenId,
                    'Content-Type': 'application/json',
                }

                
            })
    }


}

