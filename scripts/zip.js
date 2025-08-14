const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, '../tldr.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
    console.log(`✅ 打包完成: ${archive.pointer()} 字节`);
});

archive.on('error', (err) => { throw err; });

archive.pipe(output);

// 添加 index.json
archive.file(path.join(__dirname, '../index.json'), { name: 'index.json' });

// 添加 LICENSE.md（如果存在）
const licensePath = path.join(__dirname, '../LICENSE.md');
if (fs.existsSync(licensePath)) {
    archive.file(licensePath, { name: 'LICENSE.md' });
    console.log('📄 添加 LICENSE.md');
}

// 获取上级目录下所有以 pages 开头的文件夹
const parentDir = path.join(__dirname, '..');
const entries = fs.readdirSync(parentDir, { withFileTypes: true });

entries.forEach(entry => {
    if (entry.isDirectory() && entry.name.startsWith('pages')) {
        const folderPath = path.join(parentDir, entry.name);
        archive.directory(folderPath, entry.name);
        console.log(`📦 添加文件夹: ${entry.name}`);
    }
});

archive.finalize();
