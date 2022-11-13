async function loadImage(urlOrData) {
  const targetPrefix = "/load_jpeg_" + this.jpegCount++;

  let data;
  let ext = "jpg";
  const fullUrl = urlOrData + "." + ext;
  const target = targetPrefix + "." + ext;

  if (urlOrData instanceof Uint8Array) {
    // assume preloaded camera params
    data = urlOrData;
  } else {
    // fetch data via HTTP
    try {
      data = await fetchRemoteData(urlOrData, function (buf) {
        _storeDataFile(buf, target);
      });
    } catch (error) {
      throw error;
    }
  }

  // return the internal marker ID
  return Module.transformImage(target);
}

// ---------------------------------------------------------------------------

// implementation

function _storeDataFile(data, target) {
  // FS is provided by emscripten
  // Note: valid data must be in binary format encoded as Uint8Array
  FS.writeFile(target, data, {
    encoding: "binary",
  });
}

async function fetchRemoteData(urlOrData, callback) {
  fetch(urlOrData)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.blob();
    })
    .then((blob) => {
      blob.arrayBuffer().then((buff) => {
        let buffer = new Uint8Array(buff);
        callback(buffer);
      });
    })
    .catch((error) => {
      errorCallback(error);
    });
}

function loadData(urlOrData, width, height, errorCallback){
  fetch(urlOrData)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.arrayBuffer();
    })
    .then((buff) => {
      let buffer = new Uint8Array(buff);
        let out = Module.transformLoadData(width, height, buffer);
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(width, height)
        for (let i = 0; i < imageData.data.length; i++) {
          imageData.data[i] = out[i];
      }
        ctx.putImageData(imageData, 0, 0);
    })
    .catch((error) => {
      errorCallback(error);
    });
}

var jpeg_count = 0;
 function loadJpeg(url, callback, errorCallback) {
    var filename = '/load_jpeg_' + jpeg_count++ + '.jpg';
    var writeCallback = function (errorCode) {
        if (!Module.transformImage) {
            if (callback) callback(id); setTimeout(writeCallback, 10);
        } else {
            var id = Module.transformImage( filename);
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

