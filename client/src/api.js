import axios from 'axios';

const url = "http://localhost:3070/api";

export default class API {
    static async getTotal(data){
        const res = await axios.post(url+'/getTotal', data);
        return res.data;
    }

    static async getHistory(){
        const res = await axios.get(url+'/getHistory');
        return res.data;
    }

    static async updatePrices(data){
        const res = await axios.post(url+'/updatePrices', data);
        return res;
    }

    static async getPrices(){
        const res = await axios.get(url+'/getPrices');
        return res.data;
    }
}

