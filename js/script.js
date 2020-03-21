// const divEl = Array.from(document.querySelectorAll(''));
// console.log(divEl);

// const divArray = divEl
// 	.map(el => el.dataset)
// 	.reduce((prev, cur) => {
// 		let currentArray = Object.values(cur);
// 		prev = [...currentArray, ...prev];
// 		return prev;
// 	}, [])
// 	.join(' ');

// console.log(divArray);

let filtersArray = [];

//get all elements that can be used to filter
const filterTags = document.querySelectorAll('.btn-tag');
const filterBar = document.querySelector('.filter-bar');
const jobLists = document.querySelectorAll('.job__list-container');

//add eventlistener to each element
Array.from(filterTags).forEach(tag => {
	tag.addEventListener('click', e => {
		addFilter(e.target.innerText);
	});
});

const addFilter = filter => {
	filtersArray.push(filter);
	filtersArray = [...new Set(filtersArray)];
	showFilter();
};

const deleteFilter = filter => {
	let newArray = filtersArray.filter(cur => cur !== filter);
	filtersArray = [...newArray];
	showFilter();
};

const showFilter = () => {
	if (filtersArray.length === 0) {
		filterBar.innerHTML = ' ';
	}

	filterBar.innerHTML = ' ';

	filtersArray.forEach(filter => {
		let filterCard = document.createElement('span');
		filterCard.innerHTML = filter;
		filterCard.classList.add('btn');
		filterBar.appendChild(filterCard);

		let deleteIcon = document.createElement('button');
		deleteIcon.innerHTML = 'X';
		deleteIcon.onclick = deleteFilter.bind(this, filter);
		deleteIcon.classList.add('btn');
		deleteIcon.classList.add('btn-delete');
		filterCard.appendChild(deleteIcon);
	});

	filterCards();
};

const filterCards = () => {
	let jobListArr = Array.from(jobLists);

	if (filtersArray.length === 0) {
		jobListArr.forEach(jobList => {
			jobList.classList.remove('hide');
		});
	}

	filtersArray.forEach(filter => {
		jobListArr.forEach(jobList => {
			const datasetStrings = Object.values(jobList.dataset)
				.join(' ')
				.toLowerCase();
			if (datasetStrings.includes(filter.toLowerCase())) {
				jobList.classList.remove('hide');
			} else {
				jobList.classList.add('hide');
			}
		});
	});
};
