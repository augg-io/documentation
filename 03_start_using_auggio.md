---
layout: default
title: Start using augg.io
nav_order: 5
parent: Getting Started
permalink: /getting_started/start_using_auggio/
---

# **Start using augg.io**

### Login to Editor Plugin

1. In Unity in the top bar click on **augg.io** \-\> **Editor Plugin**

2. Go to **cms.augg.io**

3. Click on profile and select Settings

4. Copy the API key

5. Enter the API key into the plugin.

### 

### Plugin basics

1. Select the experience you want to import into unity.

2. Click download meshes

3. After the meshes get downloaded click Import scene from server  
   ![]({{ site.baseurl }}/images/img_03/image4.png)

4. If you want your content to be tracked it has to be parented below an GameObject representing **AuggioObject**. Its name will look like this \[Object\] ObjectName.  
   ![]({{ site.baseurl }}/images/img_03/image5.png)

5. To be able to reposition content without building a new app each time. Don't move with MyContent but move with **AuggioObject** (name starts with \[Object\])

6. If you move the object make sure to push the changes to the server otherwise the new position won't be seen in the build.  
   ![]({{ site.baseurl }}/images/img_03/image1.png)

### 

### 

### Common Issues

* Sometimes mesh scans can be invisible. In this case select **VisualizationHierarch**y and make sure Visualize Mesh is set to true.

* Sometimes mesh scans can be pink. If this happens make sure the material is set in **VisualizationHierarchy**  
  ![]({{ site.baseurl }}/images/img_03/image2.png)

{: .note }
> **Congratulations, you've made it to the end!**
>
> Need a reminder of what you've done earlier in the guide? The previous part is right here: [02 - Creating Google Service Account and getting Google API Key]({{ site.baseurl }}/getting_started/creating_google_service_account_and_getting_google_api_key/)
>
> The next part of the guide awaits you here: [04 - Using augg.io Unity Editor Plugin]({{ site.baseurl }}/getting_started/using_auggio_unity_editor_plugin/)