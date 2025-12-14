// 状态管理
let currentScene = 1; // 当前场景：1=从窑炉取出, 2=成品回到日常

// 选择映射关系：Step3中选择的选项（A/B/C 对应 3/4/5.png）→ Step5显示的杯子（3/4/5.png）
// Step3: A选择3.png, B选择4.png, C选择5.png
// Step5: 直接使用对应的3/4/5.png
const cupMap = {
    'A': '3.png', // Step3选择A（3.png）→ Step5显示3.png
    'B': '4.png', // Step3选择B（4.png）→ Step5显示4.png
    'C': '5.png'  // Step3选择C（5.png）→ Step5显示5.png
};

// DOM 元素
const scene1 = document.getElementById('scene1');
const scene2 = document.getElementById('scene2');
const cupImage2 = document.getElementById('cupImage2');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const transitionOverlay = document.getElementById('transitionOverlay');
const nextButton1 = document.getElementById('nextButton1');
const nextButton2 = document.getElementById('nextButton2');

// 初始化进度条 - Step5固定显示5/5，进度条宽度固定为100%
function initProgress() {
    progressBar.style.width = '100%';
    progressText.textContent = '器物生命 · 已开始（5/5）';
}

// 获取用户选择并显示对应的杯子（只在第二幕显示）
function loadCupImage() {
    // 从 localStorage 获取用户在 Step3 的选择
    const selectedPattern = localStorage.getItem('selectedPattern');
    
    // 如果没有选择，默认使用 A（3.png）
    const cupImage = cupMap[selectedPattern] || cupMap['A'];
    
    // 只设置第二幕的杯子图片（第一幕不需要杯子）
    cupImage2.src = cupImage;
    
    // 显示第二幕的杯子图片
    cupImage2.style.display = 'block';
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
        }
    }, 300);
}

// 场景1：点击"取出瓷器成品"按钮，切换到场景2
nextButton1.addEventListener('click', () => {
    switchScene(2);
});

// 场景2：点击"完成景德镇之旅"按钮
nextButton2.addEventListener('click', () => {
    // 淡出转场
    transitionOverlay.classList.add('fade-out');
    
    // 可以跳转到总结页或关闭引导
    // 暂时显示完成提示，可以后续添加结束页
    setTimeout(() => {
        alert('恭喜！你已经完成了景德镇制瓷之旅！\n请返回初始页面，继续填写问卷！');
        // 如果需要跳转到总结页，可以在这里添加：
        // window.location.href = '../summary/index.html';
    }, 800);
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initProgress();
    loadCupImage();
    
    // 默认显示场景1
    scene1.classList.add('active');
});

