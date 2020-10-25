const request=require('postman-request')

const url='http://api.weatherstack.com/current?access_key=930d1dddc4cfc06dd25e0b5a50237a6e&query=Baltimore&units=m'




const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=930d1dddc4cfc06dd25e0b5a50237a6e&query='+encodeURIComponent(latitude+','+longitude)
    //console.log(url)
    request({url: url,json:true},(error,response)=>{
        if (error) {
            callback('Unable to connect to weater services',undefined)
        } else if (response.body.error) {
            callback('query error',undefined)
        } else {
            const forecastData='It is currently '+response.body.current.temperature+' Degrees, feels like '+response.body.current.feelslike+', weater is '+response.body.current.weather_descriptions[0]
            callback(undefined,forecastData)
        }
    })
}


module.exports=forecast

