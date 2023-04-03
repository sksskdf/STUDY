const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getInput() {
  const MESSAGE = `select the menu by number(Type "exit" to quit)
    1. create directory
    2. modify directory
    3. delete directory
    4. show the directory hierarchy
    5. exit
    `;

  const ERR_MESSAGE = `please check the input is number`;

  return new Promise((resolve, reject) => {
    rl.question(MESSAGE, (answer) => {
      if (answer === "5") {
        rl.close();
        reject();
      } else {
        resolve(answer);
      }
    });
  });
}

class FileSystem {
  constructor() {
    this.rootDirectory = new Directory("root");
  }

  print() {
    let current = this.rootDirectory;
    console.log(this.rootDirectory.name);
  }

  printErrMSG() {
    console.log("please check the input is number");
  }
}

class Directory {
  constructor(name) {
    this.name = name;
    this.subdirectory = [];
  }
}

const fileSystem = new FileSystem();

function callFunc(number) {
  switch (number) {
    case "4": {
      fileSystem.print();
      break;
    }
    default: {
      fileSystem.printErrMSG();
    }
  }
}

async function run() {
  while (true) {
    try {
      const input = await getInput();
      callFunc(input);
    } catch (error) {
      console.log("Good Bye !");
      break;
    }
  }
}

run();
