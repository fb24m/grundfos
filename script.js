document.addEventListener('DOMContentLoaded', () => {
	const previewsSlider = new Swiper('.previews-slider', {
		slidesPerView: 5,
		spaceBetween: 8,
	})

	new Swiper('.main-slider', {
		thumbs: {
			swiper: previewsSlider,
		},
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
})