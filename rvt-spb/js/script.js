const body = document.querySelector('body')
const mbMenu = document.querySelector('.mb-menu')
const mbSearch = document.querySelector('.header__search_mb')
body.addEventListener('click', () => {
    if (event.target.className === 'header__menu') {
        mbMenu.classList.toggle('invisible')
        body.classList.toggle('scroll-hidden')
    }
    if (event.target.className === 'mb-menu__close') {
        mbMenu.classList.toggle('invisible')
        body.classList.toggle('scroll-hidden')
    }
    if (event.target.className === 'header__search-btn' && body.clientWidth < 767) {
        mbSearch.classList.toggle('invisible')
    }
    if (event.target.className === 'header__search-close') {
        mbSearch.classList.toggle('invisible')
    }
})


class Calculator {
    constructor() {
        this.typeRoom
        this.sRoom
        this.sRoomRange
        this.electric
        this.perimeter
        this.typeRepair
        this.ceilings
        this.bathroom
        this.sBathroomRange
        this.sBathroom
        this.warmFloor
        this.door
        this.entranceDoor
        this.data
        this.sum
        this.init()
    }
    init() {
        this.data = [
            { typeRoom: 'Вторичка', price: 8500 }, //кв.м
            { typeRoom: 'Новостройка', price: 6000 },
            { electric: 'Частичная замена и подключение', price: 300 },
            { electric: 'Новая от вводного кабеля', price: 600 },
            { typeRepair: 'Дизайнерский', price: 3000 },
            { typeRepair: 'Косметический', price: 0 },
            { typeRepair: 'Капитальный', price: 1500 },
            { bathroom: 'Да', price: 13000 },
            { bathroom: 'Нет', price: 0 },
            { ceilings: 'Гипсокартон', price: 300 },
            { ceilings: 'Натяжной', price: 450 },
            { ceilings: '2-уровня гипсокартона', price: 600 },
            { warmFloor: 'Да', price: 200 },
            { warmFloor: 'Нет', price: 0 },
            { door: 'Да', price: 8500 },
            { door: 'Нет', price: 0 },
            { entranceDoor: 'Да', price: 1.05 }, //от общей стоимости
        ]
        this.sum = document.querySelector('.calc__sum')
        this.typeRoom = document.querySelector('#type-room')
        this.sRoom = document.querySelector('#s-room')
        this.electric = document.querySelector('#electric')
        this.perimeter = document.querySelector('#perimeter')
        this.typeRepair = document.querySelector('#type-repair')
        this.ceilings = document.querySelector('#ceilings')
        this.bathroom = document.querySelector('#bathroom')
        this.sBathroom = document.querySelector('#s-bathroom')
        this.warmFloor = document.querySelector('#warm-floor')
        this.door = document.querySelector('#doors')
        this.entranceDoor = document.querySelector('#entrance-door')
        this.sRoomRange = document.querySelector('#s-room-range')
        this.sBathroomRange = document.querySelector('#s-bathroom-range')
        this.render()
        document.querySelector('.calc__form').addEventListener('input', this.watchChek.bind(this))
    }
    render() {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].typeRoom) {
                this.typeRoom.insertAdjacentHTML("beforeend", ` <option class="calc__option" value="${this.data[i].price}">${this.data[i].typeRoom}</option>`)
            }
            if (this.data[i].electric) {
                this.electric.insertAdjacentHTML("beforeend", ` <option class="calc__option" value="${this.data[i].price}">${this.data[i].electric}</option>`)
            }
            if (this.data[i].typeRepair) {
                this.typeRepair.insertAdjacentHTML("beforeend", ` <option class="calc__option" value="${this.data[i].price}">${this.data[i].typeRepair}</option>`)
            }
            if (this.data[i].bathroom) {
                this.bathroom.insertAdjacentHTML("beforeend", ` <option class="calc__option" value="${this.data[i].price}">${this.data[i].bathroom}</option>`)
            }
            if (this.data[i].ceilings) {
                this.ceilings.insertAdjacentHTML("beforeend", ` <option class="calc__option" value="${this.data[i].price}">${this.data[i].ceilings}</option>`)
            }
            if (this.data[i].warmFloor) {
                this.warmFloor.insertAdjacentHTML("beforeend", ` <option class="calc__option" value="${this.data[i].price}">${this.data[i].warmFloor}</option>`)
            }
            if (this.data[i].door) {
                this.door.insertAdjacentHTML("beforeend", ` <option class="calc__option" value="${this.data[i].price}">${this.data[i].door}</option>`)
            }

        }
        this.result()
    }
    result() {
        const regNum = RegExp(/^[0-9]+$/)
        if (!regNum.test(this.sRoom.value)) {
            this.sRoom.value = 1
            this.sRoomRange.value = 1
        }
        if (!regNum.test(this.sBathroom.value)) {
            this.sBathroom.value = 1
            this.sBathroomRange.value = 1
        }
        if (+this.bathroom.value > 0) {
            document.querySelector('.calc__s-bathroom-box').classList.remove('invisible')
        } else {
            document.querySelector('.calc__s-bathroom-box').classList.add('invisible')
        }
        if (this.entranceDoor.checked) {
            const chekDor = this.data.find(item => item.entranceDoor === 'Да')
            let total = (+this.typeRoom.value * +this.sRoom.value + +this.electric.value * +this.sRoom.value + +this.typeRepair.value * +this.sRoom.value + +this.bathroom.value * +this.sBathroom.value + +this.ceilings.value * +this.sRoom.value + +this.warmFloor.value * +this.sRoom.value + +this.door.value) * chekDor.price
            this.sum.textContent = (total).toLocaleString('ru') + ' руб.'
        } else {
            let total = (+this.typeRoom.value * +this.sRoom.value + +this.electric.value * +this.sRoom.value + +this.typeRepair.value * +this.sRoom.value + +this.bathroom.value * +this.sBathroom.value + +this.ceilings.value * +this.sRoom.value + +this.warmFloor.value * +this.sRoom.value + +this.door.value)
            this.sum.textContent = (total).toLocaleString('ru') + ' руб.'
        }
    }
    watchChek() {
        if (event.target.id === 's-room-range') {
            this.sRoom.value = event.target.value
        }
        if (event.target.id === 's-room') {
            if (this.sRoom.value > 300) this.sRoom.value = 300
            if (this.sRoom.value < 1) this.sRoom.value = 1
            this.sRoomRange.value = this.sRoom.value

        }
        if (event.target.id === 's-bathroom-range') {
            this.sBathroom.value = event.target.value
        }
        if (event.target.id === 's-bathroom') {
            if (this.sBathroom.value > 20) this.sBathroom.value = 20
            if (this.sBathroom.value < 1) this.sBathroom.value = 1
            this.sBathroomRange.value = this.sBathroom.value
        }
        this.result()
    }
}
const myCalc = new Calculator()