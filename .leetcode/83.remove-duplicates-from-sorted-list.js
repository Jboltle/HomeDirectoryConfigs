/*
 * @lc app=leetcode id=83 lang=javascript
 *
 * [83] Remove Duplicates from Sorted List
 *
 * https://leetcode.com/problems/remove-duplicates-from-sorted-list/description/
 *
 * algorithms
 * Easy (53.26%)
 * Likes:    8765
 * Dislikes: 311
 * Total Accepted:    1.6M
 * Total Submissions: 3.1M
 * Testcase Example:  '[1,1,2]'
 *
 * Given the head of a sorted linked list, delete all duplicates such that each
 * element appears only once. Return the linked list sorted as well.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: head = [1,1,2]
 * Output: [1,2]
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: head = [1,1,2,3,3]
 * Output: [1,2,3]
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * The number of nodes in the list is in the range [0, 300].
 * -100 <= Node.val <= 100
 * The list is guaranteed to be sorted in ascending order.
 * 
 * 
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */




var deleteDuplicates = function(head) {
    


    let output = []
    for (let i = 0; i <= head.length; i++)
{
if (head[i] !== head[i + 1])
{
    output.push(...head.slice(i, i+1))



}


}

return head





};


// @lc code=end


