//package_installer.js

var packageInstaller = {
	orderedPackages: [],
	errorDetected: false,
	// This function cycle's through a package's dependency references to check if a cycle occurs. Sets a flag 
	// if an error is detected.
	checkForCycle: (dep) => {
	    if (dep) {
	        let depList = [dep];
	        //cycles through a packages dependency reference to see if a cycle occurs
	        while (dep.depRef) {
	            if (depList.find((el) => el.name === dep.depName)) {
	            	let badPacks = '';
	            	for (let node of depList) {
	            		badPacks += node.name + ', '
	            	}
	                console.log('Cycle error with dependencies: ' + badPacks);
	                packageInstaller.errorDetected = true;
	                return;
	            } else {
	                depList.push(dep.depRef);
	                dep = dep.depRef;
	            }
	        }
	    }
	},
	printDependencies: function() {
		let output = 'Installed Packages: ';
		if (!packageInstaller.errorDetected) {
			for (let pkg of packageInstaller.orderedPackages) {
			output += pkg.name + ', ';
			}
			console.log(output);
			return output;
		} else {
			return 'Error: Cycle Detected';
		}
	},
	// Receives an array of 'Package : Dependency' items. Each item is added and checked to ensure that it has a name, and no cycles
	install: function(packages) {
		if (packages.length) {
			for (let pkg of packages) {
		        let split = pkg.split(":");
		        if (split[0].length) {
	        		pkg = {name: split[0].trim(), depName: split[1].trim(), depRef: null};
	        		packageInstaller.addDependency(pkg);
		        } else {
		        	console.log("Error: No name for package");	
		        }
			}
			return packageInstaller.printDependencies();			
		}
	},
	//Receives a single package and checks if it or it's dependency already exist. The algorithm makes sure that the package's dependency
	//is added to the data structure prior to the actual package. 
	addDependency: (pkg) => {
        let pkgExists = packageInstaller.orderedPackages.find((el) => el.name === pkg.name);
        if (!pkgExists) {
            if (pkg.depName.length) {
                let depExists = packageInstaller.orderedPackages.find((el) => el.name === pkg.depName);
                if (depExists) {
                    pkg.depRef = depExists;
                    packageInstaller.checkForCycle(depExists);
                } else {
                	//No need to reorganize the array, since this dependency is added prior to the package which requires it
                    pkg.depRef = {name: pkg.depName, depName: null, depRef: null};
                    packageInstaller.orderedPackages.push(pkg.depRef);
                }
            }
            packageInstaller.orderedPackages.push(pkg);   
        } else {
        	//No need to add the package since it already exists. 
            if (pkg.depName.length) {
            	let newDep = {name: pkg.depName, depName: null, depRef: null};
                let depExists = packageInstaller.orderedPackages.find((el) => el.name === newDep.name);
                if (depExists) {
                	//must check for cycles if the dependency already exsists.
                    pkgExists.depRef = depExists;
                    packageInstaller.checkForCycle(depExists);
                } else {
                	//array order must be reorganized to insert the dependency before the package that requires it.
                    pkgExists.depRef = newDep;
                    pkgExists.depName = newDep.name;
                    let index = packageInstaller.orderedPackages.findIndex((el) => el.depName === newDep.name)
                    let temp = packageInstaller.orderedPackages.splice(0, index);
                    temp.push(newDep);
                    packageInstaller.orderedPackages = temp.concat(packageInstaller.orderedPackages);
                } 
            }
        }	
	}
};

module.exports = packageInstaller;