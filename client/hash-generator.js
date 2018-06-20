const crypto = require('crypto')

const hash = crypto.createHash('sha256')

const createHash = dataToHash => {
  const hashedData = hash.write(dataToHash)
  return hashedData
}

export default createHash
