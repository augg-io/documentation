# 

# 

# **Upgrading ARCoreExtensions in the project**

## augg.io

1. **First, delete current ARCoreExtensions from the project using the package manager.**  
2. Install the new version by following [**this**](https://developers.google.com/ar/develop/unity-arf/getting-started-extensions?ar_foundations_version=4#install_arcore) tutorial.  
   1. Choose ARFoundation 5.x even if Google’s docs suggest matching ARFoundation versions  
   2. if you already have External Dependency Manager installed in your project for example as a dependency of some Firebase package, you want to download a version without EDM4U, otherwise you will have a conflict  
      1. If their provided link doesn’t work, search for "**ARCore Extensions without EDM4U release**" on Google. The first GitHub link typically has the correct package.  
      2. In some cases, the "**com.google.external-dependency-manager**" file will download as a **.tar** instead of **.tgz**. If that happens, **Manually rename** it to **.tgz** before adding via Unity’s Package Manager or you will not see the option.  
3. Delete the **Assets/ExtensionsAssets** folder. This is an important step.  
4. Make sure that the ARCoreExtension object in your scene still has the XROrigin set.  
5. Go to **Project Settings \- XR Plug-in Management** and make sure **Google ARCore** is set to true under the Android tab. Make sure that **ARKit** is set true under the Apple tab.