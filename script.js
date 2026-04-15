document.addEventListener('DOMContentLoaded', () => {
	const previewsSlider = new Swiper('.previews-slider', {
		slidesPerView: 5,
		spaceBetween: 8,
	})

	new Swiper('.main-slider', {

		thumbs: {
			swiper: previewsSlider,
		},

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
	})

	const unfoldButtons = document.querySelectorAll('[data-unfold]')

	unfoldButtons.forEach(button => {
		const el = document.querySelector(button.dataset.unfold)
		const foldedText = button.querySelector('.folded')
		const unfoldedText = button.querySelector('.unfolded')

		if (el) {
			button.addEventListener('click', () => {
				el.classList.toggle('unfold')

				if (foldedText && unfoldedText) {
					if (el.classList.contains('unfold')) {
						foldedText.style.display = 'none'
						unfoldedText.style.display = 'block'
					}
					else {
						foldedText.style.display = 'block'
						unfoldedText.style.display = 'none'
					}
				}
			})
		}
	})

	const images = document.querySelectorAll('.zoom-image');

	images.forEach(img => {
		img.addEventListener('mousemove', (e) => {
			const rect = img.getBoundingClientRect();

			const x = (e.clientX - rect.left) / rect.width * 100;
			const y = (e.clientY - rect.top) / rect.height * 100;

			img.style.transformOrigin = `${x}% ${y}%`;
			img.style.transform = 'scale(2)';
		});

		img.addEventListener('mouseleave', () => {
			img.style.transform = 'scale(1)';
			img.style.transformOrigin = 'center';
		});
	});
})

document.addEventListener('DOMContentLoaded', () => {

	const step = 1;

	document.querySelectorAll('.rating').forEach(rating => {
		const input = document.querySelector('input[name="rating"]');

		input.addEventListener('input', (e) => {
			e.target.value = ''
		})

		function setRating(value, skipInput = false) {
			const percent = (value / 5) * 100;
			rating.style.setProperty('--percent', percent + '%');
			if (!skipInput) {
				input.value = value;
			}
		}

		function getValue(e) {
			const rect = rating.getBoundingClientRect();
			let value = (e.clientX - rect.left) / rect.width * 5;

			value = Math.max(step, Math.ceil(value * (1 / step)) / (1 / step));

			return value;
		}

		rating.addEventListener('mousemove', e => {
			const value = getValue(e);
			const percent = (value / 5) * 100;
			rating.style.setProperty('--percent', percent + '%');
		});

		rating.addEventListener('click', e => {
			setRating(getValue(e));
		});

		rating.addEventListener('mouseleave', () => {
			if (input.value) {
				setRating(parseFloat(input.value));
			}
			else {
				setRating(parseFloat(0), true);
			}
		});
	});

})

document.addEventListener('DOMContentLoaded', () => {
	const progressbar = document.querySelector('#reviews-slider-progressbar')

	new Swiper('#reviews-slider', {
		slidesPerView: 1,
		spaceBetween: 16,
		pagination: {
			el: progressbar,
			type: 'progressbar'
		},
		navigation: {
			prevEl: '#reviews-slider-prev',
			nextEl: '#reviews-slider-next',
		},

		breakpoints: {
			768: {
				slidesPerView: 2
			},
			1440: {
				slidesPerView: 3
			}
		}
	})


	const unfoldButtons = document.querySelectorAll('.product-review__unfold')

	unfoldButtons.forEach(button => {
		const el = button.closest('.product-review__review-wrapper')
		button.addEventListener('click', () => {
			el.classList.toggle('unfold')

			if (el.classList.contains('unfold')) {
				button.querySelector('span').textContent = 'Свернуть'
			}
			else {
				button.querySelector('span').textContent = 'Развернуть'
			}
		})
	})
})

document.addEventListener('DOMContentLoaded', () => {
	const progressbar = document.querySelector('#recommendations-slider-progressbar')


	new Swiper('#product-recommendations-slider', {
		slidesPerView: 1,
		spaceBetween: 20,
		pagination: {
			el: progressbar,
			type: 'progressbar'
		},
		navigation: {
			prevEl: '#recommendations-slider-prev',
			nextEl: '#recommendations-slider-next',
		},

		breakpoints: {
			640: {
				slidesPerView: 2
			},
			768: {
				slidesPerView: 3
			},
			992: {
				slidesPerView: 4
			},
			1200: {
				slidesPerView: 5
			}
		}
	})
})

function moveOnBreakpoint(element, target, breakpoint = 768, order = 'last') {
	const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);

	const originalParent = element.parentNode;
	const originalNextSibling = element.nextElementSibling;

	function move() {
		if (mq.matches) {
			if (order === 'first') {
				target.insertAdjacentElement('afterbegin', element);
			} else {
				target.insertAdjacentElement('beforeend', element);
			}
		} else {
			if (originalNextSibling) {
				originalParent.insertBefore(element, originalNextSibling);
			} else {
				originalParent.appendChild(element);
			}
		}
	}

	mq.addEventListener('change', move);
	move();
}

document.addEventListener('DOMContentLoaded', () => {
	const header = document.querySelector('.product-payment-header')
	const target = document.querySelector('.product-card__product')
	if (header && target) {
		moveOnBreakpoint(header, target, 768, 'first')
	}
})