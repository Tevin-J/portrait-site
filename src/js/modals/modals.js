/*МОДАЛЬНЫЕ ОКНА*/
const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true, disabled = '') {
        /*получаем элементы по пришедшим в функцию селекторам*/
        const trigger = document.querySelectorAll(triggerSelector)
        const modal = document.querySelector(modalSelector)
        const close = document.querySelector(closeSelector)
        /*поиск элементов модальных окон по дата-атрибуту data-modal. Он указан в index.html*/
        const windows = document.querySelectorAll('[data-modal]')
        const scroll = calcScroll()
        /*изначально делаем кнопку модальных окон калькулятора задизабленой пока не будут введены все значения*/
        disabled && document.querySelector(triggerSelector).setAttribute('disabled', disabled)
        /*показ модального окна реализовали через forEach так как в 1 из модальных окон есть 2 кнопки для его показа*/
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                /*отмена перезагрузки страницы по умолчанию при клике на ссылку*/
                if (e.target) {
                    e.preventDefault()
                }
                /*закрытие всех модальных окон*/
                windows.forEach(item => {
                    item.style.display = 'none'
                })
                modal.style.display = 'block'
                /*класс modal-open из библиотеки bootstrap.css вместо document.body.overflow="hidden"*/
                document.body.classList.add('modal-open')
                /*при открытии модального окна делаем отступ страницы на ширину скролла, чтоб скрыть подергивание страницы*/
                document.body.style.marginRight = `${scroll}px`
            })
        })
        /*скрытие модального окна на клик кнопки*/
        close.addEventListener('click', () => {
            /*закрытие всех модальных окон*/
            windows.forEach(item => {
                item.style.display = 'none'
            })
            modal.style.display = 'none'
            document.body.classList.remove('modal-open')
            document.body.style.marginRight = `0px`
        })
        /*скрытие модального окна на клик на подложку при условии что для данного окна разрешено
        закрытие при клике на подложку*/
        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                /*закрытие всех модальных окон*/
                windows.forEach(item => {
                    item.style.display = 'none'
                })
                modal.style.display = 'none'
                document.body.classList.remove('modal-open')
                document.body.style.marginRight = `0px`
            }
        })
    }

    /*ф-я показа модального окна спустя время после загрузки страницы*/
    function showModalByTime(selector, time) {
        setTimeout(function () {
            /*создаем переменную display в которую запишем значение block если у нас
            уже есть на сайте открытое модальное окно*/
            let display
            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block'
                }
            })
            /*если открытого модального окна нет на странице, то мы показываем то модальное окно,
            которое необходимо запустить по таймеру*/
            if (!display) {
                document.querySelector(selector).style.display = 'block'
                document.body.classList.add('modal-open')
            }
        }, time)
    }

    /*ф-я вычисления ширины линии скролла, чтоб при открытии модального окна, у нас не дергалась страницв*/
    function calcScroll() {
        let div = document.createElement('div')
        div.style.width = '50px'
        div.style.height = '50px'
        div.style.overflowY = 'scroll'
        div.style.visibility = 'hidden'
        document.body.appendChild(div)

        let scrollWidth = div.offsetWidth - div.clientWidth
        div.remove()

        return scrollWidth
    }

    /*вызов метода для показа модального окна "вызвать мастера". в него передаем не элементы, которые соответствуют
    определенному селектору, а сами селекторы, а уже внутри функции мы по этим селекторам получим соответствующие им
    элементы. Это сделано для универсальности функции и исключения дублирования кода*/
    bindModal('.button-design', '.popup-design', '.popup-design .popup-close')
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close')
    showModalByTime('.popup-consultation', 50000)

}
export default modals