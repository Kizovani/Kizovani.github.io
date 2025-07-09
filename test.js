function betterThanAverage(classPoints, yourPoints) {
    let totalScore = 0;
    for(let score of classPoints){
      totalScore += score;
    }
    let classAVG = (totalScore + yourPoints)/(classPoints.lenth +1);
    if (yourPoints > classAVG){
      return true;
    } else return false;
    
  }
  