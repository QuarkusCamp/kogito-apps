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

// compact loc properties into a single line
export function compactFixture(jsonString) {
  return jsonString.replace(
    /"start": (\d+),\s+"end": (\d+),\s+"loc": \{\s+"start":\s\{\s+"line": (\d+),\s+"column": (\d+)\s+\},\s+"end":\s\{\s+"line": (\d+),\s+"column": (\d+)\s+\s+\}(?:,\s+"identifierName": "(\S+)")?\s+\}/gm,
    (_, p1, p2, p3, p4, p5, p6, p7) => {
      return (
        `"start":${p1},"end":${p2},"loc":{"start":{"line":${p3},"column":${p4}},"end":{"line":${p5},"column":${p6}}` +
        (p7 ? `,"identifierName":"${p7}"}` : "}")
      );
    }
  );
}

const serialized = "$$ babel internal serialized type";

export function serialize(value) {
  // eslint-disable-next-line valid-typeof
  if (typeof value === "bigint") {
    return {
      [serialized]: "BigInt",
      value: value.toString()
    };
  } else if (value instanceof RegExp) {
    return {
      [serialized]: "RegExp",
      source: value.source,
      flags: value.flags
    };
  } else if (value instanceof Error) {
    // Errors are serialized to a simple string, because are used frequently
    return value.toString();
  }
  return value;
}
