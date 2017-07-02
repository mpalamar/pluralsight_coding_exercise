# pluralsight_coding_exersice

# To start: 

# IF CLONED FROM REPO:
# - Run 'npm install'
# - Run tests with 'npm run test'

# IF UNZIPPED:
# - Run tests with 'npm run test'
#
# - To complete this assignment, I created a data structure to maintain the order of packages dependencies, and to track for any cycle errors.
# - The data structure, orderedPackages, has similarities to a linked list. Each 'node' of the linked list has the package name, and a reference 
#	to it's dependency. Whenever a 'Package : Dependency' is to be installed, the algorithm checks if they already are in the data structure. If so,
#	the existing package's dependency reference chain is checked, and each checked reference is saved. Since packages and dependencies are 1:1, if the same name is 
# 	encountered twice, it means that a cycle has occured. Order does matter and is maintained in this list. If a package is referencing another as a dependency, it must #   occur after the referenced package in the data structure. After every package has been added, the data structure is traversed and prints out the correct #
#	installation order