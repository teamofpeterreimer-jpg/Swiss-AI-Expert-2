
export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  // Simuliere eine kurze Verzögerung für ein natürlicheres Chat-Gefühl
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return "Coming soon... (Diese Funktion ist bald verfügbar)";
};
