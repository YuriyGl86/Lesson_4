const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const fs = require('fs');
const { resolve } = require('node:path');

const rl = readline.createInterface({ input, output });

let n = Math.floor(Math.random() * 1000);
let msg = 'загадано число: '+ n;
console.log(msg);
appendFilePromise(msg);
// fs.appendFile('log_promise.txt', msg + '\n', (err) => {if (err) throw err;});


function question(){
    return new Promise((resolve, reject) => {
        rl.question('Введите число: ', (num) =>{
            resolve(num);
        })
    })
}

function appendFilePromise(msg){
    return new Promise((resolve, reject) => {
        fs.appendFile('log_async.txt', msg + '\n', (err) => {if (err) throw err; resolve})
})};


async function game(){
    let counter = 1;
    while(true){    
        let num = await question();
        msg = `Попытка №${counter}, вы ввели: ${num}\n`

        if(num == 'q'){
            msg += 'Game over\n\n'
        } else if((isNaN(num) || num<0 || num > 1000)){
            msg += "Вы ввели не число, либо число не попадает в диапазон 0-1000\n"
        } else if(num < n){
            msg += 'Слишком мало, попробуйте еще раз\n'
        } else if(num > n){
            msg += 'Слишком много, попробуйте еще раз\n';
        } else if(num == n){
            msg += `Поздравляем! Вы угадали! Использовано попыток: ${counter}\n\n`
        }
        console.log(msg);
        appendFilePromise(msg);
        
        if (num == 'q' || num == n){
            rl.close();
            break;
        }

        counter++;
    }
}

game()