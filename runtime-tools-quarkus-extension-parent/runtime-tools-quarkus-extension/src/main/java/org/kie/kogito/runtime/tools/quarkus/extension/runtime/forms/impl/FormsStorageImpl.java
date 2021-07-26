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

package org.kie.kogito.runtime.tools.quarkus.extension.runtime.forms.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.kie.kogito.runtime.tools.quarkus.extension.runtime.forms.FormBaseInfo;
import org.kie.kogito.runtime.tools.quarkus.extension.runtime.forms.FormInfo;
import org.kie.kogito.runtime.tools.quarkus.extension.runtime.forms.FormsStorage;

@ApplicationScoped
public class FormsStorageImpl implements FormsStorage {

    private static final String FORMS_STORAGE_PATH = "/forms";

    private URL formsFolder;

    private Map<String, List<FormBaseInfo>> formBaseInfoCollection;

    @PostConstruct
    public void init() throws MalformedURLException, URISyntaxException {
        URL originURL = Thread.currentThread().getContextClassLoader().getResource(FORMS_STORAGE_PATH);
        URI originUri = originURL.toURI();
        String newPath = originUri.getPath().replace("target/classes", "src/main/resources");
        URI newURI = originUri.resolve(newPath);
        formsFolder = newURI.toURL();
        reloadFormBaseInfoList();
    }

    @Override
    public int getFormsCount() {
        if (formsFolder == null) {
            return 0;
        }

        return formBaseInfoCollection.keySet().size();
    }

    @Override
    public Collection<FormInfo> getFormInfoList() {
        final Collection<FormInfo> formInfoCollection = new ArrayList();

        formBaseInfoCollection.keySet().stream().forEach(name -> {
            Collection<FormBaseInfo> formBaseInfos = formBaseInfoCollection.get(name);
            FormInfo formInfo = new FormInfo(name);
            formBaseInfos.forEach(f -> {
                switch (f.getType()) {
                    case CONFIG:
                        formInfo.setFormConfig(f);
                        break;
                    case HTML:
                        formInfo.setFormHtml(f);
                        break;
                    case TSX:
                        formInfo.setFormTsx(f);
                        break;
                }
            });
            formInfoCollection.add(formInfo);
        });
        return formInfoCollection;
    }

    private FormBaseInfo.FormType getFormType(String type) {
        switch (type) {
            case "html":
                return FormBaseInfo.FormType.HTML;
            case "tsx":
                return FormBaseInfo.FormType.TSX;
            case "config":
                return FormBaseInfo.FormType.CONFIG;
        }
        return null;
    }

    @Override
    public String getFormContent(String formName, String type) throws IOException {
        File formFile = getFormFile(formName, type);
        if (formFile != null) {
            return IOUtils.toString(new FileInputStream(formFile), Charset.forName("UTF-8"));
        }
        return null;
    }

    private File getFormFile(String formName, String type) {
        Collection<FormBaseInfo> formBaseInfo = formBaseInfoCollection.get(formName);
        if (formBaseInfo != null) {
            Optional<FormBaseInfo> optional = formBaseInfo.stream().filter(formBase -> {
                return formBase.getType().getValue().equals(type);
            }).findFirst();

            if (optional.isPresent()) {
                return optional.get().getFile();
            }
        }
        return null;
    }

    @Override
    public void updateFormContent(String formContent, String formName, String type) throws IOException {
        File formFile = getFormFile(formName, type);
        if (formFile != null) {
            IOUtils.write(formContent, new FileOutputStream(formFile), Charset.forName("UTF-8"));
        }
    }

    @Override
    public void reloadFormBaseInfoList() {
        formBaseInfoCollection = readFormBaseList().stream()
                .map(file -> new FormBaseInfo(FilenameUtils.removeExtension(file.getName()), getFormType(FilenameUtils.getExtension(file.getName())), new Date(file.lastModified()), file))
                .collect(Collectors.groupingBy(file -> file.getName()));
    }

    private Collection<File> readFormBaseList() {
        File rootFolder = FileUtils.toFile(formsFolder);

        return FileUtils.listFiles(rootFolder, new String[] { "html", "tsx", "config" }, false);
    }
}
