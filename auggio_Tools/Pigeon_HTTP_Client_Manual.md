# **Pigeon HTTP Client**

A powerful, asynchronous HTTP client implementation for Unity that provides a fluent API for making HTTP requests. Designed to simplify HTTP communication in Unity projects with built-in support for authentication, request customization, and error handling.

Table of Contents

* Features  
* Installation  
* Quick Start  
* Configuration  
* Usage Examples  
* Authentication  
* API Reference  
* Troubleshooting

## **Features**

* Fluent API for easy request building  
* Built-in authentication layer support  
* Customizable request headers and timeouts  
* File download support  
* Comprehensive logging system  
* JSON request/response helpers  
* Configurable error handling  
* Unity-friendly callback system

## **Installation**

1. Download the latest `.unitypackage`  
2. Double-click the downloaded file or import it via Assets \> Import Package \> Custom Package

## 

## **Quick Start**

Initialize the client in your application startup code:

```csharp
Pigeon.Initialize()
  .SetHostname("https://api.example.com")
  .SetDefaultHeaders(new Dictionary<string, string> {
    {"Accept", "application/json"},
    {"Content-Type", "application/json"}
  })
  .SetDefaultAuthLayer(new AuthLayer())
  .SetOnAuthorizationError(HandleAuthError)
  .Log(RequestLogger.LOG_LEVEL.ALL);
```

Make your first request:

```csharp
Pigeon.Post("/users")
  .SendJson()
  .SetBody(JsonUtility.ToJson(userModel))
  .SetSuccessCallback(OnSuccess)
  .SetErrorCallback(OnError)
  .Send();
```

## **Configuration**

### **Initialization Options**

| Method | Description | Default |
| ----- | ----- | ----- |
| `SetHostname(string)` | Base URL for all requests | None |
| `SetDefaultAuthLayer(AbstractAuthLayer)` | Default authorization handler | None |
| `SetDefaultHeaders(Dictionary<string, string>)` | Headers added to all requests | Empty |
| `SetDefaultTimeout(int)` | Request timeout in seconds | 10 |
| `SetDefaultAuthorizationHeaderName(string)` | Custom auth header name | "Authorization" |
| `Log(RequestLogger.LOG_LEVEL)` | Set logging verbosity | None |

### **Request Methods**

* `Request(HttpMethod, string, bool)`  
* `Get(string, bool)`  
* `Post(string, bool)`  
* `Put(string, bool)`  
* `Delete(string, bool)`

The `bool` parameter controls whether to use default configuration (true by default).

## 

## **Usage Examples**

### **POST Request with JSON**

```csharp
Pigeon.Post("/account/link")
  .SendJson()
  .SetBody(JsonUtility.ToJson(new AuthenticationRequest(
    token: "Basic bWFyYfoperkprkofoerWM=",
    type: "USERNAME_PASSWORD"
  )))
  .SetSuccessCallback(response => {
    Debug.Log($"Success: {response}");
  })
  .SetErrorCallback(error => {
    Debug.LogError($"Error {error.GetCode()}: {error.GetMessage()}");
  })
  .Send();
```

### **File Download**

```csharp
Pigeon.Get("/files/document.pdf")
  .IsFile(fileData => {
    // Handle downloaded file data
  })
  .Send();
```

## 

## **Authentication**

Implement `AbstractAuthLayer` to handle authentication:

### 

```csharp
public class MyAuthLayer : AbstractAuthLayer {
  public override string GetAuthorizationHeaderValue() {
    return $"Bearer {GetCurrentToken()}";
  }

  public override void Process(PigeonRequest authorizedRequest) {
    Handle 401 responses, refresh tokens, etc.
    // Call authorizedRequest.Send() after handling 
  }
}
```

## **API Reference**

### **Request Modifiers**

| Method | Description |
| ----- | ----- |
| `SetBody(string)` | Set request body |
| `SetHeader(string, string)` | Add/update single header |
| `SetHeaders(Dictionary<string, string>)` | Set multiple headers |
| `SetTimeout(int)` | Set request timeout |
| `SendJson()` | Set Content-Type to application/json |
| `AcceptsJson()` | Set Accept to application/json |
| `DisableAuth()` | Disable authentication for request |
| `IsFile(OnFileDownloaded)` | Handle response as file download |

## **Troubleshooting**

### **Common Issues**

1. **401 Unauthorized**  
   * Verify `AbstractAuthLayer` implementation  
   * Check token validity  
   * Ensure `GetAuthorizationHeaderValue()` returns non-null value  
2. **Request Timeout**  
   * Check network connectivity  
   * Increase timeout using `SetTimeout()`  
   * Verify server response time

