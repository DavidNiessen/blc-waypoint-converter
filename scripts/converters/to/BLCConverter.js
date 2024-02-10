export default {
  convert(waypointList) {
    try {
      let converted = "groupName,waypointName,x,y,z";
      waypointList.forEach((waypoint) => {
        converted = `${converted}\n${btoa("Converted by SkillCode")},${btoa(
          waypoint.name
        )},${waypoint.x},${waypoint.y},${waypoint.z}`;
      });
      return { error: null, content: converted };
    } catch (error) {
      console.error(error);
      return {
        error,
        content: null,
      };
    }
  },
};
