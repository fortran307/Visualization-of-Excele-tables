module.exports = {
  removeRows: async function (worksheet) {
    return new Promise((resolve, reject) => {
      let rowIndex = 2
      let row = worksheet.getRow(rowIndex)

      do {
        let isEmpty = true

        for (let i = 4; i <= row.cellCount; i++) {
          if (row.getCell(i).value !== null && row.getCell(i).value !== '') {
            isEmpty = false
            break
          }
        }
        if (isEmpty) {
          worksheet.spliceRows(rowIndex, 1)
          rowIndex--
        }

        rowIndex++
        row = worksheet.getRow(rowIndex)
      } while(rowIndex < worksheet.rowCount)

      resolve(worksheet)
    })
  }
}