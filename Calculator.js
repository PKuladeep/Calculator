let Screen = document.getElementById(`screen`)
let justEvaluated = false;
let operators = ['+', '-', '*', '/', '.', '%']

function keys(value) {
    if (justEvaluated == false) {
        current = Screen.textContent
        if (current == '0') {
            Screen.textContent = value
        }else{
            Screen.textContent += value
        }
    }else{
        justEvaluated = false
        Screen.textContent = value
    }
}

function allClear() {
    Screen.textContent = '0'
}

function result() {
    Screen.textContent = eval(Screen.textContent)
    justEvaluated = true
}

function backSpace() {
    let current = Screen.textContent
    if (justEvaluated == true) {
        Screen.textContent = '0'
    }else{
        if (current.length <= 1) {
            Screen.textContent = '0'
        }else{
            Screen.textContent = current.slice(0, -1)
        }
    }
}

function sign() {
    if (Screen.textContent != 0) {
        current = Screen.textContent
        Screen.textContent = -current
    }
}

function operator(value) {
    current = Screen.textContent
    if (operators.includes(current.slice(-1)) == false) {
        Screen.textContent += value
    }
}