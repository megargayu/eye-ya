export const drawAnnotations = (predictions, ctx, annotations) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      for (const annotation of annotations) {
        for (let i = 0; i < prediction.annotations[annotation].length; i++) {
          const x = prediction.annotations[annotation][i][0];
          const y = prediction.annotations[annotation][i][1];
          
          ctx.beginPath();
          ctx.arc(x, y, 1 /* radius */, 0, 3 * Math.PI);
          ctx.fillStyle = "aqua";
          ctx.fill();
        }
      }
    });
  }
};
