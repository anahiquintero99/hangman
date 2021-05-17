//Libraries
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');

const human = require('./human');

function logMultiplier(number, symbolFill = '*', symbolJoin = ' ') {
  return Array(number).fill(symbolFill).join(symbolJoin);
}

async function main() {
  clear();

  const divider = logMultiplier(35);
  const title = figlet.textSync('H A N G M A N');
  const titleColor = chalk.yellow(`${divider}\n${title}\n${divider}`);
  console.log(titleColor);

  const SECRET_WORD = 'curtain';
  const SECRET_WORD_LENGHT = SECRET_WORD.length;
  const discoveredLetters = [];
  let errors = 0;

  const wordSpaces = logMultiplier(SECRET_WORD_LENGHT, '_');
  console.log(`\n SECRET WORD: ${wordSpaces}\n`);

  do {
    let { letter } = await inquirer.prompt([
      {
        name: 'letter',
        message: 'Ingresa una letra:',
      },
    ]);
    letter = letter.toLowerCase();

    if (SECRET_WORD.includes(letter)) {
      if (discoveredLetters.includes(letter)) {
        console.log(chalk.red('\n LETRA REPETIDA'));
        errors += 1;
        console.log(chalk.red(`\n${human[errors]}`));
      }

      discoveredLetters.push(letter);
    } else {
      console.log(chalk.red('\n LETRA ERRONEA'));
      errors += 1;
      console.log(chalk.red(`\n${human[errors]}`));
    }

    if (errors === 6) {
      const loseMessage = figlet.textSync('\n ¡PERDISTE!');
      console.log(chalk.red(loseMessage));
      break;
    }

    const secretWithDiscovered = Array.from(SECRET_WORD).map((letter) =>
      discoveredLetters.includes(letter) ? letter : '_',
    );
    console.log(`\n SECRET WORD: ${secretWithDiscovered.join(' ')}\n`);

    if (secretWithDiscovered.join('') === SECRET_WORD) {
      const loseMessage = figlet.textSync('\n ¡YA GANASTE!');
      console.log(chalk.green(loseMessage));
      break;
    }
  } while (true);
}

main();
