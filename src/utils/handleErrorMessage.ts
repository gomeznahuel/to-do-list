export const handleErrorMessage = (action: string, error: Error) => {
  throw new Error(`Error ${action}: ${error.message}`);
};