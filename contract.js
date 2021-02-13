export function handle(state, action) {
    let balances = state.balances
    let input = action.input
    let caller = action.caller

    if (input.function === 'transfer') {
        let target = input.target

        if (!target || (caller === target)) {
            throw new ContractError('Invalid target for transfer')
        }

        if (!(caller in balances) || !(balances[caller].indexOf(input.item) > -1)) {
            throw new ContractError(`Caller does not own the item`)
        }

        if(!(target in balances)){
            balances[target] = [];
        }

        balances[target].push(input.item);
        balances[caller] = balances[caller].filter(e => e !== input.item);
        if(balances[caller].length == 0){
            delete balances[caller];
        }

        return { state }
    }

    if (input.function === 'balance') {
        let target = input.target
        let ticker = state.ticker

        if (typeof target !== 'string') {
            throw new ContractError('Must specificy target to get balance for')
        }

        return { result: { target, ticker, balance: (target in balances) ? balances[target].length : 0 } }
    }

    throw new ContractError(`No function supplied or function not recognised: "${input.function}"`)
}