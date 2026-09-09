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
  },
  {
    slug: "prompt-evaluation-workflow",
    title: "从零搭建可评估的 Prompt 工程流程",
    category: "大模型",
    date: "2026.06.20",
    readTime: "10 MIN",
    summary: "把依赖直觉的提示词调试，变成有数据、有版本、有回归测试的工程流程。",
    tags: ["Prompt", "评估", "工作流"],
    visual: "visual-grid",
    content: `
      <p>Prompt 工程最常见的问题，不是不会写提示词，而是每次修改都缺少可比较的依据。一个看似更自然的版本，可能提升了常规问题，却破坏了边界案例。</p>
      <h2>先建立最小测试集</h2>
      <p>从真实任务中挑选二十到五十个样本，覆盖常规输入、模糊表达、超长内容和恶意输入。每个样本都要写清期望，而不是只保存一段参考答案。</p>
      <h2>版本化所有影响输出的变量</h2>
      <ul><li>系统提示词与示例。</li><li>模型名称、温度和输出格式。</li><li>检索上下文与工具描述。</li><li>评分规则和人工反馈。</li></ul>
      <div class="callout">不要只比较平均分。关注哪些样本退步了，以及退步是否发生在高风险场景。</div>
      <p>当每次修改都能跑同一套回归测试，Prompt 就不再是一段神秘文本，而是可以审查和持续演进的产品配置。</p>`
  },
  {
    slug: "embedding-selection-guide",
    title: "Embedding 不只是向量：选型与测试方法",
    category: "RAG",
    date: "2026.05.16",
    readTime: "11 MIN",
    summary: "维度越高不一定越好，检索质量取决于语言、领域、切片和真实查询的共同作用。",
    tags: ["Embedding", "检索", "基准测试"],
    visual: "visual-orbit",
    content: `
      <p>Embedding 模型把文本映射到向量空间，但公开榜单无法完整代表你的业务。中文术语、产品缩写、数字和代码片段，都可能改变模型之间的真实差距。</p>
      <h2>用业务查询建立检索集</h2>
      <p>收集用户真实会问的问题，为每个问题标注一到多个相关片段。随后统一切片与索引配置，比较不同模型的 Recall@K、MRR 和延迟。</p>
      <h2>把模型放回完整链路</h2>
      <p>检索指标更高，不代表最终回答一定更好。还要观察重排模型、上下文长度和生成模型是否能利用召回结果。对于短查询，可以加入关键词检索组成混合召回。</p>
      <div class="callout">先选择满足质量下限的最小模型，再考虑增加维度。存储、网络和重建索引都是长期成本。</div>
      <p>最终的选型报告应该同时包含质量、吞吐、价格和索引体积，让团队看到完整取舍。</p>`
  },
  {
    slug: "tool-interface-design",
    title: "让模型安全调用工具：协议化接口设计",
    category: "Agent",
    date: "2026.04.11",
    readTime: "12 MIN",
    summary: "工具描述、参数校验、权限和错误返回，决定了 Agent 能否从演示走向生产。",
    tags: ["Tool Use", "接口", "可靠性"],
    visual: "visual-flow",
    content: `
      <p>模型调用工具时，本质上是在生成一段结构化请求。它可能选错工具、遗漏参数，也可能把自然语言中的不可信内容直接带入执行环境。</p>
      <h2>让接口对模型友好</h2>
      <p>工具名称要表达单一动作，描述中写清适用条件和禁止事项。参数使用严格 Schema，枚举值优于自由文本，日期、金额和资源标识符必须在执行前再次验证。</p>
      <h2>错误也应当结构化</h2>
      <p>不要把长堆栈直接返回模型。错误响应应包含类型、可重试性和安全的修复建议，使 Agent 能决定重试、换工具还是请求人工介入。</p>
      <ul><li>查询类工具默认只读。</li><li>修改类工具提供预览和幂等键。</li><li>不可逆操作必须要求显式确认。</li></ul>
      <p>协议化接口不会让模型变得完美，但它能把错误限制在可观测、可恢复的范围内。</p>`
  },
  {
    slug: "local-llm-deployment",
    title: "开源大模型本地部署实践：从显存到服务化",
    category: "工程实践",
    date: "2026.03.22",
    readTime: "14 MIN",
    summary: "如何根据显存、吞吐和任务质量选择量化方案，并搭建可用的推理服务。",
    tags: ["开源模型", "部署", "GPU"],
    visual: "visual-stack",
    content: `
      <p>本地部署的第一步不是下载最大的模型，而是明确任务和预算。模型权重、KV Cache 和运行时开销会共同占用显存，并直接限制上下文长度与并发数。</p>
      <h2>估算资源再选量化</h2>
      <p>FP16 权重通常需要约每十亿参数 2GB 显存，实际运行还要为缓存和框架预留空间。4-bit 量化能显著降低门槛，但代码生成和复杂推理任务必须用真实样本验证精度损失。</p>
      <h2>服务化不仅是启动一个端口</h2>
      <ul><li>设置请求长度、并发和超时上限。</li><li>记录首 Token 延迟与生成速度。</li><li>为模型加载失败和显存溢出设计恢复策略。</li><li>统一兼容的 API，减少上层业务耦合。</li></ul>
      <div class="callout">稳定吞吐通常比单次最快响应更重要。压测时要模拟真实输入长度分布。</div>
      <p>最后用固定评估集对比本地模型与云端基线，避免为了部署而部署。</p>`
  },
  {
    slug: "visual-document-understanding",
    title: "视觉文档理解：从 OCR 到多模态推理",
    category: "多模态",
    date: "2026.02.14",
    readTime: "9 MIN",
    summary: "表格、版面和图文关系，让文档理解成为比文字识别更复杂的问题。",
    tags: ["视觉模型", "OCR", "文档智能"],
    visual: "visual-wave",
    content: `
      <p>OCR 可以把像素变成字符，却不一定知道标题属于哪一段、数字对应哪一列，或脚注正在限制哪个结论。文档理解需要同时处理文字、位置和视觉层级。</p>
      <h2>组合模型比单一路线更稳</h2>
      <p>清晰印刷文本可以先由 OCR 提取，版面模型负责识别区域，多模态模型再理解跨区域关系。对发票金额、合同日期等关键字段，应增加格式规则和交叉校验。</p>
      <h2>保留页面坐标</h2>
      <p>每个提取结果都应保留页码和边界框。这样既能在界面中高亮证据，也能在模型出错时快速回到原文定位。</p>
      <div class="callout">文档解析的理想输出不是一段纯文本，而是一份带层级、位置和来源的结构化表示。</div>
      <p>当中间表示可靠后，摘要、问答、审核与数据录入才能共享同一套基础能力。</p>`
  },
  {
    slug: "ai-application-roadmap-2026",
    title: "2026 AI 应用开发路线图：从模型到产品",
    category: "大模型",
    date: "2026.01.08",
    readTime: "12 MIN",
    summary: "新一年的第一篇笔记：梳理 AI 应用开发需要掌握的模型、数据、评估与产品能力。",
    tags: ["路线图", "AI 应用", "学习方法"],
    visual: "visual-blocks",
    content: `
      <p>学习 AI 应用开发很容易陷入工具追逐：模型每天更新，框架不断出现，教程也总在强调新的名词。更稳定的路线，是围绕一个可交付产品建立能力地图。</p>
      <h2>第一阶段：理解模型边界</h2>
      <p>掌握 Token、上下文、结构化输出、Embedding 和基本推理参数。用小实验观察模型在哪些输入上稳定，在哪些场景会猜测或忽略约束。</p>
      <h2>第二阶段：构建完整链路</h2>
      <p>选择一个真实问题，加入数据检索、工具调用、状态管理和可观测性。不要急着做通用平台，先让一条窄工作流在真实用户手中可靠运行。</p>
      <h2>第三阶段：用评估推动迭代</h2>
      <ul><li>保存真实输入与失败案例。</li><li>建立离线测试集和线上反馈指标。</li><li>同时测量质量、延迟、成本和安全性。</li></ul>
      <div class="callout">AI 产品的核心竞争力不是调用了哪个模型，而是能否持续发现失败、修复失败并验证改进。</div>
      <p>这也是本博客 2026 年的写作起点：少一些模型新闻，多一些可以复用的工程判断。</p>`
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
