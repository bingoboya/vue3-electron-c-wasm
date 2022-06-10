import { app, BrowserWindow, screen } from 'electron';
import is_dev from 'electron-is-dev';
import { join } from 'path';
// import net from 'net'; // 使用 from 方式引入 会 报错，没找到原因
// import child_process from 'child_process'; // 使用 from 方式引入 会 报错，没找到原因
const net = require('net');
const child_process = require('child_process');
// 解决“Electron Security Warning”安全警告: https://www.chfse.com/archives/2495
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
let mainWindow: BrowserWindow | null = null;

function runExec(exePath, _cmdStrServer) {
  // 使用 spawn 运行 PIPServe.exe，spawn运行的子进程会在主进程关闭时一起关闭
  child_process.spawn(exePath, [], {
    windowsHide: false, // 隐藏子进程的窗口
  });
  //// 使用 exec 运行 PIPServe.exe， exec 运行的子进程不会在主进程关闭时一起关闭
  // child_process.exec(_cmdStrServer, {});  // 服务端，需要启动
  //// child_process.exec(_cmdStrClient, {}) // 客户端，不需要启动
}

if (process.platform === 'win32') {
  // 这是windows系统, mac系统下调用不了.exe文件
  //TODO PIPServe.exe 这个文件放到public中，打包后会被打到dist中，dist文件夹中的静态资源的路径就是下面的 exePath
  const exePath = `${join(__dirname, '../PIPServe.exe')}`;
  const _cmdStrServer = `start ${exePath}`;
  runExec(exePath, _cmdStrServer); // 调用子进程
}

const connectserver = () => {
  // node通过创建命名管道与 c 或者 julia 的 .exe文件通信
  // 通信
  // 如何在node.js中创建一个命名pipe https://cloud.tencent.com/developer/ask/81308
  // nodejs执行exe程序并获取输出值 https://blog.csdn.net/chenqk_123/article/details/108801139
  // 通过 electron 启动其它exe 程序 https://juejin.cn/post/6845166890248044557
  // ./PIPServe.exe ./PIPClient.exe 这两个文件的源码 https://blog.csdn.net/forchoosen/article/details/106911135
  // https://blog.csdn.net/dingke2010/article/details/97620266
  const PIPE_NAME = 'test';
  const PIPE_PATH = '\\\\.\\Pipe\\' + PIPE_NAME;
  const l = console.log;
  const client = net.createConnection(PIPE_PATH, () => {
    l('connect to server');
    client.write('world');
    // client.end()
  });
  client.on('data', (data) => {
    l('asdasdasdasdasdas', data.toString());
    if (data.toString()) {
      client.write('world');
    }
  });
  client.on('end', () => {
    l('disconnect from server');
  });
};

class createWin {
  constructor() {
    const displayWorkAreaSize = screen.getAllDisplays()[0].workArea;
    mainWindow = new BrowserWindow({
      width: parseInt(`${displayWorkAreaSize.width * 0.85}`, 10),
      height: parseInt(`${displayWorkAreaSize.height * 0.85}`, 10),
      movable: true,
      // frame: false,
      show: false,
      center: true,
      resizable: true,
      // transparent: true,
      titleBarStyle: 'default',
      webPreferences: {
        devTools: true,
        contextIsolation: false,
        nodeIntegration: true,
        enableRemoteModule: true,
      },
      backgroundColor: '#fff',
    });
    const URL = is_dev
      ? `https://localhost:${process.env.PORT}` // vite 启动的服务器地址
      : `file://${join(__dirname, '../index.html')}`; // vite 构建后的静态文件地址

    mainWindow.loadURL(URL);
    // if (is_dev) {
    mainWindow.webContents.openDevTools();
    // }
    if (process.platform === 'win32') {
      connectserver(); // 与子进程通信
    }

    mainWindow.on('ready-to-show', () => {
      mainWindow.show();
    });
  }
}

app.whenReady().then(() => new createWin());

const isFirstInstance = app.requestSingleInstanceLock();

if (!isFirstInstance) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      mainWindow.focus();
    }
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    new createWin();
  }
});
