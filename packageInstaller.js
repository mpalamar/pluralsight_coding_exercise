//package_installer.js

var packageInstaller = {
	orderedPackages: [],
	errorDetected: false,
	// This function cycle's through a packages dependency reference
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
	addDependency: (pkg) => {
        let pkgExists = packageInstaller.orderedPackages.find((el) => el.name === pkg.name);
        if (!pkgExists) {
            if (pkg.depName.length) {
                let depExists = packageInstaller.orderedPackages.find((el) => el.name === pkg.depName);
                if (depExists) {
                    pkg.depRef = depExists;
                    packageInstaller.checkForCycle(depExists);
                } else {
                    pkg.depRef = {name: pkg.depName, depName: null, depRef: null};
                    packageInstaller.orderedPackages.push(pkg.depRef);
                }
            }
            packageInstaller.orderedPackages.push(pkg);   
        } else {
            if (pkg.depName.length) {
            	let newDep = {name: pkg.depName, depName: null, depRef: null};
                let depExists = packageInstaller.orderedPackages.find((el) => el.name === newDep.name);
                if (depExists) {
                    pkgExists.depRef = depExists;
                    packageInstaller.checkForCycle(depExists);
                } else {
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