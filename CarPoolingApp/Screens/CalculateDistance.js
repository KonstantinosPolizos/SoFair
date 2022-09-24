export const CalculateDistance = ({ coord1, coord2 }) => {
  const r = 6371e3; // metres
  const f1 = (coord1.latitude * Math.PI) / 180; // φ, λ in radians
  const f2 = (coord2.latitude * Math.PI) / 180;
  const df = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const dl = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(df / 2) * Math.sin(df / 2) +
    Math.cos(f1) * Math.cos(f2) * Math.sin(dl / 2) * Math.sin(dl / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return r * c; // in metres
};
