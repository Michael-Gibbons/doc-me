#!/usr/bin/env node

import inquirer from 'inquirer'
import open from 'open'
import { Command } from 'commander'
const program = new Command()

import readJson from 'read-package-json'

import URL from 'url'
const url = URL.URL
import path from 'path'

const stringIsAValidUrl = (s) => {
  try {
    new url(s);
    return true;
  } catch (err) {
    return false;
  }
};

const PACKAGEJSONPATH = path.resolve(process.cwd(), './package.json')

program
  .name('doc-me')
  .description('CLI to open documentation links')
  .version('0.0.1');

program.command('doc', { isDefault: true })
  .description('Opens a link provided in a doc-me.json file')
  .action(() => {
    readJson(PACKAGEJSONPATH, console.error, false, function (er, data) {
      if (er) {
        console.error("There was an error reading the file")
        return
      }

      if(!data.doc || !data.doc.length){
        throw "No resources defined in package.json"
      }

      const question = {
        name: 'select',
        type: 'list',
        message: 'Please select the docs you would like to open:',
        choices: data.doc
      }

      inquirer
        .prompt([
          question
        ])
        .then((answers) => {
          if(stringIsAValidUrl(answers.select)){
            open(answers.select)
          }else{
            throw "Invalid url for this resource."
          }
        }).catch(e => {console.log(e)})
    });
  });

program.parse();