export default {
  checkFormat(text) {
    return text.startsWith('[{"x":') && text.endsWith("}]");
  },
  convert(text) {
    try {
      const json = JSON.parse(text);

      return {
        error: null,
        content: json.map((waypoint) => ({
          x: waypoint.x,
          y: waypoint.y,
          z: waypoint.z,
          name: waypoint.options.name,
        })),
      };
    } catch (error) {
      console.error(error);
      return {
        error,
        content: null,
      };
    }
  },
};
