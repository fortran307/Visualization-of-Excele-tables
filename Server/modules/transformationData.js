const ExcelJS = require('exceljs')
const sheetToJSON = require('./sheetToJSON')

module.exports = {
  transformationData: async function (file){
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(file)

    const sheets = workbook.worksheets
    const resultArray = []
    
    for (const sheet of sheets) {
      // Заполняем во все пустые строки темы и вопрос
      const sheetWithoutVoid = await sheetToJSON.fillEmpty(sheet)
      // Удаляем служебные поля (тема и вопрос)
      const sheetWithoutExcess = await sheetToJSON.removeRows(sheetWithoutVoid)
      // Получаем из данных с листа массив JSON
      const arrayObjects = await sheetToJSON.convertSheet(sheetWithoutExcess)
      // Преобразуем в структурированный массив JSON
      const correctArrayObjects = await sheetToJSON.transformArray(arrayObjects, sheet)
      resultArray.push(correctArrayObjects)
    }
    
    return resultArray
  }
}