module.exports = {
  convertSheet: async function (worksheet) {
    return new Promise((resolve, reject) => {
      const data = []
      const convertDate = (str) => {
        // Создаем объект Date из строки
        const date = new Date(str);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        // Собираем сокращенный вид даты
        const shortenedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;

        return shortenedDate
      }

      const convertPercentage = (value) => {
        switch (typeof value) {
          case 'string':
            return parseFloat(value.trim().slice(0,-1))
          case 'object':
            if (value !== null) {
              return value.result * 100
            } else {
              return null
            }
          default:
          return value * 100
        }
      }

      for (let i = 2; i <= worksheet.rowCount; i++) {
        const row = worksheet.getRow(i)
        const theme = row.getCell(1).value

        for (let j = 4; j <= worksheet.columnCount; j++) {
          const cur_sheet = worksheet.name
          const question = worksheet.getCell(i, 2).value
          const answer = worksheet.getCell(i, 3).value
          const date = convertDate(worksheet.getCell(1, j).value)
          const percentage = convertPercentage(row.getCell(j).value)
          // Отсекаем последние столбцы со служебной информацией
          if (percentage !== null && typeof worksheet.getCell(1, j).value === 'object') {
            data.push({ cur_sheet, theme, question, answer, date, percentage })
          }
        }
      }
      resolve(data)
    })
  }
}