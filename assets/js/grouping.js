// 在文件開頭修改預設分組配置
const presetGroups = {
    1: [8, 6],     // 闕中豪 + 吳發杰
    2: [21, 11],   // 林均翰 + 王羽詰
    3: [14, 15],   // 高浩宸 + 吳竣凱
    4: [3, 7],     // 陳柏銓 + 陳彥廷
    5: [19, 13],   // 陳品睿 + 陳柏凱
    6: [17, 5]     // 賴柏澔 + 劉子揚
};

// 移除不再需要的電機系學生 ID 列表
// const eeStudents = [5, 7, 14, 13];  // 這行可以刪除，因為已經直接分配到各組了

// 定義特殊標籤的學生ID列表
const TECH_LEADERS = [8, 15, 3, 19, 17, 21];  // 技術擔當
const TECH_HELPERS = [11, 5, 7, 14, 13, 6];   // 技術助手

// 定義理組文組的系所分類
const DEPT_CATEGORIES = {
    science: ['電機', '物理', '資工', '數學', '農化'],  // 理工科系
    arts: ['法律', '社會', '心理', '地理', '商研', '學習', '師大公領']  // 文法商科系
};

document.addEventListener('DOMContentLoaded', function() {
    // 初始化學生列表
    initializeStudents();
    
    // 設置拖放事件監聽器
    setupDragAndDrop();
    
    // 設置預設分組按鈕
    document.getElementById('loadPresetBtn').addEventListener('click', loadPresetGroups);
    
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

    // 在 DOMContentLoaded 事件中添加
    document.getElementById('downloadGroupsBtn').addEventListener('click', downloadGroupList);
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
                ${tags.map(tag => 
                    `<span class="student-mini-tag ${tag.class || ''}">${tag.text}</span>`
                ).join('')}
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

// 修改獲取學生主要標籤的函數
function getStudentMainTags(student) {
    const tags = [];
    
    // 添加特殊標籤（帶有樣式類別）
    if (TECH_LEADERS.includes(student.id)) {
        tags.push({text: '#技術擔當', class: 'tech-leader'});
    }
    if (TECH_HELPERS.includes(student.id)) {
        tags.push({text: '#技術助手', class: 'tech-helper'});
    }
    
    // 添加理組文組標籤
    for (const [category, depts] of Object.entries(DEPT_CATEGORIES)) {
        if (depts.some(dept => student.dept.includes(dept))) {
            if (category === 'science') {
                tags.push({text: '#理工', class: 'science'});
            } else {
                tags.push({text: '#文法商', class: 'arts'});
            }
            break;
        }
    }
    
    // 如果有專題經驗
    if (student.projectExp) {
        tags.push({text: '#專題'});
    }
    
    // 添加創意標籤
    if (student.skills.creativity >= 3) {
        tags.push({text: '#創意'});
    }
    
    // 限制最多顯示三個標籤
    return tags.slice(0, 3);
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

// 載入預設分組
function loadPresetGroups() {
    if (!confirm('分配策略：\n' +
        '1. G1: 闕中豪 + 吳發杰\n' +
        '2. G2: 林均翰 + 王羽詰\n' +
        '3. G3: 高浩宸 + 吳竣凱\n' +
        '4. G4: 陳柏銓 + 陳彥廷\n' +
        '5. G5: 陳品睿 + 陳柏凱\n' +
        '6. G6: 賴柏澔 + 劉子揚')) {
        return;
    }
    
    // 獲取所有學生卡片
    const allStudentCards = [
        ...document.querySelectorAll('#studentsList .student-mini-card'),
        ...document.querySelectorAll('.group-members .student-mini-card')
    ];
    
    // 將所有學生卡片先移回左側列表
    const studentsList = document.getElementById('studentsList');
    allStudentCards.forEach(card => {
        studentsList.appendChild(card);
    });
    
    // 重置所有分組
    document.querySelectorAll('.group-members').forEach(zone => {
        zone.innerHTML = '';
    });

    // 建立學生卡片的Map
    const studentCards = new Map(allStudentCards.map(card => [
        parseInt(card.dataset.studentId),
        card
    ]));

    // 1. 首先按照預設名單分配
    Object.entries(presetGroups).forEach(([groupIndex, memberIds]) => {
        const groupZone = document.querySelector(`.group-members[data-group="${groupIndex}"]`);
        memberIds.forEach(id => {
            const card = studentCards.get(id);
            if (card) {
                groupZone.appendChild(card);
            }
        });
        updateMemberCount(groupIndex);
        updateGroupSummary(groupZone.closest('.group-area'));
    });
}

// AI自動分組功能
function autoGroup() {
    if (!confirm('分配策略： \n' +
        '1. 同系的不能同組\n' +
        '2. 不同學科類別的人在一組 (理工、社會、教育等)\n' +
        '3. 確保每組至少3人，最多4人')) {
        return;
    }
    
    // 獲取已分組的學生ID和各組當前人數
    const assignedStudentIds = new Set();
    const currentGroupSizes = {};
    document.querySelectorAll('.group-members').forEach(zone => {
        const groupId = zone.dataset.group;
        const members = zone.querySelectorAll('.student-mini-card');
        members.forEach(card => {
            assignedStudentIds.add(parseInt(card.dataset.studentId));
        });
        currentGroupSizes[groupId] = members.length;
    });
    
    // 獲取未分組的學生卡片
    const unassignedCards = Array.from(document.querySelectorAll('#studentsList .student-mini-card'));
    
    // 檢查是否有足夠的學生來確保每組至少3人
    const totalStudents = unassignedCards.length + Object.values(currentGroupSizes).reduce((a, b) => a + b, 0);
    const minStudentsNeeded = 6 * 3; // 6組 * 3人
    
    if (totalStudents < minStudentsNeeded) {
        alert(`學生人數不足！需要至少 ${minStudentsNeeded} 人才能確保每組至少 3 人。`);
        return;
    }

    // 將未分組學生轉換為更易處理的格式
    const unassignedStudents = unassignedCards.map(card => {
        const studentId = parseInt(card.dataset.studentId);
        const student = students.find(s => s.id === studentId);
        return {
            id: studentId,
            card: card,
            data: student,
            dept: student.dept,
            category: getStudentCategory(student.dept)
        };
    });

    // 按學科類別分類學生
    const studentsByCategory = {
        science: unassignedStudents.filter(s => s.category === 'science'),
        social: unassignedStudents.filter(s => s.category === 'social'),
        education: unassignedStudents.filter(s => s.category === 'education'),
        other: unassignedStudents.filter(s => s.category === 'other')
    };

    // 獲取現有組別的信息
    const groups = Array.from({ length: 6 }, (_, i) => ({
        index: i + 1,
        members: [],
        depts: new Set(Array.from(document.querySelectorAll(`.group-members[data-group="${i + 1}"] .student-mini-card`))
            .map(card => students.find(s => s.id === parseInt(card.dataset.studentId)).dept)),
        categories: new Set(),
        currentSize: currentGroupSizes[i + 1] || 0
    }));

    // 優先填滿人數不足的組別
    while (unassignedStudents.length > 0) {
        // 找出人數最少的組別
        const groupsBySize = [...groups].sort((a, b) => 
            (a.currentSize + a.members.length) - (b.currentSize + b.members.length));
        
        const targetGroup = groupsBySize[0];
        const totalSize = targetGroup.currentSize + targetGroup.members.length;
        
        // 如果最小的組已經有3人，進入下一階段
        if (totalSize >= 3) break;

        // 尋找適合的學生
        let bestStudent = null;
        let bestCategory = null;
        let minConflicts = Infinity;

        Object.entries(studentsByCategory).forEach(([category, students]) => {
            students.forEach((student, index) => {
                if (targetGroup.depts.has(student.dept)) return;
                
                const conflicts = targetGroup.categories.has(student.category) ? 1 : 0;
                if (conflicts < minConflicts) {
                    minConflicts = conflicts;
                    bestStudent = student;
                    bestCategory = category;
                }
            });
        });

        if (bestStudent) {
            // 分配學生到組別
            targetGroup.members.push(bestStudent);
            targetGroup.depts.add(bestStudent.dept);
            targetGroup.categories.add(bestStudent.category);
            
            // 將學生卡片移動到對應組別
            const groupZone = document.querySelector(`.group-members[data-group="${targetGroup.index}"]`);
            groupZone.appendChild(bestStudent.card);
            
            // 更新組別信息
            updateMemberCount(targetGroup.index);
            updateGroupSummary(groupZone.closest('.group-area'));
            
            // 從未分配列表中移除
            const studentIndex = studentsByCategory[bestCategory].indexOf(bestStudent);
            studentsByCategory[bestCategory].splice(studentIndex, 1);
            unassignedStudents.splice(unassignedStudents.indexOf(bestStudent), 1);
        } else {
            console.warn('無法找到合適的學生來填滿組別');
            break;
        }
    }

    // 分配剩餘學生
    const allCategories = ['science', 'social', 'education', 'other'];
    
    while (unassignedStudents.length > 0) {
        // 找出人數最少且未滿的組別
        const availableGroups = groups.filter(g => 
            (g.currentSize + g.members.length) < 4
        ).sort((a, b) => 
            (a.currentSize + a.members.length) - (b.currentSize + b.members.length)
        );

        if (availableGroups.length === 0) {
            console.warn('所有組別都已滿，無法分配剩餘學生');
            break;
        }

        // 隨機選擇一個類別中的學生
        let selectedStudent = null;
        let selectedCategory = null;
        let selectedGroup = null;
        let minConflicts = Infinity;

        // 遍歷所有可用的組別和學生，找出最佳配對
        availableGroups.forEach(group => {
            allCategories.forEach(category => {
                if (studentsByCategory[category].length === 0) return;

                studentsByCategory[category].forEach(student => {
                    // 檢查是否符合同系限制
                    if (group.depts.has(student.dept)) return;

                    // 計算衝突分數
                    const categoryConflicts = group.categories.has(student.category) ? 1 : 0;
                    const conflicts = categoryConflicts;

                    if (conflicts < minConflicts) {
                        minConflicts = conflicts;
                        selectedStudent = student;
                        selectedCategory = category;
                        selectedGroup = group;
                    }
                });
            });
        });

        if (selectedStudent && selectedGroup) {
            // 分配學生到選定的組別
            selectedGroup.members.push(selectedStudent);
            selectedGroup.depts.add(selectedStudent.dept);
            selectedGroup.categories.add(selectedStudent.category);
            
            // 將學生卡片移動到對應組別
            const groupZone = document.querySelector(`.group-members[data-group="${selectedGroup.index}"]`);
            groupZone.appendChild(selectedStudent.card);
            
            // 更新組別信息
            updateMemberCount(selectedGroup.index);
            updateGroupSummary(groupZone.closest('.group-area'));
            
            // 從未分配列表中移除
            const studentIndex = studentsByCategory[selectedCategory].indexOf(selectedStudent);
            studentsByCategory[selectedCategory].splice(studentIndex, 1);
            unassignedStudents.splice(unassignedStudents.indexOf(selectedStudent), 1);
        } else {
            // 如果找不到合適的配對，可能需要放寬限制
            console.warn('無法找到合適的配對，嘗試放寬限制');
            
            // 直接分配到人數最少的組
            const leastGroup = availableGroups[0];
            const anyStudent = unassignedStudents[0];
            
            if (leastGroup && anyStudent) {
                leastGroup.members.push(anyStudent);
                leastGroup.depts.add(anyStudent.dept);
                leastGroup.categories.add(anyStudent.category);
                
                const groupZone = document.querySelector(`.group-members[data-group="${leastGroup.index}"]`);
                groupZone.appendChild(anyStudent.card);
                
                updateMemberCount(leastGroup.index);
                updateGroupSummary(groupZone.closest('.group-area'));
                
                const category = Object.entries(studentsByCategory)
                    .find(([_, students]) => students.includes(anyStudent))[0];
                studentsByCategory[category].splice(studentsByCategory[category].indexOf(anyStudent), 1);
                unassignedStudents.splice(0, 1);
            } else {
                break;
            }
        }
    }

    // 如果還有未分配的學生，顯示警告
    if (unassignedStudents.length > 0) {
        alert(`警告：還有 ${unassignedStudents.length} 位學生未能分配到組別。`);
    }
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
    const summary = groupArea.querySelector('.group-summary') || 
        createGroupSummary(groupArea);
    
    const members = groupArea.querySelectorAll('.group-members .student-mini-card');
    const stats = {
        techLeaders: 0,
        techHelpers: 0,
        science: 0,
        arts: 0,
        project: 0,
        creative: 0,
        departments: new Set()
    };

    members.forEach(member => {
        const studentId = parseInt(member.dataset.studentId);
        const student = students.find(s => s.id === studentId);
        if (student) {
            // 統計技術擔當和助手
            if (TECH_LEADERS.includes(student.id)) stats.techLeaders++;
            if (TECH_HELPERS.includes(student.id)) stats.techHelpers++;
            
            // 統計理工和文法商
            for (const [category, depts] of Object.entries(DEPT_CATEGORIES)) {
                if (depts.some(dept => student.dept.includes(dept))) {
                    if (category === 'science') stats.science++;
                    else stats.arts++;
                    break;
                }
            }
            
            // 統計專題和創意
            if (student.projectExp) stats.project++;
            if (student.skills.creativity >= 3) stats.creative++;
            
            // 統計系所
            stats.departments.add(student.dept);
        }
    });

    // 生成摘要 HTML
    let summaryHTML = `
        <div class="summary-content">
            <div class="summary-tags">
    `;

    // 添加技術擔當和助手標籤
    if (stats.techLeaders > 0) {
        summaryHTML += `<span class="summary-tag tech">#技術擔當x${stats.techLeaders}</span>`;
    }
    if (stats.techHelpers > 0) {
        summaryHTML += `<span class="summary-tag helper">#技術助手x${stats.techHelpers}</span>`;
    }
    
    // 添加理工和文法商標籤
    if (stats.science > 0) {
        summaryHTML += `<span class="summary-tag ai">#理工x${stats.science}</span>`;
    }
    if (stats.arts > 0) {
        summaryHTML += `<span class="summary-tag ai">#文法商x${stats.arts}</span>`;
    }
    
    // 添加專題和創意標籤
    if (stats.project > 0) {
        summaryHTML += `<span class="summary-tag project">#專題x${stats.project}</span>`;
    }
    if (stats.creative > 0) {
        summaryHTML += `<span class="summary-tag creative">#創意x${stats.creative}</span>`;
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

// 下載分組名單功能
function downloadGroupList() {
    // 收集所有組別的資訊
    const groupsInfo = [];
    document.querySelectorAll('.group-area').forEach(groupArea => {
        const groupNumber = groupArea.dataset.group;
        const members = Array.from(groupArea.querySelectorAll('.student-mini-card')).map(card => {
            const studentId = parseInt(card.dataset.studentId);
            const student = students.find(s => s.id === studentId);
            return student;
        });

        if (members.length > 0) {
            groupsInfo.push({
                group: groupNumber,
                members: members
            });
        }
    });

    // 生成文本內容
    let content = '';
    groupsInfo.forEach(group => {
        content += `第${group.group}組\n`;
        group.members.forEach(member => {
            content += `    ${member.name}（${member.dept}）\n`;
        });
        content += '\n';  // 添加空行
    });

    // 創建 Blob 對象
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    
    // 創建下載連結
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `分組名單_${new Date().toLocaleDateString()}.txt`;
    
    // 觸發下載
    document.body.appendChild(a);
    a.click();
    
    // 清理
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// 如果需要支援 Big5 編碼，可以添加以下輔助函數
function convertToBig5(str) {
    // 這裡可以使用第三方庫來處理編碼轉換
    // 例如：https://github.com/google/closure-library
    return str;
} 