---
layout: default
title: The Scanning App
nav_order: 7
permalink: /The_Scanning_Application/
---

# **The Scanning App**

## augg.io

# **Introduction**

When you initially open the scanning application it can be quite intimidating. In this manual, you will learn all of the concepts of the augg.io Persistent AR.

Watch a quick video on how to use our scanning application: 

[Quick video tutorial on how to scan your environment and create virtual anchors](https://youtu.be/2RPHbdd1y3A?si=kaFkTaWZf2KoW8xI) 

# **Before you start**

Before you start using the application you should set up a Google service account and provide it to augg.io in our CMS. To do so please follow this [manual](/02_creating_google_service_account_and_getting_google_api_key/). If you just want to test the application you can skip this step and continue in the Trial tier. If you do this you won't be able to build the unity project with Trial tier data. Don't worry it is still free even after you set up the service account.

Once you set all of this up you can start creating anchors in your own anchor space and use them as you wish.

# **Inside the application**

When you first open the application you are met with a menu offering the choices of location and experience. Now we will look at what each means.

## **Location**

Location is our starting point. It describes the physical location where we create our anchors. Location is a wrapper around the anchors you create and manage anchors inside the locations. The location also contains the relative positions between anchors as created by the review process.

### **Best practices**

**Keep locations walkable.** When you are creating your locations they should describe physical locations. If you cannot walk between two anchors in a single location you should consider splitting it into two separate locations.

**Anchors are a series of views not a point in space.** When you are creating an anchor don't think about the position of the gizmo you place at the start much. It is important to capture as many views from the angles you wish for the anchor to work. Simulate your users when you are creating an anchor.

## **Experience**

Experience is an augg.io wrapper around your application. Experience should describe the content placed in the physical space. When you are placing your content you don't want to think about anchor creation that much. Your anchors already exist in the locations assigned to the experience. Experience is made up of **Auggio Objects** and these should represent the content placed in the virtual space. Some aspects of Auggio Objects can be edited without the need to build a new app. These include position, rotation, and scale, as well of an object as well as changing anchor which the object belongs to.

### **Best practices**

**Name your Auggio Objects properly.** Don't name your Auggio Objects after the things in physical space. **Table** is a bad name for an AuggioObject. Name your object after the content it should represent. **TableLamp** is a good name for an AuggioObject.

