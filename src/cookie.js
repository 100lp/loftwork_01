/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
  return full.toLowerCase().includes(chunk.toLowerCase());
}

/**
 * Создает новый tr для таблицы со списком cookie
 *
 * @param name - имя cookie
 * @param value - значение cookie
 */
function createCookieTr(name, value) {
  var tr = document.createElement('tr');
  tr.innerHTML = `<th>${name}</th>
                  <th>${value}</th>
                  <th><a style="color: red; cursor: pointer;" href="#" class="removeCookie">удалить</a></th>`;
  return tr;
}

// Инструмент для удаления
function removeCookie(link) {
  link.addEventListener('click', (e) => {

    // Удаляем из таблицы
    e.target.parentElement.parentElement.remove();

    // Удаляем куку
    var name = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    document.cookie = `${name}=""; expires=${new Date(0)}`;
  });
}

// Инструмент для поиска куки
// (скопировал из интернета для экономии времени)
function getDocumentCookies() {
    var theCookies = document.cookie.split(';'),
        cookieObj = {},
        tmp, tmpName, tmpVal;
    for (let i = 1 ; i <= theCookies.length; i++) {
        tmp = theCookies[i-1].split('=');
        tmpName = decodeURIComponent(tmp[0].trim());
        tmpVal = decodeURIComponent(tmp[1].trim());
        if ( tmpName.indexOf('[') > -1 && tmpName.indexOf(']') > -1 ) {
            cookieObj[tmpName.split('[')[0]] = cookieObj[tmpName.split('[')[0]] || {};
            cookieObj[tmpName.split('[')[0]][tmpName.split('[')[1].replace(']', '')] = tmpVal;
        } else {
            cookieObj[tmpName] = tmpVal;
        }
    }
    return cookieObj;
}

// Фильтрация
filterNameInput.addEventListener('keyup', function() {
  let cookieNames = Object.keys(getDocumentCookies());
  var value = this.value.trim();
  var obj = getDocumentCookies();
  var tr;

  // Чистим таблицу перед загрузкой
  listTable.innerHTML = "";

  for (let i=0; i < cookieNames.length; i++) {
    if (isMatching(cookieNames[i], value)) {
      tr = createCookieTr(cookieNames[i], obj[cookieNames[i]]);
      listTable.appendChild(tr);
    }
  }
});

// Выгружаем все куки в таблицу
function loadAllCookies() {
  var obj = getDocumentCookies();
  var tr;

  let promise = new Promise(function(resolve, reject) {
    for (let prop in obj) {
      tr = createCookieTr(prop, obj[prop]);
      listTable.appendChild(tr);
    }

    // Resolve
    resolve();
  });

  // Вешаем событие удаления на ссылку после ее создания
  promise.then(function() {
    var removeLinks = homeworkContainer.querySelectorAll('.removeCookie');
    removeLinks.forEach(function (link) {
      removeCookie(link);
    });
  });
}

// Загружаем все куки при загрузке страницы
document.addEventListener("DOMContentLoaded", function(){
  loadAllCookies();
});

// Форма добавления
addButton.addEventListener('click', () => {
  let promise = new Promise(function(resolve, reject) {
    if (addNameInput.value.length > 0 && addValueInput.value.length > 0) {

      // Создаем куку
      document.cookie = `${addNameInput.value}=${addValueInput.value}`;

      // Чистим инпуты
      addNameInput.value = "";
      addValueInput.value = "";

      // Resolve
      resolve();

    } else {
      alert("нельзя добавить пустое поле");
    }
  });

  // Вешаем событие удаления на ссылку после ее создания
  promise.then(function() {

    // Чисти инпут фильтрации перед загрузкой
    filterNameInput.value = "";

    // Чистим таблицу перед загрузкой
    listTable.innerHTML = "";

    // Загружаем данные в таблицу
    loadAllCookies();

    var removeLinks = homeworkContainer.querySelectorAll('.removeCookie');
    removeLinks.forEach(function(link) {
      removeCookie(link);
    });
  });
});
