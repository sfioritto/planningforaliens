import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';


function createFolderAndFile(title) {
    // Convert title to folder name
    const folderName = title.toLowerCase().replace(/ /g, '-');

    // Create the Ideas folder inside the src directory if it doesn't exist
    const ideasFolder = path.join(process.cwd(), 'src', 'routes', 'Ideas');
    if (!fs.existsSync(ideasFolder)) {
        fs.mkdirSync(ideasFolder, { recursive: true });
    }

    // Create the specific folder inside the Ideas folder
    const targetFolder = path.join(ideasFolder, folderName);
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
    }

    // Create the index.mdx file with the title as an h1 tag
    const filePath = path.join(targetFolder, 'index.mdx');
    fs.writeFileSync(filePath, `# ${title}\n`);

    exec(`code ${filePath}`, (err) => {
        if (err) {
            console.error('Failed to open file in VS Code:', err);
        }
    });
}

const args = process.argv.slice(2);
if (args.length !== 1) {
    console.log("Usage: npm run new-idea -- 'Title of the Document'");
} else {
    const title = args[0];
    createFolderAndFile(title);
}