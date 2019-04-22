detect_URL_change();

function detect_URL_change(previous_url) {
	let url = window.location.href;
	if (previous_url != url) {
		all_the_work();
	}
	setTimeout(() => {detect_URL_change(url)}, 5000);
}

function all_the_work() {
	console.log(`Reloading nhentai number linker...`);
	let comments = document.querySelectorAll('.s16jh3is-0', '.s15fpu6f-0');
	let count = 0;
	for (let comment of comments) {
		let message = comment.querySelector('.s1w8oh2o-10');
		let selector;
		if (message) {
			selector = message;
		}
		else {
			selector = comment;
		}
		
		let numbers = selector.innerText.match(/\d+/g);
		let content = selector.innerHTML;
		if (numbers) {
			let nums = {};
			for (let i = 0; i < numbers.length; i++) {
				let number = numbers[i];
				nums[number] = true;
				count++;
			}
			for (let number in nums) {
				const template = ` <a href='https://nhentai.net/g/${number.replace(/ /g, '')}/' target='_blank' style='text-decoration: underline; color: rgb(79, 188, 255);'>${number.replace(/ /g, '')}</a>`;
				let regex = new RegExp(`${number}`, 'g');
				content = content.replace(regex, template);
			}
		}
		selector.innerHTML = content;
	}

	console.log(`Found ${count} "numbers"`);
}