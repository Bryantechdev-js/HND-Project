// speech-recognition.d.ts
declare global {
    interface Window {
      SpeechRecognition: typeof SpeechRecognition;
      webkitSpeechRecognition: typeof webkitSpeechRecognition;
    }
  }
  
  export {};
  