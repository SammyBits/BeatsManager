export const IsFileLoaded = (file: File | null | undefined) => {
  if (!file) {
    return { source: null, name: "", isFileLoaded: false };
  }
  return { source: file, name: file.name, isFileLoaded: true };
};
export const GetSourceAudio = (file: File | null): string => {
  if (file) {
    return URL.createObjectURL(file);
  }
  return "";
};
