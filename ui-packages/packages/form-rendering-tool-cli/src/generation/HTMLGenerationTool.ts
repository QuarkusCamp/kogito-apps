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

import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier';
import {
  FormTemplate,
  FormGenerationTool
} from '@kogito-apps/form-rendering-tool';

export function generateHTML(sourceFolder: string) {
  console.log(`Starting HTML form generation in '${sourceFolder}'`);

  fs.readdir(sourceFolder, (err, files) => {
    if (err) {
      console.log(`Cannot read '${sourceFolder}': ${err}`);
      return;
    }
    files.forEach(file => {
      const fileName = path.parse(file);
      if (fileName.ext === '.json') {
        const filePath = `${sourceFolder}/${file}`;
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
          console.log(`Generating HTML for ${file}`);
          try {
            const schema: string = fs.readFileSync(filePath, 'utf8');

            const form: FormTemplate = FormGenerationTool(
              fileName.name,
              schema
            );

            const storagePath = `${sourceFolder}/${fileName.name}`;
            const resourcesPath = `${storagePath}/resources`;

            fs.mkdirSync(storagePath);
            fs.mkdirSync(resourcesPath);

            const htmlFileName = `${storagePath}/form.html`;

            fs.writeFileSync(
              `${storagePath}/schema.json`,
              prettier.format(schema, {
                parser: 'json'
              })
            );
            fs.writeFileSync(
              `${storagePath}/form.html`,
              prettier.format(form.htmlContent, {
                parser: 'html',
                filepath: htmlFileName,
                htmlWhitespaceSensitivity: 'strict',
                endOfLine: 'auto',
                tabWidth: 2
              })
            );
            form.resources.forEach(resource => {
              fs.writeFileSync(
                `${resourcesPath}/${resource.name}`,
                resource.content
              );
            });

            console.log(`Succesfylly generated HTML form ${htmlFileName}`);
          } catch (err) {
            console.error(
              `Couldn't generate HTML form for ${filePath}. Reason:`
            );
            console.error(err);
          }
        }
      }
    });
  });
}
