---
layout: default
title: Creating Google Service Account and getting Google API Key
nav_order: 4
parent: Getting Started
permalink: /getting_started/creating_google_service_account_and_getting_google_api_key/
---

# **Creating Google Service Account and getting Google API Key**

### TLDR? 
[Watch a video!](https://www.youtube.com/watch?v=K4ElIdBGYg8)

### Enable ARCore API in Google Cloud console

To be able to host and resolve Google Cloud anchors via augg.io, you need to enable ARCore API in your Google Cloud Console project.

1. Go to **[console.cloud.google.com](https://console.cloud.google.com)** and login.

2. Create new project or select relevant project

3. Click **Enabled API & Services**  
   ![]({{ site.baseurl }}/images/img_02/image1.png) 
4. Click \+ **Enable APIs and Services**  
   ![]({{ site.baseurl }}/images/img_02/image5.png)  
5. Find ARCore API open and click enable.  
   ![]({{ site.baseurl }}/images/img_02/image9.png)
   ![]({{ site.baseurl }}/images/img_02/image7.png)

### Create Service Account

In order to manage your Google Cloud anchors (create, delete, set time to live), augg.io needs access to your Google anchor service. This is possible by providing us a google service account, which can be created in following steps:

1. Go to **console.cloud.google.com** and login.

2. Create new project or select relevant project

3. In the right hand menu click on **Credentials**  
   ![]({{ site.baseurl }}/images/img_02/image2.png)

4. Click Create **Credentials** and select **service account**  
   ![]({{ site.baseurl }}/images/img_02/image4.png)

5. Fill in the service account name. You don't have to touch anything else.

   ![]({{ site.baseurl }}/images/img_02/image6.png)

   

6. Select (click on) the created service account.

7. Click Keys. Click **Add Key** \-\> **Create new key**  
   ![]({{ site.baseurl }}/images/img_02/image10.png)

8. Select JSON

9. This has created and downloaded a JSON file.

10. Go to **cms.augg.io** and login.

11. Click on profile in the top right corner and select manage organization.  
    ![]({{ site.baseurl }}/images/img_02/image8.png)

12. Upload JSON file.

13. You will have to confirm to delete all data. **You will lose all data created on the Trial tier.**

### 

### Get Google API Key

Google API Key is needed in your Unity application, so it can resolve previously created anchors and display your prepared content. To create this API key, please follow these steps:

1. Return to **Credentials** screen in Google Console

2. Click Create Credentials and select **API Key**  
   ![]({{ site.baseurl }}/images/img_02/image11.png)

3. Copy and paste the API key inside the Unity Editor (see [Setting up ARCoreExtensions chapter in this manual]({{ site.baseurl }}/getting_started/setting_up_auggio_in_a_project/#setting-up-arcore-extensions))

{: .note }
> **Congratulations, you've made it to the end!**
>
> Need a reminder of what you've done earlier in the guide? The previous part is right here: [01 - Setting up augg.io in a project]({{ site.baseurl }}/getting_started/setting_up_auggio_in_a_project/)
>
> The next part of the guide awaits you here: [03 - Start using augg.io]({{ site.baseurl }}/getting_started/start_using_auggio/)
