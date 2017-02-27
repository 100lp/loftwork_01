/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve();
    }, seconds*1000);
  });
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
    var xhr = new XMLHttpRequest();
    var abc = function(a, b) {
      return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
    };

    return new Promise(function(resolve, reject) {
      xhr.open('GET', url);
      xhr.send();
      xhr.addEventListener('load', function() {
        var cities = JSON.parse(xhr.response);
        resolve(cities.sort(abc));
      });
    });
}

export {
    delayPromise,
    loadAndSortTowns
};
