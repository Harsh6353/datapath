/* ============================================================
   DataPath – Main App  |  Backend-integrated version
   ============================================================ */

// ─── GUARD: Redirect to login if not authenticated ───────────
(function() {
  try {
    if (!isLoggedIn()) { window.location.href = '/login.html'; }
  } catch(e) { window.location.href = '/login.html'; }
})();
// ─── ROADMAP DATA ────────────────────────────────────────────
const ROADMAP = [
  { id:"phase1", title:"Foundation & Mindset", emoji:"🌱", color:"#10b981", lightColor:"rgba(16,185,129,0.15)", subtitle:"Build the right base before diving deep",
    topics:[
      { id:"p1t1", name:"What is Data Analytics?", desc:"Understand the role, types of analytics, and career path.", tags:["beginner"], details:["Descriptive, Diagnostic, Predictive, Prescriptive analytics","Difference between Data Analyst, Scientist, Engineer","Real-world use cases across industries"], resources:["Google Career Certificates","Kaggle Learn – Intro to Data"] },
      { id:"p1t2", name:"Setting Up Your Learning Environment", desc:"Install essential tools and configure your workspace.", tags:["beginner","tool"], details:["Install Python (Anaconda)","Set up VS Code with Python extensions","Create your first Jupyter Notebook"], resources:["Anaconda.com","VS Code docs"] },
      { id:"p1t3", name:"Basic Mathematics & Logic", desc:"Refresh core math concepts needed for data analysis.", tags:["beginner","math"], details:["Arithmetic, Fractions, Percentages","Basic algebra and functions","Logical thinking and problem-solving"], resources:["Khan Academy – Math","3Blue1Brown YouTube"] },
      { id:"p1t4", name:"Understanding Data Types & Structures", desc:"Learn structured vs unstructured data.", tags:["beginner"], details:["Numeric, Categorical, Ordinal, Boolean types","CSV, JSON, XML formats","Relational vs NoSQL databases overview"], resources:["W3Schools","DataCamp Blog"] }
    ]
  },
  { id:"phase2", title:"Excel & Spreadsheet Mastery", emoji:"📊", color:"#3b82f6", lightColor:"rgba(59,130,246,0.15)", subtitle:"The analyst's first weapon",
    topics:[
      { id:"p2t1", name:"Excel Fundamentals", desc:"Formulas, functions, and data entry best practices.", tags:["beginner","tool"], details:["SUM, AVERAGE, COUNT, IF, VLOOKUP","Cell referencing (absolute vs relative)","Named ranges and data validation"], resources:["ExcelJet.net","Microsoft Learn"] },
      { id:"p2t2", name:"PivotTables & PivotCharts", desc:"Summarize and visualize large datasets quickly.", tags:["intermediate","tool"], details:["Creating PivotTables from scratch","Adding slicers and filters","Dynamic PivotCharts"], resources:["Chandoo.org","Excel Campus"] },
      { id:"p2t3", name:"Advanced Excel Functions", desc:"Master XLOOKUP, INDEX-MATCH, array formulas.", tags:["intermediate","tool"], details:["XLOOKUP, INDEX/MATCH","Array formulas and dynamic arrays","Power Query basics"], resources:["ExcelJet","MyOnlineTrainingHub"] },
      { id:"p2t4", name:"Data Cleaning in Excel", desc:"Handle missing values, duplicates, and inconsistencies.", tags:["intermediate"], details:["Remove duplicates, TRIM, CLEAN","Text-to-Columns and Flash Fill","Conditional Formatting for inspection"], resources:["Excel Easy","Contextures Blog"] }
    ]
  },
  { id:"phase3", title:"SQL & Database Querying", emoji:"🗄", color:"#f97316", lightColor:"rgba(249,115,22,0.15)", subtitle:"Talk to databases like a pro",
    topics:[
      { id:"p3t1", name:"SQL Basics", desc:"SELECT, WHERE, ORDER BY, and filtering data.", tags:["beginner","tool"], details:["SELECT, FROM, WHERE clauses","ORDER BY, LIMIT, DISTINCT","Filtering with AND, OR, NOT, IN, BETWEEN"], resources:["SQLZoo.net","Mode Analytics SQL Tutorial"] },
      { id:"p3t2", name:"Joins & Relationships", desc:"Combine data from multiple tables.", tags:["intermediate","tool"], details:["INNER JOIN, LEFT/RIGHT JOIN, FULL OUTER JOIN","Understanding primary and foreign keys"], resources:["W3Schools SQL Joins","Leetcode SQL"] },
      { id:"p3t3", name:"Aggregations & Grouping", desc:"GROUP BY, HAVING, aggregate functions.", tags:["intermediate"], details:["COUNT, SUM, AVG, MIN, MAX","GROUP BY and HAVING clauses","Subqueries"], resources:["SQLBolt","HackerRank SQL"] },
      { id:"p3t4", name:"Window Functions & CTEs", desc:"Advanced SQL for analytical queries.", tags:["advanced"], details:["ROW_NUMBER, RANK, DENSE_RANK","LAG, LEAD, FIRST_VALUE","WITH clause (CTEs)"], resources:["PostgreSQL docs","Mode Analytics"] }
    ]
  },
  { id:"phase4", title:"Python for Data Analysis", emoji:"🐍", color:"#8b5cf6", lightColor:"rgba(139,92,246,0.15)", subtitle:"Automate, explore, and analyze at scale",
    topics:[
      { id:"p4t1", name:"Python Basics", desc:"Variables, data types, control flow, functions.", tags:["beginner","tool"], details:["Variables, strings, lists, dicts, tuples","For loops, conditionals","Functions, lambda, list comprehensions"], resources:["Python.org Tutorial","Automate the Boring Stuff"] },
      { id:"p4t2", name:"NumPy & Arrays", desc:"Fast numerical computing with NumPy arrays.", tags:["intermediate","tool","math"], details:["Creating and indexing ndarray","Array operations and broadcasting","Linear algebra basics"], resources:["NumPy Documentation","Real Python"] },
      { id:"p4t3", name:"Pandas – Data Wrangling", desc:"Load, clean, transform, and merge DataFrames.", tags:["intermediate","tool"], details:["DataFrame creation and indexing","groupby, merge, pivot_table","Handling nulls, apply()"], resources:["Pandas Documentation","Kaggle Pandas"] },
      { id:"p4t4", name:"Data Cleaning with Python", desc:"Systematic approach to cleaning messy data.", tags:["intermediate"], details:["Detecting and handling missing values","Outlier detection","String cleaning with regex"], resources:["Towards Data Science","Real Python"] },
      { id:"p4t5", name:"Exploratory Data Analysis", desc:"Uncover patterns and insights from raw data.", tags:["intermediate"], details:["Summary statistics","Correlation analysis","Univariate and bivariate analysis"], resources:["Kaggle EDA notebooks","DataCamp"] }
    ]
  },
  { id:"phase5", title:"Data Visualization", emoji:"🎨", color:"#ec4899", lightColor:"rgba(236,72,153,0.15)", subtitle:"Tell compelling stories with data",
    topics:[
      { id:"p5t1", name:"Matplotlib Fundamentals", desc:"Create line, bar, scatter, histogram plots.", tags:["beginner","tool"], details:["plt.plot(), plt.bar(), plt.scatter()","Customizing colors, labels, legends","Subplots"], resources:["Matplotlib.org","Real Python"] },
      { id:"p5t2", name:"Seaborn for Statistical Plots", desc:"Beautiful statistical visualizations.", tags:["intermediate","tool"], details:["sns.heatmap, barplot, boxplot, pairplot","FacetGrid for multi-panel plots","Styling with themes"], resources:["Seaborn Documentation","DataCamp"] },
      { id:"p5t3", name:"Tableau / Power BI", desc:"Build interactive dashboards without coding.", tags:["intermediate","tool"], details:["Connecting to data sources","Building charts and dashboards","Filters, parameters, calculated fields"], resources:["Tableau Public","Microsoft Power BI Learn"] },
      { id:"p5t4", name:"Dashboard Design Principles", desc:"Design dashboards that communicate clearly.", tags:["intermediate"], details:["Choosing the right chart type","Color theory for data","Storytelling narrative flow"], resources:["Storytelling with Data","Information is Beautiful"] }
    ]
  },
  { id:"phase6", title:"Statistics & Probability", emoji:"📐", color:"#facc15", lightColor:"rgba(250,204,21,0.15)", subtitle:"The science behind data decisions",
    topics:[
      { id:"p6t1", name:"Descriptive Statistics", desc:"Mean, median, mode, variance, standard deviation.", tags:["beginner","math"], details:["Measures of central tendency","Measures of spread: variance, IQR","Skewness and kurtosis"], resources:["Khan Academy Statistics","StatQuest YouTube"] },
      { id:"p6t2", name:"Probability Fundamentals", desc:"Classical probability, Bayes' theorem.", tags:["intermediate","math"], details:["Sample spaces, events, probability rules","Conditional probability and Bayes","Expected value and variance"], resources:["StatQuest","3Blue1Brown"] },
      { id:"p6t3", name:"Probability Distributions", desc:"Normal, Binomial, Poisson, and more.", tags:["intermediate","math"], details:["Normal distribution and Z-scores","Binomial and Poisson distributions","Central Limit Theorem"], resources:["Khan Academy","Seeing Theory – Brown University"] },
      { id:"p6t4", name:"Hypothesis Testing", desc:"A/B testing, t-tests, chi-square, p-values.", tags:["advanced","math"], details:["Null vs alternative hypothesis","Type I/II errors","t-test, chi-square, ANOVA"], resources:["StatQuest","Towards Data Science"] }
    ]
  },
  { id:"phase7", title:"Advanced Analytics & ML Basics", emoji:"🤖", color:"#22d3ee", lightColor:"rgba(34,211,238,0.15)", subtitle:"Take your skills to the next level",
    topics:[
      { id:"p7t1", name:"Linear & Logistic Regression", desc:"Predict outcomes using regression models.", tags:["advanced","math"], details:["Simple and multiple linear regression","Logistic regression for classification","Model evaluation: R², RMSE, accuracy"], resources:["Scikit-learn docs","StatQuest Regression"] },
      { id:"p7t2", name:"Clustering Techniques", desc:"K-Means, hierarchical clustering.", tags:["advanced"], details:["K-Means algorithm step-by-step","Elbow Method for choosing k","Interpreting clusters for business insights"], resources:["Scikit-learn","Towards Data Science"] },
      { id:"p7t3", name:"Time Series Analysis", desc:"Analyze trends, seasonality, and forecasting.", tags:["advanced","math"], details:["Decomposition: trend + seasonal + residual","Moving averages and exponential smoothing","ARIMA model basics"], resources:["statsmodels docs","Forecasting: Principles and Practice"] },
      { id:"p7t4", name:"Portfolio & Case Studies", desc:"Build real projects to showcase your skills.", tags:["beginner"], details:["EDA project on Kaggle","SQL analytics on real dataset","Interactive dashboard"], resources:["Kaggle Datasets","Maven Analytics"] }
    ]
  }
];

const QUIZ_BANK = {
  phase1:{ name:"Foundation", icon:"🌱", color:"#10b981", questions:[
    { q:"Which analytics type answers 'What happened?'", opts:["Predictive","Descriptive","Prescriptive","Diagnostic"], ans:1 },
    { q:"EDA stands for:", opts:["Extended Data Algorithm","Exploratory Data Analysis","Extracted Data Array","Evaluated Data Approach"], ans:1 },
    { q:"Which format stores data as key-value pairs?", opts:["CSV","XLSX","JSON","SQL"], ans:2 },
    { q:"Which analytics type answers 'What should we do?'", opts:["Predictive","Descriptive","Prescriptive","Diagnostic"], ans:2 },
    { q:"A Data Analyst primarily works with:", opts:["Hardware circuits","Structured and semi-structured data","Mobile app development","Networking protocols"], ans:1 }
  ]},
  phase2:{ name:"Excel", icon:"📊", color:"#3b82f6", questions:[
    { q:"Which Excel function looks up a value in a column?", opts:["SUMIF","VLOOKUP","COUNTIF","INDEX"], ans:1 },
    { q:"What does an absolute cell reference look like?", opts:["A1","$A$1","A$1","*A1"], ans:1 },
    { q:"Which feature summarizes data interactively?", opts:["Flash Fill","PivotTable","CONCATENATE","Power Query"], ans:1 },
    { q:"XLOOKUP replaces which older function?", opts:["SUMIF","FILTER","VLOOKUP","COUNTIFS"], ans:2 },
    { q:"Which Excel tool is used for ETL external data?", opts:["PivotChart","Macro","Power Query","Flash Fill"], ans:2 }
  ]},
  phase3:{ name:"SQL", icon:"🗄", color:"#f97316", questions:[
    { q:"Which clause filters rows in SQL?", opts:["GROUP BY","ORDER BY","WHERE","HAVING"], ans:2 },
    { q:"Which JOIN returns all rows from both tables?", opts:["INNER JOIN","LEFT JOIN","FULL OUTER JOIN","CROSS JOIN"], ans:2 },
    { q:"Which SQL function counts non-NULL values?", opts:["SUM()","MAX()","COUNT()","AVG()"], ans:2 },
    { q:"CTE stands for:", opts:["Common Table Expression","Central Type Extractor","Counted Table Entity","Column Type Enum"], ans:0 },
    { q:"Which clause filters after GROUP BY?", opts:["WHERE","FILTER","HAVING","DISTINCT"], ans:2 },
    { q:"ROW_NUMBER() is a type of:", opts:["Aggregate function","Scalar function","Window function","Stored procedure"], ans:2 }
  ]},
  phase4:{ name:"Python", icon:"🐍", color:"#8b5cf6", questions:[
    { q:"Which library is used for numerical arrays in Python?", opts:["Pandas","Matplotlib","NumPy","Seaborn"], ans:2 },
    { q:"df.groupby('col').agg() is used for:", opts:["Sorting data","Aggregating grouped data","Filtering rows","Reshaping columns"], ans:1 },
    { q:"What does df.dropna() do?", opts:["Drops all columns","Fills missing values","Removes rows with NaN","Renames columns"], ans:2 },
    { q:"Which Pandas method shows summary statistics?", opts:["df.head()","df.info()","df.describe()","df.shape"], ans:2 },
    { q:"Lambda functions in Python are:", opts:["Multi-line named functions","Anonymous single-expression functions","Async functions","Recursive functions"], ans:1 }
  ]},
  phase5:{ name:"Visualization", icon:"🎨", color:"#ec4899", questions:[
    { q:"Which chart is best for showing distribution?", opts:["Pie chart","Line chart","Histogram","Scatter plot"], ans:2 },
    { q:"Which library creates statistical visualizations easily?", opts:["Matplotlib","Plotly","Seaborn","Bokeh"], ans:2 },
    { q:"A scatter plot shows:", opts:["Proportions of a whole","Relationship between two continuous variables","Change over time","Ranking"], ans:1 },
    { q:"Which chart type is BAD for more than 5 categories?", opts:["Bar chart","Scatter plot","Pie chart","Histogram"], ans:2 },
    { q:"sns.heatmap() requires:", opts:["A list","A correlation matrix or 2D array","A series","A tuple"], ans:1 }
  ]},
  phase6:{ name:"Statistics", icon:"📐", color:"#facc15", questions:[
    { q:"The median is:", opts:["Most frequent value","Average value","Middle value","The range"], ans:2 },
    { q:"A p-value < 0.05 means:", opts:["Accept the null hypothesis","Reject the null hypothesis","Inconclusive result","Data is biased"], ans:1 },
    { q:"Standard deviation measures:", opts:["Central tendency","Spread of data","Frequency","Correlation"], ans:1 },
    { q:"Which distribution is bell-shaped and symmetric?", opts:["Poisson","Binomial","Normal","Exponential"], ans:2 },
    { q:"~68% of data in a normal distribution falls within:", opts:["1 standard deviation","2 standard deviations","3 standard deviations","The IQR"], ans:0 }
  ]},
  phase7:{ name:"Advanced Analytics", icon:"🤖", color:"#22d3ee", questions:[
    { q:"Linear regression predicts:", opts:["A categorical label","A continuous numeric value","A cluster group","A probability only"], ans:1 },
    { q:"K-Means is used for:", opts:["Classification","Regression","Clustering","Dimensionality reduction"], ans:2 },
    { q:"RMSE stands for:", opts:["Random Mean Squared Error","Root Mean Squared Error","Relative Mean Sample Estimate","Row-level Mean Square Estimation"], ans:1 },
    { q:"Time series decomposition separates:", opts:["Train and test sets","Trend, Seasonality, Residual","Rows and columns","Features and labels"], ans:1 },
    { q:"Logistic regression output is:", opts:["A continuous value","A cluster label","A probability between 0 and 1","A ranking"], ans:2 }
  ]}
};

const RESOURCES = [
  { icon:"🎓", name:"Google Data Analytics Certificate", cat:"Course", desc:"Industry-recognized certification covering the full data analytics workflow.", url:"https://coursera.org/professional-certificates/google-data-analytics" },
  { icon:"🐍", name:"Kaggle Learn", cat:"Free Course", desc:"Free micro-courses on Python, Pandas, SQL, Data Visualization, and ML.", url:"https://www.kaggle.com/learn" },
  { icon:"📊", name:"Mode Analytics SQL Tutorial", cat:"SQL", desc:"Hands-on SQL tutorial with real datasets.", url:"https://mode.com/sql-tutorial/" },
  { icon:"📈", name:"StatQuest with Josh Starmer", cat:"YouTube", desc:"Crystal-clear stats and ML explanations.", url:"https://www.youtube.com/@statquest" },
  { icon:"📚", name:"Storytelling with Data (Book)", cat:"Book", desc:"The go-to guide for effective data visualizations.", url:"https://www.storytellingwithdata.com/" },
  { icon:"🔢", name:"Khan Academy – Statistics", cat:"Free Course", desc:"Free, comprehensive statistics course.", url:"https://www.khanacademy.org/math/statistics-probability" },
  { icon:"💻", name:"LeetCode – SQL Problems", cat:"Practice", desc:"SQL interview problems curated for data analysts.", url:"https://leetcode.com/problemset/database/" },
  { icon:"🌐", name:"Towards Data Science", cat:"Blog", desc:"Articles on data analysis, ML, and Python.", url:"https://towardsdatascience.com/" },
  { icon:"🏆", name:"DataCamp", cat:"Platform", desc:"Structured career tracks with interactive exercises.", url:"https://www.datacamp.com" },
  { icon:"📉", name:"3Blue1Brown – Math", cat:"YouTube", desc:"Visual, intuitive math explanations.", url:"https://www.youtube.com/@3blue1brown" },
  { icon:"🔍", name:"Kaggle Datasets", cat:"Data", desc:"Thousands of free datasets for practice projects.", url:"https://www.kaggle.com/datasets" },
  { icon:"🗂", name:"Tidy Data by Hadley Wickham", cat:"Paper", desc:"Classic paper defining the principles of clean data.", url:"https://vita.had.co.nz/papers/tidy-data.html" }
];

// ─── STATE ───────────────────────────────────────────────────
let state = {
  completed: {}, notes: [], goals: {}, quizBest: {},
  quizHistory: [], activity: [], streak: 0, lastDate: null,
  userName: "Data Analyst", heatmap: {}, theme: "dark"
};

// ─── UTILS ───────────────────────────────────────────────────
function today()  { return new Date().toISOString().slice(0,10); }
function now()    { return new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}); }
function fmtDate(d) { return new Date(d).toLocaleDateString(undefined,{month:'short',day:'numeric'}); }
function uid()    { return Math.random().toString(36).slice(2,9); }

function showToast(msg, type="info") {
  const t = document.getElementById("toast");
  t.textContent = msg; t.className = `toast show ${type}`;
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("show"), 2800);
}

// ─── THEME ───────────────────────────────────────────────────
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  state.theme = theme;
  document.getElementById('themeIcon').textContent = theme === 'dark' ? '🌙' : '';
  document.getElementById('themeIconSun').textContent = theme === 'dark' ? '' : '☀️';
  localStorage.setItem('dp_theme', theme);
}

document.getElementById('themeToggle').addEventListener('click', () => {
  const next = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  saveSettings();
});

// ─── API SYNC ─────────────────────────────────────────────────
// Fetch with a 5-second timeout so the app never gets stuck
function fetchWithTimeout(url, options, ms = 5000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))
  ]);
}

async function safeGet(endpoint) {
  try {
    const token = getToken();
    const res = await fetchWithTimeout(`http://localhost:3001/api${endpoint}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch(e) { return null; }
}

async function loadFromServer() {
  // Load each piece independently so one failure doesn't block others
  const [progRes, notesRes, goalsRes, quizBestRes, quizHistRes, settingsRes] = await Promise.all([
    safeGet('/progress'), safeGet('/notes'), safeGet('/goals'),
    safeGet('/quiz/best'), safeGet('/quiz/history'), safeGet('/settings')
  ]);
  if (progRes)     state.completed   = progRes.progress || {};
  if (notesRes)    state.notes       = notesRes.notes   || [];
  if (goalsRes)    state.goals       = goalsRes.goals   || {};
  if (quizBestRes) state.quizBest    = quizBestRes.best || {};
  if (quizHistRes) state.quizHistory = quizHistRes.history || [];
  if (settingsRes?.settings) {
    const s = settingsRes.settings;
    state.userName = s.display_name || state.userName;
    state.streak   = s.streak  || 0;
    state.lastDate = s.last_date;
    state.heatmap  = s.heatmap || {};
    state.activity = s.activity || [];
    state.theme    = s.theme   || 'dark';
  }
}

async function saveSettings() {
  try {
    await apiPost('/settings', {
      display_name: state.userName, streak: state.streak,
      last_date: state.lastDate, heatmap: state.heatmap,
      activity: state.activity, theme: state.theme
    });
  } catch(e) { /* ignore save errors */ }
}

// ─── ACTIVITY ─────────────────────────────────────────────────
async function addActivity(icon, text) {
  state.activity.unshift({ icon, text, time: now() });
  if (state.activity.length > 20) state.activity.pop();
  state.heatmap[today()] = (state.heatmap[today()] || 0) + 1;
  await saveSettings();
  renderActivity();
}

function updateStreak() {
  const t = today();
  if (state.lastDate !== t) {
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate()-1);
    const yStr = yesterday.toISOString().slice(0,10);
    state.streak = (state.lastDate === yStr) ? (state.streak||0)+1 : 1;
    state.lastDate = t;
    saveSettings();
  }
  document.getElementById('streakCount').textContent = state.streak;
}

// ─── NAVIGATION ───────────────────────────────────────────────
let currentSection = 'dashboard';
function navigate(section) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.getElementById(`section-${section}`)?.classList.add('active');
  document.getElementById(`nav-${section}`)?.classList.add('active');
  const titles = {dashboard:'Dashboard',roadmap:'Roadmap',notes:'My Notes',practice:'Practice Zone',resources:'Resources',stats:'Statistics'};
  document.getElementById('pageTitle').textContent = titles[section] || section;
  currentSection = section;
  if (section==='dashboard') refreshDashboard();
  if (section==='stats')     renderStats();
  if (section==='notes')     renderNotes();
  if (section==='practice')  renderQuizLobby();
  if (section==='resources') renderResources();
  if (window.innerWidth<=768) document.getElementById('sidebar').classList.remove('mobile-open');
}

document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', e => { e.preventDefault(); navigate(l.dataset.section); }));
document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('collapsed');
  document.getElementById('mainContent').classList.toggle('expanded');
});
document.getElementById('mobileMenuBtn').addEventListener('click', () => document.getElementById('sidebar').classList.toggle('mobile-open'));

// ─── GREETING ─────────────────────────────────────────────────
function setGreeting() {
  const h = new Date().getHours();
  const g = h<12?'Good Morning':h<17?'Good Afternoon':'Good Evening';
  document.getElementById('welcomeGreeting').textContent = `${g}, ${state.userName}! 👋`;
  document.getElementById('userNameDisplay').textContent = state.userName;
  const av = state.userName.slice(0,2).toUpperCase();
  document.getElementById('userAvatarSidebar').textContent = av;
}

// ─── DASHBOARD ────────────────────────────────────────────────
function refreshDashboard() {
  setGreeting();
  const allT = ROADMAP.flatMap(p => p.topics);
  const total = allT.length;
  const done  = allT.filter(t => state.completed[t.id]).length;
  const pct   = total ? Math.round((done/total)*100) : 0;
  document.getElementById('overallPct').textContent = pct+'%';
  document.getElementById('topicsCompleted').textContent = done;
  document.getElementById('notesCount').textContent = state.notes.length;
  if (state.quizHistory.length) {
    const avg = Math.round(state.quizHistory.reduce((a,q)=>a+q.pct,0)/state.quizHistory.length);
    document.getElementById('quizScore').textContent = avg+'%';
  }
  document.getElementById('ringFill').style.strokeDasharray = `${pct} 100`;
  const c = document.getElementById('phaseProgressBars');
  c.innerHTML = ROADMAP.map(phase => {
    const t2 = phase.topics.length, d2 = phase.topics.filter(t=>state.completed[t.id]).length;
    const p2 = t2?Math.round((d2/t2)*100):0;
    return `<div class="phase-row">
      <div class="phase-row-header"><span class="phase-name">${phase.emoji} ${phase.title}</span><span class="phase-pct">${d2}/${t2}</span></div>
      <div class="progress-track"><div class="progress-fill" style="width:${p2}%;background:${phase.color}"></div></div>
    </div>`;
  }).join('');
  const todayGoals = state.goals[today()] || {};
  ['study','quiz','note','topic'].forEach(g => {
    const cb = document.getElementById(`g${g.charAt(0).toUpperCase()+g.slice(1)}`);
    const row = document.getElementById(`goal-${g}`);
    if (cb) { cb.checked = !!todayGoals[g]; row.classList.toggle('done', !!todayGoals[g]); }
  });
  renderActivity();
}

async function toggleGoal(key, val) {
  if (!state.goals[today()]) state.goals[today()] = {};
  state.goals[today()][key] = val;
  document.getElementById(`goal-${key}`)?.classList.toggle('done', val);
  await apiPost('/goals', { date: today(), goals: state.goals[today()] });
  if (val) addActivity('✅', `Completed daily goal: ${key}`);
}

function renderActivity() {
  const el = document.getElementById('recentActivity');
  if (!state.activity.length) { el.innerHTML = `<div class="empty-state-small">No activity yet. Start learning!</div>`; return; }
  el.innerHTML = state.activity.slice(0,8).map(a =>
    `<div class="activity-item"><span class="activity-icon">${a.icon}</span><span class="activity-text">${a.text}</span><span class="activity-time">${a.time}</span></div>`
  ).join('');
}

// ─── ROADMAP ──────────────────────────────────────────────────
function renderRoadmap() {
  const container = document.getElementById('roadmapContainer');
  // Populate note selects
  const allTopics = ROADMAP.flatMap(p => p.topics);
  document.getElementById('noteFilterTopic').innerHTML =
    `<option value="all">All Topics</option>` + allTopics.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
  document.getElementById('noteTopicSelect').innerHTML =
    `<option value="General">General</option>` + allTopics.map(t => `<option value="${t.id}">${t.name}</option>`).join('');

  container.innerHTML = `
    <div class="road-journey">

      <!-- START SIGN -->
      <div class="road-terminus road-start">
        <div class="terminus-sign start-sign">🚀 START YOUR JOURNEY</div>
        <div class="terminus-post"></div>
      </div>

      ${ROADMAP.map((phase, idx) => {
        const total   = phase.topics.length;
        const done    = phase.topics.filter(t => state.completed[t.id]).length;
        const pct     = total ? Math.round((done / total) * 100) : 0;
        const isRight = idx % 2 === 0;
        const isDone  = done === total && total > 0;
        const isActive = done > 0 && !isDone;

        const topicsHTML = phase.topics.map(t => {
          const d = state.completed[t.id];
          return `
            <div class="rt-topic ${d ? 'rt-done' : ''}" onclick="openTopicModal('${t.id}')">
              <div class="rt-status-dot" style="background:${d ? '#10b981' : 'transparent'};border:2px solid ${d ? '#10b981' : phase.color}">
                ${d ? '<span class="rt-check">✓</span>' : ''}
              </div>
              <div class="rt-topic-body">
                <div class="rt-name">${t.name}</div>
                <div class="rt-desc">${t.desc}</div>
                <div class="rt-tags">${t.tags.map(tg => `<span class="tag tag-${tg}">${tg}</span>`).join('')}</div>
              </div>
            </div>`;
        }).join('');

        return `
          <!-- Road segment before checkpoint -->
          <div class="road-pipe ${done > 0 ? 'pipe-active' : ''}">
            <div class="pipe-left-edge"></div>
            <div class="pipe-dash-lane">
              <div class="pipe-dashes"></div>
            </div>
            <div class="pipe-right-edge"></div>
          </div>

          <!-- Checkpoint intersection row -->
          <div class="road-intersection ${isRight ? 'branch-right' : 'branch-left'}">

            ${!isRight ? `
            <!-- Topics on LEFT side -->
            <div class="topics-wing wing-left">
              <div class="wing-topics">${topicsHTML}</div>
              <div class="wing-branch" style="background:linear-gradient(to left,transparent,${phase.color}55)">
                <div class="branch-traveler" style="background:${phase.color}"></div>
              </div>
            </div>
            ` : `<div class="wing-spacer"></div>`}

            <!-- Central orb checkpoint -->
            <div class="cp-column">
              <div class="cp-orb ${isDone ? 'orb-complete' : isActive ? 'orb-active' : ''}"
                   style="border-color:${phase.color};box-shadow:0 0 ${isDone?40:isActive?25:12}px ${phase.color}${isDone?'99':isActive?'66':'33'}">
                <div class="cp-orb-inner" style="background:radial-gradient(circle at 35% 35%,${phase.color}44,${phase.color}11)">
                  <span class="cp-emoji">${phase.emoji}</span>
                </div>
                ${isDone ? '<div class="cp-done-pulse" style="border-color:'+phase.color+'"></div>' : ''}
              </div>
              <div class="cp-info-box" style="border-color:${phase.color}44">
                <div class="cp-phase-label" style="color:${phase.color}">Phase ${idx + 1}</div>
                <div class="cp-phase-name">${phase.title}</div>
                <div class="cp-pct-row">
                  <div class="cp-bar-track">
                    <div class="cp-bar-fill" style="width:${pct}%;background:${phase.color}"></div>
                  </div>
                  <span class="cp-pct-txt" style="color:${phase.color}">${done}/${total}</span>
                </div>
              </div>
            </div>

            ${isRight ? `
            <!-- Topics on RIGHT side -->
            <div class="topics-wing wing-right">
              <div class="wing-branch" style="background:linear-gradient(to right,transparent,${phase.color}55)">
                <div class="branch-traveler" style="background:${phase.color}"></div>
              </div>
              <div class="wing-topics">${topicsHTML}</div>
            </div>
            ` : `<div class="wing-spacer"></div>`}

          </div>`;
      }).join('')}

      <!-- Final road segment -->
      <div class="road-pipe pipe-active">
        <div class="pipe-left-edge"></div>
        <div class="pipe-dash-lane"><div class="pipe-dashes"></div></div>
        <div class="pipe-right-edge"></div>
      </div>

      <!-- FINISH SIGN -->
      <div class="road-terminus road-finish">
        <div class="terminus-post"></div>
        <div class="terminus-sign finish-sign">🏆 DATA ANALYST ACHIEVED!</div>
      </div>
    </div>`;

  // Attach click listeners to topic items
  container.querySelectorAll('.rt-topic').forEach(el => {
    el.addEventListener('click', () => openTopicModal(el.getAttribute('onclick').match(/'([^']+)'/)[1]));
    el.removeAttribute('onclick');
  });
}

// Topic modal
let currentTopicId = null;
function openTopicModal(tid) {
  currentTopicId = tid;
  const topic = ROADMAP.flatMap(p=>p.topics).find(t=>t.id===tid);
  if (!topic) return;
  document.getElementById('topicModalTitle').textContent = topic.name;
  const isDone = state.completed[tid];
  const btn = document.getElementById('markTopicDone');
  btn.textContent = isDone ? '✕ Mark Incomplete' : '✓ Mark Complete';
  btn.style.background = isDone ? 'rgba(239,68,68,0.25)' : '';
  const relNotes = state.notes.filter(n => n.topic === tid);
  document.getElementById('topicModalBody').innerHTML = `
    <div class="topic-meta-chips">${topic.tags.map(tg=>`<span class="tag tag-${tg}">${tg}</span>`).join('')}</div>
    <div class="topic-detail-section"><h4>📋 What You'll Learn</h4><ul>${topic.details.map(d=>`<li>${d}</li>`).join('')}</ul></div>
    <div class="topic-detail-section"><h4>📚 Resources</h4><ul>${topic.resources.map(r=>`<li>${r}</li>`).join('')}</ul></div>
    <div class="topic-detail-section"><h4>📝 Your Notes (${relNotes.length})</h4>
      <div class="topic-notes-preview">${relNotes.length ? relNotes.map(n=>`<div style="margin-bottom:0.4rem"><strong>${n.title}</strong><br><span style="font-size:0.8rem;color:var(--text-muted)">${(n.content||'').slice(0,90)}…</span></div>`).join('') : 'No notes yet for this topic.'}</div>
    </div>`;
  document.getElementById('topicModal').classList.add('open');
}

document.getElementById('closeTopicModal').addEventListener('click', () => document.getElementById('topicModal').classList.remove('open'));
document.getElementById('markTopicDone').addEventListener('click', async () => {
  if (!currentTopicId) return;
  const wasCompleted = !!state.completed[currentTopicId];
  if (wasCompleted) { delete state.completed[currentTopicId]; showToast('Topic marked incomplete','info'); }
  else { state.completed[currentTopicId] = true; showToast('🎉 Topic complete!','success'); }
  await apiPost('/progress', { topicId: currentTopicId, completed: !wasCompleted });
  const name = ROADMAP.flatMap(p=>p.topics).find(t=>t.id===currentTopicId)?.name || '';
  await addActivity(wasCompleted?'↩':'✅', `${wasCompleted?'Unmarked':'Completed'}: ${name}`);
  renderRoadmap(); refreshDashboard();
  document.getElementById('topicModal').classList.remove('open');
});
document.getElementById('addNoteFromTopic').addEventListener('click', () => {
  document.getElementById('topicModal').classList.remove('open');
  openNoteModal(null, currentTopicId);
  navigate('notes');
});

// ─── NOTES ────────────────────────────────────────────────────
function renderNotes() {
  const search = document.getElementById('noteSearch').value.toLowerCase();
  const filterTopic = document.getElementById('noteFilterTopic').value;
  const tagColors = { Concept:'#3b82f6', Formula:'#facc15', Tip:'#10b981', Important:'#ef4444', Question:'#8b5cf6' };
  const filtered = state.notes.filter(n => {
    const ms = n.title.toLowerCase().includes(search)||n.content.toLowerCase().includes(search);
    const mt = filterTopic==='all'||n.topic===filterTopic;
    return ms && mt;
  });
  const grid = document.getElementById('notesGrid');
  if (!filtered.length) { grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:3rem">${state.notes.length?'No notes match your search.':'No notes yet! Click "+ New Note" to start.'}</div>`; return; }
  grid.innerHTML = filtered.map(n => {
    const tName = n.topic==='General'?'General':(ROADMAP.flatMap(p=>p.topics).find(t=>t.id===n.topic)?.name||n.topic);
    return `<div class="note-card" data-tag="${n.tag}" onclick="openNoteModal('${n.id}')">
      <div class="note-card-header"><div class="note-card-title">${n.title}</div><button class="note-delete-btn" onclick="deleteNote(event,'${n.id}')">🗑</button></div>
      <div class="note-card-topic">📌 ${tName}</div>
      <div class="note-card-content">${n.content||''}</div>
      <div class="note-card-footer">
        <span class="note-tag" style="background:${tagColors[n.tag]||'#666'}22;color:${tagColors[n.tag]||'#aaa'}">${n.tag}</span>
        <span class="note-date">${fmtDate(n.created_at||n.date||new Date())}</span>
      </div>
    </div>`;
  }).join('');
}

function openNoteModal(noteId, presetTopicId=null) {
  const modal = document.getElementById('noteModal');
  const note = noteId && state.notes.find(n=>n.id===noteId);
  document.getElementById('noteModalTitle').textContent = note ? 'Edit Note' : 'New Note';
  document.getElementById('noteTitleInput').value   = note ? note.title : '';
  document.getElementById('noteTopicSelect').value  = note ? (note.topic||'General') : (presetTopicId||'General');
  document.getElementById('noteTagSelect').value    = note ? (note.tag||'Concept') : 'Concept';
  document.getElementById('noteContentInput').value = note ? note.content : '';
  document.getElementById('saveNoteBtn').dataset.editId = note ? noteId : '';
  modal.classList.add('open');
}

document.getElementById('newNoteBtn').addEventListener('click', () => openNoteModal(null));
document.getElementById('closeNoteModal').addEventListener('click', () => document.getElementById('noteModal').classList.remove('open'));
document.getElementById('cancelNoteBtn').addEventListener('click', () => document.getElementById('noteModal').classList.remove('open'));

document.getElementById('saveNoteBtn').addEventListener('click', async () => {
  const title   = document.getElementById('noteTitleInput').value.trim();
  const content = document.getElementById('noteContentInput').value.trim();
  if (!title||!content) { showToast('Please fill in title and content','error'); return; }
  const editId  = document.getElementById('saveNoteBtn').dataset.editId;
  const now2 = new Date().toISOString();
  if (editId) {
    const n = state.notes.find(n=>n.id===editId);
    if (n) { n.title=title; n.content=content; n.topic=document.getElementById('noteTopicSelect').value; n.tag=document.getElementById('noteTagSelect').value; n.updated_at=now2; }
    await apiPost('/notes', { id:editId, title, topic:document.getElementById('noteTopicSelect').value, tag:document.getElementById('noteTagSelect').value, content, created_at:n?.created_at||now2, updated_at:now2 });
    showToast('Note updated! ✏️','success');
    await addActivity('📝', `Updated note: ${title}`);
  } else {
    const id = uid();
    const newNote = { id, title, topic:document.getElementById('noteTopicSelect').value, tag:document.getElementById('noteTagSelect').value, content, created_at:now2, updated_at:now2 };
    state.notes.unshift(newNote);
    await apiPost('/notes', newNote);
    showToast('Note saved! 📝','success');
    await addActivity('📝', `Added note: ${title}`);
  }
  document.getElementById('noteModal').classList.remove('open');
  renderNotes();
  if (currentSection==='dashboard') refreshDashboard();
});

async function deleteNote(e, id) {
  e.stopPropagation();
  if (!confirm('Delete this note?')) return;
  state.notes = state.notes.filter(n=>n.id!==id);
  await apiDelete(`/notes/${id}`);
  renderNotes();
  showToast('Note deleted','info');
}

document.getElementById('noteSearch').addEventListener('input', renderNotes);
document.getElementById('noteFilterTopic').addEventListener('change', renderNotes);

// ─── QUIZ ─────────────────────────────────────────────────────
let quizState = { phase:null, questions:[], current:0, score:0, answered:false };

function renderQuizLobby() {
  document.getElementById('quizLobby').classList.remove('hidden');
  document.getElementById('quizArena').classList.add('hidden');
  document.getElementById('quizResults').classList.add('hidden');
  document.getElementById('quizCategoryGrid').innerHTML = Object.entries(QUIZ_BANK).map(([key,qz]) => {
    const best = state.quizBest[key];
    return `<div class="quiz-cat-card" onclick="startQuiz('${key}')">
      <span class="quiz-cat-icon">${qz.icon}</span>
      <div class="quiz-cat-name">${qz.name}</div>
      <div class="quiz-cat-count">${qz.questions.length} questions</div>
      <div class="quiz-cat-best" style="color:${best!=null?qz.color:'var(--text-muted)'}">${best!=null?`Best: ${best}%`:'Not attempted'}</div>
    </div>`;
  }).join('');
}

function startQuiz(phaseKey) {
  quizState = { phase:phaseKey, questions:[...QUIZ_BANK[phaseKey].questions].sort(()=>Math.random()-0.5), current:0, score:0, answered:false };
  document.getElementById('quizLobby').classList.add('hidden');
  document.getElementById('quizArena').classList.remove('hidden');
  document.getElementById('quizResults').classList.add('hidden');
  document.getElementById('quizTopicLabel').textContent = QUIZ_BANK[phaseKey].name;
  document.getElementById('qTotal').textContent = quizState.questions.length;
  addActivity('🧠', `Started quiz: ${QUIZ_BANK[phaseKey].name}`);
  renderQuestion();
}

function renderQuestion() {
  const q = quizState.questions[quizState.current];
  document.getElementById('qCurrent').textContent = quizState.current+1;
  document.getElementById('liveScore').textContent = quizState.score;
  document.getElementById('quizProgressBar').style.width = `${(quizState.current/quizState.questions.length)*100}%`;
  document.getElementById('questionText').textContent = q.q;
  document.getElementById('nextQuestionBtn').style.display = 'none';
  document.getElementById('optionsGrid').innerHTML = q.opts.map((opt,i) =>
    `<button class="option-btn" onclick="answerQuestion(${i})">${opt}</button>`
  ).join('');
  quizState.answered = false;
}

function answerQuestion(idx) {
  if (quizState.answered) return;
  quizState.answered = true;
  const q = quizState.questions[quizState.current];
  document.querySelectorAll('.option-btn').forEach((btn,i) => {
    btn.disabled = true;
    if (i===q.ans) btn.classList.add('correct');
    else if (i===idx&&idx!==q.ans) btn.classList.add('wrong');
  });
  if (idx===q.ans) quizState.score++;
  document.getElementById('liveScore').textContent = quizState.score;
  document.getElementById('nextQuestionBtn').style.display = 'block';
}

document.getElementById('nextQuestionBtn').addEventListener('click', () => {
  quizState.current++;
  if (quizState.current>=quizState.questions.length) showQuizResults(); else renderQuestion();
});

async function showQuizResults() {
  document.getElementById('quizArena').classList.add('hidden');
  document.getElementById('quizResults').classList.remove('hidden');
  const total=quizState.questions.length, score=quizState.score;
  const pct = Math.round((score/total)*100);
  document.getElementById('resultScoreBig').textContent = `${score} / ${total}`;
  document.getElementById('resultPct').textContent = `${pct}%`;
  let icon='🏆', msg='';
  if (pct>=90){icon='🏆';msg="Outstanding! You're mastering this topic!";}
  else if (pct>=70){icon='🎯';msg='Great job! Keep practicing!';}
  else if (pct>=50){icon='📚';msg='Good effort! Review the material and try again.';}
  else {icon='💪';msg="Keep going! Revisit the roadmap content for this topic.";}
  document.getElementById('resultIcon').textContent = icon;
  document.getElementById('resultMsg').textContent = msg;
  document.getElementById('resultReview').innerHTML = quizState.questions.map((q,i)=>{
    const was = i < quizState.score;
    return `<div class="review-item"><span>${q.ans!==undefined?'✅':'❌'}</span><div><strong>${q.q}</strong><br><span style="color:var(--green-400)">Answer: ${q.opts[q.ans]}</span></div></div>`;
  }).join('');
  // Save
  if (!state.quizBest[quizState.phase]||pct>state.quizBest[quizState.phase]) state.quizBest[quizState.phase]=pct;
  state.quizHistory.push({ phase:quizState.phase, score, total, pct, date:today() });
  await apiPost('/quiz/result', { phase:quizState.phase, score, total, pct });
  await addActivity('🏆', `Scored ${pct}% on ${QUIZ_BANK[quizState.phase].name} quiz`);
}

document.getElementById('retryQuizBtn').addEventListener('click', () => startQuiz(quizState.phase));
document.getElementById('backToLobbyBtn').addEventListener('click', renderQuizLobby);

// ─── RESOURCES ────────────────────────────────────────────────
function renderResources() {
  document.getElementById('resourcesGrid').innerHTML = RESOURCES.map(r =>
    `<div class="resource-card card-3d">
      <div class="resource-card-header"><span class="resource-icon">${r.icon}</span><div><div class="resource-name">${r.name}</div><div class="resource-category">${r.cat}</div></div></div>
      <div class="resource-desc">${r.desc}</div>
      <a class="resource-link" href="${r.url}" target="_blank" rel="noopener">Visit Resource ↗</a>
    </div>`
  ).join('');
}

// ─── STATISTICS ───────────────────────────────────────────────
function renderStats() { renderHeatmap(); renderRadar(); renderCompletedList(); }

function renderHeatmap() {
  const hm = document.getElementById('heatmap');
  hm.innerHTML = '';
  for (let i=34; i>=0; i--) {
    const d=new Date(); d.setDate(d.getDate()-i);
    const key=d.toISOString().slice(0,10);
    const count=state.heatmap[key]||0;
    const level=count===0?0:count<=2?1:count<=4?2:count<=6?3:4;
    const cell=document.createElement('div');
    cell.className=`heatmap-cell level-${level}`;
    cell.title=`${key}: ${count} action${count===1?'':'s'}`;
    hm.appendChild(cell);
  }
}

function renderRadar() {
  const canvas=document.getElementById('radarCanvas'), ctx=canvas.getContext('2d');
  const cx=150,cy=150,r=105;
  const phases=ROADMAP.map(p=>({ label:p.title.split(' ')[0], color:p.color, val:p.topics.filter(t=>state.completed[t.id]).length/p.topics.length }));
  const n=phases.length;
  ctx.clearRect(0,0,300,300);
  const isDark = document.documentElement.getAttribute('data-theme')==='dark';
  for(let ring=1;ring<=5;ring++){
    ctx.beginPath();
    for(let i=0;i<n;i++){const a=(Math.PI*2*i/n)-Math.PI/2;if(i===0)ctx.moveTo(cx+(r*ring/5)*Math.cos(a),cy+(r*ring/5)*Math.sin(a));else ctx.lineTo(cx+(r*ring/5)*Math.cos(a),cy+(r*ring/5)*Math.sin(a));}
    ctx.closePath(); ctx.strokeStyle=isDark?'rgba(255,255,255,0.07)':'rgba(0,0,0,0.07)'; ctx.stroke();
  }
  phases.forEach((_,i)=>{const a=(Math.PI*2*i/n)-Math.PI/2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));ctx.strokeStyle=isDark?'rgba(255,255,255,0.09)':'rgba(0,0,0,0.09)';ctx.stroke();});
  ctx.beginPath();
  phases.forEach((p,i)=>{const a=(Math.PI*2*i/n)-Math.PI/2,x=cx+r*p.val*Math.cos(a),y=cy+r*p.val*Math.sin(a);if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);});
  ctx.closePath(); ctx.fillStyle='rgba(59,130,246,0.22)'; ctx.fill(); ctx.strokeStyle='#3b82f6'; ctx.lineWidth=2; ctx.stroke();
  ctx.font='11px Inter,sans-serif'; ctx.textAlign='center'; ctx.fillStyle=isDark?'#94a3b8':'#64748b';
  phases.forEach((p,i)=>{const a=(Math.PI*2*i/n)-Math.PI/2;ctx.fillText(p.label,cx+(r+20)*Math.cos(a),cy+(r+20)*Math.sin(a)+4);});
}

function renderCompletedList() {
  const el=document.getElementById('completedTopicList');
  const completed=ROADMAP.flatMap(p=>p.topics.filter(t=>state.completed[t.id]).map(t=>({...t,phaseName:p.title,phaseColor:p.color})));
  if(!completed.length){el.innerHTML=`<div class="empty-state-small">No topics completed yet. Start your journey!</div>`;return;}
  el.innerHTML=completed.map(t=>`<div class="completed-item"><span class="completed-item-check">✓</span><span>${t.name}</span><span class="completed-item-phase" style="color:${t.phaseColor}">${t.phaseName}</span></div>`).join('');
}

// ─── SETTINGS ─────────────────────────────────────────────────
document.getElementById('settingsBtn').addEventListener('click', () => {
  document.getElementById('settingsName').value = state.userName;
  document.getElementById('settingsModal').classList.add('open');
});
document.getElementById('closeSettingsModal').addEventListener('click', () => document.getElementById('settingsModal').classList.remove('open'));
document.getElementById('saveSettingsBtn').addEventListener('click', async () => {
  const name = document.getElementById('settingsName').value.trim();
  if (name) { state.userName = name; await saveSettings(); setGreeting(); showToast('Settings saved!','success'); }
  document.getElementById('settingsModal').classList.remove('open');
});
document.getElementById('resetProgressBtn').addEventListener('click', async () => {
  if (!confirm('⚠ Reset ALL progress, notes, and quiz scores?')) return;
  state.completed={}; state.notes=[]; state.quizHistory=[]; state.quizBest={}; state.activity=[];
  await Promise.all([
    apiPost('/settings', { display_name:state.userName, streak:0, last_date:null, heatmap:{}, activity:[], theme:state.theme })
  ]);
  showToast('Progress reset','info');
  renderRoadmap(); refreshDashboard();
});

['noteModal','topicModal','settingsModal'].forEach(id => {
  document.getElementById(id).addEventListener('click', e => { if(e.target===document.getElementById(id)) document.getElementById(id).classList.remove('open'); });
});

// ─── 3D MOUSE TILT for cards ─────────────────────────────────
document.addEventListener('mousemove', e => {
  document.querySelectorAll('.card-3d').forEach(card => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width/2, cy = rect.top + rect.height/2;
    const dx = (e.clientX - cx)/rect.width, dy = (e.clientY - cy)/rect.height;
    const dist = Math.sqrt(dx*dx+dy*dy);
    if (dist < 1.5) {
      card.style.transform = `perspective(600px) rotateY(${dx*12}deg) rotateX(${-dy*10}deg) translateZ(10px)`;
    } else {
      card.style.transform = '';
    }
  });
});

// ─── INIT ─────────────────────────────────────────────────────
async function init() {
  // STEP 1: Apply saved theme immediately (from localStorage)
  const savedTheme = localStorage.getItem('dp_theme') || 'dark';
  applyTheme(savedTheme);

  // STEP 2: Set user info immediately from the JWT in localStorage
  const user = getUser();
  if (user) {
    state.userName = user.username || 'Data Analyst';
  }

  // STEP 3: Render the UI immediately with empty/default state
  // so the page is interactive right away, not stuck loading
  setGreeting();
  renderRoadmap();
  refreshDashboard();
  renderResources();
  navigate('dashboard');

  // STEP 4: Load real data from the server in the background
  // After loading, refresh the UI with actual data
  loadFromServer().then(() => {
    applyTheme(state.theme);
    updateStreak();
    renderRoadmap();
    refreshDashboard();
    if (currentSection === 'notes')    renderNotes();
    if (currentSection === 'stats')    renderStats();
    if (currentSection === 'practice') renderQuizLobby();
  }).catch(() => {
    // If server is unreachable, the app still works with defaults
    console.warn('Could not reach server, running in offline mode');
    updateStreak();
  });
}

init();
