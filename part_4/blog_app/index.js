const app = require('./app')
const logger = require('./utils/logger')
const config = require('./utils/config')

app.listen(config.PORT, () => {
  logger.info(`Sever running on port ${config.PORT}`)
})
