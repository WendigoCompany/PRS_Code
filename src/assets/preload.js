let retryCount = 0;
const maxRetries = 15;
export const loadImagesSequentially = (srcArray) => {
  const loadNextImage = (index) => {
    if (index >= srcArray.length) {
      return Promise.resolve();
    }

    const src = srcArray[index];
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        retryCount = 0;
        loadNextImage(index + 1).then(resolve);
      };
      img.onerror = (error) => {
        if (
          error instanceof Event &&
          error.target &&
          error.target.status === 403
        ) {
    
          if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(() => {
              loadNextImage(index).then(resolve).catch(reject); // Intentar cargar la imagen nuevamente
  
            }, 1000);

          } else {
            reject(
              new Error(
                `Se ha excedido el número máximo de reintentos (${maxRetries}) para la imagen: ${src}`
              )
            );
          }
        } else {
          reject(error);
        }
      };
      img.src = src;
    });
  };

  return loadNextImage(0);
};
