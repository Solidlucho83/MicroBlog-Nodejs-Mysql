const {format} = require('timeago.js');

//const timeagoInstance = timeago();

const helpers = {};

helpers.timeago = (Timestamp) => {
    return format(Timestamp);
};

module.exports = helpers;