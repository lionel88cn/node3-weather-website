const request=require('postman-request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibGlvbmVsODhjbiIsImEiOiJja2dvaHNqa2YwYjh0MnptdHp6cjlyd2d3In0.wWM8RDU-Wuzs_Ut_PUqy6A'
    request({url:url,json:true},(error,response)=>{
        if (error) {
            callback('Unable to connect to location services',undefined)
        } else if (response.body.features.length===0){
            callback('Unable to find location, try another search',undefined)
        } else {
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
}

module.exports=geocode