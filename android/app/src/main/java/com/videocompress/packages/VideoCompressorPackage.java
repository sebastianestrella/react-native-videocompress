package com.videocompress.packages;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.videocompress.modules.VideoCompressorModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class VideoCompressorPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        final List<NativeModule> modules = new ArrayList<>();
        modules.add(new VideoCompressorModule(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
