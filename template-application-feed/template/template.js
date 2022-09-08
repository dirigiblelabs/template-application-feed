/*
 * Copyright (c) 2010-2020 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v20.html
 *
 * Contributors:
 *   SAP - initial API and implementation
 */

const daoTemplateManager = require("template-application-dao/template/template");
const generateUtils = require("ide-generate-service/template/generateUtils");
const parameterUtils = require("ide-generate-service/template/parameterUtils");

exports.generate = function (model, parameters) {
    let templateSources = exports.getTemplate(parameters).sources;
    parameterUtils.process(model, parameters)
    return generateUtils.generateFiles(model, parameters, templateSources);
};

exports.getTemplate = function (parameters) {
    let daoTemplate = daoTemplateManager.getTemplate(parameters);

    let templateSources = [{
        location: "/template-application-feed/feed/entityFeedSynchronizer.js.template",
        action: "generate",
        rename: "gen/feed/{{perspectiveName}}/{{name}}FeedSynchronizer.js",
        engine: "velocity",
        collection: "feedModels"
    }, {
        location: "/template-application-feed/feed/entityFeed.job.template",
        action: "generate",
        rename: "gen/feed/{{perspectiveName}}/{{name}}Feed.job",
        engine: "velocity",
        collection: "feedModels"
    }];
    templateSources = templateSources.concat(daoTemplate.sources);

    let templateParameters = [];
    templateParameters = templateParameters.concat(daoTemplate.parameters);

    return {
        name: "Application - Feed",
        description: "Application with Feed Entities",
        extension: "model",
        sources: templateSources,
        parameters: templateParameters
    };
};