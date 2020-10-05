const { Budget } = require('./budget')

const newBudget = Budget.createNewInstance('sales', '0001', '2020-10-3', '5000', 'High', 'For Production')

// console.log(newBudget)
const existingBudget = '{"amount":"5000","budgetNumber":"0001","comments":"For Production","currentState":1,"date":"2020-10-3","department":"sales","key":"sales0001","priority":"High","version":1}'
const obj = {
    amount: 3000,
    budgetNumber: '0001',
    comments: 'For Production',
    currentState: 1,
    date: '2020-10-3',
    department: 'sales',
    key: 'sales0001',
    priority: 'High',
    version: 2
  }

const x = JSON.parse(existingBudget)
console.log(x)
let clone = Budget.createBudgetFromExisting(x)
clone.setAmount(3000)
console.log(clone)