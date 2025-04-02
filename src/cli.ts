#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs";
import path from "path";

const program = new Command();

const PROGRAM_NAME = "boilergen";
const PROGRAM_DESCRIPTION = "CLI to generate boilerplate code";
const PROGRAM_VERSION = "1.0.0";

program.name(PROGRAM_NAME).description(PROGRAM_DESCRIPTION).version(PROGRAM_VERSION);

program
    .command("create <project-name>")
    .description("Create a new project with boilerplate")
    .option("-t, --template <type>", "template to use", "default")
    .action((projectName, options) => {
        const targetDir = path.join(process.cwd(), projectName);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir);
        }


        


        console.log(`Project ${projectName} created with ${options.template} template.`);
    });

program.parse(process.argv);
