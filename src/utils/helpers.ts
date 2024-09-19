export function normalizeString(str:string) {
    // Normalize the string to Unicode Normalization Form D (NFD)
    const normalized = str.normalize('NFD');
  
    // Replace accented characters with their base forms
    const baseForm = normalized.replace(/[\u0300-\u036f]/g, '');
  
    // Convert to lowercase (optional, depending on your needs)
    const result = baseForm.toLowerCase();
  
    return result;
  }
  
 // Function to read file as Base64
 export async function readFileAsBase64(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer.toString('base64');
};