module.exports = {
  transformArray: async function(newArr) {
    return new Promise((resolve, reject) => {
      // Разбираем переданный массив из JSON-строки
      const x = JSON.parse(newArr)

      // Преобразуем входной массив в объект, сгруппировав его по темам, вопросам и ответам
      const setQuest = x.reduce((result, obj, index) => {

        // Извлекаем значения для темы, вопроса, ответа и процента из текущего объекта
        const { theme, question, answer, date, percentage } = obj

        // Если темы еще нет в результирующем объекте, создаем ее
        if (!result[theme]) {
          result[theme] = {
            id: index + 1,
            theme,
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

        // Если указаны дата и процент, добавляем их в историю ответа
        if (date && percentage) {
          currentAnswer.history.push({ date, percentage })
        }
        
        // Возвращаем обновленный результирующий объект
        return result
      }, {})

      // Преобразуем объект сгруппированных данных обратно в массив 
      const finalResult = Object.values(setQuest)
      
      // Разрешаем обещание с финальным результатом
      resolve(finalResult)
    })
  }
}