const getClipboardContent = async () => {
  try {
    const text = await navigator.clipboard.readText();
    return { error: null, content: text ?? null };
  } catch (error) {
    return { error, content: null };
  }
};

const setClipboardContent = async (content) => {
  try {
    await navigator.clipboard.writeText(content);
    return true;
  } catch {
    return false;
  }
};

export { getClipboardContent, setClipboardContent };
