export const countResults = (results, counterTops = 0, counterZones = 0) => {
  results.forEach(result => {
    if (result.top === true)
      counterTops++;
    if (result.zone === true)
      counterZones++;
  });
  
  return ({
    tops: counterTops,
    zones: counterZones,
    attTops: results.map(result => result.attTop).reduce((a,b) => a + b),
    attZones: results.map(result => result.attZone).reduce((a,b) => a + b),
  })
}