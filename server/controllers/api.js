const Settings = require('../models/settings')
const History = require('../models/history')

class API {
    // Fetch history
    static async fetchHistory(req, res) {
        try {
            const result = await History.find();
            res.status(200).json(result);
        } catch (err) {
            return res.status(404).json({message: err.message})
        }
    };

    // Get current prices
    static async getPrices(req, res) {
        try {
            let prices = await getPrices();
            res.status(200).json(prices);
        } catch (err) {
            return res.status(404).json({message: err.message})
        }
    };

    // Save new price settings
    static async updatePrices(req, res) {
        try {
            await Settings.findOneAndReplace({type: "priceSettings"}, req.body);
            res.sendStatus(200)
        } catch (err) {
            res.sendStatus(404).json({message: err.message})
        }
    };

    static async getTotal(req, res) {
        try {
            // Get prices
            let prices = await getPrices();

            // Default values
            let data = req.body;
            let dateRange = 1;
            let extraServices = addExtraServices(data, prices) || 0;

            // Get date range for short period
            if (data.timePeriod === "short") {
                dateRange = getDateRange(data.startDate, data.endDate);
            }
            // Get pre-total (without extra services)
            let preTotal = dateRange * prices[data.timePeriod][data.packageType]

            // Get total
            data.total = ((preTotal + preTotal * extraServices)*data.persons).toFixed(2);

            //Save total to database
            await saveToHistory(data);
            res.status(200).json({total: data.total});
        } catch (err) {
            return res.status(404).json({message: err.message})
        }
    }

}

async function getPrices() {
    try {
        return Settings.findOne({type: "priceSettings"});
    } catch (err) {
        console.log(err)
        throw new Error('Unable to get priceSettings');
    }
}

function addExtraServices(data, prices) {
    return data.extraServices
        .map(e => {
            return prices[data.timePeriod][e]
        })
        .reduce((a, b) => a + b, 0);
}

function getDateRange(a, b) {
    let start = new Date(a);
    let end = new Date(b);
    const utc1 = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    const utc2 = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
    return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
}

async function saveToHistory(data) {
    try {
        await History.create(data);
    } catch (err) {
        console.log(err)
        throw new Error('Unable to save to History')
    }
}


module.exports = API;
