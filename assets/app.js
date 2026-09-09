const articles = [
  {
    slug: "from-prompt-to-agent",
    title: "从 Prompt 到 Agent：AI 应用架构的演进",
    category: "Agent",
    date: "2026.09.02",
    readTime: "12 MIN",
    summary: "当一次模型调用变成会规划、会使用工具的循环，应用架构中哪些部分必须重新设计？",
    tags: ["Agent", "架构", "Tool Use"],
    visual: "visual-flow",
    content: `
      <p>早期的 AI 应用通常是一条直线：用户输入，拼接 Prompt，调用模型，返回文本。它简单、透明，也很容易调试。但当任务开始涉及检索、外部 API、文件读写和多轮决策时，一次调用便不再够用。</p>
      <h2>Agent 的本质是受控循环</h2>
      <p>Agent 并不神秘。它是一个允许模型在“观察、思考、行动、再观察”之间迭代的控制循环。真正的工程挑战不在于让循环跑起来，而在于让它能够停止、恢复、审计和降级。</p>
      <div class="callout">设计 Agent 时，先定义权限边界和终止条件，再讨论提示词。可靠性来自控制面，而不是来自模型的自觉。</div>
      <h2>生产系统需要四个层次</h2>
      <ul><li>推理层：选择模型、构造上下文与结构化输出。</li><li>工具层：统一描述外部能力，并验证每次调用参数。</li><li>状态层：记录步骤、结果、预算和可恢复的检查点。</li><li>治理层：权限、审计、评估与人工确认。</li></ul>
      <p>当这四层边界清晰后，替换模型或增加工具都不会牵动整个系统。Agent 也从一个演示，变成可以持续演进的软件组件。</p>`
  },
  {
    slug: "rag-production-checklist",
    title: "RAG 系统的工程化落地清单",
    category: "RAG",
    date: "2026.08.24",
    readTime: "15 MIN",
    summary: "从文档切片到答案评估，一份覆盖数据、检索、生成与可观测性的生产清单。",
    tags: ["RAG", "向量检索", "评估"],
    visual: "visual-grid",
    content: `
      <p>RAG 的概念很短：先检索，再生成。但生产中的每一个动词都藏着一串选择。文档如何解析、切片多大、召回多少、如何重排，以及最终怎样知道答案真的更好了。</p>
      <h2>先把数据做成可追踪资产</h2>
      <p>每个文本块都应携带来源、版本、更新时间和访问权限。向量只是索引，不是事实本身。答案引用必须能够返回原文位置，文档更新也必须触发可控的重建流程。</p>
      <h2>不要只评估最终答案</h2>
      <ul><li>检索：相关文档是否进入 Top-K。</li><li>重排：最有证据的片段是否排在前面。</li><li>生成：回答是否被证据支持，是否遗漏关键限制。</li><li>体验：延迟、成本和拒答是否符合预期。</li></ul>
      <div class="callout">一套小而稳定的黄金测试集，比偶尔查看线上对话更能推动系统进步。</div>
      <p>RAG 不是向量数据库的附属功能，而是一条数据产品流水线。它需要版本、指标和持续回归测试。</p>`
  },
  {
    slug: "llm-inference-cost",
    title: "LLM 推理成本优化：缓存、路由与量化",
    category: "工程实践",
    date: "2026.08.12",
    readTime: "11 MIN",
    summary: "不牺牲用户体验的前提下，如何系统性地降低 Token、延迟和 GPU 成本。",
    tags: ["推理", "成本", "性能"],
    visual: "visual-blocks",
    content: `
      <p>优化模型成本不应从“换一个更便宜的模型”开始。先拆解一次请求的完整成本：输入 Token、输出 Token、首字延迟、占用时长，以及失败重试造成的隐性浪费。</p>
      <h2>缓存不只缓存答案</h2>
      <p>完全相同的问题可以做语义缓存，固定前缀可以利用 Prompt Cache，文档解析和 Embedding 也应该增量缓存。每一层缓存都要明确失效条件，否则节省的成本会转化为陈旧答案的风险。</p>
      <h2>按任务难度路由</h2>
      <p>分类、抽取、改写等明确任务通常不需要最强模型。用轻量模型完成路由，再把模糊、高风险请求送给能力更强的模型，往往能获得更好的成本质量曲线。</p>
      <pre><code>route = classify(request)
model = policy.select(route, risk, latency_budget)
return generate(model, request)</code></pre>
      <p>最后再考虑量化、批处理和推测解码。基础设施优化有效，但只有在调用链已经被测量后才不会沦为盲调。</p>`
  },
  {
    slug: "multimodal-knowledge-workflow",
    title: "多模态模型如何进入知识工作流",
    category: "多模态",
    date: "2026.07.29",
    readTime: "9 MIN",
    summary: "图像、表格和文档理解正在融合，知识工作流的输入边界也随之改变。",
    tags: ["多模态", "文档理解", "工作流"],
    visual: "visual-wave",
    content: `
      <p>传统自动化擅长处理结构化字段，但真实知识工作往往散落在截图、PDF、表格和手写标注中。多模态模型的价值，是让这些不同媒介第一次可以进入同一条语义处理链。</p>
      <h2>把“看懂”拆成可验证步骤</h2>
      <p>识别页面布局、提取区域内容、理解跨区域关系、执行任务，这四步不应被塞进一次黑盒调用。中间结果越清晰，错误越容易定位，也越容易引入传统 OCR 或规则引擎做校验。</p>
      <div class="callout">对关键数字做二次验证。视觉模型对整体语义很敏锐，但局部小字和密集表格仍可能出现稳定性问题。</div>
      <h2>新界面不一定是聊天框</h2>
      <p>当输入是画布、视频时间线或复杂文档时，直接在原内容上圈选、批注和确认，通常比来回描述位置更自然。多模态能力最终会改变的不只是模型输入，也是软件界面本身。</p>`
  },
  {
    slug: "agent-tool-security",
    title: "AI Agent 的工具调用与安全边界",
    category: "AI 安全",
    date: "2026.07.18",
    readTime: "13 MIN",
    summary: "当模型可以发邮件、改数据和执行代码，权限设计就成为产品功能的一部分。",
    tags: ["安全", "权限", "Agent"],
    visual: "visual-orbit",
    content: `
      <p>只读聊天机器人的错误通常停留在屏幕上；拥有工具的 Agent 却可能把错误写入真实世界。安全设计的核心，是控制能力范围，而不是期待模型每次都做出正确判断。</p>
      <h2>最小权限要落实到动作</h2>
      <p>“可以访问邮箱”仍然太宽。读取、搜索、起草、发送、删除应该是不同权限，敏感收件人和批量操作还需要额外策略。工具描述本身也是安全接口，参数必须被严格校验。</p>
      <h2>风险决定确认方式</h2>
      <ul><li>低风险、可逆动作可以自动执行并记录日志。</li><li>中风险动作展示预览，允许用户撤销。</li><li>高风险或不可逆动作必须显式确认。</li></ul>
      <p>除此之外，还要防止外部内容通过提示注入改变系统意图。来自网页、邮件和文档的文本只能被当作数据，不能自然升级为指令。</p>`
  },
  {
    slug: "small-models-edge",
    title: "小模型的反击：端侧 AI 的现实路径",
    category: "大模型",
    date: "2026.07.06",
    readTime: "10 MIN",
    summary: "更小的模型、更短的延迟和更明确的任务，正在形成另一条实用主义路线。",
    tags: ["小模型", "端侧", "量化"],
    visual: "visual-stack",
    content: `
      <p>参数规模不是产品价值的代理指标。在任务边界清晰、数据分布稳定的场景中，小模型往往拥有更可预测的延迟、更低的成本，以及天然的数据隐私优势。</p>
      <h2>从任务约束中获得能力</h2>
      <p>端侧模型不需要回答世界上的所有问题。它可以只做意图识别、文本改写、离线摘要或界面操作预测。通过蒸馏、领域微调和结构化解码，有限容量可以集中在真正需要的分布上。</p>
      <h2>混合架构更现实</h2>
      <p>本地模型处理即时、私密和高频任务，云端模型处理复杂推理与开放问题。当网络不可用或预算触顶时，本地能力还可以成为可靠的降级路径。</p>
      <div class="callout">选择模型时，把准确率、峰值内存、能耗和首字延迟放在同一张表里。端侧体验是多目标优化，不是单一榜单竞赛。</div>`
  }
];

const feed = document.querySelector("#articleFeed");
const homeView = document.querySelector("#homeView");
const articleView = document.querySelector("#articleView");
const searchDialog = document.querySelector("#searchDialog");
const searchInput = document.querySelector("#searchInput");
const searchResults = document.querySelector("#searchResults");

function articleCard(article) {
  return `
    <article class="article-card">
      <a class="article-visual ${article.visual}" href="#/article/${article.slug}" aria-label="阅读《${article.title}》"></a>
      <div>
        <div class="article-meta"><span class="category">${article.category}</span><span>${article.date}</span><span>${article.readTime}</span></div>
        <h3><a href="#/article/${article.slug}">${article.title}</a></h3>
        <p class="article-summary">${article.summary}</p>
        <div class="article-tags">${article.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
      </div>
    </article>`;
}

function renderFeed(topic = "全部") {
  const filtered = topic === "全部" ? articles : articles.filter(article => article.category === topic);
  feed.innerHTML = filtered.length ? filtered.map(articleCard).join("") : '<p class="empty-state">这个分类还在整理中，先去看看其他文章吧。</p>';
}

function renderArticle(slug) {
  const article = articles.find(item => item.slug === slug);
  if (!article) {
    window.location.hash = "#/";
    return;
  }
  homeView.hidden = true;
  articleView.hidden = false;
  articleView.innerHTML = `
    <a class="article-back" href="#/">← 返回文章列表</a>
    <header>
      <div class="article-meta"><span class="category">${article.category}</span><span>${article.date}</span><span>${article.readTime}</span></div>
      <h1>${article.title}</h1>
      <p class="article-deck">${article.summary}</p>
    </header>
    <div class="article-body">${article.content}</div>`;
  document.title = `${article.title} | 向量之间`;
  window.scrollTo(0, 0);
}

function route() {
  const match = window.location.hash.match(/^#\/article\/(.+)$/);
  if (match) {
    renderArticle(match[1]);
  } else {
    articleView.hidden = true;
    homeView.hidden = false;
    document.title = "向量之间 | AI 技术笔记";
  }
}

function openSearch() {
  searchDialog.showModal();
  searchInput.value = "";
  renderSearch("");
  window.setTimeout(() => searchInput.focus(), 30);
}

function renderSearch(query) {
  const normalized = query.trim().toLowerCase();
  const matches = normalized
    ? articles.filter(article => [article.title, article.summary, article.category, ...article.tags].join(" ").toLowerCase().includes(normalized))
    : articles.slice(0, 4);
  searchResults.innerHTML = matches.length
    ? matches.map(article => `<a class="search-result" href="#/article/${article.slug}"><strong>${article.title}</strong><small>${article.category} · ${article.readTime}</small></a>`).join("")
    : '<p class="empty-state">没有找到相关文章。</p>';
}

document.querySelectorAll(".topic-chip").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".topic-chip").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    renderFeed(button.dataset.topic);
  });
});

[document.querySelector("#searchTrigger"), document.querySelector("#searchButton")].forEach(button => button.addEventListener("click", openSearch));
document.querySelector("#searchClose").addEventListener("click", () => searchDialog.close());
searchInput.addEventListener("input", event => renderSearch(event.target.value));
searchResults.addEventListener("click", () => searchDialog.close());
searchDialog.addEventListener("click", event => {
  if (event.target === searchDialog) searchDialog.close();
});

const themeToggle = document.querySelector("#themeToggle");
const savedTheme = localStorage.getItem("blog-theme");
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("blog-theme", next);
});

function drawNetwork() {
  const canvas = document.querySelector("#networkCanvas");
  const context = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;
  context.scale(ratio, ratio);

  const dark = document.documentElement.dataset.theme === "dark";
  const nodes = Array.from({ length: 24 }, (_, index) => ({
    x: ((index * 83) % 103) / 103 * rect.width,
    y: ((index * 47 + 23) % 97) / 97 * rect.height,
    r: index % 5 === 0 ? 4 : 2
  }));

  context.strokeStyle = dark ? "rgba(84,199,173,.25)" : "rgba(0,108,91,.22)";
  context.lineWidth = 1;
  nodes.forEach((node, index) => {
    nodes.slice(index + 1).forEach(other => {
      const distance = Math.hypot(node.x - other.x, node.y - other.y);
      if (distance < 145) {
        context.globalAlpha = 1 - distance / 145;
        context.beginPath();
        context.moveTo(node.x, node.y);
        context.lineTo(other.x, other.y);
        context.stroke();
      }
    });
  });
  context.globalAlpha = 1;
  nodes.forEach((node, index) => {
    context.beginPath();
    context.fillStyle = index % 7 === 0 ? "#d45735" : index % 5 === 0 ? "#dce83d" : (dark ? "#54c7ad" : "#006c5b");
    context.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    context.fill();
  });
}

window.addEventListener("hashchange", route);
window.addEventListener("resize", drawNetwork);
new MutationObserver(drawNetwork).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
document.querySelector("#currentYear").textContent = new Date().getFullYear();
document.querySelector("#articleCount").textContent = String(articles.length).padStart(2, "0");

renderFeed();
route();
drawNetwork();
