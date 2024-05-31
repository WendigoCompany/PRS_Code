
export const loadImagesSequentially = (srcArray) => {
    const loadNextImage = (index) => {
      if (index >= srcArray.length) {
        // Si ya hemos cargado todas las imágenes, resolvemos la promesa
        return Promise.resolve();
      }
  
      const src = srcArray[index];
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          // Una vez que se carga la imagen actual, cargamos la siguiente
          loadNextImage(index + 1).then(resolve);
        };
        img.onerror = (error) => reject(error);
        img.src = src;
      });
    };
  
    return loadNextImage(0);
  };