class Calculator {
  constructor(previousoperandTextelement, currentoperandTextelement) {
    this.previousoperandTextelement = previousoperandTextelement
    this.currentoperandTextelement = currentoperandTextelement
    this.clear()
  }

  clear() {
    this.previousoperand = ''
    this.currentoperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentoperand = this.currentoperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentoperand.includes('.')) return
    this.currentoperand = this.currentoperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentoperand === '') return
    if (this.previousoperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousoperand = this.currentoperand
    this.currentoperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousoperand)
    const cur = parseFloat(this.currentoperand)
    if (isNaN(prev) || isNaN(cur)) return

    switch (this.operation) {
      case '+':
        computation = prev + cur
        break
      case '-':
        computation = prev - cur
        break
      case '*':
        computation = prev * cur
        break
      case '/':
        computation = prev / cur
        break
      default:
        return
    }

    this.currentoperand = computation
    this.operation = undefined
    this.previousoperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const [integerPart, decimalPart] = stringNumber.split('.')
    const integerDigits = parseFloat(integerPart)
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalPart != null) {
      return `${integerDisplay}.${decimalPart}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentoperandTextelement.innerText = this.getDisplayNumber(this.currentoperand)
    if (this.operation != null) {
      this.previousoperandTextelement.innerText = `${this.getDisplayNumber(this.previousoperand)} ${this.operation}`
    } else {
      this.previousoperandTextelement.innerText = ''
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-allclear]')
const previousoperandTextelement = document.querySelector('[data-previous]')
const currentoperandTextelement = document.querySelector('[data-current]')

const calculator = new Calculator(previousoperandTextelement, currentoperandTextelement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})
