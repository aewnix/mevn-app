let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://127.0.0.1:27017/aston-itm-task";
const Settings = require('./models/settings');

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});
const mongoose = require('mongoose');

// DB CONNECTION
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to database!")
    // Create settings/prices object on startup
    Settings.create({
        type: "priceSettings",
        short: {
            basic: 1.2,
            extended: 1.8,
            extra: 2.4,
            cancellation: 0.5,
            sport: 0.3
        },
        yearly: {
            basic: 39,
            extended: 49,
            extra: 59,
            cancellation: 0.2,
            sport: 0.1
        }

    }).then(r => console.log("Settings created\n", r))
}).catch((err) => {
    console.log(err)
})

