/*
 * Copyright 2021 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import org.apache.commons.io.IOUtils;
import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Source;
import org.graalvm.polyglot.Value;

public class Main {

    public static final int WARMUP = 15;
    public static final int ITERATIONS = 10;

    static long benchGraalPolyglotContext() throws IOException {
        System.out.println("=== Graal.js via org.graalvm.polyglot.Context === ");
        long sum = 0;
        try (Context context = Context.create(); InputStream is = Thread.currentThread().getContextClassLoader().getResourceAsStream("scripts/index.js")) {
            context.eval(Source.newBuilder("js", IOUtils.toString(new InputStreamReader(is, StandardCharsets.UTF_8)), "src.js").build());
            Value primesMain = context.getBindings("js").getMember("primesMain");
            System.out.println("warming up ...");
            for (int i = 0; i < WARMUP; i++) {
                primesMain.execute();
            }
            System.out.println("warmup finished, now measuring");
            for (int i = 0; i < ITERATIONS; i++) {
                long start = System.currentTimeMillis();
                primesMain.execute();
                long took = System.currentTimeMillis() - start;
                sum += took;
                System.out.println("iteration: " + took);
            }
        } // context.close() is automatic
        return sum;
    }

    public static void main(String[] args) throws IOException {
        benchGraalPolyglotContext();

        try (InputStream is = Thread.currentThread().getContextClassLoader().getResourceAsStream("schemas/schema.json")) {
            Context polyglot = Context.create();
            String schema = IOUtils.toString(is, Charset.defaultCharset());
            ScriptEngine nashorn = new ScriptEngineManager().getEngineByName("nashorn");
            nashorn.eval(new InputStreamReader(Thread.currentThread().getContextClassLoader().getResourceAsStream("scripts/index.js")));

            System.out.println(schema);
            Object html = nashorn.eval(
                    "ReactDOMServer.renderToString(" +
                            "React.createElement(FormRenderer, {formSchema: " + schema + "})" +
                            ");");

            System.out.println(html);
        } catch (Exception ex) {
            System.out.println(ex);
            ex.printStackTrace();
        }

    }
}
