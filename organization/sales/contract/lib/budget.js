'use strict'

const budgetState = {
    REQUESTED: 1,
    APPROVED: 2,
    ISSUED: 3
}

class Budget {

    constructor(obj) {
        Object.assign(this, obj)
        if(!obj.hasOwnProperty('key')) {
            // aka object not yet created so create it
            this.setRequested()
            this.key = [obj.department, obj.budgetNumber].join('').toString()
            this.version = 1
        }
        else {
            this.version = this.version + 1
        }
    }

    static createNewInstance(department, budgetNumber, date, amount, priority, comments) {
        return new Budget({ department, budgetNumber, date, amount, priority, comments })
    }

    static createBudgetFromExisting(existingBudgetObj) {
        return new Budget(existingBudgetObj)
    }

    getKey() {
        return this.key
    }

    getAmount() {
        return this.amount
    }

    setAmount(newAmount) {
        this.amount = newAmount
    }

    getPriority() {
        return this.priority
    }

    setPriority(newPriority) {
        this.priority = newPriority
    }

    getComments() {
        return this.comments
    }

    setComments(newComments) {
        this.comments = newComments
    }

    setRequested() {
        this.currentState = budgetState.REQUESTED
    }

    setApproved() {
        this.currentState = budgetState.APPROVED
    }

    setIssued() {
        this.currentState = budgetState.ISSUED
    }

    isRequested() {
        return this.currentState === budgetState.REQUESTED
    }

    isApproved() {
        return this.currentState === budgetState.APPROVED
    }

    isIssued() {
        return this.currentState === budgetState.ISSUED
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    
}

module.exports = { Budget, budgetState }
