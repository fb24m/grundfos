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
})