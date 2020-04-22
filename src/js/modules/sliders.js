/*слайдеры*/
const sliders = (sliderSelector, direction, prevSelector, nextSelector) => {
    /*создаем переменные с текущим слайдом и переменной отвечающей за остановку
    перелистывания слайдов при наведении на них мыши*/
    let currentSlide = 0
    let paused = false

    const slides = document.querySelectorAll(sliderSelector)
    /*ф-я показа слайдов*/
    function showSlides(n) {
        /*зацикливаем слайдер чтоб при переключении вперед с последнего показался первый и наоборот*/
        if (n > slides.length - 1) {
            currentSlide = 0
        }
        if (n < 0) {
            currentSlide = slides.length - 1
        }
        /*всем слайдам добавляем класс анимации и убираем их с экрана*/
        slides.forEach(slide => {
            slide.classList.add('animated')
            slide.style.display = 'none'
        })
        /*вставляем на страницу только текущий слайд*/
        slides[currentSlide].style.display = 'block'
    }
    /*первая отрисовка слайдера с первого слайда*/
    showSlides(currentSlide)
    /*ф-я переключения слайдов принимает или 1 или -1*/
    function toggleSlide(n) {
        showSlides(currentSlide += n)
    }
    /*обрабатываем ручное переключение слайдов внутри try, так как не во всех слайдерах есть кнопки*/
    try {
        /*получаем эти кнопки переключения слайдов*/
        const prevSlide = document.querySelector(prevSelector)
        const nextSlide = document.querySelector(nextSelector)
        /*обрабатываем клики на эти кнопки, добавляя анимации и переключая слайды*/
        prevSlide.addEventListener('click', () => {
            toggleSlide(-1)
            slides[currentSlide].classList.remove('slideInLeft')
            slides[currentSlide].classList.add('slideInRight')
        })
        nextSlide.addEventListener('click', () => {
            toggleSlide(1)
            slides[currentSlide].classList.remove('slideInRight')
            slides[currentSlide].classList.add('slideInLeft')
        })
    } catch (e) {
        console.log(e);
    }
    /*ф-я отвечающая за анимированное переключение слайдов*/
    function activateAnimation() {
        /*если слайдер вертикальный то добавляем особый класс анимации*/
        if (direction === 'vertical') {
            /*в paused будем получать идентификатор setInterval чтоб в последствии его зачистить и остановить анимацию*/
            paused = setInterval(() => {
                toggleSlide(1)
                slides[currentSlide].classList.add('slideInDown')
            }, 3000)
        } else {
            paused = setInterval(() => {
                toggleSlide(1)
                slides[currentSlide].classList.remove('slideInRight')
                slides[currentSlide].classList.add('slideInLeft')
            }, 3000)
        }
    }
    /*вызываем эту ф-ю для того чтоб сразу пошла анимация*/
    activateAnimation()
    /*при наведении на слайдер останавливаем анимацию, а при обратном действии - запускаем заново*/
    slides[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused)
    })
    slides[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation()
    })
}
export default sliders