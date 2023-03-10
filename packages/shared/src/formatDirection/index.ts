export function formatDirection(_azimuth?: number) {
  if (!_azimuth) return '-';
  const azimuth = _azimuth % 360;
  const N = '北',
    E = '东',
    S = '南',
    W = '西';
  const COMPASS_COMPLETE = [N, E + N, E, E + S, S, W + N, W, W + S];
  const COMPASS_SIMPLE = COMPASS_COMPLETE.filter(e => e.length == 1);
  if (azimuth % 45 == 0) {
    const index = azimuth / 45;
    const standardDistance = COMPASS_COMPLETE[index];
    return standardDistance.length == 1 ? `正${standardDistance}` : standardDistance;
  }
  const positionValue = azimuth % 90;
  const offsetIndex = Math.floor(azimuth / 90);
  const offsetValue = positionValue % 45;
  const offsetDirectionA = COMPASS_SIMPLE[offsetIndex];
  const offsetDirectionB = COMPASS_SIMPLE[(offsetIndex + 1) % 4];
  if (positionValue > 45)
    return `${offsetDirectionB}偏${offsetDirectionA} ${45 - offsetValue}°`;
  else
    return `${offsetDirectionA}偏${offsetDirectionB} ${offsetValue}°`;
}