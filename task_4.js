app = new Vue({
        el: "#app",
        data() {
            return {
                loc: null, // координата выбранной клетки
                allowable: [], // массив доступных клеток для хода конем
            }
        },
        methods: {
            //метод для обращения к свойствам клетки
            getCoordinate(event) {
                this.clearColor(); // метод очищает все клетки, приводит их к исходному состоянию.
                this.loc = event.target.id; // записываем координату выбранного поля
                this.possible();
                this.changeColor();
                this.greenColor();

            },

            possible() {
                var newColumn = 0;
                var newRow = '';
                this.column = this.loc[0]; // координата по вертикали (буква A, В, C, D, E, F, G, H)
                this.row = Number(this.loc[1]); // Координата по горизонтали (цифра от 1 до 8)
                var A = this.loc[0].charCodeAt(0); // Получаем код симовла, но можно и без этого.
                this.allowable.length = 0; // обнуляем массив, чтобы каждый раз выводились только варианты для каждой клетки и не было мусора
                this.conclusion = ''; // обнуляем строку, чтобы вывод был чистым и не засорялся
                for (var i = 1; i < 3; i++) {
                    //Условие на поиск нижних возможных клеток, куда может попасть конь
                    if (this.row - i > 0) {
                        newRow = this.row - i;
                        if ((A - (3 - i)) > 64) {
                            newColumn = A - (3 - i);
                            this.allowable.push(String.fromCharCode(newColumn) + newRow);
                        }
                        if ((A + (3 - i)) < 73) {
                            newColumn = A + (3 - i);
                            this.allowable.push(String.fromCharCode(newColumn) + newRow);
                        }
                    }
                    if (this.row + i < 9) {
                        newRow = this.row + i;
                        if ((A - (3 - i)) > 64) {
                            newColumn = A - (3 - i);
                            this.allowable.push(String.fromCharCode(newColumn) + newRow);
                        }

                        if ((A + (3 - i)) < 73) {
                            newColumn = A + (3 - i);
                            this.allowable.push(String.fromCharCode(newColumn) + newRow);
                        }
                    }
                }
            },
            //Метод для очистки всех клеток, чтобы задать клеткам состояние поумолчанию
            clearColor() {
                var elem = document.getElementsByClassName('container'); // получаем div по имени класса
                var massiv = [];
                massiv = elem[0].children;
                for (var i = 0; i < 64; i++) {
                    massiv[i].style.backgroundColor = null;
                }
            },
            //Метод для изменения цвета выбранной клетки
            changeColor() {
                this.cell = event.target; // получаем ссылку на выбранный объект. В нашем случае это выбранная клетка и мы получаем доступ ко всем ее свойствам.
                this.cell.style.backgroundColor = 'rgba(119, 193, 228, 0.616)'; // уставнавливаем цвет выбранной ячейке
            },
            greenColor() {
                var greenCell = null;
                //Пробигаемся по поссиву клеток, которые доступны при ходе конем
                this.allowable.forEach(element => {
                    greenCell = document.getElementById(element); // находим по id нужный элемент
                    greenCell.style.backgroundColor = 'green'; // меняем фон этой клетки на зеленый цвет
                });
            }
        }
    })