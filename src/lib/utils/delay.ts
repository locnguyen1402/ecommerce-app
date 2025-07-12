/**
 * Utility function for simulating network delays in mock mode
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};