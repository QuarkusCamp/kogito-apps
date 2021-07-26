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

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import io.quarkus.arc.Arc;

@Path("/forms")
public class FormsService {

    private FormsStorage storage;

    @PostConstruct
    public void init() {
        storage = Arc.container().instance(FormsStorage.class).get();
    }

    @Inject
    public FormsService(FormsStorage storage) {
        this.storage = storage;
    }

    @GET
    @Path("/list")
    @Produces(MediaType.APPLICATION_JSON)
    public Collection<FormInfo> getFormsList() {

        return storage.getFormInfoList();
    }

    @GET
    @Path("/count")
    @Produces(MediaType.TEXT_PLAIN)
    public Response formsCount() {
        try {
            return Response.ok(storage.getFormsCount()).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @GET
    @Path("/{formName}/{formType}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getFormContent(@PathParam("formName") String formName, @PathParam("formType") String formType) {
        try {
            return Response.ok(storage.getFormContent(formName, formType)).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @POST
    @Path("/{formName}/{formType}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response UpdateFormContent(@PathParam("formName") String formName, @PathParam("formType") String formType, String content) {
        try {
            storage.updateFormContent(content, formName, formType);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}
