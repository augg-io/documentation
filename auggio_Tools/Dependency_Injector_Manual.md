# **Dependency Injector by augg.io**

Professional dependency injection framework for Unity.

## **Installation**

1. Import the downloaded .unitypackage into your Unity project:  
   * Open your Unity project  
   * Go to `Assets > Import Package > Custom Package` 
   * Select the downloaded `DependencyInjector.unitypackage`
   * Ensure all files are selected in the import window  
   * Click 'Import'

## **Setup**

1. **Script Execution Order**  
   * Open `Edit > Project Settings > Script Execution Order`
   * Add DependencyInjectorSetup  
   * Set it to execute before Default Time  
   * This step is **required** to ensure proper injection order  
2. **Scene Setup**  
   * Add Injector script to your first scene  
   * Injector uses DontDestroyOnLoad, so it only needs to be in the first scene  
   * Go to `augg.io/DependencyInjector/Setup` Instance Database to create required configuration  
   * Select the GameObject with Injector script and assign the created InstanceDatabase  
3. **Basic Usage**  
   * Call `Injector.Instance.Inject(this)` to perform injection  
   * Typically called in `Start()` for MonoBehaviours

## **Attributes**

### **[Bean]**

* Marks classes used in the injection process  
* Creates singletons automatically  
* No need to call `new` or `AddComponent`  
* Inherits from Unity's PreserveAttribute for IL2CPP support

### **[Injected]**

* Marks fields for direct class injection  
* Cannot be used with interface types  
* Example:

```csharp
[Bean]
public class MyService {
  public void DoSomething() {
  }
}

public class MyComponent : MonoBehaviour {

  [Injected]
  private MyService myService;

  void Start() {  
    Injector.Instance.Inject(this);  
  }

}
```

### **[InjectedInterface]**

* Marks fields for interface injection  
* Requires explicit implementation type  
* Example:

```csharp
public interface IMyService {
  void DoSomething();
}

[Bean] public class MyServiceImpl : IMyService {
  public void DoSomething() { }
}

public class MyComponent : MonoBehaviour {
  
  [InjectedInterface(typeof(MyServiceImpl))]
  private IMyService myService;

}
```

## **Build Considerations and Code Stripping**

### **Understanding Code Stripping**

When building with IL2CPP, Unity's build process includes an optimization step that removes unused code. This process, known as "code stripping" or "managed code stripping", can sometimes remove classes that are only referenced through reflection, which is how the dependency injection system works.

### **Common Symptoms**

* Injection works in the editor but fails in builds  
* `NullReferenceException` when trying to access injected dependencies  
* Missing type exceptions during injection  
* These issues are particularly common in IL2CPP builds

### **Built-in Protection**

The `[Bean]` attribute inherits from Unity's `[Preserve]` attribute, which automatically protects marked classes from being stripped. This means: - Classes marked with `[Bean]` are automatically preserved - Their public methods and properties are preserved - Fields marked with `[Injected]` or `[InjectedInterface]` in these classes are preserved

### **Additional Protection When Needed**

In some cases, you might need to add extra protection:

1. **For Entire Assemblies** `[assembly: Preserve]`  
2. **For Individual Classes** `[Preserve] public class MyClass { // Class contents will be preserved }`  
3. **For Specific Members** `public class MyClass { [Preserve] private void MyMethod() { } }`

### **When to Add Protection**

Add the `[Preserve]` attribute when: - Classes are only referenced through reflection - You see missing type exceptions in builds - Injection stops working in IL2CPP builds - You're using complex dependency chains

### **Build Testing**

Always test your dependency injection setup in: 

1. Development builds
2. IL2CPP builds
3. Different platform builds
4. Release builds with code stripping enabled
