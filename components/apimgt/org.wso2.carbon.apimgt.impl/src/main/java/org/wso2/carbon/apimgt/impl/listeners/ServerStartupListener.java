/*
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package org.wso2.carbon.apimgt.impl.listeners;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.commons.io.FileUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.wso2.carbon.apimgt.impl.APIConstants;
import org.wso2.carbon.apimgt.impl.APIManagerConfiguration;
import org.wso2.carbon.apimgt.impl.internal.ServiceReferenceHolder;
import org.wso2.carbon.core.ServerStartupObserver;
import org.wso2.carbon.utils.CarbonUtils;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Iterator;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.wso2.blockchain.APIMarketplaceDB;

/**
 * Class for performing operations on initial server startup
 */
public class ServerStartupListener implements ServerStartupObserver {
    private static final Log log = LogFactory.getLog(ServerStartupListener.class);

    @Override
    public void completedServerStartup() {
        copyToExtensions();
        initializeMarketPlace();
    }

    private void initializeMarketPlace() {

        System.out.println("INNNNNNNNNNNNNNNNNNNNNNNNNitialize mkt");

//        APIManagerConfiguration
//                config = ServiceReferenceHolder.getInstance().getAPIManagerConfigurationService()
//                .getAPIManagerConfiguration();
//        String className = config.getFirstProperty(APIConstants.BLK_ETH_ACCOUNT);
//        System.out.println("BLK_ETH_ACCOUNT:" + className);
//
//        TrustManager[] trustAllCerts = new TrustManager[]{
//                new X509TrustManager() {
//                    public java.security.cert.X509Certificate[] getAcceptedIssuers() {
//                        return null;
//                    }
//                    public void checkClientTrusted(
//                            java.security.cert.X509Certificate[] certs, String authType) {
//                    }
//                    public void checkServerTrusted(
//                            java.security.cert.X509Certificate[] certs, String authType) {
//                    }
//                }};
//
//        try {
//            SSLContext sc = SSLContext.getInstance("SSL");
//            sc.init(null, trustAllCerts, new java.security.SecureRandom());
//            HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
//
//            // Create all-trusting host name verifier
//            HostnameVerifier allHostsValid = new HostnameVerifier() {
//                public boolean verify(String hostname, SSLSession session) {
//                    return true;
//                }
//            };
//
//            // Install the all-trusting host verifier
//            HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//
//        try {
//            ArrayList<String> result = new ArrayList<String>();
//            URL obj = new URL("https://192.168.32.1:9443/api/am/store/v1.0/apis?limit=10&offset=0");
//            HttpURLConnection postConnection = (HttpURLConnection) obj.openConnection();
//            postConnection.setRequestMethod("GET");
//            postConnection.setRequestProperty("Content-Type", "application/json");
//            postConnection.setDoOutput(true);
//
////        OutputStream os = postConnection.getOutputStream();
////        os.write();
////        os.flush();
////        os.close();
//
//            int responseCode = postConnection.getResponseCode();
//
//            if (responseCode == HttpURLConnection.HTTP_OK) { //success
//                BufferedReader in = new BufferedReader(new InputStreamReader(postConnection.getInputStream()));
//                String inputLine;
//                StringBuffer response = new StringBuffer();
//
//                while ((inputLine = in.readLine()) != null) {
//                    response.append(inputLine);
//                }
//                in.close();
//
//                System.out.println("response:" + response);
//
//                String json = response.toString();
//                JsonObject jsonObject = new JsonParser().parse(json).getAsJsonObject();
//
//                JsonArray pageName = (JsonArray) jsonObject.getAsJsonArray("list");
//                int len = pageName.size();
//
//                for (Iterator<JsonElement> it = pageName.iterator(); it.hasNext(); ) {
//                    com.google.gson.JsonElement elem = it.next();
//                    System.out.println("id: "+elem.getAsJsonObject().get("id"));
//                    System.out.println("name: "+elem.getAsJsonObject().get("name"));
//                    System.out.println("description: "+elem.getAsJsonObject().get("description"));
//                    System.out.println("context: "+elem.getAsJsonObject().get("context"));
//                    System.out.println("version: "+elem.getAsJsonObject().get("version"));
//                    System.out.println("type: "+elem.getAsJsonObject().get("type"));
//                    System.out.println("provider: "+elem.getAsJsonObject().get("provider"));
//                    System.out.println("lifeCycleStatus: "+elem.getAsJsonObject().get("lifeCycleStatus"));
//                    System.out.println("thumbnailUri: "+elem.getAsJsonObject().get("thumbnailUri"));
//                    System.out.println("avgRating: "+elem.getAsJsonObject().get("avgRating"));
//
//                    String provider = elem.getAsJsonObject().get("provider").toString();
//                    String apiName = elem.getAsJsonObject().get("name").toString();
//                    String version = elem.getAsJsonObject().get("version").toString();
//
////                    API api = new API(new APIIdentifier(provider, apiName, version));
////                    String context = elem.getAsJsonObject().get("context").toString();
////                    api.setContextTemplate(context + "/{version}");
////                    api.setType("BLOCKCHAIN|HTTP");
////                    sortedSet.add(api);
//                }
//            } else {
//                System.out.println("POST NOT WORKED");
//            }
try{
            System.out.println("==============1");
            APIMarketplaceDB db = new APIMarketplaceDB();
            db.writeAPIToDB("1", "test1name", "desc test1", "ctx1", "ver1", "typ", "prov", "life-status", "thumb",
                    0.1f);
            System.out.println("==============2");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Method for copying identity component jsp pages to webapp extensions upon initial server startup
     */
    private static void copyToExtensions() {
        String repositoryDir = "repository";
        String resourcesDir = "resources";
        String extensionsDir = "extensions";
        String webappDir = "webapps";
        String authenticationEndpointDir = "authenticationendpoint";
        String accountRecoveryEndpointDir = "accountrecoveryendpoint";
        String headerJspFile = "header.jsp";
        String footerJspFile = "footer.jsp";
        String titleJspFile = "title.jsp";
        String cookiePolicyContentJspFile = "cookie-policy-content.jsp";
        String privacyPolicyContentJspFile = "privacy-policy-content.jsp";
        try {
            String resourceExtDirectoryPath =
                    CarbonUtils.getCarbonHome() + File.separator + repositoryDir + File.separator + resourcesDir
                            + File.separator + extensionsDir;
            String authenticationEndpointWebAppPath =
                    CarbonUtils.getCarbonRepository() + webappDir + File.separator + authenticationEndpointDir;
            String authenticationEndpointWebAppExtPath =
                    authenticationEndpointWebAppPath + File.separator + extensionsDir;
            String accountRecoveryWebAppPath =
                    CarbonUtils.getCarbonRepository() + webappDir + File.separator + accountRecoveryEndpointDir;
            String accountRecoveryWebAppExtPath = accountRecoveryWebAppPath + File.separator + extensionsDir;
            if (new File(resourceExtDirectoryPath).exists()) {
                log.info("Starting to copy identity page extensions...");
                String headerJsp = resourceExtDirectoryPath + File.separator + headerJspFile;
                String footerJsp = resourceExtDirectoryPath + File.separator + footerJspFile;
                String titleJsp = resourceExtDirectoryPath + File.separator + titleJspFile;
                String cookiePolicyContentJsp = resourceExtDirectoryPath + File.separator + cookiePolicyContentJspFile;
                String privacyPolicyContentJsp =
                        resourceExtDirectoryPath + File.separator + privacyPolicyContentJspFile;
                if (new File(headerJsp).exists()) {
                    copyFileToDirectory(headerJsp, authenticationEndpointWebAppExtPath,
                            authenticationEndpointWebAppPath);
                    copyFileToDirectory(headerJsp, accountRecoveryWebAppExtPath, accountRecoveryWebAppPath);
                }
                if (new File(footerJsp).exists()) {
                    copyFileToDirectory(footerJsp, authenticationEndpointWebAppExtPath,
                            authenticationEndpointWebAppPath);
                    copyFileToDirectory(footerJsp, accountRecoveryWebAppExtPath, accountRecoveryWebAppPath);
                }
                if (new File(titleJsp).exists()) {
                    copyFileToDirectory(titleJsp, authenticationEndpointWebAppExtPath,
                            authenticationEndpointWebAppPath);
                    copyFileToDirectory(titleJsp, accountRecoveryWebAppExtPath, accountRecoveryWebAppPath);
                }
                if (new File(cookiePolicyContentJsp).exists()) {
                    copyFileToDirectory(cookiePolicyContentJsp, authenticationEndpointWebAppExtPath,
                            authenticationEndpointWebAppPath);
                }
                if (new File(privacyPolicyContentJsp).exists()) {
                    copyFileToDirectory(privacyPolicyContentJsp, authenticationEndpointWebAppExtPath,
                            authenticationEndpointWebAppPath);
                }
                log.info("Successfully completed copying identity page extensions");
            }
        } catch (IOException ex) {
            log.error("An error occurred while copying extension files to web apps", ex);
        }
    }

    private static void copyFileToDirectory(String filePath, String directoryPath, String parentDir)
            throws IOException {
        try {
            if (new File(parentDir).exists()) {
                FileUtils.copyFileToDirectory(new File(filePath), new File(directoryPath));
            }
        } catch (IOException ex) {
            log.error("An error occurred while copying file to directory", ex);
            throw new IOException("An error occurred while copying file to directory", ex);
        }
    }

    @Override
    public void completingServerStartup() {
    }
}
