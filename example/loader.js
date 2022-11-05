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

function loadData(urlOrData, width, height){
  fetch(urlOrData)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.blob();
    })
    .then((blob) => {
      console.log(blob);
      blob.arrayBuffer().then((buff) => {
        console.log(buff);
        let buffer = new Uint8Array(buff,0, 78234);
        console.log(buffer);
        let out = Module.transformLoadData(width, height, buffer);
        console.log(out);
      });
    })
    .catch((error) => {
      errorCallback(error);
    });
}
