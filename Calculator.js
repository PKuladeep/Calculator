const operator = document.querySelectorAll('.operators')
const Screen = document.querySelector('#screen')
const nums = document.querySelectorAll('.nums')
const backSpace = document.querySelector('#backSpace')
const allClear = document.querySelector('#allClear')
const sign = document.querySelector('#sign')
const decimal = document.querySelector('.decimal')
const results = document.querySelector('#results')
let justEvaluated = false
Screen.value = 0

nums.forEach((button) => button.addEventListener('click', (e) => {
    let value = e.target.id
    if (justEvaluated == false) {
        let current = Screen.value
        if (current == 0 && current.length <= 1) {
            Screen.value = value
        }else{
            Screen.value += value
        }
    }else{
        justEvaluated = false
        Screen.value = value
    }
}))

backSpace.addEventListener('click', (e) => {
    let current = Screen.value
    if (justEvaluated == false) {
        if (current.length >= 1) {
            Screen.value = current.slice(0, -1)
        }
    }else{
        Screen.value = 0
    }
})

allClear.addEventListener('click', (e) => {
    Screen.value = 0
})

sign.addEventListener('click', (e) => {
    let current = Screen.value
    Screen.value = -current
})

decimal.addEventListener('click', (e) => {
    let current = Screen.value
    if (justEvaluated == false) {
        if (current.includes('.') == false) {
        Screen.value += e.target.id
        }
    }else{
        Screen.value = e.target.id
    }
    
})

operator.forEach((operand) => operand.addEventListener('click', (e) => {
    const operators = ['+', '-', '*', '/', '%']
    let current = Screen.value
    let lastChar = current.slice(-1)
    if (operators.includes(lastChar) == false) {
        Screen.value += e.target.id
    }else{
        Screen.value = current.slice(0, -1) + e.target.id
    }
}))

function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return num1 / num2
}

function percent(num1, num2) {
    return (num1 * 0.01) * num2
}

results.addEventListener('click', (e) => {
    const operators = ['+', '-', '*', '/', '%']
    let expression = []
    let num = String(0)
    let current = Screen.value
    for (let i = 0; i < current.length; i++) {
        if (operators.includes(current[i]) == false) {
            num += current[i]
        }else{
            expression.push(Number(num))
            expression.push(current[i])
            num = String(0)
        }
    }
    if (isNaN(current.slice(-1)) == true) {
        Screen.value = "ERROR"
    }else{
        expression.push(Number(num))
    }
    
    if (expression.length <= 1) {
        Screen.value = "ERROR"
    }else{
        let answer
        if (operators.includes(expression[expression.length - 1]) == true) {
            Screen.value = "ERROR"
        }else{
            for (let i = 2; i < expression.length; i++) {
                if (operators.includes(expression[i - 1]) == true) {
                    if (expression[i - 1] == '+') {
                        expression[i] = add(expression[i - 2], expression[i])
                    }else if (expression[i - 1] == '-') {
                        expression[i] = subtract(expression[i - 2], expression[i])
                    }else if (expression[i - 1] == '*') {
                        expression[i] = multiply(expression[i - 2], expression[i])
                    }else if (expression[i - 1] == '/') {
                        expression[i] = divide(expression[i - 2], expression[i])
                    }else{
                        expression[i] = percent(expression[i - 2], expression[i])
                    }
                }else{
                    continue
                }
            }answer = expression[expression.length - 1]
        }
        Screen.value = answer
    }
    justEvaluated = true
})