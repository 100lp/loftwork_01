/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */

function isAllTrue(array, fn) {
  if (array.length === 0 || array.constructor !== Array) {
    throw new Error("empty array");
  } else if (typeof fn !== 'function') {
    throw new Error("fn is not a function");
  }
  var temp;
  try {
    for (var i = 0; i < array.length; i++) {
      // именной в этой задаче мне нужно пройтись абсолютно по всем элементам без исключения
      // поэтому и решил применить доп переменную
      if (fn(array[i]) === true) {
        temp = 'true';
      } else {
        temp = 'false';
      }
    }
    if (temp == 'true') {
      return true;
    }
  } catch (e) {
    console.log(e.message);
  }
}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {
  if (array.length === 0 || array.constructor !== Array) {
    throw new Error("empty array");
  } else if (typeof fn !== 'function') {
    throw new Error("fn is not a function");
  }

  try {
    for (var i=0; i < array.length; i++) {
      if (fn(array[i]) === true) {
        return true;
      }
    }
  } catch (e) {
    console.log(e.message);
  }
}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn, ...args) {
  var badArgs = [];

  if (typeof fn !== 'function') {
    throw new Error("fn is not a function");
  }

  try {
    for (var i = 0; i < args.length; i++) {
      try {
        fn(args[i]);
      } catch (e) {
        badArgs.push(args[i]);
      }
    }
  } catch (e) {
    console.log(e.message);
  }

  return badArgs;
}

/*
 Задача 4:
 Используя отладчик и точки остановки, определите в каких случаях if дает true
 Исправьте условие внутри if таким образом, чтобы функция возвращала true
 */
function findError(data1, data2) {
    return (function() {

        for (var i = 0; i < data1.length; i++) {
            if ( isNaN(data1[i]) !== isNaN(data1[i]) ) {
                return false;
            }
        }

        return true;
    })();
}

/*
 Задача 5:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданным аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {
  var obj = {};
  var excTest = function(a) {
    if (a === 0) {
      throw new Error("division by 0");
    }
  };

  if (!Number.isInteger(number)) {
    throw new Error("number is not a number");
  } try {

    obj.sum = function(...args) {
      var result = number;
      for (var i = 0; i < args.length; i++) {
        excTest(args[i]);
        try {
          result = result + args[i];
        } catch(e) {
          console.log(e.message);
        }
      }
      return result;
    };
    obj.dif = function(...args) {
      var result = number;
      for (var i = 0; i < args.length; i++) {
        excTest(args[i]);
        try {
          result = result - args[i];
        } catch(e) {
          console.log(e.message);
        }
      }
      return result;
    };
    obj.div = function(...args) {
      var result = number;
      for (var i = 0; i < args.length; i++) {
        excTest(args[i]);
        try {
          result = result / args[i];
        } catch(e) {
          console.log(e.message);
        }
      }
      return result;
    };
    obj.mul = function(...args) {
      var result = number;
      for (var i = 0; i < args.length; i++) {
        excTest(args[i]);
        try {
          result = result * args[i];
        } catch(e) {
          console.log(e.message);
        }
      }
      return result;
    };

  } catch(e) {
    console.log(e.message);
  }

  return obj;

}

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    findError,
    calculator
};
