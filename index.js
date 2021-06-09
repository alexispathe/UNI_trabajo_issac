const app = require('./app');
const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/proyecto";
const port = 3000
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
    console.log("Base de datos conectada")
}).catch(err => console.log(err))
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})