#!/usr/bin/env node

(async () => {
  const { Command } = require("commander");
  const path = require("path");
  const fs = require("fs");
  const ejs = require("ejs");
  const { execSync } = require("child_process");

  const inquirer = await import("inquirer");

  const program = new Command();
  program.version("1.0.0");

  program
    .argument("[dir]", "project directory", ".")
    .action(async (dir) => {
      const targetDir = path.resolve(process.cwd(), dir);

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const projectName = path.basename(targetDir);

      const { install } = await inquirer.default.prompt([
        {
          name: "install",
          type: "input",
          message: "Install dependencies now? (y/N):",
          default: "y",
          filter: (val) => ["y", "Y", "yes", "YES"].includes(val.trim())
        }
      ]);

      const packageJson = {
        name: projectName,
        version: "1.0.0",
        type: "commonjs",
        scripts: {
          start: "node src/server.js"
        },
        dependencies: {
          express: "^4.18.2"
        }
      };

      fs.writeFileSync(
        path.join(targetDir, "package.json"),
        JSON.stringify(packageJson, null, 2)
      );

      const templateDir = path.join(__dirname, "..", "templates", "js");

      const copy = (src, dest) => {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

        for (const file of fs.readdirSync(src)) {
          const srcPath = path.join(src, file);
          const destPath = path.join(dest, file.replace(".ejs", ""));

          if (fs.lstatSync(srcPath).isDirectory()) {
            copy(srcPath, destPath);
          } else {
            const tpl = fs.readFileSync(srcPath, "utf8");
            const output = ejs.render(tpl, { name: projectName });
            fs.writeFileSync(destPath, output);
          }
        }
      };

      copy(templateDir, path.join(targetDir, "src"));

      if (install) {
        console.log("\n Installing dependencies...\n");
        execSync("npm install", { cwd: targetDir, stdio: "inherit" });
        console.log("\n Dependencies installed!");
      } else {
        console.log("\n Skipped installation. Run `npm install` later.");
      }

      console.log(`\n BackX project created successfully!`);

      if (dir === ".") {
        console.log(`npm start\n`);
      } else {
        console.log(`cd ${dir} && npm start\n`);
      }
    });

  program.parse(process.argv);
})();
