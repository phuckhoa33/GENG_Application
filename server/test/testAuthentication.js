function removeLink(follower_array, follow_user) {
    for(let i = 0; i < follow_user.length; i++) {
        if(follower_array[i].toString() === follow_user.toString()){
            if(i === 0){
                follower_array.shift();
                return follower_array;
            }
            else if (i === follow_user.length - 1){
                follower_array.pop();
                return follower_array;
            }
            follower_array = follower_array.concat(follower_array.slice(0, i) + follower_array.slice(i+1, follower_array.length));
            return follower_array;
        }
    }
    return follower_array;
}

// console.log(removeLink(["1","2","3"], "1"))
const a = []
const b = a.find(c => c === 1)
console.log(b);