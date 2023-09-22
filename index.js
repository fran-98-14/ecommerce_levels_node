const points = new Set([100, 500, 1000, 1000, 1500, 300])
const levels = [];

let i = 1;
points.sort(comparer).forEach(p => {
    const lvl = {
        level: i,
        minPoints: p,
    }
    levels.push(lvl);
    i++;
});


console.log(levels);







function comparer (a, b) {
    return a - b;
  }