// 状态管理
let currentScene = 1; // 当前场景：1=添柴升温, 2=入窑烧制
let currentTemperature = 900; // 当前温度，初始900℃
const targetTemperature = 1300; // 目标温度1300℃
const temperatureStep = 100; // 每丢一捆柴火增加的温度
const maxTemperature = 1500; // 最高温度

// DOM 元素
const scene1 = document.getElementById('scene1');
const scene2 = document.getElementById('scene2');
const temperatureValue = document.getElementById('temperatureValue');
const temperatureValue2 = document.getElementById('temperatureValue2');
const fireButton = document.getElementById('fireButton');
const completeButton = document.getElementById('completeButton');
const firewoodContainer = document.getElementById('firewoodContainer');
const kilnDropZone = document.getElementById('kilnDropZone');
const firingProgressBar = document.getElementById('firingProgressBar');
const firingProgressContainer = document.getElementById('firingProgressContainer');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const transitionOverlay = document.getElementById('transitionOverlay');

// 所有柴火元素
const firewoodItems = document.querySelectorAll('.firewood-item');

// 初始化进度条 - Step4固定显示4/5，进度条宽度固定为80%
function initProgress() {
    progressBar.style.width = '80%';
    progressText.textContent = '器物生命 · 已开始（4/5）';
}

// 更新温度显示
function updateTemperature() {
    temperatureValue.textContent = currentTemperature;
    temperatureValue2.textContent = currentTemperature;
    
    // 温度数字跳动动画
    temperatureValue.style.animation = 'none';
    setTimeout(() => {
        temperatureValue.style.animation = 'temperaturePulse 0.5s ease-in-out';
    }, 10);
}

// 检查是否可以点火
function checkCanFire() {
    if (currentTemperature >= targetTemperature) {
        fireButton.style.display = 'block';
        fireButton.disabled = false;
    } else {
        fireButton.style.display = 'none';
    }
}

// 处理柴火被拖入窑口
function handleFirewoodDrop(firewoodElement) {
    // 增加温度
    currentTemperature = Math.min(currentTemperature + temperatureStep, maxTemperature);
    
    // 更新温度显示
    updateTemperature();
    
    // 隐藏已使用的柴火
    firewoodElement.classList.add('used');
    firewoodElement.draggable = false;
    
    // 检查是否可以点火
    checkCanFire();
    
    // 如果温度超过1300℃，显示提示（可选）
    if (currentTemperature > targetTemperature) {
        // 可以在这里添加提示："再高，也许会有点风险"
    }
}

// 设置拖拽功能
function setupDragAndDrop() {
    firewoodItems.forEach(item => {
        // 拖拽开始
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', item.id);
            item.classList.add('dragging');
        });
        
        // 拖拽结束
        item.addEventListener('dragend', (e) => {
            item.classList.remove('dragging');
        });
    });
    
    // 拖拽进入窑口区域
    kilnDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        kilnDropZone.classList.add('drag-over');
    });
    
    // 拖拽离开窑口区域
    kilnDropZone.addEventListener('dragleave', (e) => {
        kilnDropZone.classList.remove('drag-over');
    });
    
    // 在窑口区域放下
    kilnDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        kilnDropZone.classList.remove('drag-over');
        
        const firewoodId = e.dataTransfer.getData('text/html');
        const firewoodElement = document.getElementById(firewoodId);
        
        if (firewoodElement && !firewoodElement.classList.contains('used')) {
            handleFirewoodDrop(firewoodElement);
        }
    });
}

// 切换到指定场景
function switchScene(targetScene) {
    // 隐藏所有场景
    scene1.classList.remove('active');
    scene2.classList.remove('active');
    
    // 显示目标场景
    setTimeout(() => {
        if (targetScene === 1) {
            scene1.classList.add('active');
            currentScene = 1;
        } else if (targetScene === 2) {
            scene2.classList.add('active');
            currentScene = 2;
            // 启动烧制进度条
            startFiringProgress();
        }
    }, 300);
}

// 启动烧制进度条动画
function startFiringProgress() {
    const progressDuration = 3000; // 3秒
    const startTime = Date.now();
    
    function updateProgress() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / progressDuration) * 100, 100);
        
        firingProgressBar.style.width = progress + '%';
        
        if (progress < 100) {
            requestAnimationFrame(updateProgress);
        } else {
            // 进度条完成
            onFiringComplete();
        }
    }
    
    updateProgress();
}

// 烧制完成
function onFiringComplete() {
    // 更新进度条标签
    const label = firingProgressContainer.querySelector('.firing-progress-label');
    if (label) {
        label.textContent = '烧制完成';
    }
    
    // 显示完成按钮
    completeButton.style.display = 'block';
    completeButton.disabled = false;
}

// 场景1：点击"点火，开始烧制"按钮
fireButton.addEventListener('click', () => {
    if (currentTemperature >= targetTemperature) {
        switchScene(2);
    }
});

// 场景2：点击"查看烧成的杯子"按钮
completeButton.addEventListener('click', () => {
    // 淡出转场
    transitionOverlay.classList.add('fade-out');
    
    // 延迟跳转（等待淡出动画完成）
    setTimeout(() => {
        // 跳转到 Step5（如果存在）
        window.location.href = '../step5/index.html';
    }, 800);
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initProgress();
    updateTemperature();
    checkCanFire();
    setupDragAndDrop();
    // 默认显示场景1
    scene1.classList.add('active');
});

