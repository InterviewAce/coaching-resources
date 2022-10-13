const levelOrder = (root) => {
    const result = [];
    
    if (!root) return result;
    
    const queue = new Queue();
    queue.enqueue({
        node: root,
        level: 0
    });
    
    while (!queue.isEmpty()) {
        const { node, level } = queue.dequeue();
        
        const levelInResult = result.length > level;
        if (!levelInResult) result.push([]);
        
        result[level].push(node.val);
        
        const children = [node.left, node.right];
        for (const child of children) {
            if (!child) continue;

            queue.enqueue({
                node: child,
                level: level + 1
            });
        }
    }
    
    return result;
};