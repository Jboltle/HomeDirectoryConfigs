/*
 * @lc app=leetcode id=9 lang=javascript
 *
 * [9] Palindrome Number
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = (x) => {
    const y = x.toString().split('').join('')
    const reverse = x.toString().split('').reverse().join('')
    const val = reverse == y ? true : false
    return val
    }
    
// @lc code=end

