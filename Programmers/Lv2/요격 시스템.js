function solution(targets) {
    let answer = 0;
    targets.sort((a, b) => a[1] - b[1]);
    let temp = 0;

    for (let i = 0; i < targets.length; i++) {
        if (targets[i][0] < temp) continue;
        else {
            answer += 1;
            temp = targets[i][1];
        }
    }

    return answer;
}

console.log(solution([[4,5],[4,8],[10,14],[11,13],[5,12],[3,7],[1,4]]));