// 状态管理
let currentScene = 1; // 当前场景：1=故事引入, 2=三选一, 3=展示成品
let selectedPattern = null; // 选中的图案：'A' | 'B' | 'C' 或 'mountain' | 'flower' | 'text'

// 图案映射关系：A(3.png) -> 6.png, B(4.png) -> 7.png, C(5.png) -> 8.png
const patternMap = {
    'A': {
        image: '6.png',
        name: 'mountain',
        text: '你为这只杯子选了景德镇的山水。\n山在杯上，路在杯外。\n它会陪你走很远的路，也会提醒你，\n不管走多远，景德镇这座窑火小城，总有一处等你再来。'
    },
    'B': {
        image: '7.png',
        name: 'flower',
        text: '你为这只杯子选了景德镇的花鸟。\n一枝花，一只鸟，都是这座窑火小城日常里的小吉祥。\n它不声张，却在每一次举杯时，\n悄悄把旅途带回来的「顺利」和「平安」递给你。'
    },
    'C': {
        image: '8.png',
        name: 'text',
        text: '你为这只杯子选了文字。\n这些字别人可能一眼就忘了，\n但你知道，这述说了在景德镇的一段私人记忆。\n以后每一次用它，都是在悄悄回味这趟旅程。'
    }
};

// DOM 元素
const scene1 = document.getElementById('scene1');
const scene2 = document.getElementById('scene2');
const scene3 = document.getElementById('scene3');
const nextButton1 = document.getElementById('nextButton1');
const nextButton3 = document.getElementById('nextButton3');
const optionA = document.getElementById('optionA');
const optionB = document.getElementById('optionB');
const optionC = document.getElementById('optionC');
const selectionFeedback = document.getElementById('selectionFeedback');
const productImage = document.getElementById('productImage');
const narrative3 = document.getElementById('narrative3');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const transitionOverlay = document.getElementById('transitionOverlay');

// 切换到指定场景
function switchScene(targetScene) {
    // 隐藏所有场景
    scene1.classList.remove('active');
    scene2.classList.remove('active');
    scene3.classList.remove('active');

    // 显示目标场景
    setTimeout(() => {
        if (targetScene === 1) {
            scene1.classList.add('active');
            currentScene = 1;
        } else if (targetScene === 2) {
            scene2.classList.add('active');
            currentScene = 2;
        } else if (targetScene === 3) {
            scene3.classList.add('active');
            currentScene = 3;
            // 根据选择显示对应的成品图和文案
            if (selectedPattern && patternMap[selectedPattern]) {
                productImage.src = patternMap[selectedPattern].image;
                productImage.style.display = 'block';
                
                // 显示对应的文案
                const textLines = patternMap[selectedPattern].text.split('\n');
                narrative3.innerHTML = '';
                textLines.forEach((line, index) => {
                    const p = document.createElement('p');
                    p.textContent = line;
                    p.style.opacity = '0';
                    p.style.animation = 'fadeIn 0.8s ease-in ' + (index * 0.2) + 's forwards';
                    narrative3.appendChild(p);
                });
            }
        }
    }, 300);
}

// 处理选项点击
function handleOptionClick(option) {
    // 移除所有选中状态
    optionA.classList.remove('selected');
    optionB.classList.remove('selected');
    optionC.classList.remove('selected');

    // 设置当前选中
    selectedPattern = option;
    const selectedCard = document.getElementById(`option${option}`);
    selectedCard.classList.add('selected');

    // 显示选择反馈
    showSelectionFeedback();

    // 延迟1.5秒后自动切换到场景3
    setTimeout(() => {
        switchScene(3);
    }, 1500);
}

// 显示选择反馈提示
function showSelectionFeedback() {
    selectionFeedback.classList.add('show');
    
    // 1.5秒后自动淡出
    setTimeout(() => {
        selectionFeedback.classList.remove('show');
    }, 2000);
}

// 场景1：点击 NEXT 按钮，切换到场景2
nextButton1.addEventListener('click', () => {
    switchScene(2);
});

// 场景2：选项点击事件
optionA.addEventListener('click', () => {
    handleOptionClick('A');
});

optionB.addEventListener('click', () => {
    handleOptionClick('B');
});

optionC.addEventListener('click', () => {
    handleOptionClick('C');
});

// 场景3：点击"入窑"按钮，跳转到 Step4
nextButton3.addEventListener('click', () => {
    // 保存用户选择到 localStorage
    if (selectedPattern) {
        localStorage.setItem('selectedPattern', selectedPattern);
    }
    
    // 淡出转场
    transitionOverlay.classList.add('fade-out');
    
    // 延迟跳转（等待淡出动画完成）
    setTimeout(() => {
        // 跳转到 Step4（如果存在）
        window.location.href = '../step4/index.html';
    }, 800);
});

// 初始化进度条 - Step3固定显示3/5，进度条宽度固定为60%
function initProgress() {
    progressBar.style.width = '60%';
    progressText.textContent = '器物生命 · 旅程已开始（3/5）';
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initProgress();
    // 默认显示场景1
    scene1.classList.add('active');
});

