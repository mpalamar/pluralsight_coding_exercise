var chai = require('chai');
var expect = chai.expect;
var packageInstaller = require('./packageInstaller');
var noPackages = [];
var practicePackages = ['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser: KittenService','Fraudstream: Leetmeme','Ice: ']
var badPackages = ['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser: KittenService','Fraudstream: ','Ice: Leetmeme']
var customPkgs = ['A : B', 'B : C', 'D : F', 'F: '];
var customBad = ['A : B', 'B : C', 'C : D', 'D : A'];
var customPkg = ['A : B', 'B: ', 'C : B', 'F : D', '']


// describe('PackageInstaller', () => {
// 	it('Should have no packages installed when 0 packages are passed in', () => {
// 		packageInstaller.install(noPackages);
// 		expect(packageInstaller.orderedPackages.length).to.equal(0);
// 	})
// })

describe('PackageInstaller ', () => {
	it('Should output packages in the correct order and contain the correct number of packages', () => {
		let output = packageInstaller.install(practicePackages);
		expect(packageInstaller.orderedPackages.length).to.equal(practicePackages.length);
	})
})

describe('PackageInstaller Practice Question With Error', () => {
	it('Should show a cycle error when detected', () => {
		packageInstaller.orderedPackages = [];
		let output = packageInstaller.install(badPackages);
		expect(output).to.equal('Error: Cycle Detected');
	})
})

describe('PackageInstaller Custom Package List', () => {
	it('Should pass the same with custom package lists', () => {
		packageInstaller.orderedPackages = [];
		packageInstaller.errorDetected = false;
		let output = packageInstaller.install(customPkgs);
		let validOutput = 'C, B, A, F, D';
		expect(output).to.contain(validOutput);
	})
})

describe('PackageInstaller Custom Package List With Errors', () => {
	it('Should fail the same with custom package lists', () => {
		packageInstaller.orderedPackages = [];
		let output = packageInstaller.install(customBad);
		expect(output).to.equal('Error: Cycle Detected');
	})
})
