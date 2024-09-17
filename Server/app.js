const transformationData = require('./modules/transformationData')
const express = require('express')
const path = require('path')
const cors = require('cors')
const multer = require('multer')

const app = express()
const upload = multer({storage: multer.memoryStorage()})
app.use(express.json())
app.use(cors())

app.post('/loadTable', upload.single('table'), async (req, res) => {
    const fileBuffer = req.file.buffer
    transformationData.transformationData(fileBuffer)
      .then((json) => res.status(201).json(json))
      .then(() => {fileBuffer.buffer = null})
      .catch((error) => console.error('Error:', error))
})

app.use(express.static(path.resolve(__dirname, 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server has been started on port ${port}`))