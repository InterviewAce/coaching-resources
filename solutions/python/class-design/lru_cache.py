NOT_FOUND = -1

class Node:
    def __init__(self, key, val):
        self.key = key
        self.val = val
        self.next = None
        self.prev = None

class LinkedList:
    def __init__(self, head = None, tail = None):
        self.head = head
        self.tail = tail

    def insert_at_front(self, new_head):
        new_head.next = self.head

        if self.head:
            self.head.prev = new_head

        new_head.prev = None

        self.head = new_head

        if self.tail is None:
            self.tail = self.head

    def delete(self, node):
        prev_node = node.prev
        next_node = node.next

        if prev_node:
            prev_node.next = next_node
        if next_node:
            next_node.prev = prev_node

        if self.head is node:
            self.head = next_node
        if self.tail is node:
            self.tail = prev_node

    def move_to_front(self, node):
        is_at_front = node.prev is None

        if is_at_front:
            return

        self.delete(node)
        self.insert_at_front(node)

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}
        self.size = 0
        self.recently_used_keys = LinkedList() # Most recently used is at the head and least recently used is at the tail

    def get(self, key):
        if key not in self.cache:
            return NOT_FOUND

        node = self.cache[key]

        self.recently_used_keys.move_to_front(node)

        return node.val

    def deleteLeastRecentlyUsed(self):
        least_recently_used_node = self.recently_used_keys.tail

        self.recently_used_keys.delete(least_recently_used_node)

        key = least_recently_used_node.key

        del self.cache[key]
        self.size -= 1

    def put(self, key, value):
        new_node = Node(key, value)

        if key in self.cache:
            oldNode = self.cache[key]

            self.recently_used_keys.delete(oldNode)
        else:
            # If the cache is full, delete the least recently used key
            if self.size == self.capacity:
                self.deleteLeastRecentlyUsed()

            self.size += 1

        self.cache[key] = new_node

        self.recently_used_keys.insert_at_front(new_node)