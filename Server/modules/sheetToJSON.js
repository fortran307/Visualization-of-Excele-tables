const convertData = require('./convertData')

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
  },
  removeRows: async function (worksheet) {
    return new Promise((resolve, reject) => {
      // Задаем начальную строку с которой начинаем чистить лист
      let rowIndex = 3
      let row = worksheet.getRow(rowIndex)

      do {
        let isEmpty = true
        // Проверяем вся ли строка пустая для удаления служебных строк
        for (let i = 4; i <= row.cellCount; i++) {
          if (row.getCell(i).value !== null && row.getCell(i).value !== "") {
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
      } while (rowIndex < worksheet.rowCount)

      resolve(worksheet)
    })
  },
  convertSheet: async function (worksheet) {
    return new Promise((resolve, reject) => {
      const arr = []

      // Начинаем смотреть массив данных с 3 строки
      for (let i = 3; i <= worksheet.rowCount; i++) {
        const nameSheet = worksheet.name
        const row = worksheet.getRow(i)
        const theme = row.getCell(1).value
        const question = convertData.convertQuestion(row.getCell(2).value)
        const answer = row.getCell(3).value

        for (let j = 4; j <= worksheet.columnCount; j++) {
          const cellDate = worksheet.getCell(2, j).value
          const percentage = convertData.convertPercentage(row.getCell(j).value)
          // Отсекаем последние столбцы со служебной информацией и пустые ячейки
          // if (percentage !== null && typeof cellDate === 'object') {
            if (percentage !== null && (cellDate instanceof Date)) {
            const date = convertData.convertDate(cellDate)
            arr.push({ nameSheet, theme, question, answer, date, percentage })
          }
        }
      }
      resolve(arr)
    })
  },
  transformArray: async function(arr, worksheet) {
    return new Promise((resolve, reject) => {

      // Преобразуем входной массив в объект, сгруппировав его по темам, вопросам и ответам
      const setQuest = arr.reduce((result, obj, index) => {

        // Извлекаем значения для темы, вопроса, ответа и процента из текущего объекта
        const { cur_sheet, theme, question, answer, date, percentage } = obj

        // Если темы еще нет в результирующем объекте, создаем ее
        if (!result[theme]) {
          result[theme] = {
            id: index + 1,
            theme,
            cur_sheet,
            questions: []
          }
        }

        // Получаем массив уникальных вопросов для текущей темы
        const uniqueQuestions = result[theme].questions

        // Проверяем, существует ли уже такой вопрос в массиве уникальных вопросов
        const existingQuestion = uniqueQuestions.find(q => q.question === question)

        // Если вопроса еще нет, добавляем его в массив уникальных вопросов
        if (!existingQuestion) {
          uniqueQuestions.push({
            id: index + 1,
            question,
            answers: []
          })
        }

        // Получаем текущий вопрос из массива уникальных вопросов для текущей темы
        const currentQuestion = uniqueQuestions.find(q => q.question === question)

        // Проверяем, существует ли уже такой ответ для текущего вопроса
        const existingAnswer = currentQuestion.answers.find(a => a.answer === answer)

        // Если ответа еще нет, добавляем его в массив ответов для текущего вопроса
        if (!existingAnswer) {
          currentQuestion.answers.push({
            id: index + 1,
            answer,
            history: []
          })
        }

        // Получаем текущий ответ из массива ответов для текущего вопроса
        const currentAnswer = currentQuestion.answers.find(a => a.answer === answer)

        // Добавляем дата и процент в историю ответа
        currentAnswer.history.push({ date, percentage })
        
        // Возвращаем обновленный результирующий объект
        return result
      }, {})

      resolve({sheet:worksheet.name, data:Object.values(setQuest)})
    })
  }
}