#!/usr/bin/env node

import { program } from "commander";

import chalk from "chalk";
import inquirer from "inquirer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

program.version("1.0.0").description("My Node CLI");

program.action(() => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "projectName",
        message: "Write your project name.",
      },
      {
        type: "list",
        name: "projectOptions",
        message: "Please choose Project Type",
        choices: [
          "Install with Mongodb Setup",
          "Install with mysql and Sequlize Setup",
          "Install with PostgreSQL and Sequlize Setup",
        ],
      },
      {
        type: "confirm",
        name: "confirmProject",
        message: "Confirm to create your project?",
      },
    ])
    .then((answers) => {
      //  let __dirname = path.resolve(path.dirname(''));
      const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
      const __dirname = path.dirname(__filename); // get the name of the directory
      console.log(answers);
      console.log(answers.projectOptions);
      const projectPath = path.join(process.cwd(), answers.projectName);
      if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath);
        //  copy templates
        // choose project setup options
        let tempDir = "";
        if (answers.projectOptions === "Install with Mongodb Setup") {
          tempDir = "./all-templates/with-mongodb-setup";
        } else if (
          answers.projectOptions === "Install with mysql and Sequlize Setup"
        ) {
          tempDir = "./all-templates/with-mysql-setup";
        }
        const templateDir = path.join(__dirname, tempDir);
        fs.cpSync(templateDir, projectPath, { recursive: true });
        const files = fs.readdirSync(projectPath);
        files.forEach((file) => {
          const filePath = path.join(projectPath, file);
          if (fs.lstatSync(filePath).isFile()) {
            const content = fs.readFileSync(filePath, "utf-8");
            const result = content.replace(
              /<%= projectName %>/g,
              answers.projectName
            );
            fs.writeFileSync(filePath, result);
          }
          console.log(`Project ${answers.projectName} created successfully.`);
        });
      } else {
        console.error(
          `Project directory ${answers.projectName} already exists.`
        );
        process.exit(1);
      }
    })
    .catch((err) => console.log(err));
});

program.parse(process.argv);
