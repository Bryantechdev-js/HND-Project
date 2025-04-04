declare global {
    interface Window {
      SpeechRecognition: typeof SpeechRecognition;
      webkitSpeechRecognition: typeof webkitSpeechRecognition;
    }
  }
  
  export {};  // This is needed for the TypeScript file to treat this as a module
  