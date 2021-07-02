// Хранилище элементов
let knapsackItems = [];
let currentItem = -1;

// Загрузка первоначальных данных
function LoadDefaultItems(){
	let gold = {
		name: 'Золото',
		weight: 15,
		cost: 60,
	};
	let copper = {
		name: 'Медь',
		weight: 30,
		cost: 90,
	};
	let uranium = {
		name: 'Уран',
		weight: 50,
		cost: 100,
	}
	knapsackItems.push(gold);
	knapsackItems.push(copper);
	knapsackItems.push(uranium);

	let addDOMItem = document.createElement("tr");
	addDOMItem.id = "itsr0";
	addDOMItem.innerHTML = '<td class="td2"><input name="itemselect" type="radio" value="0" onchange="SelectItem(this)"> Золото </td>';
	addDOMItem.innerHTML+= '<td class="td2">'+ gold.weight +'</td>';
	addDOMItem.innerHTML+= '<td class="td2">'+ gold.cost +'</td>';
	let tbody = document.getElementById("items_table").getElementsByTagName("TBODY")[0];
	tbody.appendChild(addDOMItem);

	addDOMItem = document.createElement("tr");
	addDOMItem.id = "itsr1";
	addDOMItem.innerHTML = '<td class="td2"><input name="itemselect" type="radio" value="1" onchange="SelectItem(this)"> Медь </td>';
	addDOMItem.innerHTML+= '<td class="td2">'+ copper.weight +'</td>';
	addDOMItem.innerHTML+= '<td class="td2">'+ copper.cost +'</td>';
	tbody.appendChild(addDOMItem);

	addDOMItem = document.createElement("tr");
	addDOMItem.id = "itsr2";
	addDOMItem.innerHTML = '<td class="td2"><input name="itemselect" type="radio" value="2" onchange="SelectItem(this)"> Уран </td>';
	addDOMItem.innerHTML+= '<td class="td2">'+ uranium.weight +'</td>';
	addDOMItem.innerHTML+= '<td class="td2">'+ uranium.cost +'</td>';
	tbody.appendChild(addDOMItem);

}

// Добавление нового элемента в рюкзак
function AddItem(){
    let newItem = {};

    newItem.name = document.getElementById('enteredName').value;
    newItem.weight = +document.getElementById('enteredWeight').value;
    newItem.cost = +document.getElementById('enteredCost').value;

    knapsackItems.push(newItem);

    let newId = knapsackItems.length - 1;
	let addDOMItem = document.createElement("tr");
	addDOMItem.id = "itsr"+ newId;
	addDOMItem.innerHTML = '<td class="td2"><input name="itemselect" type="radio" value="'+newId+'" onchange="SelectItem(this)"> '+newItem.name+'</td>';
	addDOMItem.innerHTML+= '<td class="td2">'+ newItem.weight+'</td>';
	addDOMItem.innerHTML+= '<td class="td2">'+ newItem.cost+'</td>';
	let tbody = document.getElementById("items_table").getElementsByTagName("TBODY")[0];
	tbody.appendChild(addDOMItem);
}

// Выбор элемента в панели
function SelectItem(itemSelect){
	currentItem = +itemSelect.value;
	console.log('Current при выборе ' + currentItem)
	document.getElementById('enteredName').value = knapsackItems[currentItem].name;
	document.getElementById('enteredWeight').value = knapsackItems[currentItem].weight;
	document.getElementById('enteredCost').value = knapsackItems[currentItem].cost;
}

// Удаление элемента
function DeleteItem(){
	if (currentItem < 0) return;
	// Удаляем все объекты с экрана
	for (i = 0; i < knapsackItems.length; i++){
		let delDomItem = document.getElementById('itsr' + i);
		delDomItem.parentNode.removeChild(delDomItem);
	}
	// Удаляем нужный объект из рюкзака
	knapsackItems.splice(currentItem, 1);
	
	// Выводим на экран все оставшиеся элементы с переписанным айдишниками
	for (let i = 0; i < knapsackItems.length; i++){
		let addDOMItem = document.createElement("tr");
		addDOMItem.id = "itsr"+ i;
		addDOMItem.innerHTML = '<td class="td2"><input name="itemselect" type="radio" value="'+i+'" onchange="SelectItem(this)"> '+knapsackItems[i].name+'</td>';
		addDOMItem.innerHTML+= '<td class="td2">'+ knapsackItems[i].weight+'</td>';
		addDOMItem.innerHTML+= '<td class="td2">'+ knapsackItems[i].cost+'</td>';
		let tbody = document.getElementById("items_table").getElementsByTagName("TBODY")[0];
		tbody.appendChild(addDOMItem);
	}
	currentItem = -1;
}

function CalculationAlgorithms(){
	let knapsackItemsLength = knapsackItems.length;
	let knapsackSize = +document.getElementById('bagsize').value;
	document.getElementById('textarea1').innerHTML = '';

	// Жадный алгоритм. Неограниченный рюкзак.
	let resultGreedyAlgorithm = GreedyAlgorithm(knapsackItemsLength,knapsackSize, knapsackItems);

	// Динамическое программирование, неограниченный рюкзак
	let resultDynamicProgramming = DynamicProgramming(knapsackItemsLength,knapsackSize,knapsackItems);
	// Какие элементы и в каком количестве взяли в динамическом программировании
	let resultElementDynamicProgramming = '';
	for (let i = 0; i < knapsackItemsLength;i++){
		resultElementDynamicProgramming += resultDynamicProgramming[1][i] + ' ';
	}

	// Рюкзак 0-1
	let brutalForceStart = Date.now();
	let resultBrutalForceZeroOne = BrutalForce(knapsackSize,knapsackItemsLength,knapsackItems);
	let brutalForceEnd = Date.now();

	let resultGreedyAlgorithmZeroOne = GreedyAlgorithmZeroOne(knapsackItems,knapsackSize,knapsackItemsLength);

	let resultGeneticAlgorithm = GeneticAlgorithm(knapsackItemsLength,knapsackSize,knapsackItems);

	// Вывод ответа
	document.getElementById('textarea1').innerHTML += `\tНеограниченный рюкзак:\nРезультат жадного алгоритма: ${resultGreedyAlgorithm[0]}. Время выполнения алгоритма ${resultGreedyAlgorithm[1]}мс.`
		+`\nРезультат динамического программирования: ${resultDynamicProgramming[0]}. Выбранные элементы: ${resultElementDynamicProgramming}\n`
		+`\tРюкзак 0-1:\nРезультат полного перебора: ${resultBrutalForceZeroOne}. Время выполнения: ${brutalForceEnd - brutalForceStart}мс.\n`
		+ `Результат жадного алгоритма: ${resultGreedyAlgorithmZeroOne[0]}. Время выполнения ${resultGreedyAlgorithmZeroOne[1]}мс.`;
}

// Жадный алгоритм неограниченный рюкзак
function GreedyAlgorithm(knapsackItemsLength,knapsackSize, knapsackItems){
	// Просчет время работы алгоритмов. Начальное время работы
	let start = Date.now();
	// Массив для удельной ценности
	let specificValue = [];
	
	// Записываем удельную ценность для каждого объекта
	for (let i = 0; i < knapsackItemsLength; i++){
		let temporary = {};
		temporary.id = i;
		temporary.count = 0;
		temporary.bonus = knapsackItems[i].cost / knapsackItems[i].weight;
		specificValue.push(temporary);
	}

	// Сортируем массив удельной ценности от наибольшей удельной ценности 
	// к наименьшей
	specificValue.sort((SortArrayByField('bonus')))
	let temporarySize = knapsackSize;
	for (let i = 0; i < knapsackItemsLength; i++){
		// Максимально заполняем самым ценным предметом, деля вес рюкзака на вес предмета, если оставшийся вес
		// меньше веса предмета, он округляется до нуля и не берется. Т.е по факту сейчас мы записываем сколько 
		// предметов мы берем
		specificValue[i].count = Math.floor(temporarySize / knapsackItems[specificValue[i].id].weight);
		// Записываем оставшийся вес после заполнения
		temporarySize = temporarySize - specificValue[i].count * knapsackItems[specificValue[i].id].weight;
	}

	let result = 0;
	
	for (let i = 0; i < knapsackItemsLength; i++){
		// Пробегаемся по массиву и считаем стоимость набранного
		result += specificValue[i].count * knapsackItems[specificValue[i].id].cost;
	}
	// Финальное время работы
	let end = Date.now();
	// Общее время работы
	let timeWork = end - start;
	
	return [result, timeWork];
}

function GreedyAlgorithmZeroOne(knapsackItems,knapsackSize,knapsackItemsLength){
	let start = Date.now();

	let specificValue = [];

	for (let i = 0; i < knapsackItemsLength; i++){
		let temporary = {};
		temporary.id = i;
		temporary.existence = true;
		temporary.bonus = knapsackItems[i].cost / knapsackItems[i].weight;
		specificValue.push(temporary);
	}
	
	specificValue.sort(SortArrayByField('bonus'));
	let temporarySize = knapsackSize;
	for (let i = 0; i < knapsackItemsLength; i++){
		if(knapsackItems[specificValue[i].id].weight < temporarySize){
			specificValue[i].existence = false;
			temporarySize -= knapsackItems[specificValue[i].id].weight;
		}
	}

	let result = 0;
	for (let i = 0; i < knapsackItemsLength; i++){
		if (!specificValue[i].existence){
			result += knapsackItems[specificValue[i].id].cost;
		}
	}
	let end = Date.now();
	return [result, (end - start)]
}

function SortArrayByField(field){
	return (a,b) => b[field] - a[field];
}

// Динамическое программирование неограниченный рюкзак
function DynamicProgramming(knapsackItemsLength,knapsackSize,knapsackItems){
	// Просчет время работы алгоритмов. Начальное время работы
	let start = Date.now();
	// Наборы предметов
	let dPSet = [];
	// Наборы результатов при определенном весе
	let dPResArray = [];
	let dPSetStart = [];

	for (let i = 0; i < knapsackItemsLength; i++){
		dPSetStart.push(0);
	} 
	dPSet.push(dPSetStart);
	dPResArray.push(0);
	// Перебираем все "размеры" рюкзака, начиная от 1 кг и до максимального
	for (let tempSize = 1; tempSize <= knapsackSize; tempSize++){
		
		let dPTempRes = 0, incItem = -1;
		// Перебираем все имеющиеся вещи
		for (let i = 0; i < knapsackItemsLength; i++){
			// Если какая-то вещь помещается в рюкзак текущего размера (tempsize)
			if (tempSize - knapsackItems[i].weight >= 0){
				let temp = dPResArray[tempSize - knapsackItems[i].weight] + knapsackItems[i].cost;
				if ( temp > dPTempRes){
					incItem = i;
					dPTempRes = temp;
				}
			}
		}
		// Если нашлись предметы
		if ( incItem > -1){
			var dPTempItem = [];
			for (let i = 0; i < knapsackItemsLength; i++){
				dPTempItem[i] = dPSet[tempSize - knapsackItems[incItem].weight][i];
			}
			dPTempItem[incItem]++;
			dPSet.push(dPTempItem);
			dPResArray.push(dPTempRes);
		}
		// Если предметы не нашлись
		else{
			var dPTempItem = [];
			for (let i = 0; i < knapsackItemsLength; i++){
				dPTempItem[i] = 0;
			}
			dPSet.push(dPTempItem);
			dPResArray.push(0);

		}
	}

	// Финальное время работы
	let end = Date.now();
	// Общее время работы
	let timeWork = end - start;

	return [dPResArray[knapsackSize], dPTempItem, timeWork];
}

// Алгоритм полного перебора для рюкзака 0 - 1
function BrutalForce(knapsackSize,knapsackItemsLength, knapsackItems){
	if (Object.is(knapsackSize,0) || Object.is(knapsackItemsLength,0)){
		return 0;
	}
	// Если вес элемента больше чем вместимость ранца, тогда этот элемент не входит в оптимальное решение
	if (knapsackItems[knapsackItemsLength - 1].weight > knapsackSize){
		// Вызываем проверку на оптимальность следующего элемента
		return BrutalForce(knapsackSize,knapsackItemsLength - 1,knapsackItems);
	}
	else{
		// Возвращаем максимум двух случаев, сумма всех элементов с текущим, или без него.
		return Math.max(knapsackItems[knapsackItemsLength - 1].cost + BrutalForce(knapsackSize - knapsackItems[knapsackItemsLength - 1].weight,knapsackItemsLength - 1,knapsackItems), BrutalForce(knapsackSize,knapsackItemsLength - 1,knapsackItems));
	}
}

function FactoryTests(){
	let factoryKnapsackItems = [];
	document.getElementById('textarea2').innerHTML = '';
	for (let i = 0; i < +document.getElementById('enteredItemLength').value; i++){
		let newItem = {};
		
		newItem.weight = randomInteger(1, +document.getElementById('enteredKnapsackSize').value);
		newItem.cost = randomInteger(1,100);
		factoryKnapsackItems.push(newItem);
	}
	if (document.getElementById('greedy').checked){
		let resultGreedyAlgorithm = GreedyAlgorithm(+document.getElementById('enteredItemLength').value,+document.getElementById('enteredKnapsackSize').value, factoryKnapsackItems);
		document.getElementById('textarea2').innerHTML += `Результат жадного алгоритма: ${resultGreedyAlgorithm[0]}. Время выполнения алгоритма ${resultGreedyAlgorithm[1]}мс.`;
	}
	else if(document.getElementById('dynamic').checked){
		let resultDynamicProgramming = DynamicProgramming(+document.getElementById('enteredItemLength').value,+document.getElementById('enteredKnapsackSize').value,factoryKnapsackItems);
		document.getElementById('textarea2').innerHTML += `Результат динамического программирования: ${resultDynamicProgramming[0]}. Время выполнения алгоритма ${resultDynamicProgramming[2]}мс.`;
	}
	else if(document.getElementById('brutalForce').checked){
		let brutalForceStart = Date.now();
		let resultBrutalForceZeroOne = BrutalForce(+document.getElementById('enteredKnapsackSize').value,+document.getElementById('enteredItemLength').value,factoryKnapsackItems);
		let brutalForceEnd = Date.now();
		document.getElementById('textarea2').innerHTML += `Результат полного перебора: ${resultBrutalForceZeroOne}. Время выполнения: ${brutalForceEnd - brutalForceStart}мс.`;
	}
	else if(document.getElementById('greedyZeroOne').checked){
		let resultGreedyAlgorithmZeroOne = GreedyAlgorithmZeroOne(factoryKnapsackItems,+document.getElementById('enteredKnapsackSize').value,+document.getElementById('enteredItemLength').value);
		document.getElementById('textarea2').innerHTML += `Результат жадного алгоритма 0 - 1: ${resultGreedyAlgorithmZeroOne[0]}. Время выполнения ${resultGreedyAlgorithmZeroOne[1]}мс.`;
	}
}

function randomInteger(min,max){
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

function GeneticAlgorithm(knapsackItemsLength,knapsackSize,knapsackItems){
	// Получаем массив начальной популяции
	let initialPopulation = GenerateInitialPopulation(knapsackItemsLength);
	// Просчитываем вес и стоимость для каждой хромосомы. Стоимость будет выступать в качестве значения приспособленности
	for(let i = 0; i < initialPopulation.length; i++){
		// Получаем набор аллелей
		let temporary = initialPopulation[i].value.split('');
		let weight = 0;
		let cost = 0;
		for (let j = 0; j < temporary.length; j++){
			// Если объект входит в набор, т.е. значение 1, мы прибавляем его к весу всего комплекта
			if (Object.is(temporary[j],'1')){
				weight += knapsackItems[j].weight;
				cost += knapsackItems[j].cost;
			}
		}
		initialPopulation[i].weight = weight;
		initialPopulation[i].cost = cost;
	}

	// Сохраняем только те хромосомы, у которых вес набора входит под условие максимальной грузоподъемности
	let tempInitialPopulation = initialPopulation.filter(function(chromosome){
		return (chromosome.weight <= knapsackSize);
	});
	
	// Высчитываем суммарную приспособленность
	let totalFitness = tempInitialPopulation.reduce((sum, current) => sum + current.cost,0);
	
	// Перебираем все хромосомы
	for(let i = 0; i < tempInitialPopulation.length; i++){
		// Просчитываем и записываем вероятность попадения в промежуточную популяцию методом рулетки
		tempInitialPopulation[i].expectation = Math.round((tempInitialPopulation[i].cost / totalFitness) * tempInitialPopulation.length);
	}

	// Создаем промежуточную популяцию
	let intermediatePopulation = [];
	tempInitialPopulation.forEach((item) =>{
		for (let i = 0; i < item.expectation; i++){
			intermediatePopulation.push(item);
		}
	});

	console.log(JSON.stringify(tempInitialPopulation))
	console.log(JSON.stringify(intermediatePopulation))
}

function GenerateInitialPopulation(knapsackItemsLength){
	// Set для новой популяции, чтобы не было повторов
	let initialPopulationSet = new Set();
	// Выбираем случайный размер начальной популяции, от 1 до 2 ** N
	for (let j = 0; j < randomInteger(1, 2**knapsackItemsLength); j++){
		// Создаем хромосому
		let chromosome = '';
		// Генериуем 0 и 1 в количестве объектов рюкзака
		for (let i = 0; i < knapsackItemsLength; i++){
			chromosome += randomInteger(0,1);
		}
		// Добавляем хромосому в популяцию
		initialPopulationSet.add(chromosome);
	}
	let initialPopulation = [];
	initialPopulationSet.forEach((value) => {
		let ch = {};
		ch.value = value;
		initialPopulation.push(ch);
	});
	return initialPopulation;
}
