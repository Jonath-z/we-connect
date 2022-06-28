const base64ToObjectUrl = (base64String: string) => {
  if (base64String) {
    const bytesCharacters = atob(base64String.replace(/^[^,]+,/, ""));
    const bytesNumber = new Array(bytesCharacters.length);
    for (let i = 0; i < bytesCharacters.length; i++) {
      bytesNumber[i] = bytesCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(bytesNumber);
    const blob = new Blob([byteArray], { type: "video/webm" });

    const blobUrl = URL.createObjectURL(blob);

    return blobUrl;
  }
};

export default base64ToObjectUrl;
