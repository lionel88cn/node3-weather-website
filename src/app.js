const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const app=express()
const pubDirPth=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(pubDirPth))


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weater',
        name: 'Ang Li'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Ang Li'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help page',
        name: 'Ang Li',
        helpText: 'This is the help text'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if (error){return res.send({error})}
        forecast(data.latitude,data.longitude, (error, forecastdata) => {
            if (error){return res.send({error})}
            res.send({
                forecast: forecastdata,
                location: data.location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Ang Li',
        errorMsg: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Ang Li',
        errorMsg: 'Page not found'
    })
})


app.listen(3000,()=>{
    console.log('Express is running!')
})