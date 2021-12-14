"use strict"
//функция фильтрации по типу, в которой в аргумент принимается тип данных  и опред. значения.Функция возвращает массив из значений, приравненных типу
const filterByType = (type, ...values) => values.filter(value => typeof value === type),
	//Функция сокрытия всех блоков
	hideAllResponseBlocks = () => {
		//Получаем все блоки с результатами и записываем в переменную-массив
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		//Скрываем все блоки с помощью display: none;
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
	//Функция показа ответного блока с параметрами -  селектор блока,сообщение и  span
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		//Вызываем функцию сокрытия блоков
		hideAllResponseBlocks();
		//Находим элемент blockSelector и присваиваем ему значение display: block
		document.querySelector(blockSelector).style.display = 'block';
		//Если передан span есть и он true,то мы находим spanSelector,и в textContent записываем сообщение
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
	//Функция ошибки,в которой вызывается функцию показа блока с сообщением об ошибке
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	//Функция показа результата,в которой вызывается функция показа блока с сообщением об успехе)
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	//Функция показа результата,когда нет результата
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	//Функция  фильтрации с параметрами type  и values
	tryFilterByType = (type, values) => {
		//конструкция try/catch
		try {
			//Создаем переменную-массив и присваиваем ей работу функции filterByType и собираем в строку
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//Создаем переменную alertMsg и проверяем  длинну массива (условтие). Далее выводим тип и значение,если есть длинна !==0, или отсутвие данных опред.типа
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			//Передаем сообщение в функцию
			showResults(alertMsg);
		} catch (e) {
			//Показываем ошибку
			showError(`Ошибка: ${e}`);
		}
	};
//Получаем кнопку filterButton
const filterButton = document.querySelector('#filter-btn');

//Вешаем событие по клику на кнопку
filterButton.addEventListener('click', e => {
	//Находим элементы на странице
	const typeInput = document.querySelector('#type');
	const dataInput = document.querySelector('#data');

	//Проверяем на пустоту
	if (dataInput.value === '') {
		//Выводим сообщение при не заполненности инпута
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		//Показываем сообщение :
		showNoResults();
	} else {
		//Если инпут не пуст,убираем сообщение
		dataInput.setCustomValidity('');
		//Отменяем обычное поведение кнопки
		e.preventDefault();
		//запуск функции фильтрациb, в которую передаем значения типа и данных, убрав пробелы
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});
