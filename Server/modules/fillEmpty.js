module.exports = {
  fillEmpty: async function (worksheet) {
    return new Promise((resolve, reject) => {
      let previousTheme, previousQuestion

      worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
        const currentTheme = row.getCell(1).value,
              currentQuestion = row.getCell(2).value

        if (currentTheme !== null) {
          previousTheme = currentTheme
        }

        if (currentQuestion !== null) {
          previousQuestion = currentQuestion
        }

        row.getCell(1).value = previousTheme
        row.getCell(2).value = previousQuestion        
      })

      resolve(worksheet)
    })
  }
}