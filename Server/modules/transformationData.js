const ExcelJS = require('exceljs')
const sheetToJSON = require('./sheetToJSON')

module.exports = {
  transformationData: async function (file){
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(file)

    const sheets = workbook.worksheets
    const resultArray = []
    
    for (const sheet of sheets) {
      const sheetWithoutVoid = await sheetToJSON.fillEmpty(sheet)
      const sheetWithoutExcess = await sheetToJSON.removeRows(sheetWithoutVoid)
      const arrayObjects = await sheetToJSON.convertSheet(sheetWithoutExcess)
      const correctArrayObjects = await sheetToJSON.transformArray(arrayObjects, sheet)
      resultArray.push(correctArrayObjects)
    }
    
    return resultArray
  }
}