#!/usr/bin/env node

import { program } from "commander";

import chalk from "chalk";
import inquirer from "inquirer";

program.version("1.0.0").description("My Node CLI");

program.action(() => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What's your name?",
      },
      {
        type:"confirm",
        name:"ask",
        message:"Do you want to continue?",
      }
    ])
    .then((answers) => {
        console.log(answers)
      console.log(chalk.green(`Hey there, ${answers.name}!`));
    });
});

program.parse(process.argv);