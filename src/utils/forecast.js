const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=dc7171dabc74797ff7a2977e8dfa22a0&query='+latitude+','+longitude+'&units=f'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to page',undefined)
        }
        else if(body.error){
            callback('not found info',undefined)

            
        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+'. It is '+body.current.temperature+ ' but its feels like '+body.current.feelslike+'.')}
        })

}
module.exports=forecast