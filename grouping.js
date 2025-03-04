document.addEventListener('DOMContentLoaded', function() {
    // 初始化學生列表
    initializeStudents();
    
    // 設置拖放事件監聽器
    setupDragAndDrop();
    
    // 設置AI自動分組按鈕
    document.getElementById('autoGroupBtn').addEventListener('click', autoGroup);
    
    // 初始化組別
    initializeGroups();
    
    
    // 添加模態框關閉事件
    document.getElementById('modalOverlay').addEventListener('click', closeStudentModal);
    
    // 搜索功能
    document.getElementById('studentSearch').addEventListener('input', filterStudents);
    
    // 過濾按鈕
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => 
                b.classList.remove('active'));
            this.classList.add('active');
            filterStudents();
        });
    });
    
    // 添加篩選區域收起/展開功能
    const toggleFilterBtn = document.getElementById('toggleFilterBtn');
    const filterContainer = document.getElementById('filterContainer');
    
    toggleFilterBtn.addEventListener('click', function() {
        filterContainer.classList.toggle('collapsed');
        this.classList.toggle('active');
        
        // 更新圖標
        const icon = this.querySelector('i');
        if (filterContainer.classList.contains('collapsed')) {
            icon.className = 'fas fa-filter';
        } else {
            icon.className = 'fas fa-times';
        }
    });
    
    // 默認收起篩選區域
    filterContainer.classList.add('collapsed');
});

// 初始化學生列表
function initializeStudents() {
    const studentsList = document.getElementById('studentsList');
    
    students.forEach(student => {
        const card = createStudentMiniCard(student);
        studentsList.appendChild(card);
    });
}

// 創建學生迷你卡片
function createStudentMiniCard(student) {
    const card = document.createElement('div');
    card.className = 'student-mini-card';
    card.draggable = true;
    card.dataset.studentId = student.id;
    
    // 獲取學生的主要標籤
    const tags = getStudentMainTags(student);
    
    card.innerHTML = `
        <div class="student-mini-photo">
            ${student.images && student.images.length > 0 
                ? `<img src="${student.images[0]}" alt="${student.name}">`
                : '<i class="fas fa-user"></i>'}
        </div>
        <div class="student-mini-info">
            <p class="student-mini-name">${student.name}</p>
            <p class="student-mini-dept">${student.dept}</p>
            <div class="student-mini-tags">
                ${tags.map(tag => `<span class="student-mini-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    // 添加點擊事件顯示詳細信息
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.student-mini-card').classList.contains('dragging')) {
            showStudentDetails(student);
        }
    });
    
    return card;
}

// 獲取學生主要標籤
function getStudentMainTags(student) {
    const tags = [];
    
    // 添加程式設計標籤
    if (student.skills.programming >= 3) {
        tags.push('#技術');
    }
    
    // 添加 AI 標籤
    if (student.skills.ai >= 3) {
        tags.push('#AI');
    }
    
    // 添加創意標籤
    if (student.skills.creativity >= 3) {
        tags.push('#創意');
    }
    
    // 如果有專題經驗
    if (student.projectExp) {
        tags.push('#專題');
    }
    
    // 限制最多顯示兩個標籤
    return tags.slice(0, 2);
}

// 顯示學生詳細信息
function showStudentDetails(student) {
    const modal = document.getElementById('studentModal');
    const overlay = document.getElementById('modalOverlay');
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${student.name}</h3>
                <button onclick="closeStudentModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="student-profile">
                    <div class="profile-photo">
                        ${student.images && student.images.length > 0 
                            ? `<img src="${student.images[0]}" alt="${student.name}">`
                            : '<i class="fas fa-user"></i>'}
                    </div>
                    <div class="profile-info">
                        <div class="info-section">
                            <h4>基本資料</h4>
                            <div class="info-grid">
                                <div class="info-item">
                                    <div class="info-label">系級</div>
                                    <div class="info-value">${student.dept}</div>
                                </div>
                                <div class="info-item">
                                    <div class="info-label">學號</div>
                                    <div class="info-value">${student.studentId}</div>
                                </div>
                                <div class="info-item">
                                    <div class="info-label">聯絡方式</div>
                                    <div class="info-value">${student.contact || '未提供'}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="info-section">
                            <h4>技能程度</h4>
                            <div class="skills-grid">
                                <div class="skill-item">
                                    <div class="skill-label">程式能力</div>
                                    <div class="skill-value">${student.programmingSkill}</div>
                                    <div class="skill-detail">使用語言: ${student.programmingLang || '未填寫'}</div>
                                </div>
                                <div class="skill-item">
                                    <div class="skill-label">AI/ML 知識</div>
                                    <div class="skill-value">${student.aiSkill}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="info-section">
                            <h4>團隊角色</h4>
                            <div class="tags-container">
                                ${student.teamRoles.map(role => 
                                    `<span class="tag">${role}</span>`).join('')}
                            </div>
                        </div>
                        
                        ${student.projectExp ? `
                        <div class="info-section">
                            <h4>專題經驗</h4>
                            <p>${student.projectExp}</p>
                        </div>
                        ` : ''}
                        
                        <div class="info-section">
                            <h4>學習期望</h4>
                            <p>${student.learningExpectation || '未填寫'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('show');
    overlay.classList.add('show');
}

// 關閉學生詳細信息
function closeStudentModal() {
    const modal = document.getElementById('studentModal');
    const overlay = document.getElementById('modalOverlay');
    
    modal.classList.remove('show');
    overlay.classList.remove('show');
}

// 設置拖放事件
function setupDragAndDrop() {
    const draggableCards = document.querySelectorAll('.student-mini-card');
    const dropZones = document.querySelectorAll('.group-members');
    
    draggableCards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    });
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });
}

// 拖曳事件處理函數
function handleDragStart(e) {
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    const dropZone = e.currentTarget;
    dropZone.classList.remove('dragover');
    
    const draggedCard = document.querySelector('.dragging');
    if (!draggedCard) return;
    
    // 檢查組別人數限制
    const groupMembers = dropZone.children.length;
    if (groupMembers >= 4) {
        alert('此組已達到人數上限！');
        return;
    }
    
    // 移動學生卡片到新組別
    dropZone.appendChild(draggedCard);
    updateMemberCount(dropZone.dataset.group);
}

// 更新組別人數顯示
function updateMemberCount(groupId) {
    const groupArea = document.querySelector(`.group-area[data-group="${groupId}"]`);
    const memberCount = groupArea.querySelector('.group-members').children.length;
    groupArea.querySelector('.member-count').textContent = `(${memberCount}/4)`;
}

// AI自動分組功能
function autoGroup() {
    // 這裡實現自動分組邏輯
    // 可以基於學生的技能、專長等進行智能分組
    if (!confirm('確定要進行自動分組嗎？這將重置當前的分組結果。')) {
        return;
    }
    
    // 重置所有分組
    document.querySelectorAll('.group-members').forEach(zone => {
        zone.innerHTML = '';
    });
    
    // 簡單的隨機分組示例
    const allStudents = Array.from(document.querySelectorAll('.student-mini-card'));
    const shuffledStudents = allStudents.sort(() => Math.random() - 0.5);
    
    shuffledStudents.forEach((card, index) => {
        const groupIndex = Math.floor(index / 4) + 1;
        if (groupIndex <= 6) {
            const groupZone = document.querySelector(`.group-members[data-group="${groupIndex}"]`);
            groupZone.appendChild(card);
            updateMemberCount(groupIndex);
        }
    });
}

// 修改組別區域，添加收合功能
function initializeGroups() {
    const groupAreas = document.querySelectorAll('.group-area');
    
    groupAreas.forEach(area => {
        const header = area.querySelector('h4');
        const headerDiv = document.createElement('div');
        headerDiv.className = 'group-header';
        header.parentNode.insertBefore(headerDiv, header);
        headerDiv.appendChild(header);
        
        const toggle = document.createElement('span');
        toggle.className = 'group-toggle';
        toggle.innerHTML = '<i class="fas fa-chevron-down"></i>';
        headerDiv.appendChild(toggle);
        
        const summary = document.createElement('div');
        summary.className = 'group-summary';
        area.insertBefore(summary, area.querySelector('.group-members'));
        
        headerDiv.addEventListener('click', () => {
            area.classList.toggle('collapsed');
            updateGroupSummary(area);
        });
    });
}

// 更新組別摘要
function updateGroupSummary(groupArea) {
    const summary = groupArea.querySelector('.group-summary');
    const members = Array.from(groupArea.querySelectorAll('.student-mini-card'));
    
    if (members.length === 0) {
        summary.textContent = '尚未有成員';
        return;
    }

    // 收集組員資訊
    const stats = {
        memberCount: members.length,
        skills: {
            programming: 0,  // 技術
            ai: 0,          // AI
            creativity: 0,  // 創意
            project: 0      // 專題
        },
        departments: new Set()  // 系所統計
    };

    members.forEach(member => {
        const studentId = member.dataset.studentId;
        const student = students.find(s => s.id === parseInt(studentId));
        if (student) {
            // 統計技能
            if (student.skills.programming >= 3) stats.skills.programming++;
            if (student.skills.ai >= 3) stats.skills.ai++;
            if (student.skills.creativity >= 3) stats.skills.creativity++;
            if (student.projectExp) stats.skills.project++;
            
            // 統計系所
            stats.departments.add(student.dept);
        }
    });

    // 生成摘要 HTML
    let summaryHTML = `
        <div class="summary-content">
            <div class="summary-tags">
    `;

    // 添加技能標籤
    if (stats.skills.programming > 0) {
        summaryHTML += `<span class="summary-tag tech">#技術x${stats.skills.programming}</span>`;
    }
    if (stats.skills.ai > 0) {
        summaryHTML += `<span class="summary-tag ai">#AIx${stats.skills.ai}</span>`;
    }
    if (stats.skills.creativity > 0) {
        summaryHTML += `<span class="summary-tag creative">#創意x${stats.skills.creativity}</span>`;
    }
    if (stats.skills.project > 0) {
        summaryHTML += `<span class="summary-tag project">#專題x${stats.skills.project}</span>`;
    }

    summaryHTML += `
            </div>
            <div class="summary-departments">
                ${Array.from(stats.departments).map(dept => 
                    `<span class="dept-tag">${dept}</span>`
                ).join('')}
            </div>
        </div>
    `;

    summary.innerHTML = summaryHTML;
}

// 過濾學生
function filterStudents() {
    const searchValue = document.getElementById('studentSearch').value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    const studentCards = document.querySelectorAll('#studentsList .student-mini-card');
    
    studentCards.forEach(card => {
        const studentId = parseInt(card.dataset.studentId);
        const student = students.find(s => s.id === studentId);
        
        // 搜索文本過濾
        const matchesSearch = searchValue === '' || 
            student.name.toLowerCase().includes(searchValue) || 
            student.dept.toLowerCase().includes(searchValue);
        
        // 能力過濾
        let matchesFilter = true;
        if (activeFilter !== 'all') {
            switch(activeFilter) {
                case 'programming':
                    matchesFilter = student.skills.programming >= 3;
                    break;
                case 'ai':
                    matchesFilter = student.skills.ai >= 3;
                    break;
                case 'creativity':
                    matchesFilter = student.skills.creativity >= 3;
                    break;
                case 'project':
                    matchesFilter = !!student.projectExp;
                    break;
            }
        }
        
        card.style.display = matchesSearch && matchesFilter ? 'flex' : 'none';
    });
} 