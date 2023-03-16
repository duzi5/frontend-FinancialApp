const express = require('express')
const { dirname } = require('path')
const resolve = require('path')

const app= express()

app.use('/', express.static(
    resolve(
        __dirname,
        './build'
    )
))

app.listen(process.env.PORT || 3000, (err) => console.error(err))