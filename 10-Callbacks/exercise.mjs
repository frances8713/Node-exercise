import { writeFile } from 'node:fs';

writeFile('10-Callbacks/textMessage.txt', "Hello!", (error) => {
    if (error)
    throw error;
    console.log('The file has been saved!');
  });
