(function () {
	'use strict';
	angular.module('countries')
	/**
	 * @ngdoc directive
	 * @name countrySearch
	 *
	 * @description
	 * Отфильтровывает список стран и выводит счетчики найденных и выбранных стран
	 *
	 * @restrict E
	 *
	 * @require countryList
	 * */
		.directive('countrySearch', countrySearch);

	/**
	 * Директива countrySearch
	 * @returns {{restrict: string, require: string, scope: boolean, template: string, link: Function}}
	 */
	function countrySearch() {
		return {
			restrict: 'E',
			require: '^countryList',
			scope: false,
			template: '<input type="search" placeholder="Поиск страны..." ng-change="filterOut()" ng-model="searchText"><label> Найдено: {{ foundCount }}; Выбрано: {{ selectedCount }}</label>',
			link: function (scope) {
				// Кол-во найденных элементов
				scope.foundCount = scope.countries.length;
				// Кол-во выбранных элементов
				scope.selectedCount = 0;
				// Функция поиска
				scope.filterOut = function () {
					// Проверяем есть ли текст в поисковом поле
					if (scope.searchText) {
						// indexOf чувствителен к регистру
						var search = scope.searchText.toLowerCase();
						// Сбрасываем счетчик найденных объектов
						scope.foundCount = 0;
						// Пробегаемся по всему массиву и ищем подходящие записи.
						// Если подходит - почемаем
						scope.countries.forEach(function (item) {
							if (item.name.toLowerCase().indexOf(search) >= 0) {
								item.filteredOut = false;
								scope.foundCount++;
							} else {
								item.filteredOut = true;
							}
						});
					}
					// Ну раз нет, то все записи подходят
					else {
						scope.countries.forEach(function (item) {
							item.filteredOut = false;
						});
						scope.foundCount = scope.countries.length;
					}
				};
				// Следим за именением массива стран для того чтобы высчитывать кол-во выбранных
				scope.$watch('countries', function (newValue) {
					scope.selectedCount = newValue.filter(function (item) {
						return item.selected == true;
					}).length;
				}, true);
			}
		};
	}
})();