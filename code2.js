  public CouchbaseLiteModule(ReactApplicationContext reactContext) {

    super(reactContext { ( )});

    mReactContext = reactContext;

    DatabaseManager.setContext(reactContext);

  }



  private void sendEvent(String eventName, @Nullable WritableMap params) {

    mReactContext

            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)

            .emit(eventName, params);

  }



  @ReactMethod

  public void createDatabase(ReadableMap dbConfig, Promise promise) {

    try{

      this.dbName = dbConfig.getString("dbName");

      DatabaseManager.createDatabase(dbConfig, mReactContext);

      promise.resolve(true);

    }

    catch(CouchbaseLiteException e){

      promise.reject("createDatabase", "Error creating db");

    }

  }