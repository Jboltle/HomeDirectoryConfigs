/*
 * @lc app=leetcode id=13 lang=javascript
 *
 * [13] Roman to Integer
 */

// @lc code=start

// first start giving each character a value

// I = 1
// V = 5 
// L = 50
// X = 10 
// D = 50
// C = 100
// M = 1000

// make a hashmap of all the keys and values 

// split the string into an array and compare each item in array to hashmap 



/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    let map = new Map([
['I',1],['V',5],['X',10],["L",50],["C",100],["D",500],["M",1000]
    ])

 s = s.split('')
let arr = []
let sum = 0

for (let i of s) {
arr.push(map.get(i))
}
for (let i = 0; i < arr.length; i++) {    
if (arr[i] < arr[i+1])
    
    {
         arr[i] = arr[i+1] - arr[i]
         arr.splice(i+1,1)

    }
    sum += arr[i]



}
return sum




}





console.log(romanToInt(""))
// @lc code=end