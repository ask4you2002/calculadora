"use strict";
function añadirNumero() {
    let boton = this.innerHTML
    if (boton.includes("+") || boton.includes("-") || boton.includes("+") || boton.includes("/") || boton.includes("x")) {
        calculo.salida.value += " " + boton + " ";
    } else {
        calculo.salida.value += boton;
    }
}
function borrarNumeros() {
    calculo.salida.value = '';
}
class calc {
    constructor () {
        this.salida = document.getElementById('salida')
        this.memoria = 0
        this.operaciones = {
            '+': (x,y) => {
                return parseFloat(x) + parseFloat(y)
            },
            '-': (x,y) => {
                return parseFloat(x) - parseFloat(y)
            },
            '/': (x,y) => {
                return (parseFloat(x) / parseFloat(y)).toFixed(3)
            },
            'x': (x,y) => {
                return parseFloat(x) * parseFloat(y)
            }
        }
    }
}
let calculo = new calc()
function calcular() {
    let valores = calculo.salida.value.split(" ")
    console.log(valores)
    for (let i = 0; i < valores.length; i++) {
        if (valores.length == 1) {
            //Si solo se ha introducido un numero y tiene ceros delante, elminarlos
            valores[0] = parseInt(valores[0])
            calculo.memoria = valores[0]
        } else {
            if (valores[i] === "+") {
                calculo.memoria = calculo.operaciones['+'](valores[i-1],valores[i+1]);
                if (!(valores[i + 1] == valores.length - 1)) {
                    valores[i + 1] = calculo.memoria;
                }
            } else if (valores[i] === "-") {
                calculo.memoria = calculo.operaciones['-'](valores[i-1],valores[i+1]);
                if (!(valores[i + 1] == valores.length - 1)) {
                    valores[i + 1] = calculo.memoria;
                }
            } else if (valores[i] === "x") {
                calculo.memoria =calculo.operaciones['x'](valores[i-1],valores[i+1]);
                if (!(valores[i + 1] == valores.length - 1)) {
                    valores[i + 1] = calculo.memoria;
                }
            } else if (valores[i] === "/") {
                calculo.memoria = calculo.operaciones['/'](valores[i-1],valores[i+1]);
                if (!(valores[i + 1] == valores.length - 1)) {
                    valores[i + 1] = calculo.memoria;
                }
            }
        }
    }
    if (isNaN(calculo.memoria)|| !isFinite(calculo.memoria)) {
        calculo.salida.value = "ERROR";
    } else {
        calculo.salida.value = calculo.memoria;
    }   
}
function establecerEventos() {
    document.querySelectorAll(".normal-bton",".normal-bton.operacion").forEach(el => {
        el.addEventListener('click',añadirNumero)
    })
    document.querySelectorAll(".borrar-bton").forEach(el => {
        el.addEventListener('click',borrarNumeros)
    })
    document.querySelectorAll(".calcular-bton").forEach(el => {
        el.addEventListener('click',calcular)
    })
}
establecerEventos()