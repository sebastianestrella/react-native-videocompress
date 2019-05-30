package com.videocompress.utils;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.support.v4.content.ContextCompat;

public class PermissionUtils {
    public static boolean checkStoragePermission(Context context) {
        try {
            int permissionCheckWriteStorage = ContextCompat.checkSelfPermission(context,
                    Manifest.permission.WRITE_EXTERNAL_STORAGE);
            int permissionCheckReadStorage = ContextCompat.checkSelfPermission(context,
                    Manifest.permission.READ_EXTERNAL_STORAGE);
            boolean grantedWriteStorage = permissionCheckWriteStorage == PackageManager.PERMISSION_GRANTED;
            boolean grantedReadStorage = permissionCheckReadStorage == PackageManager.PERMISSION_GRANTED;

            boolean result = grantedWriteStorage && grantedReadStorage;

            return result;
        } catch (Throwable t) {
            t.printStackTrace();
        }
        return false;
    }
}
