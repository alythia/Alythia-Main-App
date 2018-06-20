const crypto = require('crypto')

const hash = crypto.createHash('sha256')

const createHash = dataToHash => {
  const hashedData = hash.update(dataToHash)
  return hashedData
}

export default createHash
