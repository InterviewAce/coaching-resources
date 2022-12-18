"""
Java:
class Node {
    String value;
    Node next;
    Integer hashValue; // Hashes (own value + the hashValue of the next Node)
    public Node(String value) {
        this.value = value;
    }
}

class SecuredLinkedList {
    private Node head;
    public SecuredChain() {
        head = null;
    }
    /**
     * Always add to the head of the chain
     **/
    public void addValue(String value) {
        Node node = new Node(value);
        if (head == null) {
            node.next = null;
            node.hashCode = SHA512(node.value);
        } else {
            node.next = head;
            node.hashCode = SHA512(node.value + head.hashCode.toString());
        }
        head = node;
    }
    /**
     * Get value of the nth node. The head is the 0th node
     **/
    public String getValue(int n) {
        if (head == null) {
            return null;
        }
        int i = 0;
        Node node = head;
        while(node.next != null && i < n) {
            node = node.next;
            i++;
        }
        if (i == n && node != null) {
            return node.value;
        }
        return null;
    }
    /**
     * Returns true if the whole chain is valid, false if not.
     * "Valid" means for every node, the hashValue is in compliance
     * with the hash function.
     **/
    public boolean isValidChain() {
        // This implementation does not contain cycle check
        Node node = head;
        while(node != null) {
            // Hashes (own value + the hashCode of the next Node)
            if (node.next != null) {
                Integer currentHashCode = node.hashCode;
                Integer compareTo = SHA512(node.value + node.next.hashCode.toString()
                if (!currentHashCode.equals(compareTo)) {
                    return false;
                }
            } else {
                Integer currentHashCode = node.hashCode;
                Integer compareTo = SHA512(node.value);
                if (!currentHashCode.equals(compareTo)) {
                    return false;
                }
            }
            node = node.next;
        }
        return true;
    }
    private Integer SHA512(String s) {
        // The candidate is free to define their own hash function or just use
        // sudo code here.
        return s.hashCode();
    }
}
"""

"""
Python:
"""


class Node:
    def __init__(self, value):
        self.value = value
        self.next = None
        self.hash_value = None

    def __str__(self):
        return self.value


class SecuredLinkedList:
    def __init__(self):
        self.head = None

    def add_value(self, value):
        node = Node(value)
        if self.head is None:
            node.next = None
            node.hash_value = self.sha512(node.value)
        else:
            node.next = self.head
            node.hash_value = self.sha512(node.value + self.head.hash_value)
        self.head = node

    def get_value(self, n):
        if self.head is None:
            return None
        i = 0
        node = self.head
        while node.next is not None and i < n:
            node = node.next
            i += 1
        if i == n and node is not None:
            return node.value
        return None

    def is_valid_chain(self):
        node = self.head
        while node is not None:
            if node.next is not None:
                current_hash_value = node.hash_value
                compare_to = self.sha512(node.value + node.next.hash_value)
                if current_hash_value != compare_to:
                    return False
            else:
                current_hash_value = node.hash_value
                compare_to = self.sha512(node.value)
                if current_hash_value != compare_to:
                    return False
            node = node.next
        return True

    def sha512(self, s):
        return hash(s)


if __name__ == '__main__':
    sll = SecuredLinkedList()
    sll.add_value('a')
    sll.add_value('b')
    sll.add_value('c')
    print(sll.get_value(0))
    print(sll.get_value(1))
    print(sll.get_value(2))
    print(sll.is_valid_chain())

    sll.add_value('d')
    print(sll.get_value(0))
    print(sll.get_value(1))
    print(sll.get_value(2))
    print(sll.get_value(3))
    print(sll.is_valid_chain())

    sll.head.next.next.value = 'd'
    print(sll.is_valid_chain())

    sll.head.next.next.value = 'c'
    print(sll.is_valid_chain())

    sll.head.next.next.next = sll.head
    print(sll.is_valid_chain())

    sll.head.next.next.next = None
    print(sll.is_valid_chain())

    sll.head.next.next.hash_value = 123
    print(sll.is_valid_chain())

    sll.head.next.next.hash_value = sll.sha512('c')
    print(sll.is_valid_chain())

    sll.head.next.next.hash_value = sll.sha512('c' + sll.head.hash_value)
    print(sll.is_valid_chain())

    sll.head.next.next.hash_value = sll.sha512('c' + sll.head.next.hash_value)
    print(sll.is_valid_chain())

    sll.head.next.next.hash_value = sll.sha512(
        'c' + sll.head.next.next.hash_value)
    print(sll.is_valid_chain())

    sll.head.next.next.hash_value = sll.sha512(
        'c' + sll.head.next.next.next.hash_value)
    print(sll.is_valid_chain())

    sll.head.next.next.hash_value = sll.sha512('c' + sll.head

# write a python function to get the largest value in a lilst of numbers
