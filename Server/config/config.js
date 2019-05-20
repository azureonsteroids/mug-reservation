const mongoUrl = process.env.MONGO_URL ? process.env.MONGO_URL : 'localhost';
module.exports = {
    "secret" : "mugReservationAppSecret",
    "mongoDb": {
          "url": mongoUrl
    }
}