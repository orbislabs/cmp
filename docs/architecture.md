```
_____________
|           |
|  Loader   | ------> 
|           |
-------------
```



### Loader Module
Responsible for the creation of a data object for consumption of other modules
It is client agnostic, it does not need the client id for any logic

#### Flow:
- check if cookies are allowed (1st party)
- check if cookies are allowed (3rd party)
- check for first party cookie presence & get value
- check for third party cookie presence & get value
- log the results in DB
- request OR do not request the UI

Data Object:
```javascript
{
  clientId : int,
  cookie1pAllowed : bool,
  cookie3pAllowed : bool,
  cookie1pValue : string || null,
  cookie3pValue : string || null,
}
```


### Application Folder Structure
```
/client
-/ui
-/api
-/cmp

/server
-/routes
--/cmp
--/log
--/api
---/cookie

/lib
-/cookies
-/http

/build

/dist

/docs
```

