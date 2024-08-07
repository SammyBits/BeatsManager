import { useId, useState, useEffect } from "react";
import { GetSourceAudio, IsFileLoaded } from "./data/fileManager";
import { ShowComponent } from "./utils/ShowComponent";


interface FileState {
  source: File | null;
  name: string;
  isFileLoaded: boolean;
}

export default function App() {
  const [fileState, setFileState] = useState<FileState>({
    source: null,
    name: "",
    isFileLoaded: false,
  });

  const elementId = useId();

  useEffect(() => {
    // Limpiar el URL del objeto cuando el componente se desmonte o cambie el archivo
    return () => {
      if (fileState.source) {
        URL.revokeObjectURL(GetSourceAudio(fileState.source));
      }
    };
  }, [fileState.source]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileState(IsFileLoaded(file));
  };

  return (
    <div className="h-screen min-w-screen bg-[#171717] flex items-center justify-center">
      <div className="text-center">
        <div className="text-white font-mono font-semibold text-4xl mb-4">
          <h1>BeatsManager</h1>
        </div>

        <div>
          <ShowComponent show={!fileState.isFileLoaded}>
            <input
              type="file"
              accept=".mp3,audio/mp3,audio/mpeg"
              className="bg-[#1E1E1E] text-white p-2 rounded-md"
              onChange={handleFileChange}
            />
          </ShowComponent>

          <ShowComponent show={fileState.isFileLoaded}>
            <div className="text-white font-mono font-semibold text-2xl mb-4">
              <audio id={elementId} controls>
                <source src={GetSourceAudio(fileState.source!)} type="audio/mpeg" />
              </audio>
            </div>
          </ShowComponent>
        </div>
      </div>
    </div>
  );
}