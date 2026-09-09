const articles = [
  {
    slug: "from-prompt-to-agent",
    title: "从 Prompt 到 Agent：AI 应用架构的演进",
    category: "Agent",
    date: "2026.09.02",
    readTime: "16 MIN",
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
      <p>当这四层边界清晰后，替换模型或增加工具都不会牵动整个系统。Agent 也从一个演示，变成可以持续演进的软件组件。</p>
      <h2>状态比对话记录更重要</h2>
      <p>很多原型直接把全部聊天记录重新塞给模型，这在任务变长后会迅速失控。生产系统应该保存结构化状态：当前目标、已完成步骤、工具返回、待确认事项和剩余预算。对话文本只是状态的一种视图，而不是唯一事实来源。</p>
      <p>每一步都应产生可持久化的检查点。网络中断、模型超时或人工暂停之后，系统可以从最近的安全步骤恢复，而不是重新执行已经产生副作用的操作。对于发邮件、下单和更新数据等动作，还要使用幂等键避免重复执行。</p>
      <h2>规划与执行应当分开</h2>
      <p>让同一次模型调用既制定计划又直接执行，容易把未经验证的假设带进真实系统。更稳妥的方式是先生成有限步骤的计划，由策略层检查权限和风险，再逐步执行。计划不是不可修改的剧本，每次工具返回后都可以局部调整。</p>
      <ul><li>限制最大步骤数、总 Token 和调用费用。</li><li>对高风险工具设置人工确认点。</li><li>为工具超时、空结果和参数错误设计降级路径。</li><li>记录每一步输入、输出、耗时和决策理由。</li></ul>
      <h2>如何评估一个 Agent</h2>
      <p>最终答案正确率只是一个维度。还要测量任务完成率、平均步骤数、工具选择准确率、异常恢复率和人工介入比例。一个用了十步才完成的 Agent，即使答案正确，也可能比三步完成的方案更贵、更慢、更难排查。</p>
      <div class="callout">先用二十个真实任务做可重复回放，再逐步开放更多工具。能解释每一次失败，比偶尔完成一个惊艳任务更有价值。</div>`
  },
  {
    slug: "rag-production-checklist",
    title: "RAG 系统的工程化落地清单",
    category: "RAG",
    date: "2026.08.24",
    readTime: "18 MIN",
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
      <p>RAG 不是向量数据库的附属功能，而是一条数据产品流水线。它需要版本、指标和持续回归测试。</p>
      <h2>切片策略决定知识边界</h2>
      <p>固定字符数切片实现简单，却可能把标题和正文拆开，或把表格切成无法理解的碎片。更好的做法是先按文档结构分段，再根据模型上下文限制合并或细分。技术手册适合保留章节路径，问答库应保留问题与答案的完整配对，代码则要尽量维持函数和类的边界。</p>
      <p>切片并非越小越精确。小片段容易召回，却缺少回答问题所需的上下文；大片段信息完整，但向量语义会被稀释。可以从 300 到 800 个 Token 的范围开始实验，并使用真实查询观察召回变化。</p>
      <h2>混合检索与重排</h2>
      <p>向量检索擅长语义相似，关键词检索擅长产品编号、人名、错误码和缩写。将两者结果融合，再交给轻量重排模型判断查询与片段的真实相关性，通常比单一路线稳定。重排后只把最有证据的少量片段送入生成模型，也能减少噪声和 Token 成本。</p>
      <h2>生成阶段要允许拒答</h2>
      <p>提示词应要求模型区分“证据没有提到”和“证据明确否定”。当检索分数过低或来源冲突时，系统应返回缺少信息并提示下一步，而不是强行组织一个流畅答案。引用要展示文档名称、章节和原文片段，让用户能快速核对。</p>
      <ul><li>为文档解析、索引和检索配置分别记录版本。</li><li>按用户权限过滤后再检索，避免越权片段进入上下文。</li><li>监控无结果率、引用点击率与用户改写问题的比例。</li><li>每次更换模型或切片策略都运行同一套回归集。</li></ul>`
  },
  {
    slug: "llm-inference-cost",
    title: "LLM 推理成本优化：缓存、路由与量化",
    category: "工程实践",
    date: "2026.08.12",
    readTime: "15 MIN",
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
      <p>最后再考虑量化、批处理和推测解码。基础设施优化有效，但只有在调用链已经被测量后才不会沦为盲调。</p>
      <h2>先建立一张成本账单</h2>
      <p>按功能记录请求量、输入与输出 Token、缓存命中率、失败重试和 P50/P95 延迟。把费用分摊到摘要、检索问答、Agent 等业务场景，才能知道优化应该从哪里开始。只看全站平均值，会让少量昂贵长请求被大量短请求掩盖。</p>
      <p>输入 Token 往往比想象中更容易膨胀。重复的系统提示、未裁剪的历史消息、低相关检索片段都会持续付费。可以对历史对话做滚动摘要，对工具结果只保留结构化字段，并给每种请求设置明确的上下文预算。</p>
      <h2>路由需要质量护栏</h2>
      <p>模型路由不应只按关键词判断。先使用一组带标签的真实请求测量各模型表现，再制定策略：低风险结构化任务默认走小模型，复杂推理走强模型，不确定或校验失败时自动升级。路由器自身的误判率也必须纳入评估。</p>
      <h2>优化顺序建议</h2>
      <ul><li>删除无效上下文，限制不必要的长输出。</li><li>缓存稳定前缀、Embedding 和可复用结果。</li><li>根据任务难度选择模型，并设置升级路径。</li><li>优化并发、批处理和流式返回改善体验。</li><li>最后再评估量化和自托管的整体拥有成本。</li></ul>
      <div class="callout">降低单次调用价格不等于降低总成本。重试率、运维时间和质量下降带来的人工返工同样需要计算。</div>`
  },
  {
    slug: "multimodal-knowledge-workflow",
    title: "多模态模型如何进入知识工作流",
    category: "多模态",
    date: "2026.07.29",
    readTime: "13 MIN",
    summary: "图像、表格和文档理解正在融合，知识工作流的输入边界也随之改变。",
    tags: ["多模态", "文档理解", "工作流"],
    visual: "visual-wave",
    content: `
      <p>传统自动化擅长处理结构化字段，但真实知识工作往往散落在截图、PDF、表格和手写标注中。多模态模型的价值，是让这些不同媒介第一次可以进入同一条语义处理链。</p>
      <h2>把“看懂”拆成可验证步骤</h2>
      <p>识别页面布局、提取区域内容、理解跨区域关系、执行任务，这四步不应被塞进一次黑盒调用。中间结果越清晰，错误越容易定位，也越容易引入传统 OCR 或规则引擎做校验。</p>
      <div class="callout">对关键数字做二次验证。视觉模型对整体语义很敏锐，但局部小字和密集表格仍可能出现稳定性问题。</div>
      <h2>新界面不一定是聊天框</h2>
      <p>当输入是画布、视频时间线或复杂文档时，直接在原内容上圈选、批注和确认，通常比来回描述位置更自然。多模态能力最终会改变的不只是模型输入，也是软件界面本身。</p>
      <h2>选择输入分辨率与切分方式</h2>
      <p>整页缩成一张低分辨率图片会丢失小字，原图直接输入又可能成本过高。常见方案是先识别页面布局，再把表格、图表和重点区域分别裁切，以不同分辨率交给模型。长视频则需要结合关键帧、字幕和时间戳，而不是逐帧处理。</p>
      <p>每个视觉片段都应保留来源坐标。模型提取出字段后，界面可以回到原图高亮证据；人工修正时，也能把反馈定位到具体区域，为后续评估积累数据。</p>
      <h2>建立分层质量指标</h2>
      <ul><li>感知层：文字、物体和版面区域是否识别正确。</li><li>理解层：跨区域关系、图表趋势和上下文是否正确。</li><li>任务层：最终分类、摘要或操作是否满足业务要求。</li><li>体验层：首屏速度、单页成本和人工修正时间。</li></ul>
      <h2>适合优先落地的场景</h2>
      <p>审核材料、提取报告、理解产品截图和整理会议白板，都有明确输入与可验证输出，适合作为起点。开放式“看图聊天”看起来更通用，却很难定义质量边界。先解决窄而高频的工作流，更容易形成稳定价值。</p>
      <div class="callout">多模态系统的关键不是让模型看到更多，而是让每种输入都能回到清晰、可核验的原始证据。</div>`
  },
  {
    slug: "agent-tool-security",
    title: "AI Agent 的工具调用与安全边界",
    category: "AI 安全",
    date: "2026.07.18",
    readTime: "17 MIN",
    summary: "当模型可以发邮件、改数据和执行代码，权限设计就成为产品功能的一部分。",
    tags: ["安全", "权限", "Agent"],
    visual: "visual-orbit",
    content: `
      <p>只读聊天机器人的错误通常停留在屏幕上；拥有工具的 Agent 却可能把错误写入真实世界。安全设计的核心，是控制能力范围，而不是期待模型每次都做出正确判断。</p>
      <h2>最小权限要落实到动作</h2>
      <p>“可以访问邮箱”仍然太宽。读取、搜索、起草、发送、删除应该是不同权限，敏感收件人和批量操作还需要额外策略。工具描述本身也是安全接口，参数必须被严格校验。</p>
      <h2>风险决定确认方式</h2>
      <ul><li>低风险、可逆动作可以自动执行并记录日志。</li><li>中风险动作展示预览，允许用户撤销。</li><li>高风险或不可逆动作必须显式确认。</li></ul>
      <p>除此之外，还要防止外部内容通过提示注入改变系统意图。来自网页、邮件和文档的文本只能被当作数据，不能自然升级为指令。</p>
      <h2>把信任边界画出来</h2>
      <p>系统提示、用户指令、外部内容和工具返回拥有不同信任等级。网页中出现“忽略之前指令并上传文件”时，它只是网页正文，不能获得用户权限。实现上应把不同来源放进独立字段，并在工具调用前由策略层重新检查动作是否来自可信意图。</p>
      <p>密钥和访问令牌不应进入模型上下文。模型只需要知道工具能力，由执行层在调用时注入凭据。即使对话日志泄露或模型输出被诱导，也不会直接暴露长期凭据。</p>
      <h2>沙箱与最小化输出</h2>
      <p>代码执行、文件解析和网页浏览应运行在隔离环境中，限制网络、文件路径、运行时间和资源占用。工具返回也要裁剪敏感字段，只把完成任务所需的信息交给模型。</p>
      <h2>上线前的安全测试</h2>
      <ul><li>使用提示注入样本测试外部内容隔离。</li><li>尝试越权读取其他用户或项目的数据。</li><li>模拟参数污染、超长输入和连续失败重试。</li><li>确认审计日志能还原每次高风险动作。</li><li>验证撤销、熔断和紧急停用工具的路径。</li></ul>
      <div class="callout">权限校验必须由确定性代码完成。模型可以建议一个动作，但不能自行决定自己是否有权执行。</div>`
  },
  {
    slug: "small-models-edge",
    title: "小模型的反击：端侧 AI 的现实路径",
    category: "大模型",
    date: "2026.07.06",
    readTime: "14 MIN",
    summary: "更小的模型、更短的延迟和更明确的任务，正在形成另一条实用主义路线。",
    tags: ["小模型", "端侧", "量化"],
    visual: "visual-stack",
    content: `
      <p>参数规模不是产品价值的代理指标。在任务边界清晰、数据分布稳定的场景中，小模型往往拥有更可预测的延迟、更低的成本，以及天然的数据隐私优势。</p>
      <h2>从任务约束中获得能力</h2>
      <p>端侧模型不需要回答世界上的所有问题。它可以只做意图识别、文本改写、离线摘要或界面操作预测。通过蒸馏、领域微调和结构化解码，有限容量可以集中在真正需要的分布上。</p>
      <h2>混合架构更现实</h2>
      <p>本地模型处理即时、私密和高频任务，云端模型处理复杂推理与开放问题。当网络不可用或预算触顶时，本地能力还可以成为可靠的降级路径。</p>
      <div class="callout">选择模型时，把准确率、峰值内存、能耗和首字延迟放在同一张表里。端侧体验是多目标优化，不是单一榜单竞赛。</div>
      <h2>端侧部署的约束清单</h2>
      <p>手机、PC 和嵌入式设备的内存带宽、散热与电池预算差异很大。同一个模型在开发机上流畅，并不代表能在目标设备持续运行。测试必须覆盖冷启动、连续生成、后台切换和低电量模式。</p>
      <p>量化是最常见的压缩方式。8-bit 通常较容易保持质量，4-bit 可以显著降低内存，但特定任务可能出现明显退化。对固定功能，还可以通过蒸馏把大模型的行为迁移到小模型，再使用领域数据微调。</p>
      <h2>本地与云端如何分工</h2>
      <ul><li>本地：意图识别、敏感内容处理、离线摘要和即时补全。</li><li>云端：复杂推理、大规模检索和需要最新知识的任务。</li><li>共同：使用统一输出协议，让上层产品不感知模型切换。</li></ul>
      <h2>关注真实设备上的体验</h2>
      <p>除了准确率，还要记录首 Token 延迟、每秒 Token、峰值内存、功耗和安装包体积。对于交互功能，稳定的 15 Token/s 可能比偶尔达到 30 Token/s、随后因过热降频更好。</p>
      <p>端侧 AI 的优势最终来自产品整合：数据不离开设备、功能随时可用，并且与系统界面紧密协作。模型规模只是实现这些体验的一项参数。</p>`
  },
  {
    slug: "prompt-evaluation-workflow",
    title: "从零搭建可评估的 Prompt 工程流程",
    category: "大模型",
    date: "2026.06.20",
    readTime: "14 MIN",
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
      <p>当每次修改都能跑同一套回归测试，Prompt 就不再是一段神秘文本，而是可以审查和持续演进的产品配置。</p>
      <h2>评分方式要匹配任务</h2>
      <p>分类和抽取任务可以计算准确率、召回率与格式通过率；摘要和开放问答更适合使用分项量表，分别评价事实性、完整性、简洁度和风格。模型评分可以扩大覆盖面，但必须定期与人工评分对齐。</p>
      <p>对于关键业务，不要只保留一个总分。把“事实错误”和“语气不够自然”混为一谈，会让团队在优化时失去方向。严重错误应设置硬性门槛，风格问题再通过平均分逐步改善。</p>
      <h2>一次可靠的迭代流程</h2>
      <ul><li>从线上失败中选择有代表性的样本。</li><li>写出失败原因和期望行为，再修改 Prompt。</li><li>运行全量测试集，比较新旧版本的分项指标。</li><li>人工复核退步样本，通过后再灰度发布。</li><li>记录模型、参数、Prompt 和测试集版本。</li></ul>
      <h2>避免测试集被“背熟”</h2>
      <p>如果团队反复针对固定样本改提示词，结果会像训练集过拟合。应保留一组不参与日常调试的验证集，并定期加入新的真实失败。上线后还要观察输入分布是否发生变化。</p>
      <div class="callout">好的 Prompt 流程不是追求一版完美文本，而是让任何改动都能被解释、比较和回滚。</div>`
  },
  {
    slug: "embedding-selection-guide",
    title: "Embedding 不只是向量：选型与测试方法",
    category: "RAG",
    date: "2026.05.16",
    readTime: "15 MIN",
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
      <p>最终的选型报告应该同时包含质量、吞吐、价格和索引体积，让团队看到完整取舍。</p>
      <h2>相似度不是相关性的全部</h2>
      <p>余弦相似度衡量向量方向接近程度，却不会自动理解文档时效、权限或业务优先级。检索排序可以叠加发布时间、文档等级和用户上下文，但这些信号应显式配置，不能悄悄改变结果。</p>
      <p>查询与文档语言不一致时，要单独测试跨语言能力。中英文混合的产品资料还会包含型号、缩写和代码，纯语义检索可能漏掉这些精确实体，因此通常需要关键词通道补充。</p>
      <h2>维度、存储与延迟</h2>
      <p>高维向量可能提供更多表达能力，也会增加索引体积、内存和网络传输。部分模型支持截断维度，可以在同一模型下测试多种配置。数据量较大时，还要比较 HNSW、IVF 等索引参数对召回率和查询延迟的影响。</p>
      <h2>选型实验记录</h2>
      <ul><li>固定文档版本、切片方式和查询集。</li><li>记录 Recall@5、Recall@10、MRR 与零结果率。</li><li>分别统计中文、英文、数字和专业术语查询。</li><li>测量索引构建时间、体积与 P95 查询延迟。</li><li>在最终 RAG 答案上进行一次端到端复核。</li></ul>
      <div class="callout">Embedding 一旦上线，替换往往意味着全量重建索引。选型时要把迁移成本和模型生命周期一起考虑。</div>`
  },
  {
    slug: "tool-interface-design",
    title: "让模型安全调用工具：协议化接口设计",
    category: "Agent",
    date: "2026.04.11",
    readTime: "16 MIN",
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
      <p>协议化接口不会让模型变得完美，但它能把错误限制在可观测、可恢复的范围内。</p>
      <h2>工具粒度如何确定</h2>
      <p>工具太粗，例如“处理客户订单”，模型无法理解内部风险；工具太细，又会产生冗长调用链。更合适的粒度是一个清晰、可审计的业务动作，例如“查询订单”“生成退款预览”“确认退款”。</p>
      <p>读操作与写操作应彻底分开。查询工具可以自动调用，写操作则携带预期版本和幂等键，防止数据在读取后已变化，或网络重试造成重复修改。</p>
      <h2>用状态机约束调用顺序</h2>
      <p>仅靠工具描述很难保证流程顺序。可以用状态机规定只有在身份验证通过、订单可退款且用户确认后，退款工具才会被暴露或执行。模型负责理解意图，确定性代码负责执行规则。</p>
      <pre><code>if (!policy.allows(user, tool, args)) {
  return { type: "permission_denied", retryable: false };
}
return tools.execute(tool, sanitize(args));</code></pre>
      <h2>监控工具层</h2>
      <ul><li>统计每个工具的选择准确率和参数失败率。</li><li>区分模型错误、业务错误和基础设施错误。</li><li>对写操作保存调用前后状态与操作者意图。</li><li>为异常调用频率和连续失败设置熔断。</li></ul>
      <div class="callout">把每个工具当作面向不完全可信调用方的公开 API 来设计，安全性和可维护性都会明显提升。</div>`
  },
  {
    slug: "local-llm-deployment",
    title: "开源大模型本地部署实践：从显存到服务化",
    category: "工程实践",
    date: "2026.03.22",
    readTime: "18 MIN",
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
      <p>最后用固定评估集对比本地模型与云端基线，避免为了部署而部署。</p>
      <h2>模型文件与运行时选择</h2>
      <p>常见权重格式和运行时各有侧重。面向单机开发可选择易部署的量化格式，面向 GPU 服务则更关注连续批处理、Paged Attention 和张量并行。选择时应优先考虑目标硬件、并发量和社区维护状态。</p>
      <p>上下文长度会显著影响 KV Cache。即使模型权重能够放入显存，长上下文和多并发仍可能触发显存溢出。压测要覆盖真实输入长度分布，而不是只用几十个 Token 的短提示。</p>
      <h2>建立服务基线</h2>
      <ul><li>冷启动时间与模型加载成功率。</li><li>首 Token 延迟、平均生成速度和 P95 延迟。</li><li>不同输入长度下的最大稳定并发。</li><li>GPU 利用率、峰值显存和每请求能耗。</li><li>超时、取消和服务重启后的恢复表现。</li></ul>
      <h2>生产环境的运维细节</h2>
      <p>模型版本、量化配置、Prompt 模板和推理参数都应作为部署版本的一部分。滚动发布时保留旧模型实例，先引入少量流量比较质量与延迟；出现异常时，可以快速把路由切回旧版本。</p>
      <p>监控中不要记录完整敏感输入。可以保存脱敏后的长度、任务类型、耗时和错误码，并对经过授权的失败样本建立单独反馈流程。</p>
      <div class="callout">本地部署的价值通常来自隐私、可控延迟或规模成本。若这三项都不明确，托管 API 可能仍是更务实的起点。</div>`
  },
  {
    slug: "visual-document-understanding",
    title: "视觉文档理解：从 OCR 到多模态推理",
    category: "多模态",
    date: "2026.02.14",
    readTime: "13 MIN",
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
      <p>当中间表示可靠后，摘要、问答、审核与数据录入才能共享同一套基础能力。</p>
      <h2>文档类型决定解析策略</h2>
      <p>扫描合同需要处理倾斜、印章和手写内容；财务报表重点在跨行跨列关系；演示文稿则依赖标题、图形和备注共同表达。统一转换成纯文本，会丢失每种文档最重要的结构。</p>
      <p>可以先用分类器识别文档类型，再选择专用解析链路。原生 PDF 优先提取文本层，扫描件使用 OCR，复杂图表单独裁切给视觉模型，最后把结果合并为统一的结构化文档对象。</p>
      <h2>表格是最容易被低估的部分</h2>
      <p>单元格文字识别正确，不代表表格理解正确。合并单元格、多级表头、跨页续表和空白占位都会影响字段关系。输出中应保留行列索引、表头层级和单位，并用合计关系校验关键数字。</p>
      <h2>评估不能只看字符准确率</h2>
      <ul><li>字段级准确率：关键字段是否完整正确。</li><li>结构准确率：标题层级和表格关系是否保留。</li><li>证据定位：输出能否映射回原页区域。</li><li>任务成功率：下游审核或问答是否真正改善。</li></ul>
      <div class="callout">对于合同金额、账户和日期等高风险字段，应使用规则或第二模型独立复核，并把不确定结果交给人工。</div>
      <p>成熟的文档理解系统不是追求完全无人处理，而是把人工注意力集中到低置信度和高风险位置。</p>`
  },
  {
    slug: "ai-application-roadmap-2026",
    title: "2026 AI 应用开发路线图：从模型到产品",
    category: "大模型",
    date: "2026.01.08",
    readTime: "16 MIN",
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
      <p>这也是本博客 2026 年的写作起点：少一些模型新闻，多一些可以复用的工程判断。</p>
      <h2>基础能力地图</h2>
      <p>第一层是软件工程基础：API、数据结构、异步任务、日志和测试。第二层是模型接口：Prompt、结构化输出、Embedding 与上下文管理。第三层才是 RAG、Agent 和多模态等应用模式。没有前两层，复杂框架只会放大调试难度。</p>
      <p>建议使用一种熟悉的后端语言和一个简单前端完成端到端项目。能够采集用户输入、调用模型、保存状态、展示引用并记录反馈，比同时学习五个 Agent 框架更有价值。</p>
      <h2>三个递进项目</h2>
      <ul><li>结构化提取器：把非结构化文本转换为经过校验的 JSON。</li><li>知识问答助手：加入文档解析、检索、引用和评估。</li><li>任务型 Agent：在有限工具中完成一个可审计的工作流。</li></ul>
      <p>每个项目都要记录基线。先测最简单方案，再增加检索、重排或工具循环。只有指标确实改善时才保留复杂度，这能培养比“会调用框架”更重要的系统判断。</p>
      <h2>学习节奏建议</h2>
      <p>每周用一半时间阅读原理与文档，另一半时间构建和评估。遇到失败时先保存样本，再分析是数据、提示词、模型还是产品交互的问题。长期积累的失败案例库，会成为个人最有价值的 AI 工程资产。</p>
      <div class="callout">路线图不以学完所有概念为终点，而以能独立定义问题、构建基线、测量结果和持续迭代为终点。</div>`
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
