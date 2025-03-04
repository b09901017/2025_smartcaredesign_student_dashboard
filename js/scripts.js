// 設定PDF.js的worker路徑
// pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

// 等待DOM加載完成
document.addEventListener('DOMContentLoaded', function() {
  // 渲染學生卡片
  renderStudentCards();
  
  // 綁定事件
  setupEventListeners();
});

// 渲染學生卡片
function renderStudentCards() {
  const container = document.getElementById('studentsGrid');
  container.innerHTML = '';
  
  students.forEach(student => {
    // 創建學生卡片
    const card = document.createElement('div');
    card.className = 'student-card';
    card.dataset.id = student.id;
    
    // 獲取優勢和劣勢
    const strengths = getTopSkills(student.skills, true, 2);  // 獲取得分最高的2個技能
    const weaknesses = getTopSkills(student.skills, false, 2); // 獲取得分最低的2個技能
    
    // 填充卡片內容
    card.innerHTML = `
      <div class="student-photo" id="photo-${student.id}">
        <div class="loading-indicator">
          <div class="loading-spinner"></div>
        </div>
        <div class="photo-placeholder">
          <i class="fas fa-user"></i>
        </div>
      </div>
      
      <div class="student-content">
        <div class="student-header">
          <h3 class="student-name">${student.name}</h3>
          <p class="student-info">${student.dept} | ${getProgrammingLevelName(student.skills.programming)}</p>
        </div>
        
        <div class="tags-section">
          <div>
            <div class="tags-label">主要優勢</div>
            <div class="tags-container">
              ${strengths.map(skill => 
                `<span class="tag tag-strength">#${getSkillName(skill)}</span>`
              ).join('')}
            </div>
          </div>
          
          <div>
            <div class="tags-label">需加強</div>
            <div class="tags-container">
              ${weaknesses.map(skill => 
                `<span class="tag tag-weakness">#${getSkillName(skill)}</span>`
              ).join('')}
            </div>
          </div>
          
          ${student.projectExp ? 
            `<div class="tags-container" style="margin-top: 0.5rem">
              <span class="tag" style="background-color: #EDFCF2; color: #0DA678;">
                <i class="fas fa-check-circle" style="margin-right: 4px;"></i>專題經驗
              </span>
            </div>` : ''}
        </div>
      </div>
    `;
    
    // 添加到容器
    container.appendChild(card);
    
    // 載入學生圖片
    loadStudentImage(student);
    
    // 添加點擊事件
    card.addEventListener('click', () => showStudentDetails(student));
  });
}

// 載入學生自介圖片
// 載入學生自介圖片 (JPG版本)
// 載入學生自介圖片 (JPG版本)
function loadStudentImage(student) {
    const photoContainer = document.getElementById(`photo-${student.id}`);
    
    // 移除載入指示器
    const loadingIndicator = photoContainer.querySelector('.loading-indicator');
    if (loadingIndicator) photoContainer.removeChild(loadingIndicator);
    
    // 移除佔位符
    const placeholder = photoContainer.querySelector('.photo-placeholder');
    if (placeholder) photoContainer.removeChild(placeholder);
    
    // 使用第一張圖片作為主要顯示圖片
    if (student.images && student.images.length > 0) {
        const img = document.createElement('img');
        img.src = student.images[0];
        img.alt = `${student.name}的自介圖`;
        
        // 添加錯誤處理
        img.onerror = function() {
            console.log(`無法載入圖片: ${student.images[0]}`);
            const fallbackIcon = document.createElement('div');
            fallbackIcon.className = 'photo-placeholder';
            fallbackIcon.innerHTML = '<i class="fas fa-user"></i>';
            photoContainer.appendChild(fallbackIcon);
        };
        
        // 添加圖片到容器
        photoContainer.appendChild(img);
    }
}

// 獲取程式設計能力等級名稱
function getProgrammingLevelName(level) {
  const levels = {
    1: "初學者",
    2: "略懂皮毛",
    3: "有一定基礎",
    4: "專業碼農"
  };
  return levels[level] || "未知";
}

// 獲取技能名稱
function getSkillName(skillId) {
  const skillNames = {
    programming: "程式設計",
    ai: "AI/ML",
    creativity: "創意發想",
    execution: "技術執行",
    communication: "溝通協調",
    presentation: "簡報展示",
    management: "專案管理"
  };
  return skillNames[skillId] || skillId;
}

// 獲取學生前N個最強/最弱技能
function getTopSkills(skills, isStrength = true, count = 2) {
  // 轉換技能對象為數組
  const skillsArray = Object.entries(skills);
  
  // 根據是找優勢還是劣勢來排序
  if (isStrength) {
    // 按分數降序排序找優勢
    skillsArray.sort((a, b) => b[1] - a[1]);
    // 篩選得分高的技能 (3或4分)
    return skillsArray
      .filter(([_, value]) => value >= 3)
      .slice(0, count)
      .map(([key, _]) => key);
  } else {
    // 按分數升序排序找劣勢
    skillsArray.sort((a, b) => a[1] - b[1]);
    // 篩選得分低的技能 (1或2分)
    return skillsArray
      .filter(([_, value]) => value <= 2)
      .slice(0, count)
      .map(([key, _]) => key);
  }
}

// 綁定事件監聽器
function setupEventListeners() {
  // 搜索功能
  document.getElementById('studentSearch').addEventListener('input', filterStudents);
  
  // 過濾按鈕
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      // 移除所有按鈕的活動狀態
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      
      // 添加當前按鈕的活動狀態
      this.classList.add('active');
      
      // 過濾學生
      filterStudents();
    });
  });
  
  // 模態框關閉按鈕
  document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('studentModal').classList.remove('show');
  });
  
  // 點擊模態框外部關閉
  document.getElementById('studentModal').addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.remove('show');
    }
  });
    // 監聽ESC鍵關閉全屏圖片
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          document.getElementById('fullscreenView').classList.remove('show');
        }
      });
}

// 過濾學生
function filterStudents() {
  const searchValue = document.getElementById('studentSearch').value.toLowerCase();
  const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
  
  const cards = document.querySelectorAll('.student-card');
  
  cards.forEach(card => {
    const studentId = parseInt(card.dataset.id);
    const student = students.find(s => s.id === studentId);
    
    // 搜索文本過濾
    const matchesSearch = searchValue === '' || 
      student.name.toLowerCase().includes(searchValue) || 
      student.dept.toLowerCase().includes(searchValue) ||
      student.teamRoles.some(role => role.toLowerCase().includes(searchValue));
    
    // 能力過濾
    let matchesFilter = true;
    if (activeFilter === 'project') {
      // 過濾有專題經驗的學生
      matchesFilter = !!student.projectExp;
    } else if (activeFilter !== 'all') {
      matchesFilter = student.skills[activeFilter] >= 3;
    }
    
    card.style.display = matchesSearch && matchesFilter ? 'flex' : 'none';
  });
}

// 顯示學生詳細資料
// 顯示學生詳細資料
function showStudentDetails(student) {
    const modal = document.getElementById('studentModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    // 設置標題
    modalTitle.textContent = `${student.name} - ${student.dept}`;
    
    // 填充模態框內容
    modalBody.innerHTML = `
      <div class="student-profile">
        <div class="profile-photo" id="modal-photo-${student.id}">
          <div class="loading-indicator">
            <div class="loading-spinner"></div>
          </div>
          <i class="fas fa-user"></i>
        </div>
        
        <div class="profile-info">
          <div class="profile-section">
            <h4>基本資料</h4>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">學號</div>
                <div class="info-value">${student.studentId}</div>
              </div>
              <div class="info-item">
                <div class="info-label">聯絡方式</div>
                <div class="info-value">${student.contact}</div>
              </div>
              <div class="info-item">
                <div class="info-label">程式能力</div>
                <div class="info-value">${student.programmingSkill}</div>
              </div>
              <div class="info-item">
                <div class="info-label">程式語言</div>
                <div class="info-value">${student.programmingLang || '未填寫'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">AI/ML知識</div>
                <div class="info-value">${student.aiSkill}</div>
              </div>
              <div class="info-item">
                <div class="info-label">專題經驗</div>
                <div class="info-value">${student.projectExp ? '有' : '無'}</div>
              </div>
            </div>
          </div>
          
          <div class="profile-section">
            <h4>學習期望</h4>
            <div class="profile-text">${student.learningExpectation || '未填寫'}</div>
            ${student.coreObjective ? `<div class="profile-text" style="margin-top:0.5rem">${student.coreObjective}</div>` : ''}
          </div>
          
          <div class="profile-section">
            <h4>團隊角色</h4>
            <div class="tag-list">
              ${student.teamRoles.map(role => `<span class="tag tag-strength">${role}</span>`).join('')}
            </div>
          </div>
          
          <div class="profile-section">
            <h4>能力雷達圖</h4>
            <div class="radar-chart-container">
              <canvas id="studentRadarChart"></canvas>
            </div>
          </div>
          
          ${student.projectExp ? `
          <div class="profile-section">
            <h4>專題經驗</h4>
            <div class="profile-text">${student.projectExp}</div>
          </div>
          ` : ''}
        </div>
      </div>
    `;
    
    // 顯示模態框
    modal.classList.add('show');
    
    // 載入模態框中的學生圖片
    const modalPhotoContainer = document.getElementById(`modal-photo-${student.id}`);
    
    // 移除現有內容
    modalPhotoContainer.innerHTML = '';
    
    // 創建圖片輪播容器
    const imageSlider = document.createElement('div');
    imageSlider.className = 'image-slider';
    
    // 添加所有圖片
    student.images.forEach(imagePath => {
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `${student.name}的自介圖`;
        
        // 點擊查看大圖
        img.addEventListener('click', function() {
            showFullscreenImage(imagePath, student.name);
        });
        
        imageSlider.appendChild(img);
    });
    
    modalPhotoContainer.appendChild(imageSlider);
    
    // 渲染雷達圖
    setTimeout(() => {
      renderStudentRadarChart(student);
    }, 100);
  }
// 渲染學生雷達圖
function renderStudentRadarChart(student) {
  const ctx = document.getElementById('studentRadarChart').getContext('2d');
  
  // 獲取技能資料
  const labels = [
    '程式設計', 'AI/ML', '創意發想', '技術執行', 
    '溝通協調', '簡報展示', '專案管理'
  ];
  
  const data = [
    student.skills.programming,
    student.skills.ai,
    student.skills.creativity,
    student.skills.execution,
    student.skills.communication,
    student.skills.presentation,
    student.skills.management
  ];
  
  // 創建雷達圖
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [{
        label: '能力值',
        data: data,
        backgroundColor: 'rgba(53, 99, 233, 0.2)',
        borderColor: 'rgba(53, 99, 233, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(53, 99, 233, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(53, 99, 233, 1)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            display: true
          },
          suggestedMin: 0,
          suggestedMax: 4,
          ticks: {
            stepSize: 1
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

// 添加全屏圖片查看功能
function showFullscreenImage(imageSrc, altText) {
    const fullscreenView = document.getElementById('fullscreenView');
    const fullscreenImage = document.getElementById('fullscreenImage');
    
    fullscreenImage.src = imageSrc;
    fullscreenImage.alt = altText ? `${altText}的自介圖` : '圖片';
    
    fullscreenView.classList.add('show');
    
    // 點擊關閉全屏查看
    fullscreenView.addEventListener('click', function() {
      fullscreenView.classList.remove('show');
    });
  }