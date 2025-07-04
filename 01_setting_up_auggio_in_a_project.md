---
layout: default
title: Setting up augg.io in a project
nav_order: 3
parent: Getting Started
permalink: /getting_started/setting_up_auggio_in_a_project/
---

# **Setting up augg.io in a project**

If you are using example project start with [Setting up Example project]({{ site.baseurl }}/getting_started/setting_up_example_project/) first.

### Setting up ARCore Extensions

1. In the top menu click **Edit** \- **Project Settings** and select **ARCore Extensions**

2. Set **iOS Enabled** to true if needed

3. Set **Cloud Anchor** to true

4. Set **Authentication Strategy** to **API key**
   ![]({{ site.baseurl }}/images/img_01/image5.png)

5. Fill in your [**Google Cloud Anchors API key**]({{ site.baseurl }}/getting_started/creating_google_service_account_and_getting_google_api_key/)**.**

6. Go to **Assets \- External Dependency Manager \- Android** and click **Force Resolve**

### Start using augg.io

1. Create an account at [**cms.augg.io**](http://cms.augg.io) or inside the scanning application.

2. Create a Blank Application in CMS.
   ![]({{ site.baseurl }}/images/img_01/image2.png)

3. Open the new application.

4. Click the three dots in the right corner and select **Download App Token**
   ![]({{ site.baseurl }}/images/img_01/image3.png)

5. Put your Application file token inside the **Assets/Resources** folder. It has to be named **auggioFileToken.json**.
   ![]({{ site.baseurl }}/images/img_01/image1.png)

{: .note }
> **Congratulations, you've made it to the end!**
>
> Need a reminder of what you've done earlier in the guide? The previous part is right here: [00 - Create an empty project]({{ site.baseurl }}/getting_started/create_an_empty_project/)
>
> The next part of the guide awaits you here: [02 - Creating Google Service Account and getting Google API Key]({{ site.baseurl }}/getting_started/creating_google_service_account_and_getting_google_api_key/)
