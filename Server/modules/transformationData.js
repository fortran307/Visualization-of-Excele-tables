const ExcelJS = require('exceljs')
const fillEmpty = require('./fillEmpty')
const removeRows = require('./removeRows')
const convertSheet = require('./convertSheet')
const transformArray = require('./transformArray')

module.exports = {
  transformationData: async function (fileBuffer){
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(fileBuffer)

    // СМОТРИ ПОКА ТОЛЬКО ПЕРВЫЙ ЛИСТ
    const worksheet = workbook.worksheets[0]

    // На перспективу - просмотр всех страниц
    // workbook.eachSheet(function(worksheet, sheetId) {
    //   код
    // });
    
    const sheetWithoutVoid = await fillEmpty.fillEmpty(worksheet)
    const sheetWithoutExcess = await removeRows.removeRows(sheetWithoutVoid)
    const arrayObjects = await convertSheet.convertSheet(sheetWithoutExcess)
    const correctArrayObjects = await transformArray.transformArray(arrayObjects)
    
    return correctArrayObjects
  }
}