const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const fs = require('fs');

const rl = readline.createInterface({ input, output });

let n = Math.floor(Math.random() * 1000);
let msg = 'загадано число: '+ n;
console.log(msg);
fs.appendFile('log.txt', msg + '\n', (err) => {if (err) throw err;});

function question(counterStart=1){
    let counter = counterStart;
    rl.question('Введите число: ', (num) =>{
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
        console.log(msg)
        fs.appendFile('log.txt', msg, (err) => {if (err) throw err;});
        
        if (num == 'q' || num ==n){
            rl.close();
            return
        }

        counter++;
        question(counter)
    });
    
}

question()