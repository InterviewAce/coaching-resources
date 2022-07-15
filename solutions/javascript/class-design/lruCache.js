const NOT_FOUND = -1;

class Node {
    constructor(key, val) {
        this.key = key;
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class LinkedList {
    constructor(head = null, tail = null) {
        this.head = head;
        this.tail = tail;
    }

    insertAtFront(newHead) {
        newHead.next = this.head;

        if (this.head) this.head.prev = newHead;

        newHead.prev = null;

        this.head = newHead;

        if (this.tail === null) this.tail = this.head;
    }

    delete(node) {
        const prevNode = node.prev;
        const nextNode = node.next;

        if (prevNode) prevNode.next = nextNode;
        if (nextNode) nextNode.prev = prevNode;

        if (this.head === node) this.head = nextNode;
        if (this.tail === node) this.tail = prevNode;
    }

    moveToFront(node) {
        const isAtFront = node.prev === null;

        if (isAtFront) return;

        this.delete(node);
        this.insertAtFront(node);
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = {};
        this.size = 0;
        this.recentlyUsedKeys = new LinkedList(); // Most recently used is at the head and least recently used is at the tail
    }

    get(key) {
        const keyInCache = this.cache.hasOwnProperty(key);

        if (!keyInCache) return NOT_FOUND;

        const node = this.cache[key];

        this.recentlyUsedKeys.moveToFront(node);

        return node.val;
    }

    deleteLeastRecentlyUsed() {
        const leastRecentlyUsedNode = this.recentlyUsedKeys.tail;

        this.recentlyUsedKeys.delete(leastRecentlyUsedNode);

        const { key } = leastRecentlyUsedNode;

        delete this.cache[key];
        this.size--;
    }

    put(key, value) {
        const newNode = new Node(key, value);
        const keyInCache = this.cache.hasOwnProperty(key);

        if (keyInCache) {
            const oldNode = this.cache[key];

            this.recentlyUsedKeys.delete(oldNode);
        } else {
            /*
             */
            if (this.size === this.capacity) {
                this.deleteLeastRecentlyUsed();
            }

            this.size++;
        }

        this.cache[key] = newNode;

        this.recentlyUsedKeys.insertAtFront(newNode);
    }
}
