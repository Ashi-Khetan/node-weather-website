const request=require('request')
const geocode=(address, callback)=>{
    const geourl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address+ '.json?access_token=pk.eyJ1IjoiYXNoaTQ0IiwiYSI6ImNrOTN5cmFlMjA3Z2ozbW56aTA3OXVnb3MifQ.dQZQZKkrp1VlpvYftnH6oA&limit=1'
    request({url:geourl,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to page',undefined)
        }
        else if(body.features.length===0){
            callback('not found info',undefined)

            
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            })

            }
        }
    )
}

module.exports= geocode