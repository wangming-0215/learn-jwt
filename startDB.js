const { spawn } = require('child_process');
const path = require('path');

const mongodbPath = 'D:/Program Files/MongoDB';

const mongodb = spawn(
	path.resolve(mongodbPath, 'Server', '4.0', 'bin', 'mongod.exe'),
	['-dbpath', path.resolve(mongodbPath, 'data')]
);

mongodb.stdout.on('data', data => console.log(data.toString()));
