// 學生資料
const students = [
    {
      id: 1,
      name: "詹慧軒",
      studentId: "B09a01360",
      dept: "法律五",
      willingness: "當然!!",
      contact: "B09a01360@ntu.edu.tw",
      programmingSkill: "初學者",
      programmingLang: "完全不會",
      aiSkill: "聽過但不熟",
      projectExp: "",
      teamRoles: ["創意發想者", "技術執行", "溝通協調", "簡報展示"],
      learningExpectation: "實際操作設計思考專案的能力",
      coreObjective: "團隊帶領",
      skills: {
        programming: 1,
        ai: 2,
        creativity: 4,
        execution: 3,
        communication: 4,
        presentation: 4,
        management: 2
      },
      images: []
    },
    {
      id: 2,
      name: "賴政揚",
      studentId: "B12605082",
      dept: "物理二",
      willingness: "當然!!",
      contact: "0906335479",
      programmingSkill: "略懂皮毛",
      programmingLang: "",
      aiSkill: "有基礎知識",
      projectExp: "",
      teamRoles: ["技術執行", "溝通協調", "邏輯分析"],
      learningExpectation: "跨領域溝通的能力",
      coreObjective: "",
      skills: {
        programming: 2,
        ai: 3,
        creativity: 2,
        execution: 4,
        communication: 4,
        presentation: 2,
        management: 2
      },
      images: []
    },
    {
      id: 3,
      name: "陳柏銓",
      studentId: "b11901083",
      dept: "電機三",
      willingness: "當然!!",
      contact: "b11901083@ntu.edu.tw",
      programmingSkill: "有一定基礎",
      programmingLang: "C++, Python",
      aiSkill: "有基礎知識",
      projectExp: "",
      teamRoles: ["創意發想者", "技術執行", "邏輯分析"],
      learningExpectation: "什麼都想試試看",
      coreObjective: "",
      skills: {
        programming: 3,
        ai: 3,
        creativity: 4,
        execution: 4,
        communication: 2,
        presentation: 2,
        management: 2
      },
      images: []
    },
    {
      id: 4,
      name: "邱品慈",
      studentId: "B12A01163",
      dept: "法學二",
      willingness: "當然!!",
      contact: "0958024773 b12a01163@ntu.edu.tw",
      programmingSkill: "初學者",
      programmingLang: "",
      aiSkill: "完全陌生",
      projectExp: "",
      teamRoles: ["創意發想者", "溝通協調", "簡報展示"],
      learningExpectation: "團隊與跨領域合作",
      coreObjective: "",
      skills: {
        programming: 1,
        ai: 1,
        creativity: 4,
        execution: 2,
        communication: 4,
        presentation: 4,
        management: 2
      },
      images: []
    },
    {
      id: 5,
      name: "劉子揚",
      studentId: "B11901038",
      dept: "電機三",
      willingness: "當然!!",
      contact: "0974135871",
      programmingSkill: "略懂皮毛",
      programmingLang: "C++",
      aiSkill: "聽過但不熟",
      projectExp: "",
      teamRoles: ["技術執行"],
      learningExpectation: "設計思考",
      coreObjective: "",
      skills: {
        programming: 2,
        ai: 2,
        creativity: 2,
        execution: 4,
        communication: 2,
        presentation: 2,
        management: 2
      },
      images: []
    },
    {
      id: 6,
      name: "吳發杰",
      studentId: "B13208005",
      dept: "地理一",
      willingness: "當然!!",
      contact: "Email: wmshellfaith@gmail.com",
      programmingSkill: "略懂皮毛",
      programmingLang: "Python",
      aiSkill: "聽過但不熟",
      projectExp: "",
      teamRoles: ["創意發想者", "簡報展示"],
      learningExpectation: "理論以外的實作方法",
      coreObjective: "",
      skills: {
        programming: 2,
        ai: 2,
        creativity: 4,
        execution: 2,
        communication: 2,
        presentation: 4,
        management: 2
      },
      images: []
    },
    {
      id: 7,
      name: "陳彥廷",
      studentId: "B11901168",
      dept: "電機三",
      willingness: "當然!!",
      contact: "https://www.facebook.com/share/1Eyi9Lvf8H/?mibextid=wwXIfr",
      programmingSkill: "略懂皮毛",
      programmingLang: "C++",
      aiSkill: "聽過但不熟",
      projectExp: "",
      teamRoles: ["創意發想者", "溝通協調"],
      learningExpectation: "思考邏輯",
      coreObjective: "",
      skills: {
        programming: 2,
        ai: 2,
        creativity: 4,
        execution: 2,
        communication: 4,
        presentation: 2,
        management: 2
      },
      images: []
    },
    {
      id: 8,
      name: "闕中豪",
      studentId: "B10902076",
      dept: "資工四",
      willingness: "當然!!",
      contact: "b10902076@csie.ntu.edu.tw",
      programmingSkill: "專業碼農",
      programmingLang: "C, Python, Verilog",
      aiSkill: "有實作經驗",
      projectExp: "暑假做過一個語音轉文字摘要軟體，使用Google Gemini, OpenAI Whisper",
      teamRoles: ["技術執行", "邏輯分析"],
      learningExpectation: "團隊合作、問題解決能力",
      coreObjective: "",
      skills: {
        programming: 4,
        ai: 4,
        creativity: 2,
        execution: 4,
        communication: 2,
        presentation: 2,
        management: 2
      },
      images: []
    },
    {
      id: 9,
      name: "施泓伶",
      studentId: "B11207022",
      dept: "心理三",
      willingness: "我考慮考慮",
      contact: "b11207022@ntu.edu.tw / yvonneshih074@gmail.com / 0937051117",
      programmingSkill: "初學者",
      programmingLang: "",
      aiSkill: "完全陌生",
      projectExp: "",
      teamRoles: ["溝通協調", "邏輯分析", "簡報展示", "專案管理"],
      learningExpectation: "團隊專案能力、了解更多相關議題、設計思考",
      coreObjective: "創意發想、表達能力",
      skills: {
        programming: 1,
        ai: 1,
        creativity: 3,
        execution: 2,
        communication: 4,
        presentation: 4,
        management: 4
      },
      images: []
    },
    {
      id: 10,
      name: "徐翊瑛",
      studentId: "B11603032",
      dept: "農化三",
      willingness: "當然!!",
      contact: "b11603032@ntu.edu.tw Line/手機：0982982437",
      programmingSkill: "初學者",
      programmingLang: "Python",
      aiSkill: "完全陌生",
      projectExp: "1.暑期實習作：DAP seq 和PPI（protein-protein interaction)的研究\n2.現在有投大專生計劃 不知道會不會上（？但目前是做將AI預測的抗菌胜肽作抗菌抗癌和水凝膠的研究（多個合作方 以wet lab為主）",
      teamRoles: ["創意發想者", "溝通協調", "簡報展示"],
      learningExpectation: "跨領域學習的合作",
      coreObjective: "能夠和夥伴一起學習",
      skills: {
        programming: 1,
        ai: 1,
        creativity: 4,
        execution: 2,
        communication: 4,
        presentation: 4,
        management: 2
      },
      images: []
    },
    {
      id: 11,
      name: "王羽頡",
      studentId: "R12741049",
      dept: "商研二",
      willingness: "我考慮考慮",
      contact: "topo0740@gmail.com",
      programmingSkill: "略懂皮毛",
      programmingLang: "R, python, SQL",
      aiSkill: "有基礎知識",
      projectExp: "製作選餐廳app",
      teamRoles: ["創意發想者", "溝通協調", "邏輯分析", "簡報展示", "專案管理"],
      learningExpectation: "專案管理，跨領域合作，一些機器學習原理，app或是開發學習",
      coreObjective: "程式開發能力、跨領域合作能力",
      skills: {
        programming: 2,
        ai: 3,
        creativity: 4,
        execution: 2,
        communication: 4,
        presentation: 4,
        management: 4
      },
      images: []
    },
    {
      id: 12,
      name: "賴宥錩",
      studentId: "B11303040",
      dept: "經濟三",
      willingness: "當然!!",
      contact: "手機：0907098936 信箱：youchang0310@gmail.com",
      programmingSkill: "初學者",
      programmingLang: "SQL",
      aiSkill: "聽過但不熟",
      projectExp: "",
      teamRoles: ["溝通協調", "簡報展示", "專案管理"],
      learningExpectation: "如何將自身較為擅長的領域融入長照工程等多元方面，提升跨領域的問題解決能力。",
      coreObjective: "透過與各種不同專業的同學交流來達到多方探索，同時也訓練自己的溝通能力以及創意思考能力。",
      skills: {
        programming: 1,
        ai: 2,
        creativity: 3,
        execution: 2,
        communication: 4,
        presentation: 4,
        management: 4
      },
      images: []
    },
    {
      id: 13,
      name: "陳柏凱",
      studentId: "B11901171",
      dept: "電機三",
      willingness: "當然",
      contact: "b11901171@ntu.edu.tw",
      programmingSkill: "初學者",
      programmingLang: "C++",
      aiSkill: "有基礎知識",
      projectExp: "大一計程的期末專題",
      teamRoles: ['創意發想者','溝通協調','邏輯分析','簡報展示','專案管理'],
      learningExpectation: "以AI、科技來提升人們生活中的體驗、及執行事情的效率",
      coreObjective: "團隊合作能力",
      skills: {
        programming: 2,
        ai: 3,
        creativity: 2,
        execution: 1,
        communication: 2,
        presentation: 2,
        management: 3
      },
      images: []
    },
    {
      id: 14,
      name: "高浩宸",
      studentId: "",
      dept: "電機三",
      willingness: "",
      contact: "",
      programmingSkill: "",
      programmingLang: "",
      aiSkill: "",
      projectExp: "",
      teamRoles: [],
      learningExpectation: "",
      coreObjective: "",
      skills: {
        programming: 1,
        ai: 1,
        creativity: 1,
        execution: 1,
        communication: 1,
        presentation: 1,
        management: 1
      },
      images: []
    },
    {
      id: 15,
      name: "吳竣凱",
      studentId: "b12201033",
      dept: "數學二",
      willingness: "當然!!",
      contact: "b12201033@ntu.edu.tw, Line: shun4midx",
      programmingSkill: "有一定基礎",
      programmingLang: "C/C++, Python, Java, JavaScript/CSS",
      aiSkill: "有基礎知識",
      projectExp: "",
      teamRoles: ["創意發想者", "技術執行", "專案管理"],
      learningExpectation: "我沒試過真的跟人協作，做比一份期末報告還更重大的事情，希望能夠可以有這樣的經驗與人合作，並且體驗什麼是設計思考！",
      coreObjective: "",
      skills: {
        programming: 3,
        ai: 3,
        creativity: 4,
        execution: 4,
        communication: 2,
        presentation: 2,
        management: 4
      },
      images: []
    },
    {
      id: 16,
      name: "陳曼毓",
      studentId: "b11303041",
      dept: "經濟三",
      willingness: "當然!!",
      contact: "0416manyu@gmail.com",
      programmingSkill: "初學者",
      programmingLang: "SQL",
      aiSkill: "聽過但不熟",
      projectExp: "",
      teamRoles: ["創意發想者", "溝通協調", "簡報展示", "專案管理"],
      learningExpectation: "希望能夠學到把創意落地，累積產出實作經驗",
      coreObjective: "",
      skills: {
        programming: 1,
        ai: 2,
        creativity: 4,
        execution: 2,
        communication: 4,
        presentation: 4,
        management: 4
      },
      images: []
    },
    {
      id: 17,
      name: "賴柏澔",
      studentId: "師大 40911011E",
      dept: "學習科學五",
      willingness: "當然!!",
      contact: "ck1050668@gmail.com",
      programmingSkill: "略懂皮毛",
      programmingLang: "Python",
      aiSkill: "有實作經驗",
      projectExp: "LineBot 蘇格拉底式詰問法聊天教學機器人",
      teamRoles: ["創意發想者", "溝通協調", "邏輯分析", "簡報展示", "專案管理"],
      learningExpectation: "如何跟不同專業的人們玩出一個有趣的成品",
      coreObjective: "團隊合作",
      skills: {
        programming: 2,
        ai: 4,
        creativity: 4,
        execution: 2,
        communication: 4,
        presentation: 4,
        management: 4
      },
      images: []
    },
    {
      id: 18,
      name: "戴佑珍",
      studentId: "B09305005",
      dept: "社會四",
      willingness: "當然!!",
      contact: "Email：delesatai@gmail.com、Line ID：delesatai0313",
      programmingSkill: "略懂皮毛",
      programmingLang: "這學期正在學習python！",
      aiSkill: "聽過但不熟",
      projectExp: "先前做過的專題與研究以UI/UX、創新服務設計專案為主！",
      teamRoles: ["創意發想者", "溝通協調", "邏輯分析", "簡報展示", "專案管理"],
      learningExpectation: "先前已具備熟悉設計思考工具與方法論的基礎，希望奠基於該基礎上，強化在實際社會場域中實踐解決問題與原型實作的能力！",
      coreObjective: "1. 定義場域核心問題與需求的能力\n2. 從定義核心問題到落地發展創新解方的能力",
      skills: {
        programming: 2,
        ai: 2,
        creativity: 4,
        execution: 3,
        communication: 4,
        presentation: 4,
        management: 4
      },
      images: []
    },
    {
      id: 19,
      name: "陳品睿",
      studentId: "b11901166",
      dept: "電機三",
      willingness: "當然!!",
      contact: "b11901166@ntu.edu.tw",
      programmingSkill: "有一定基礎",
      programmingLang: "c++",
      aiSkill: "聽過但不熟",
      projectExp: "",
      teamRoles: ["溝通協調", "邏輯分析"],
      learningExpectation: "之前系上修的課都比較偏單打獨鬥、有正確答案的課，第一次接觸這種跨領域和其他人一起思考來解決問題的課，希望可以增進自己和別人合作以及解決問題的能力",
      coreObjective: "",
      skills: {
        programming: 3,
        ai: 2,
        creativity: 2,
        execution: 3,
        communication: 4,
        presentation: 2,
        management: 2
      },
      images: []
    },
    {
      id: 20,
      name: "林容嘉",
      studentId: "師大",
      dept: "師大公領四",
      willingness: "當然!!",
      contact: "Email:41007135e@gapps.ntnu.edu.tw",
      programmingSkill: "初學者",
      programmingLang: "",
      aiSkill: "聽過但不熟",
      projectExp: "",
      teamRoles: ["溝通協調"],
      learningExpectation: "能夠學到與不同背景的人溝通及接收不同領域的言論 進行整合與討論",
      coreObjective: "能夠增加實作與想像空間的能力",
      skills: {
        programming: 1,
        ai: 2,
        creativity: 2,
        execution: 2,
        communication: 4,
        presentation: 2,
        management: 2
      },
      images: []
    },
    {
      id: 21,
      name: "林均翰",
      studentId: "B10901104",
      dept: "電機四",
      willingness: "當然!!",
      contact: "junhanlin17@gmail.com",
      programmingSkill: "略懂皮毛",
      programmingLang: "C++",
      aiSkill: "聽過但不熟",
      projectExp: "",
      teamRoles: ["技術執行", "邏輯分析"],
      learningExpectation: "與不同科系同學合作，化理論為實物",
      coreObjective: "實作能力，溝通能力",
      skills: {
        programming: 2,
        ai: 2,
        creativity: 2,
        execution: 4,
        communication: 3,
        presentation: 2,
        management: 2
      },
      images: []
    }
  ];
  
  // 為每個學生添加圖片路徑
  students.forEach((student, index) => {
    // 使用學生編號來對應圖片
    student.images = [`intro/student_${student.id}.jpg`];
  });
  
  // 分組方案
  const groups = [
    {
      id: 1,
      name: "創新技術組",
      description: "技術與創意結合，跨領域開發",
      members: [8, 3, 18, 1],
      color: "#4f46e5"
    },
    {
      id: 2,
      name: "數據分析組",
      description: "邏輯分析與解決問題能力",
      members: [15, 11, 19, 9],
      color: "#0ea5e9"
    },
    {
      id: 3,
      name: "專案管理組",
      description: "協調溝通與項目執行能力",
      members: [17, 16, 7, 12],
      color: "#8b5cf6"
    },
    {
      id: 4,
      name: "創意設計組",
      description: "創意發想與實作設計能力",
      members: [4, 5, 10, 14],
      color: "#ec4899"
    },
    {
      id: 5,
      name: "實作導向組",
      description: "落地實作與技術整合能力",
      members: [21, 2, 20, 6, 13],
      color: "#f97316"
    }
  ];
  
  // 技能分類與描述
  const skillCategories = [
    { id: "programming", name: "程式設計", icon: "fas fa-code" },
    { id: "ai", name: "AI/ML", icon: "fas fa-robot" },
    { id: "creativity", name: "創意發想", icon: "fas fa-lightbulb" },
    { id: "execution", name: "技術執行", icon: "fas fa-cogs" },
    { id: "communication", name: "溝通協調", icon: "fas fa-comments" },
    { id: "presentation", name: "簡報展示", icon: "fas fa-desktop" },
    { id: "management", name: "專案管理", icon: "fas fa-tasks" }
  ];
  
  // 程式能力等級分類
  const programmingLevels = {
    1: "初學者",
    2: "略懂皮毛",
    3: "有一定基礎",
    4: "專業碼農"
  };
  
  // AI/ML等級分類
  const aiLevels = {
    1: "完全陌生",
    2: "聽過但不熟",
    3: "有基礎知識",
    4: "有實作經驗"
  };
  
  // 角色與標籤
  const roleTags = [
    { score: 12, tag: "全能型人才", color: "#0284c7" },
    { score: 7, tag: "技術專家", color: "#4f46e5" },
    { score: 8, tag: "創意領袖", color: "#ec4899" },
    { score: 8, tag: "專案管理者", color: "#8b5cf6" },
    { score: 7, tag: "溝通協調者", color: "#f97316" }
  ];
  
  // 取得學生的主要角色
  function getStudentRole(student) {
    // 根據技能計算角色傾向
    const progAndExec = student.skills.programming + student.skills.execution;
    const createAndPresent = student.skills.creativity + student.skills.presentation;
    const commAndManage = student.skills.communication + student.skills.management;
    
    // 各項技能加總
    const totalSkills = Object.values(student.skills).reduce((sum, value) => sum + value, 0);
    
    // 決定主要角色
    if (totalSkills >= roleTags[0].score) {
      return roleTags[0];
    } else if (progAndExec >= roleTags[1].score) {
      return roleTags[1];
    } else if (createAndPresent >= roleTags[2].score) {
      return roleTags[2];
    } else if (commAndManage >= roleTags[3].score) {
      return roleTags[3];
    } else if (student.skills.communication >= roleTags[4].score) {
      return roleTags[4];
    } else {
      // 默認角色
      return { tag: "平衡發展", color: "#6b7280" };
    }
  }