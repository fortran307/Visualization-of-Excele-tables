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

      for (let i = 2; i <= worksheet.rowCount; i++) {
        const row = worksheet.getRow(i)
        const theme = row.getCell(1).value

        for (let j = 4; j <= worksheet.columnCount; j++) {
          const question = worksheet.getCell(i, 2).value
          const answer = worksheet.getCell(i, 3).value
          // Конвертируем дату в читабельный вид
          const date = convertDate(worksheet.getCell(1, j).value)
          const percentage = row.getCell(j).value * 100
          // Убираем пустые значения
          if (percentage !== '' && percentage !== null) {
            data.push({ theme, question, answer, date, percentage })
          }
        }
      }

      const json = JSON.stringify(data)
      resolve(json)
    })
  }
}