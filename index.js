const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main(){
    readline.question('1. Calculate play time\n2. Calculate price\n3. Advanced options\n', async input => {
    if(input === '1'){      
        readline.question('How many tokens do you have?\n', tokens => {
            console.log(tokens + " = " + calculatePlayTime(tokens))
            main()
        });
    }else if(input === '2'){
        readline.question('How many tokens do you want to buy?\n', tokens => {
            console.log(calculatePrice(tokens))
            main()
        });
    }
    });
}


function calculatePrice(tokens){
    amount = parseInt(tokens)
    if(amount < 600){
        return 'Its currently not possible to buy less then 600 tokens you can buy 600 tokens for $1.99 here https://store.pluto.app/'
    }else if(amount === 600){
        return 'Plan: 1x 600 tokens\nPrice: $1.99\nPlay time: 1 hour\nLink: https://store.pluto.app/'
    }else if(amount === 6000){
        return 'Plan: 1x 6000 tokens\nPrice: $15.30\nPlay time: 10 hour\nLink: https://store.pluto.app/'
    }else if(amount === 3000){
        return 'Plan: 1x 3000 tokens\nPrice: $8.07\nPlay time: 5 hour\nLink: https://store.pluto.app/'
    }else{
        plan1 = 0
        plan2 = 0
        plan3 = 0
        while(amount >= 6000){
            plan1++
            amount -= 6000
        }
        while(amount >= 3000){
            plan2++
            amount -= 3000
        }
        while(amount >= 600){
            plan3++
            amount -= 600
        }

        tokenTotal = 600 * plan3 + 3000 * plan2 + 6000 * plan1
        priceTotal = 1.99 * plan3 + 8.07 * plan2 + 15.30 * plan1
        playTimeTotal = calculatePlayTime(tokenTotal)
        return `Plan: \n    ${plan3}X 600 tokens\n    ${plan2}X 3000 tokens\n    ${plan1}X 6000  tokens\nPrice: ${priceTotal}\nPlay time: ${playTimeTotal}\nTokens: ${tokenTotal}\nLink: https://store.pluto.app/`
    }
}

// Formule 
// T = Amount of tokens

// X = T / 10
// H = ⌊ X / 60 ⌋
// M = (X / 60) - H * 60

// HM = Hours, Minutes

function calculatePlayTime(tokens){
    x = parseInt(tokens)/10;
    var hours = (x / 60);
    var h = Math.floor(hours);
    var minutes = (hours - h) * 60;
    var m = Math.round(minutes);
    return h + " hour(s) and " + m + " minute(s).";
}

main()