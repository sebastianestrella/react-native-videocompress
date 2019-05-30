package com.videocompress.modules;

import android.os.Environment;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.videocompress.compressvideo.VideoCompress;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class VideoCompressorModule extends ReactContextBaseJavaModule {

    private static final String TAG = VideoCompressorModule.class.getSimpleName();
    private long startTime, endTime;
    public VideoCompressorModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return TAG;
    }

    @ReactMethod
    public void startCompressVideo(String filePath, String quality, final Promise promise){

        final String destPath = Environment.getExternalStorageDirectory() + File.separator + quality +"_VID_"+ new SimpleDateFormat("yyyyMMdd_HHmmss",Locale.US).format(new Date())+".mp4";
        VideoCompress.compressVideo(filePath, destPath, quality, new VideoCompress.CompressListener(){
            @Override
            public void onStart() {
                startTime = System.currentTimeMillis();
            }

            @Override
            public void onSuccess() {
                endTime = System.currentTimeMillis();
                Date dtStart = new Date(startTime);
                String startStr = dtStart.toString();
                Date dtEnd = new Date(endTime);
                String endStr = dtEnd.toString();
                final WritableMap results = Arguments.createMap();
                results.putString("destFile",destPath);
                results.putString("startTime",startStr);
                results.putString("endTime",endStr);
                promise.resolve(results);
            }

            @Override
            public void onFail() {
                promise.reject("500", "Something wrong");
            }

            @Override
            public void onProgress(float percent) {
            }
        });
    }
}
