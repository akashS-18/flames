

function createHeartRain() {
    const heartRain = document.getElementById('heartRain');
    if (!heartRain) return;

    const hearts = ['❤️', '💖', '💘', '💕'];
    const heartCount = 100; // Number of hearts on screen

    // Create initial hearts
    for (let i = 0; i < heartCount; i++) {
        createHeart();
    }

    // Continuously create new hearts
    setInterval(createHeart, 1000);

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Random properties
        const size = Math.random() * 20 + 15; // 15-35px
        const left = Math.random() * 100; // 0-100%
        const duration = Math.random() * 3 + 4; // 4-7 seconds
        const delay = Math.random() * 2; // 0-2 seconds delay
        
        heart.style.fontSize = size + 'px';
        heart.style.left = left + '%';
        heart.style.animationDuration = duration + 's';
        heart.style.animationDelay = delay + 's';
        
        heartRain.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, (duration + delay) * 1000);
    }
}

// Initialize heart rain on page load
document.addEventListener('DOMContentLoaded', createHeartRain);

// ============================================
// CURSOR TRAIL ANIMATION
// ============================================

function initCursorTrail() {
    const hearts = ['❤️', '💖', '💘', '💕', '✨', '💫'];
    let trailElements = [];
    let customCursor = null;
    let mouseX = 0;
    let mouseY = 0;
    let lastX = 0;
    let lastY = 0;
    let trailIndex = 0;
    
    // Create custom cursor
    customCursor = document.createElement('div');
    customCursor.className = 'custom-cursor';
    customCursor.textContent = '💖';
    document.body.appendChild(customCursor);
    
    // Create trail elements pool (for performance)
    const trailPoolSize = 15;
    for (let i = 0; i < trailPoolSize; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        document.body.appendChild(trail);
        trailElements.push(trail);
    }
    
    // Track mouse movement
    let animationFrame = null;
    let lastTime = 0;
    const throttleDelay = 16; // ~60fps
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update custom cursor position
        if (customCursor) {
            customCursor.style.left = mouseX + 'px';
            customCursor.style.top = mouseY + 'px';
        }
        
        // Check if hovering over interactive elements
        const target = e.target;
        if (target.tagName === 'BUTTON' || target.tagName === 'INPUT' || target.tagName === 'A') {
            if (customCursor) {
                customCursor.style.transform = 'translate(-50%, -50%) scale(1.3)';
                customCursor.style.fontSize = '28px';
            }
        } else {
            if (customCursor) {
                customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
                customCursor.style.fontSize = '24px';
            }
        }
        
        // Throttle trail creation for performance
        const currentTime = Date.now();
        if (currentTime - lastTime >= throttleDelay) {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
            
            animationFrame = requestAnimationFrame(() => {
                createTrail(mouseX, mouseY);
                lastTime = currentTime;
            });
        }
    });
    
    // Hide cursor on mouse leave
    document.addEventListener('mouseleave', () => {
        if (customCursor) {
            customCursor.style.opacity = '0';
        }
    });
    
    // Show cursor on mouse enter
    document.addEventListener('mouseenter', () => {
        if (customCursor) {
            customCursor.style.opacity = '1';
        }
    });
    
    function createTrail(x, y) {
        // Calculate distance moved
        const distance = Math.sqrt(
            Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2)
        );
        
        // Only create trail if mouse moved enough
        if (distance < 5) return;
        
        // Get next trail element from pool
        const trail = trailElements[trailIndex];
        trailIndex = (trailIndex + 1) % trailPoolSize;
        
        // Reset and position trail element
        trail.className = 'cursor-trail heart-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        
        // Random heart emoji
        trail.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Random size variation
        const size = Math.random() * 8 + 16; // 16-24px
        trail.style.fontSize = size + 'px';
        
        // Random rotation
        const rotation = Math.random() * 360;
        trail.style.setProperty('--rotation', rotation + 'deg');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            trail.className = 'cursor-trail';
        }, 800);
        
        lastX = x;
        lastY = y;
    }
}

// Initialize cursor trail on page load
document.addEventListener('DOMContentLoaded', initCursorTrail);

// ============================================
// FLAMES CALCULATION LOGIC
// ============================================

function calculateFLAMES(name1, name2) {
    // Convert to uppercase and remove spaces
    let str1 = name1.toUpperCase().replace(/\s/g, '');
    let str2 = name2.toUpperCase().replace(/\s/g, '');
    
    // Remove common letters
    let arr1 = str1.split('');
    let arr2 = str2.split('');
    
    // Create copies to avoid mutation issues
    let temp1 = [...arr1];
    let temp2 = [...arr2];
    
    // Remove common letters
    for (let i = temp1.length - 1; i >= 0; i--) {
        let char = temp1[i];
        let index2 = temp2.indexOf(char);
        if (index2 !== -1) {
            temp1.splice(i, 1);
            temp2.splice(index2, 1);
        }
    }
    
    // Count remaining letters
    let count = temp1.length + temp2.length;
    
    // FLAMES mapping
    const flames = ['F', 'L', 'A', 'M', 'E', 'S'];
    const flamesMap = {
        'F': { text: 'FRIENDS', icon: '👫', desc: 'You two are great friends! Your bond is strong and supportive.' },
        'L': { text: 'LOVERS', icon: '💑', desc: 'You two are meant to be lovers! Your connection is deep and romantic.' },
        'A': { text: 'AFFECTION', icon: '💕', desc: 'There is deep affection between you two. Your hearts are connected.' },
        'M': { text: 'MARRIAGE', icon: '💍', desc: 'Marriage is in your future! You are destined to be together forever.' },
        'E': { text: 'ENEMY', icon: '⚔️', desc: 'You might have some conflicts, but opposites attract sometimes!' },
        'S': { text: 'SIBLING', icon: '👨‍👩‍👧‍👦', desc: 'You share a sibling-like bond. You care for each other like family.' }
    };
    
    // Calculate FLAMES result
    let index = (count % 6) - 1;
    if (index < 0) index = 5;
    
    return flamesMap[flames[index]];
}

// ============================================
// HOME PAGE FUNCTIONALITY
// ============================================

const flamesForm = document.getElementById('flamesForm');

if (flamesForm) {
    flamesForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name1 = document.getElementById('name1').value.trim();
        const name2 = document.getElementById('name2').value.trim();
        
        if (!name1 || !name2) {
            alert('Please enter both names! 💕');
            return;
        }
        
        // Calculate FLAMES result
        const result = calculateFLAMES(name1, name2);
        
        // Generate random love percentage
        const lovePercentage = Math.floor(Math.random() * 100) + 1;
        
        // Store data in localStorage
        localStorage.setItem('name1', name1);
        localStorage.setItem('name2', name2);
        localStorage.setItem('flamesResult', result.text);
        localStorage.setItem('flamesIcon', result.icon);
        localStorage.setItem('flamesDesc', result.desc);
        localStorage.setItem('lovePercentage', lovePercentage.toString());
        
        // Redirect to result page
        window.location.href = 'result.html';
    });
}

// ============================================
// RESULT PAGE FUNCTIONALITY
// ============================================

function displayResult() {
    // Get data from localStorage
    const name1 = localStorage.getItem('name1');
    const name2 = localStorage.getItem('name2');
    const flamesResult = localStorage.getItem('flamesResult');
    const flamesIcon = localStorage.getItem('flamesIcon');
    const flamesDesc = localStorage.getItem('flamesDesc');
    const lovePercentage = parseInt(localStorage.getItem('lovePercentage')) || 0;
    
    // Check if data exists
    if (!name1 || !name2) {
        // Redirect to home if no data
        window.location.href = 'index.html';
        return;
    }
    
    // Display names
    document.getElementById('displayName1').textContent = name1;
    document.getElementById('displayName2').textContent = name2;
    
    // Display FLAMES result
    document.getElementById('resultIcon').textContent = flamesIcon;
    document.getElementById('resultText').textContent = flamesResult;
    document.getElementById('resultDescription').textContent = flamesDesc;
    
    // Animate love percentage meter
    animateLoveMeter(lovePercentage);
    
    // Setup share buttons
    setupShareButtons(name1, name2, flamesResult, flamesIcon, lovePercentage);
}

function animateLoveMeter(percentage) {
    const meterProgress = document.getElementById('meterProgress');
    const percentageDisplay = document.getElementById('lovePercentage');
    
    if (!meterProgress || !percentageDisplay) return;
    
    // Calculate stroke-dashoffset
    const circumference = 2 * Math.PI * 85; // radius = 85
    const offset = circumference - (percentage / 100) * circumference;
    
    // Set initial state
    meterProgress.style.strokeDashoffset = circumference;
    
    // Animate to final value
    setTimeout(() => {
        meterProgress.style.strokeDashoffset = offset;
        
        // Animate percentage number
        let current = 0;
        const increment = percentage / 50; // 50 steps
        const timer = setInterval(() => {
            current += increment;
            if (current >= percentage) {
                current = percentage;
                clearInterval(timer);
            }
            percentageDisplay.textContent = Math.floor(current) + '%';
        }, 40); // 40ms per step = 2 seconds total
    }, 300);
}

function setupShareButtons(name1, name2, flamesResult, flamesIcon, lovePercentage) {
    const whatsappBtn = document.getElementById('whatsappShare');
    const instagramBtn = document.getElementById('instagramShare');
    
    const shareMessage = `🔥 Our FLAMES result is ${flamesResult} ${flamesIcon} with ${lovePercentage}% compatibility 💖\n\n${name1} ❤️ ${name2}\n\nTry it yourself! 💕`;
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
            window.open(whatsappUrl, '_blank');
        });
    }
    
    if (instagramBtn) {
        instagramBtn.addEventListener('click', function() {
            // Copy message to clipboard
            navigator.clipboard.writeText(shareMessage).then(() => {
                alert('📸 Message copied! Open Instagram and paste it in your story or post! 💕');
            }).catch(() => {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = shareMessage;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                alert('📸 Message copied! Open Instagram and paste it in your story or post! 💕');
            });
        });
    }
}

// Initialize result page
if (window.location.pathname.includes('result.html') || window.location.pathname.endsWith('result.html')) {
    document.addEventListener('DOMContentLoaded', displayResult);
}

// Add SVG gradient definition for the meter (fallback if not in HTML)
document.addEventListener('DOMContentLoaded', function() {
    const svg = document.querySelector('.meter-svg');
    if (svg && !svg.querySelector('#gradient')) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'gradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '100%');
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', '#ff6b9d');
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', '#ff1744');
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.appendChild(defs);
    }
});
