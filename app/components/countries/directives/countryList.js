(function () {
	'use strict';
	angular.module('countries')
	/**
	 * @ngdoc directive
	 * @name countryList
	 *
	 * @description
	 * Выводит список стран с чекбоксами.
	 * В качестве агументов можно передать список стран, который будет отображаться.
	 * Так же передаётся переменная в которую будут складываться выбранные страны. Если такая переменная будет
	 *      не пустым массивом, то директива попытается установить выбрать чекбоксы. Если такой страны в списке
	 *      нет, то запись из массива будет удалена
	 *
	 * @restrict E
	 *
	 * @param selectedCountries {Array} Список выбранных стран
	 * @param countriesList {Array} Список стран для отображения
	 * */
		.directive('countryList', countryList);

	/**
	 * Директива countryList
	 * @returns {{restrict: string, scope: {selectedCountries: string, countriesList: string}, template: string, controller: *[]}}
	 */
	function countryList() {
		return {
			restrict: 'E',
			scope: {
				/**
				 * Список выбранных стран
				 */
				selectedCountries: '=',
				/**
				 * Используется для передачи списка стран. Если undefined или не массив, то используется стандартный список
				 */
				countriesList: '='
			},
			template: '<country-search></country-search><br />' +
			'<div ng-repeat="country in countries | filter:{filteredOut: false}">' +
			'<input type="checkbox" ng-change="change(country)" ng-model="country.selected"><label>{{country.name}}</label>' +
			'<br /></div>',
			controller: ['$scope', function ($scope) {
				// Список объектов стран для нужд директивы
				$scope.countries = [];
				// Функция на зименение флага страны
				$scope.change = change;

				init();

				/**
				 * Инициализация
				 */
				function init() {
					if ($scope.countriesList instanceof Array) {
						// Временный массив для исключения дублей
						var tmpCountriesList = [];
						// Если список стран не пустой
						$scope.countriesList.forEach(function (item) {
							// Если такую страну мы ещё не добавляли
							if(tmpCountriesList.indexOf(item) < 0) {
								$scope.countries.push({
									name: item,
									selected: false,
									filteredOut: false
								});
								tmpCountriesList.push(item);
							}
						})
					}
					// Default список
					else {
						$scope.countries = [
							{name: 'Россия', selected: false, filteredOut: false},
							{name: 'Украина', selected: false, filteredOut: false},
							{name: 'США', selected: false, filteredOut: false},
							{name: 'Франция', selected: false, filteredOut: false},
							{name: 'Германия', selected: false, filteredOut: false},
							{name: 'Китай', selected: false, filteredOut: false}
						];
					}
					// Если передан список выбранных стран и это массив
					if ($scope.selectedCountries && $scope.selectedCountries instanceof Array) {
						// Отфильтровываем только те выбранные страны что есть в списке.
						// Параллельно ставим галочку таким странам
						$scope.selectedCountries = $scope.selectedCountries
							.filter(function (item) {
								// Ищем страну и берём первую из списка. Их и не будет больше :)
								var found = $scope.countries.filter(function (searchItem) {
									return searchItem.name == item;
								})[0];
								// Страна есть в обоих списках
								if (found) {
									found.selected = true;
									return true;
								}
								// Если только в списке выбранных стран, то нам такая не нужна
								else {
									return false;
								}
							});
					}
					// В противном случае инициализируем
					else {
						$scope.selectedCountries = [];
					}
				}

				/**
				 * Изменение чекбокса страны
				 * @param item {object} Страна
				 */
				function change(item) {
					// Если флаг поставили
					if (item.selected) {
						// Добавляем в массив выбранных
						$scope.selectedCountries.push(item.name);
					}
					// Если флаг сняли
					else {
						// Ищём в массиве выбранных элементов
						var index = $scope.selectedCountries.indexOf(item.name);
						if (index >= 0) {
							// Удаляем запись по индексу
							$scope.selectedCountries.splice(index, 1);
						}
					}
				}
			}]
		};
	}
})();