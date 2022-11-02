async function loadImage (urlOrData) {
    const targetPrefix = '/load_jpeg_' + this.jpegCount++

    let data
    let ext = 'jpg'
    const fullUrl = urlOrData + '.' + ext
    const target = targetPrefix + '.' + ext

    if (urlOrData instanceof Uint8Array) {
      // assume preloaded camera params
      data = urlOrData
      
    } else {
      // fetch data via HTTP
      try { data = await fetchRemoteData(urlOrData) } catch (error) { throw error }
    }

    _storeDataFile(data, target)

    // return the internal marker ID
    return Module.transformImage(target)
  }

  // ---------------------------------------------------------------------------

  // implementation

  function _storeDataFile (data, target) {
    // FS is provided by emscripten
    // Note: valid data must be in binary format encoded as Uint8Array
    Module.FS.writeFile(target, data, {
      encoding: 'binary'
    })
  }

  async function fetchRemoteData(urlOrData) {
    fetch(urlOrData).then(response => {
        response.blob()
    })

  }