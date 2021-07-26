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

package org.kie.kogito.runtime.tools.quarkus.extension.runtime.forms;

public class FormInfo {

    private final String formName;

    private FormBaseInfo formConfig;

    private FormBaseInfo formHtml;

    private FormBaseInfo formTsx;

    public FormInfo(String formName) {
        this.formName = formName;
    }

    public FormBaseInfo getFormConfig() {
        return formConfig;
    }

    public FormBaseInfo getFormHtml() {
        return formHtml;
    }

    public void setFormHtml(FormBaseInfo formHtml) {
        this.formHtml = formHtml;
    }

    public FormBaseInfo getFormTsx() {
        return formTsx;
    }

    public void setFormTsx(FormBaseInfo formTsx) {
        this.formTsx = formTsx;
    }

    public void setFormConfig(FormBaseInfo formConfig) {
        this.formConfig = formConfig;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FormInfo formInfo = (FormInfo) o;

        if (formName != null ? !formName.equals(formInfo.formName) : formInfo.formName != null) {
            return false;
        }
        if (formConfig != null ? !formConfig.equals(formInfo.formConfig) : formInfo.formConfig != null) {
            return false;
        }
        if (formHtml != null ? !formHtml.equals(formInfo.formHtml) : formInfo.formHtml != null) {
            return false;
        }
        return formTsx != null ? formTsx.equals(formInfo.formTsx) : formInfo.formTsx == null;
    }

    @Override
    public int hashCode() {
        int result = formName != null ? formName.hashCode() : 0;
        result = 31 * result + (formConfig != null ? formConfig.hashCode() : 0);
        result = 31 * result + (formHtml != null ? formHtml.hashCode() : 0);
        result = 31 * result + (formTsx != null ? formTsx.hashCode() : 0);
        return result;
    }
}
