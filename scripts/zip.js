const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

// 确保输出目录存在
const outputDir = path.join(__dirname, '../language_archives');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 获取上级目录下所有以 pages 开头的文件夹
const parentDir = path.join(__dirname, '..');
const entries = fs.readdirSync(parentDir, { withFileTypes: true });

entries.forEach(entry => {
    if (entry.isDirectory() && entry.name.startsWith('pages')) {
        const folderPath = path.join(parentDir, entry.name);
        const zipName = `tldr-${entry.name}.zip`;
        const output = fs.createWriteStream(path.join(outputDir, zipName));
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => {
            console.log(`✅ 压缩完成: ${zipName} (${archive.pointer()} 字节)`);
        });

        archive.on('error', (err) => { throw err; });

        archive.pipe(output);

        // 将整个文件夹内容添加到压缩包
        archive.directory(folderPath, false);

        // 可选：把 LICENSE.md 添加进去
        const licensePath = path.join(parentDir, 'LICENSE.md');
        if (fs.existsSync(licensePath)) {
            archive.file(licensePath, { name: 'LICENSE.md' });
        }

        archive.finalize();
    }
});
