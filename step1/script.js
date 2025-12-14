// DOM 元素
const hands = document.getElementById('hands');
const actionButton = document.getElementById('actionButton');
const hintText = document.getElementById('hintText');
const progressBar = document.getElementById('progressBar');
const transitionOverlay = document.getElementById('transitionOverlay');

// 处理点击事件
function handleClick() {
    // 如果按钮已经是NEXT，则跳转（带淡出效果）
    if (actionButton.textContent === '下一步') {
        // 触发淡出效果
        transitionOverlay.classList.add('fade-out');
        
        // 延迟跳转，等待淡出动画完成
        setTimeout(() => {
            window.location.href = '../step2/index.html';
        }, 800);
        return;
    }
    
    // 隐藏提示文字
    hintText.style.opacity = '0';
    
    // 显示手部（淡入）
    hands.classList.add('showing');
    
    // 更新进度条到20%
    progressBar.style.width = '20%';
    
    // 延迟后开始淡出手部（很慢的淡出）
    setTimeout(() => {
        hands.classList.remove('showing');
        hands.classList.add('fading-out');
    }, 1500); // 先显示1.5秒
    
    // 延迟后按钮变为NEXT（手部淡出完成后）
    setTimeout(() => {
        actionButton.textContent = '下一步';
    }, 3500); // 1.5秒显示 + 2秒淡出
}

// 绑定点击事件
actionButton.addEventListener('click', handleClick);

