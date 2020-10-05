'use strict'

const { Contract } = require('fabric-contract-api')
const { Budget } = require('./budget.js')


class BudgetingContract extends Contract {
    constructor() {
        super('org.budgetnet.budgetingcontract')
    }

    async instantiate(ctx) {
        console.log('Instantiate the Budget Contract')
    }


    async request(ctx, department, budgetNumber, date, amount, priority, comments) {
        let budget = Budget.createNewInstance(department, budgetNumber, date, amount, priority, comments)
        budget.setRequested()
        let budgetKey = [department, budgetNumber].join('').toString()
        await ctx.stub.putState(budgetKey, Buffer.from(JSON.stringify(budget)))
        return budget
    }

    async reforecast(ctx, department, budgetNumber, amount) {
        let budgetKey = [department, budgetNumber].join('').toString()
        const budgetExists = await this.BudgetExists(ctx, budgetKey)
        if (!budgetExists) {
            throw new Error('Budget does not exist');
        }
        let budgetJSON = await ctx.stub.getState(budgetKey)
        let budget = Budget.createBudgetFromExisting(JSON.parse(budgetJSON))
        const isApproved = budget.isApproved();
        if (isApproved) {
            throw new Error('Budget Approved. Cannot Update.')
        }
        budget.setAmount(amount)
        await ctx.stub.putState(budgetKey, Buffer.from(JSON.stringify(budget)))
        return budget
    }

    async approve(ctx, department, budgetNumber) {
        let budgetKey = [department, budgetNumber].join('').toString()
        const budgetExists = await this.BudgetExists(ctx, budgetKey)
        if (!budgetExists) {
            throw new Error('Budget does not exist');
        }
        let budgetJSON = await ctx.stub.getState(budgetKey)
        let budget = Budget.createBudgetFromExisting(JSON.parse(budgetJSON))
        const isApproved = budget.isApproved()
        if (isApproved) {
            throw new Error('Budget Approved.')
        }
        const isIssued = budget.isIssued()
        if(isIssued) {
            throw new Error('Budget Issued.')
        }
        budget.setApproved()
        await ctx.stub.putState(budgetKey, Buffer.from(JSON.stringify(budget)))
        return budget
    }

    async issue(ctx, department, budgetNumber) {
        let budgetKey = [department, budgetNumber].join('').toString()
        const budgetExists = await this.BudgetExists(ctx, budgetKey)
        if (!budgetExists) {
            throw new Error('Budget does not exist');
        }
        let budgetJSON = await ctx.stub.getState(budgetKey)
        let budget = Budget.createBudgetFromExisting(JSON.parse(budgetJSON))
        const isApproved = budget.isApproved()
        if (!isApproved) {
            throw new Error('Budget Not Approved.')
        }
        const isIssued = budget.isIssued()
        if(isIssued) {
            throw new Error('Budget Issued.')
        }
        budget.setIssued()
        await ctx.stub.putState(budgetKey, Buffer.from(JSON.stringify(budget)))
        return budget
    }

    async BudgetExists(ctx, key) {
        const budgetJSON = await ctx.stub.getState(key);
        return budgetJSON && budgetJSON.length > 0;
    }

}

module.exports = BudgetingContract