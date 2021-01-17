
const authResolvers = require('./auth')
const taskResolvers = require('./task')

module.exports  = {
    ...authResolvers,
    ...taskResolvers
}