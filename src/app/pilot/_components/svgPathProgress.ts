const clampProgress = (progress: number) => Math.min(1, Math.max(0, progress));

export function createSvgPathProgress(
  source: SVGPathElement,
  target: SVGPathElement,
  sampleCount = 360,
) {
  const totalLength = source.getTotalLength();
  const samples = Array.from({ length: sampleCount + 1 }, (_, index) =>
    source.getPointAtLength((index / sampleCount) * totalLength),
  );

  const pointAt = (progress: number) =>
    source.getPointAtLength(clampProgress(progress) * totalLength);

  const tangentAngleAt = (progress: number) => {
    const center = clampProgress(progress) * totalLength;
    const sampleRadius = Math.max(1, totalLength * 0.0015);
    const before = source.getPointAtLength(Math.max(0, center - sampleRadius));
    const after = source.getPointAtLength(Math.min(totalLength, center + sampleRadius));

    return Math.atan2(after.y - before.y, after.x - before.x) * (180 / Math.PI);
  };

  const render = (progress: number, trailingInset = 0) => {
    const visibleLength = Math.max(
      0,
      clampProgress(progress) * totalLength - trailingInset,
    );
    const lastSample = Math.floor((visibleLength / totalLength) * sampleCount);
    const visiblePoints = samples.slice(0, lastSample + 1);
    const exactEnd = source.getPointAtLength(visibleLength);
    const pathData = [
      `M ${samples[0].x} ${samples[0].y}`,
      ...visiblePoints.slice(1).map((point) => `L ${point.x} ${point.y}`),
      `L ${exactEnd.x} ${exactEnd.y}`,
    ].join(" ");

    target.setAttribute("d", pathData);
  };

  const progressNearest = (targetX: number, targetY: number) => {
    let closestProgress = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    samples.forEach((point, index) => {
      const distance = Math.hypot(point.x - targetX, point.y - targetY);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestProgress = index / sampleCount;
      }
    });

    return closestProgress;
  };

  return { pointAt, tangentAngleAt, render, progressNearest };
}
