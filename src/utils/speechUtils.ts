export const speak = (text: string, speed: number): Promise<void> => {
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Optimize speech parameters for clarity
    utterance.rate = Math.min(Math.max(2000 / speed, 0.8), 1.2); // Limit rate range for better clarity
    utterance.pitch = 1.1; // Slightly higher pitch for better articulation
    utterance.volume = 1;
    utterance.lang = 'en-US'; // Ensure consistent pronunciation
    
    utterance.onend = () => {
      resolve();
    };

    // Cancel any ongoing speech before starting new one
    window.speechSynthesis.cancel();
    
    // Small delay to ensure clean start
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 50);
  });
};