export const resizeImage = (
  file: File,
  width: number,
  height: number
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: file.lastModified,
            });
            resolve(resizedFile);
          } else {
            reject(new Error("Canvas to Blob conversion failed."));
          }
        }, file.type);
      } else {
        reject(new Error("Failed to get canvas context."));
      }
    };
    img.onerror = (error) => reject(error);
  });
};
