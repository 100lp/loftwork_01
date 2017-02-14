/* ДЗ 3 - объекты и массивы */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
  for (var i = 0; i < array.length; i++) {
    fn(array[i], i, array);
  }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    result[i] = fn(array[i], i, array);
  }
  return result;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
  var previousValue;
  var i = 0;

  if (initial) {
    previousValue = initial;
  } else {
    previousValue = array[0];
    i++;
  }

  for (i; i < array.length; i++) {
    // тут я застревал так как думал, что не "нормально" передавать во внешнюю функцию арргументы
    // когда изначально она их не предусматривает и нигде не использует
    previousValue = fn(previousValue, array[i], i, array);
  }

  return previousValue;

}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходимо удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
  delete obj[prop];
  return obj;
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
  if (obj[prop]) {
    return true;
  }
  return false;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
  var result = [];
  // ОМГ :D
  // for (var i = 0; i < args.length; i++) {
  //   for (var prop in obj) {
  //     if (prop == args[i]) {
  //       result.push(prop);
  //     }
  //   }
  // }
  for (var prop in obj) {
    result.push(prop);
  }
  return result;
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
  var result = [];
  for (var prop in obj) {
    result.push(prop.toUpperCase());
  }
  return result;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from = 0, to = array.length) {
  var result = [];

  if (from < 0) {
    from = array.length + from;
    if (from < 0) {
      from = 0;
    }
  }

  if (to < 0) {
    to = array.length + to;
    if (to < 0) {
      to = 0;
    }
  }

  if (to > array.length) {
    to = array.length;
  }

  for (var i = from; i < to; i++) {
    result.push(array[i]);
  }
  return result;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
