import { handle } from "../contract.js";
import fs from "fs";

let state = JSON.parse(fs.readFileSync('stateTest.json').toString());

let input = { 'function': 'transfer', 'target': 'qb7v5Zco7HdZqKk6_JyEvM8OaGINQeBZCdJJKYRop_A', 'item': '7e01a8f064bc' }
let caller = 'YsS8gMIessj5IA4nQ6ONWJHaUrABz4uNoNx1JB66HoQ';

state = handle(state, { input, caller }).state;

let input2 = { 'function': 'balance', 'target': 'YsS8gMIessj5IA4nQ6ONWJHaUrABz4uNoNx1JB66HoQ' }

console.log(handle(state, { input: input2 }));

fs.writeFileSync('stateTestResult.json', JSON.stringify(state));