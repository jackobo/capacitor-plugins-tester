const fs = require('fs-extra');


fs.copy('./android/app/build/outputs/apk/debug/app-debug.apk', 'c:/inetpub/wwwroot/app-debug.apk', {
    overwrite: true
})
