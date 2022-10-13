
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        result = []
        
        if not root:
            return result
        
        queue = deque()
        queue.append((root, 0))
        
        while queue:
            node, level = queue.popleft()
            
            level_in_result = len(result) > level
            if not level_in_result:
                result.append([])
            
            result[level].append(node.val)
            
            children = [node.left, node.right]
            for child in children:
                if not child:
                    continue
                
                queue.append((child, level + 1))
        
        return result