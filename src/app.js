const express=require('express')
const path=require('path')
const app=express()
const hbs=require('hbs')
const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const port=process.env.PORT || 3000
//Define paths for Express config
const viewspath=path.join(__dirname,'../templates/views')
const publicDirectoryPath=path.join(__dirname, '../public')
const partialspath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Ashi'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Ashi'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'please contact for help',
        name:'Ashi'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{

        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, frdata) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forcast:frdata,
                location,
                address:req.query.address
            })
          })
    })

    // res.send({
    //     forecast:'aaj blue h paani paani, aur din bhi sunny sunny',
    //     location:'babulaisa',
    //     address: 'India'
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Ashi',
        message:'Help Article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Ashi',
        message:'404 page'
    })
})
app.listen(port,()=>{
    console.log('connected to port'+port)
})