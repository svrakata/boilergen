#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const program = new Command();

const PROGRAM_NAME = "boilergen";
const PROGRAM_DESCRIPTION = "CLI to generate boilerplate code";
const PROGRAM_VERSION = "1.0.0";

const __dirname = fileURLToPath(dirname(import.meta.url));

program.name(PROGRAM_NAME).description(PROGRAM_DESCRIPTION).version(PROGRAM_VERSION);

program
    .command("create <project-name>")
    .description("Create a new project with boilerplate")
    .option("-t, --template <type>", "template to use", "default")
    .option("-f, --force", "force creation even if directory exists", false)
    .action((projectName, options) => {
        const targetDir = path.join(process.cwd(), projectName);
        
        // Check if project directory already exists
        if (fs.existsSync(targetDir)) {
            if (!options.force) {
                console.error(`Error: Project directory '${projectName}' already exists.`);
                console.log(`Use --force option to overwrite existing files.`);
                process.exit(1);
            } else {
                console.log(`Warning: Project directory '${projectName}' already exists. Continuing with force option.`);
            }
        } else {
            fs.mkdirSync(targetDir);
        }

        const templateDir = path.join(__dirname, "..", "templates", options.template);

        // Check if template directory exists
        if (!fs.existsSync(templateDir)) {
            console.error(`Template '${options.template}' not found.`);
            process.exit(1);
        }

        // Copy package.json template and update project name
        const packageJsonTemplate = path.join(templateDir, "package.json");
        if (fs.existsSync(packageJsonTemplate)) {
            let packageJson = JSON.parse(fs.readFileSync(packageJsonTemplate, "utf-8"));
            packageJson.name = projectName;
            fs.writeFileSync(path.join(targetDir, "package.json"), JSON.stringify(packageJson, null, 2));
            console.log(`Created package.json`);
        }

        // Copy tsconfig.json
        const tsconfigTemplate = path.join(templateDir, "tsconfig.json");
        if (fs.existsSync(tsconfigTemplate)) {
            fs.copyFileSync(tsconfigTemplate, path.join(targetDir, "tsconfig.json"));
            console.log(`Created tsconfig.json`);
        }
        
        // Copy .gitignore
        const gitignoreTemplate = path.join(templateDir, ".gitignore");
        if (fs.existsSync(gitignoreTemplate)) {
            fs.copyFileSync(gitignoreTemplate, path.join(targetDir, ".gitignore"));
            console.log(`Created .gitignore`);
        }
        
        // Create src directory
        const srcDir = path.join(targetDir, "src");
        if (!fs.existsSync(srcDir)) {
            fs.mkdirSync(srcDir);
        }
        
        // Create index.ts with minimal async function
        const indexContent = `/**
 * ${projectName}
 */

async function run() {
  try {
    console.log("Hello from ${projectName}!");
    // Your code here
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

run().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
`;
        
        fs.writeFileSync(path.join(srcDir, "index.ts"), indexContent);
        console.log(`Created src/index.ts`);

        console.log(`Project ${projectName} created with ${options.template} template.`);
    });

program.parse(process.argv);
