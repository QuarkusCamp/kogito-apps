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
import { renderForm } from '@kogito-apps/form-renderer';

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
            const htmlContent: string = renderForm(schema, false);
            const htmlFileName = `${sourceFolder}/${fileName.name}.html`;
            fs.writeFileSync(
              htmlFileName,
              prettier.format(htmlContent, {
                parser: 'html',
                filepath: htmlFileName,
                htmlWhitespaceSensitivity: 'strict',
                endOfLine: 'auto',
                tabWidth: 4
              })
            );
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
