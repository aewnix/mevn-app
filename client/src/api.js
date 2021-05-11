import axios from 'axios';

const URL = "http://localhost:3070/api"; // For real project extract this to ENV

class API {
    static async getTotal(data) {
        try {
            const res = await axios.post(URL + '/getTotal', data);
            if (res.status !== 404) {
                return res.data;
            }
        } catch (e) {
            throw new Error("Unable to get total");
        }
    }

    static async getHistory() {
        const res = await axios.get(URL + '/getHistory');
        return res.data;
    }

    static async updatePrices(data) {
        const res = await axios.post(URL + '/updatePrices', data);
        return res;
    }

    static async getPrices() {
        const res = await axios.get(URL + '/getPrices');
        return res.data;
    }
}

export default API;
