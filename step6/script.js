// ========== 全局状态和切换函数 ==========
let currentStep = 1;
const totalSteps = 5;

function showStep(step) {
    for (let i = 1; i <= totalSteps; i++) {
        const section = document.getElementById(`step${i}`);
        if (!section) continue;
        
        if (i === step) {
            section.classList.add('active');
            section.style.display = 'block';
        } else {
            section.classList.remove('active');
            section.style.display = 'none';
        }
    }
    currentStep = step;
}

function goToStep(step) {
    if (step < 1 || step > totalSteps) return;
    
    // 先隐藏当前 step
    showStep(step);
    
    // 重置转场遮罩
    const transitionOverlay = document.getElementById('globalTransitionOverlay');
    if (transitionOverlay) {
        transitionOverlay.classList.remove('fade-out');
    }
    
    // 根据 step 调用对应的初始化或继续播放逻辑
    if (step === 1) initStep1();
    if (step === 2) initStep2();
    if (step === 3) initStep3();
    if (step === 4) initStep4();
    if (step === 5) initStep5();
}

// ========== Step 1 初始化函数 ==========
function initStep1() {
    const stepRoot = document.getElementById('step1');
    if (!stepRoot) return;
    
    const hands = stepRoot.querySelector('#hands1');
    const transitionOverlay = document.getElementById('globalTransitionOverlay');
    
    if (!hands || !transitionOverlay) return;
    
    // 重置状态
    hands.classList.remove('showing', 'fading-out');
    hands.style.opacity = '0';
    
    // 自动播放动画
    // 延迟后显示手部（淡入）
    setTimeout(() => {
        hands.classList.add('showing');
    }, 1000); // 1秒后开始显示手部
    
    // 延迟后开始淡出手部（很慢的淡出）
    setTimeout(() => {
        hands.classList.remove('showing');
        hands.classList.add('fading-out');
    }, 2500); // 1秒延迟 + 1.5秒显示
    
    // 延迟后跳转到下一步（手部淡出完成后）
    setTimeout(() => {
        // 触发淡出效果
        transitionOverlay.classList.add('fade-out');
        
        // 延迟跳转，等待淡出动画完成
        setTimeout(() => {
            goToStep(2);
        }, 800);
    }, 5500); // 1秒延迟 + 1.5秒显示 + 2秒淡出 + 1秒缓冲
}

// ========== Step 2 初始化函数 ==========
function initStep2() {
    const stepRoot = document.getElementById('step2');
    if (!stepRoot) return;
    
    // 状态管理
    let currentFrame = 0; // 当前泥坯帧索引 0-4
    const frameDuration = 2000; // 每帧停留时间（毫秒）
    const finalPauseDuration = 2500; // 第5帧后额外停留时间（毫秒）

    // DOM 元素
    const clayFrames = stepRoot.querySelectorAll('.clay-frame');
    const potteryWheel = stepRoot.querySelector('#potteryWheel');
    const hands = stepRoot.querySelector('#hands2');
    const narrative = stepRoot.querySelector('#narrative2');
    const transitionOverlay = document.getElementById('globalTransitionOverlay');

    if (!clayFrames.length || !potteryWheel || !hands || !narrative || !transitionOverlay) return;

    // 叙事文本内容
    const narratives = [
        "拉坯最考验的是手感和心气。",
        "每一次旋转，都在塑造它的未来。",
        "景德镇的杯子，要轻、要薄，还要能撑住上千度的窑火。",
        "这一只杯子，在你的手里完成了它的第一个生命阶段。",
        "从泥土到器物，每一步都是匠心的见证。"
    ];
    
    // 引导语
    const introText = "现在，让我们开始拉坯。";

    // 更新泥坯帧 - 只显示当前帧，其余隐藏
    function updateClayFrame() {
        clayFrames.forEach((frame, index) => {
            if (index === currentFrame) {
                frame.classList.add('active');
            } else {
                frame.classList.remove('active');
            }
        });
    }

    // 更新叙事文本 - 每次只显示当前段
    function updateNarrative() {
        // 清空现有内容
        narrative.innerHTML = '';
        
        // 只显示当前帧对应的段落
        if (currentFrame < narratives.length && narratives[currentFrame]) {
            const p = document.createElement('p');
            p.textContent = narratives[currentFrame];
            p.style.animation = 'fadeIn 0.5s ease-in';
            narrative.appendChild(p);
        }
    }
    
    // 显示引导语 - 初始化时调用
    function showIntroText() {
        narrative.innerHTML = '';
        const p = document.createElement('p');
        p.textContent = introText;
        p.style.animation = 'fadeIn 0.5s ease-in';
        narrative.appendChild(p);
    }

    // 开始底座旋转模糊效果
    function startWheelRotation() {
        potteryWheel.classList.add('rotating');
    }

    // 停止底座旋转模糊效果
    function stopWheelRotation() {
        potteryWheel.classList.remove('rotating');
    }

    // 开始手部晃动
    function startHandShake() {
        hands.classList.add('shaking');
    }

    // 停止手部晃动
    function stopHandShake() {
        hands.classList.remove('shaking');
    }

    // 淡出转场并跳转
    function fadeOutAndRedirect() {
        transitionOverlay.classList.add('fade-out');
        setTimeout(() => {
            goToStep(3);
        }, 800);
    }

    // 自动播放逻辑
    function startAutoPlay() {
        // 开始底座旋转和手部晃动
        startWheelRotation();
        startHandShake();
        
        // 显示引导语后，延迟开始播放第一帧
        setTimeout(() => {
            // 切换到第1帧（索引0）
            currentFrame = 0;
            updateClayFrame();
            updateNarrative();
            
            // 继续播放后续帧（第2-5帧）
            for (let i = 1; i < 5; i++) {
                setTimeout(() => {
                    currentFrame = i;
                    updateClayFrame();
                    updateNarrative();
                    
                    // 如果是最后一帧（第5帧），额外停留后停止动画并跳转
                    if (i === 4) {
                        setTimeout(() => {
                            stopWheelRotation();
                            stopHandShake();
                            fadeOutAndRedirect();
                        }, finalPauseDuration);
                    }
                }, frameDuration * (i + 1)); // 第1帧已经显示，所以从 i+1 开始计算
            }
        }, frameDuration); // 引导语显示时间
    }

    // 初始化
    updateClayFrame();
    // 初始显示引导语"现在，让我们开始拉坯。"
    showIntroText();
    // 页面加载完成后自动开始播放
    startAutoPlay();
}

// ========== Step 3 初始化函数 ==========
function initStep3() {
    const stepRoot = document.getElementById('step3');
    if (!stepRoot) return;
    
    // 状态管理
    let currentScene = 1; // 当前场景：1=故事引入, 2=三选一, 3=展示成品
    let selectedPattern = null; // 选中的图案：'A' | 'B' | 'C' 或 'mountain' | 'flower' | 'text'
    
    // 图案映射关系：A(3.png) -> 6.png, B(4.png) -> 7.png, C(5.png) -> 8.png
    const patternMap = {
        'A': {
            image: '../step3/6.png',
            name: 'mountain',
            text: '这只杯子刻画了山水。\n山在杯上，路在杯外。\n它会陪你走很远的路，也会提醒你，\n不管走多远，总有一处可以回去的地方。'
        },
        'B': {
            image: '../step3/7.png',
            name: 'flower',
            text: '如果换成另一种故事呢？\n这只杯子描出了花鸟。\n一枝花，一只鸟，都是日常里的小吉祥。\n它不声张，却在每一次举杯的时候，\n悄悄把「顺利」和「平安」送给你。'
        },
        'C': {
            image: '../step3/8.png',
            name: 'text',
            text: '如果你想留下一句给自己看的话呢？\n这些字可能别人一眼就忘了，\n但你记得它说的是什么。\n以后每一次用它，就像在对自己小声复述一遍那句心里的话。'
        }
    };

    // DOM 元素
    const scene1 = stepRoot.querySelector('#scene3-1');
    const scene2 = stepRoot.querySelector('#scene3-2');
    const scene3 = stepRoot.querySelector('#scene3-3');
    const productImage = stepRoot.querySelector('#productImage3');
    const narrative3 = stepRoot.querySelector('#narrative3-3');
    const transitionOverlay = document.getElementById('globalTransitionOverlay');

    if (!scene1 || !scene2 || !scene3 || !productImage || !narrative3 || !transitionOverlay) return;

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
            }
        }, 300);
    }

    // 显示场景3的成品和文案（带淡入效果）
    function showProduct(option) {
        if (!patternMap[option]) return;
        
        const pattern = patternMap[option];
        
        // 设置成品图片
        productImage.src = pattern.image;
        productImage.style.display = 'block';
        productImage.style.opacity = '0';
        productImage.style.animation = 'fadeIn 0.8s ease-in forwards';
        
        // 显示对应的文案
        const textLines = pattern.text.split('\n');
        narrative3.innerHTML = '';
        textLines.forEach((line, index) => {
            const p = document.createElement('p');
            p.textContent = line;
            p.style.opacity = '0';
            p.style.animation = 'fadeIn 0.8s ease-in ' + (index * 0.2) + 's forwards';
            narrative3.appendChild(p);
        });
    }

    // 自动播放时间轴
    function startAutoPlay() {
        // 步骤1：场景1显示4秒
        setTimeout(() => {
            // 步骤2：切换到场景3，显示选项A
            switchScene(3);
            setTimeout(() => {
                showProduct('A');
            }, 300);
        }, 4000);
        
        // 步骤3：A显示4秒后，直接切换到B（过渡文案已并入B文案）
        // 时间：4000(场景1) + 300(切换) + 4000(A显示) = 8300ms
        setTimeout(() => {
            productImage.style.display = 'none';
            setTimeout(() => {
                productImage.style.display = 'block';
                showProduct('B');
            }, 500);
        }, 8300);
        
        // 步骤4：B显示4秒后，直接切换到C（过渡文案已并入C文案）
        // 时间：8300 + 500(延迟) + 4000(B显示) = 12800ms
        setTimeout(() => {
            productImage.style.display = 'none';
            setTimeout(() => {
                productImage.style.display = 'block';
                showProduct('C');
                
                // 步骤5：C显示4秒后，再停留2.5秒，然后淡出跳转
                // C在此时开始显示，4秒后是4000ms，再停留2.5秒是6500ms
                setTimeout(() => {
                    // 保存用户选择到 localStorage（最后显示的是 C）
                    localStorage.setItem('selectedPattern', 'C');
                    transitionOverlay.classList.add('fade-out');
                    setTimeout(() => {
                        goToStep(4);
                    }, 800);
                }, 4000 + 2500); // C显示4秒 + 停留2.5秒
            }, 500);
        }, 12800);
    }

    // 页面加载完成后初始化
    // 默认显示场景1
    scene1.classList.add('active');
    
    // 开始自动播放
    startAutoPlay();
}

// ========== Step 4 初始化函数 ==========
function initStep4() {
    const stepRoot = document.getElementById('step4');
    if (!stepRoot) return;
    
    // 状态管理
    let currentTemperature = 900;          // 初始温度
    let targetTemperature = 1300;          // 最终温度
    let addedWoodCount = 0;                // 已自动添的柴火数量
    const maxWoodCount = 6;                // 总共自动添 6 根柴

    // DOM 元素
    const scene1 = stepRoot.querySelector('#scene4-1');
    const scene2 = stepRoot.querySelector('#scene4-2');
    const temperatureValue = stepRoot.querySelector('#temperatureValue');
    const temperatureValue2 = stepRoot.querySelector('#temperatureValue2');
    const hintText = stepRoot.querySelector('#hintText');
    const firingProgressBar = stepRoot.querySelector('#firingProgressBar');
    const firingProgressContainer = stepRoot.querySelector('#firingProgressContainer');
    const transitionOverlay = document.getElementById('globalTransitionOverlay');

    if (!scene1 || !scene2 || !temperatureValue || !temperatureValue2 || !hintText || !firingProgressBar || !firingProgressContainer || !transitionOverlay) return;

    // 所有柴火元素
    const firewoodItems = stepRoot.querySelectorAll('.firewood-item');

    // 根据已经添柴次数切换火焰图片
    function updateFlameByWoodCount(count) {
        const fireImage = stepRoot.querySelector('#fireImage');
        if (!fireImage) return;
        
        if (count <= 1) {
            fireImage.src = '../step4_2/fire_tile2_small.png';
        } else if (count <= 3) {
            fireImage.src = '../step4_2/fire_tile2_medium.png';
        } else if (count <= 5) {
            fireImage.src = '../step4_2/fire_tile2_large.png';
        } else {
            fireImage.src = '../step4_2/fire_tile2_xlarge.png';
        }
    }

    // 温度从当前值平滑升到目标值
    function animateTemperature(from, to, duration) {
        const tempValueEl = stepRoot.querySelector('#temperatureValue');
        if (!tempValueEl) return;
        
        const steps = 30;
        const stepTime = duration / steps;
        let currentStep = 0;
        
        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const value = Math.round(from + (to - from) * progress);
            currentTemperature = value;
            tempValueEl.textContent = value;
            temperatureValue2.textContent = value;
            
            // 温度数字跳动动画
            tempValueEl.style.animation = 'none';
            setTimeout(() => {
                tempValueEl.style.animation = 'temperaturePulse 0.5s ease-in-out';
            }, 10);
            
            if (currentStep >= steps) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // 让柴火飞进窑口火焰
    function throwFirewoodIntoKiln(firewoodEl) {
        const kiln = stepRoot.querySelector('#kilnDropZone');
        if (!firewoodEl || !kiln) return;
        
        const woodRect = firewoodEl.getBoundingClientRect();
        const kilnRect = kiln.getBoundingClientRect();
        
        // 计算从柴火中心到窑口中下方的位移
        const fromX = woodRect.left + woodRect.width / 2;
        const fromY = woodRect.top + woodRect.height / 2;
        const toX = kilnRect.left + kilnRect.width / 2;
        const toY = kilnRect.top + kilnRect.height * 0.7; // 稍微靠下，接近火焰位置
        
        const deltaX = toX - fromX;
        const deltaY = toY - fromY;
        
        // 把位移设置为 CSS 变量
        firewoodEl.style.setProperty('--to-x', `${deltaX}px`);
        firewoodEl.style.setProperty('--to-y', `${deltaY}px`);
        
        // 触发飞入动画
        firewoodEl.classList.add('fly-into-kiln');
        
        // 动画结束后隐藏这根柴火
        setTimeout(() => {
            firewoodEl.style.display = 'none';
        }, 800); // 与 CSS transition 时间一致
    }

    // 自动添柴流程
    function autoAddFirewoodSequence() {
        const interval = 1500; // 每 1.5 秒添一根柴
        const perStepTempIncrease = (targetTemperature - currentTemperature) / maxWoodCount;
        const firewoodIds = ['firewood3', 'firewood4', 'firewood5', 'firewood6', 'firewood7', 'firewood8'];
        
        function addOne(index) {
            if (index >= maxWoodCount) {
                // 添完所有柴后，略停顿，再进入场景2
                setTimeout(goToScene2, 1500);
                return;
            }
            
            const firewoodId = firewoodIds[index];
            const firewoodEl = stepRoot.querySelector('#' + firewoodId);
            
            // 1) 先飞进窑口
            if (firewoodEl) {
                throwFirewoodIntoKiln(firewoodEl);
            }
            
            // 2) 增加柴火计数并更新火焰大小
            addedWoodCount++;
            updateFlameByWoodCount(addedWoodCount);
            
            // 3) 升温
            const newTemp = currentTemperature + perStepTempIncrease;
            animateTemperature(currentTemperature, newTemp, interval - 200);
            currentTemperature = newTemp;
            
            // 下一根
            setTimeout(() => {
                addOne(index + 1);
            }, interval);
        }
        
        // 先初始化一次
        updateFlameByWoodCount(0);
        animateTemperature(900, 900, 1);
        
        // 启动自动添柴
        setTimeout(() => {
            addOne(0);
        }, interval);
    }

    // 场景切换和自动烧制流程（场景2）
    function goToScene2() {
        if (scene1 && scene2) {
            scene1.classList.remove('active');
            scene1.style.display = 'none';
            scene2.classList.add('active');
            scene2.style.display = 'block';
        }
        
        // 场景2：自动烧制进度条
        startFiringProgress();
    }

    // 场景2 的烧制进度条自动走满后再跳转
    function startFiringProgress() {
        const bar = stepRoot.querySelector('#firingProgressBar');
        if (!bar) {
            // 没有进度条，就直接跳转
            finishAndGoNext();
            return;
        }
        
        let progress = 0;
        const duration = 7000; // 7 秒
        const steps = 70;
        const stepTime = duration / steps;
        
        const timer = setInterval(() => {
            progress++;
            const percent = (progress / steps) * 100;
            bar.style.width = percent + '%';
            
            if (progress >= steps) {
                clearInterval(timer);
                finishAndGoNext();
            }
        }, stepTime);
    }

    // 完成并跳转到下一步
    function finishAndGoNext() {
        const overlay = document.getElementById('globalTransitionOverlay');
        if (overlay) {
            overlay.classList.add('fade-out'); // 淡出动画
            setTimeout(() => {
                goToStep(5);
            }, 800);
        } else {
            goToStep(5);
        }
    }

    // 页面加载后启动整个自动流程
    // 初始场景：只显示 scene1
    if (scene1 && scene2) {
        scene1.classList.add('active');
        scene1.style.display = 'block';
        scene2.classList.remove('active');
        scene2.style.display = 'none';
    }
    
    // 启动自动添柴 + 升温 + 火焰变化 + 自动进场景2 + 自动烧制
    autoAddFirewoodSequence();
    
    // 淡出提示文字
    setTimeout(() => {
        if (hintText) {
            hintText.classList.add('fade-out');
        }
    }, 3500);
}

// ========== Step 5 初始化函数 ==========
function initStep5() {
    const stepRoot = document.getElementById('step5');
    if (!stepRoot) return;
    
    // 状态管理
    let currentScene = 1; // 当前场景：1=从窑炉取出, 2=成品回到日常

    // 选择映射关系：Step3中选择的选项（A/B/C 对应 3/4/5.png）→ Step5显示的杯子（3/4/5.png）
    const cupMap = {
        'A': '../step5/3.png', // Step3选择A（3.png）→ Step5显示3.png
        'B': '../step5/4.png', // Step3选择B（4.png）→ Step5显示4.png
        'C': '../step5/5.png'  // Step3选择C（5.png）→ Step5显示5.png
    };

    // DOM 元素
    const scene1 = stepRoot.querySelector('#scene5-1');
    const scene2 = stepRoot.querySelector('#scene5-2');
    const cupImage5 = stepRoot.querySelector('#cupImage5');
    const nextButton1 = stepRoot.querySelector('#nextButton5-1');
    const nextButton2 = stepRoot.querySelector('#nextButton5-2');

    if (!scene1 || !scene2 || !cupImage5 || !nextButton1 || !nextButton2) return;

    // 获取用户选择并显示对应的杯子（只在第二幕显示）
    function loadCupImage() {
        // 从 localStorage 获取用户在 Step3 的选择
        const selectedPattern = localStorage.getItem('selectedPattern');
        
        // 如果没有选择，默认使用 A（3.png）
        const cupImage = cupMap[selectedPattern] || cupMap['A'];
        
        // 只设置第二幕的杯子图片（第一幕不需要杯子）
        cupImage5.src = cupImage;
        
        // 显示第二幕的杯子图片
        cupImage5.style.display = 'block';
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
        // 可以显示完成提示或跳转到总结页
        alert('恭喜！你已经完成了景德镇制瓷之旅！\n请返回初始页面，继续填写问卷！');
    });

    // 页面加载完成后初始化
    loadCupImage();
    
    // 默认显示场景1
    scene1.classList.add('active');
}

// ========== 页面加载完成后初始化 ==========
document.addEventListener('DOMContentLoaded', () => {
    // 初始只显示 step1
    showStep(1);
    initStep1();
});

