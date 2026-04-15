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