module.exports = {
  convertDate: (value) => {
    // Создаем объект Date из строки
    const date = new Date(value);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Собираем сокращенный вид даты
    const shortenedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;

    return shortenedDate
  },
  convertPercentage: (value) => {
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
  },
  convertQuestion: (value) => {
    if (typeof value === 'string') {
      return value
    }
    else {
      return value.richText.map(obj => obj.text).join(" ");
    }
  }
}