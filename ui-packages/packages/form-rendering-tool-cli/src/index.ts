/*
 * Copyright 2021 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { generateHTML } from './generation/HTMLGenerationTool';

yargs(hideBin(process.argv))
  .scriptName('form-renderer-cli')
  .command(
    'generate',
    'Generates HTML form templates for Kogito projects. ',
    {
      source: {
        alias: 's',
        describe: 'Path to the Kogito project.',
        nargs: 1,
        normalize: true,
        type: 'string',
        demandOption: true
      }
    },
    argv => {
      generateHTML(argv.source);
    }
  )
  .demandOption(
    'source',
    'Please provide the path of the Kogito project to generate the HTML form templates.'
  )
  .command(
    'package',
    'Packages HTML form templates from Kogito projects. ',
    {
      source: {
        alias: 's',
        describe: 'Path to the Kogito project.',
        nargs: 1,
        normalize: true,
        type: 'string',
        demandOption: true
      }
    },
    argv => {
      console.info(`generating forms on ${argv.source}`);
    }
  )
  .demandOption(
    'source',
    'Please provide the path of the Kogito project to package the HTML form templates.'
  )
  .help()
  .demandCommand()
  .showHelpOnFail(true).argv;
