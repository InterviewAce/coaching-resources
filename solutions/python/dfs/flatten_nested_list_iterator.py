class NestedIterator:
    def __init__(self, nestedList):
        """
        Initialize your data structure here.
        :type nestedList: List[NestedInteger]
        """
        self.flattenedList = self.flattenList(nestedList)
        self.nextPosition = 0

    def flattenList(self, nestedList):
        flattenedList = []

        for nestedInteger in nestedList:
            if nestedInteger.isInteger():
                integer = nestedInteger.getInteger()
                flattenedList.append(integer)
            else:
                nestedIntegerList = nestedInteger.getList()
                flattenedNestedIntegerList = self.flattenList(nestedIntegerList)

                for integer in flattenedNestedIntegerList:
                    flattenedList.append(integer)

        return flattenedList

    def next(self):
        """
        :rtype: int
        """
        integerToReturn = self.flattenedList[self.nextPosition]
        self.nextPosition += 1

        return integerToReturn

    def hasNext(self):
        """
        :rtype: bool
        """
        return self.nextPosition < len(self.flattenedList)