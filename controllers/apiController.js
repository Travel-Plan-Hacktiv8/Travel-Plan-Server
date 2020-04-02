const axios = require('axios')

class ApiController {
    static findContent(req, res){
        const city = req.params.city
        console.log(city)
        let weather = ''
        let detikNews = ''
        axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${process.env.APIKEY}`)
            .then(result => {
                const {data} = result
                // console.log(data.data[0].country_code)
                weather = data
                return axios.get(`http://newsapi.org/v2/top-headlines?country=${data.data[0].country_code}&category=general&apiKey=${process.env.APIKEYNEWS}`)
            })
            .then(result => {
                const {data} = result
                detikNews = data
                return res.status(200).json({
                    Weather: weather,
                    News: detikNews
                })
            })
            .catch(err => res.status(500).json(err))
    }
        
}

module.exports = ApiController