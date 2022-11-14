var jpeg_count = 0;
function loadJpeg(url, callback, errorCallback) {
  var filename = '/load_jpeg_' + jpeg_count++ + '.jpg';
  var writeCallback = function () {
    if (!Module.transformImage) {
      if (callback) callback(id); setTimeout(writeCallback, 10);
    } else {
      var id = Module.transformImage(filename);
      if (callback) callback(id);
    }
  };
  if (typeof url === 'object') { // Maybe it's a byte array
    writeByteArrayToFS(filename, url, writeCallback);
  } else if (url.indexOf("\n") > -1) { // Or a string with the jpeg path
    writeStringToFS(filename, url, writeCallback);
  } else {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.arrayBuffer();
      })
      .then(buff => {
        let buffer = new Uint8Array(buff)
        writeByteArrayToFS(filename, buffer, writeCallback);
      })
      .catch(error => {
        errorCallback(error);
      });
  }
}

// transfer image

function writeStringToFS(target, string, callback) {
  var byteArray = new Uint8Array(string.length);
  for (var i = 0; i < byteArray.length; i++) {
    byteArray[i] = string.charCodeAt(i) & 0xff;
  }
  writeByteArrayToFS(target, byteArray, callback);
}

function writeByteArrayToFS(target, byteArray, callback) {
  FS.writeFile(target, byteArray, { encoding: 'binary' });
  callback(byteArray);
}

