const axios = require('axios')

class ApiController {
    static findContentWeather(req, res){
        const city = req.params.city
        console.log(city)
        axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${process.env.APIKEY}`)
            .then(result => {
                const {data} = result
                return res.status(200).json({
                    data
                })
            })
            .catch(err => res.status(500).json(err))
    }
    static findContentNews(req, res) {
        const country = req.params.country
        axios.get(`http://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${process.env.APIKEYNEWS}`)
        .then(result => {
            const {data} = result
            return res.status(200).json({
               data
            })
        })
        .catch(err => res.status(500).json(err))
    }
        
}

module.exports = ApiController