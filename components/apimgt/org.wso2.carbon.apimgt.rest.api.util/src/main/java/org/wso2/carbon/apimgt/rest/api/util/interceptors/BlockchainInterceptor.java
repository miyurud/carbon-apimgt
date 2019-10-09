/*
 * Copyright (c) 2016, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.wso2.carbon.apimgt.rest.api.util.interceptors;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.cxf.interceptor.Fault;
import org.apache.cxf.message.Message;
import org.apache.cxf.message.MessageContentsList;
import org.apache.cxf.message.MessageImpl;
import org.apache.cxf.phase.AbstractPhaseInterceptor;
import org.apache.cxf.phase.Phase;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.apache.cxf.io.CachedOutputStream;
import org.apache.cxf.helpers.IOUtils;

public class BlockchainInterceptor extends AbstractPhaseInterceptor {

    private static final Log logger = LogFactory.getLog(BlockchainInterceptor.class);
    public BlockchainInterceptor() {
        //We will use PRE_INVOKE phase as we need to process message before hit actual service
        //super(Phase.PRE_PROTOCOL);
        super(Phase.RECEIVE);
    }

    @Override
    public void handleMessage(Message message) throws Fault {
        String path = (String) message.get(Message.PATH_INFO);
        logger.info("+++++++++++++++++===>" + path);

        final List<Object> arguments = MessageContentsList.getContentsList(message);


//        String path = (String) message.get(Message.PATH_INFO);
//        String httpMethod = (String) message.get(Message.HTTP_REQUEST_METHOD);
//        Dictionary<URITemplate,List<String>> whiteListedResourcePathsMap;
//
//        //If Authorization headers are present anonymous URI check will be skipped
//        ArrayList authHeaders = (ArrayList) ((TreeMap) (message.get(Message.PROTOCOL_HEADERS)))
//                .get(RestApiConstants.AUTH_HEADER_NAME);
//        if (authHeaders != null)
//            return;
//
//        //Check if the accessing URI is white-listed and then authorization is skipped
//        try {
//            whiteListedResourcePathsMap = RestApiUtil.getWhiteListedURIsToMethodsMap();
//            Enumeration<URITemplate> uriTemplateSet = whiteListedResourcePathsMap.keys();
//
//            while (uriTemplateSet.hasMoreElements()) {
//                URITemplate uriTemplate = uriTemplateSet.nextElement();
//                if (uriTemplate.matches(path, new HashMap<String, String>())) {
//                    List<String> whiteListedVerbs = whiteListedResourcePathsMap.get(uriTemplate);
//                    if (whiteListedVerbs.contains(httpMethod)) {
//                        message.put(RestApiConstants.AUTHENTICATION_REQUIRED, false);
//                        PrivilegedCarbonContext carbonContext = PrivilegedCarbonContext.getThreadLocalCarbonContext();
//                        carbonContext.setUsername(CarbonConstants.REGISTRY_ANONNYMOUS_USERNAME);
//                        carbonContext.setTenantDomain(MultitenantConstants.SUPER_TENANT_DOMAIN_NAME);
//                        carbonContext.setTenantId(MultitenantConstants.SUPER_TENANT_ID);
//                        return;
//                    }
//                }
//            }
//        } catch (APIManagementException e) {
//            RestApiUtil
//                    .handleInternalServerError("Unable to retrieve/process white-listed URIs for REST API", e, logger);
//        }
    }
}
