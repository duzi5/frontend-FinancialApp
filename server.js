const express = require('express')
const { dirname } = require('path')
const resolve = require('path')

const app= express()

app.use('/', express.static(
    resolve(
        --dirname,
        './build'
    )
))