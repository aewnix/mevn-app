const mongoose = require('mongoose');
const Settings = require('./models/settings');

// DB CONNECTION
if( !process.env.DB_URI ){
    throw new Error('Missing env variable DB_URI');
}

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}).then(() => {
    console.info("Connected to database!")
    // Create settings/prices object on startup
    // TODO: create only once on startup instead of @ every boot
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

    })
        .then(r => console.info("Settings created\n", r))
        .catch((err) => {
            console.error(err);
            throw new Error('Unable to create base priceSettings object');
        });
}).catch((err) => {
    console.error(err);
    throw new Error('Unable to connect to database');
});

