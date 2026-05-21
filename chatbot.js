// ── DEVAGURU NANDURI — INTERACTIVE PORTFOLIO GUIDE ──
// High-fidelity state-driven guided conversation engine for an interactive portfolio experience.
// Zero-latency, 100% reliable, zero API costs, and structured with dynamic follow-up options.

(function () {
  // Inject custom typing animation and suggestion button styles dynamically for a premium look.
  // Using highly specific CSS selectors and !important flags to override default styles.
  const style = document.createElement('style');
  style.textContent = `
    .msg-typing {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: .65rem 1.1rem;
      min-height: 32px;
    }
    .typing-dot {
      width: 6px;
      height: 6px;
      background: var(--muted);
      border-radius: 50%;
      animation: typingBounce 1.4s infinite both;
    }
    .typing-dot:nth-child(2) { animation-delay: .2s; }
    .typing-dot:nth-child(3) { animation-delay: .4s; }
    @keyframes typingBounce {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
      45% { transform: scale(1); opacity: 1; }
    }
    #chat-box .chat-suggestions {
      display: flex !important;
      flex-direction: column !important;
      gap: 6px !important;
      padding: 0.75rem 1rem !important;
      border-top: 1px solid var(--border) !important;
      background: rgba(255, 255, 255, 0.02) !important;
      max-height: 200px !important;
      overflow-y: auto !important;
    }
    #chat-box .chat-suggestions .sug-btn {
      font-family: var(--font-body) !important;
      font-size: 0.76rem !important;
      padding: 8px 12px !important;
      background: rgba(255, 255, 255, 0.04) !important;
      border: 1px solid var(--border) !important;
      border-radius: 8px !important;
      color: var(--accent) !important;
      cursor: pointer !important;
      transition: all 0.2s ease !important;
      white-space: normal !important;
      text-align: left !important;
      width: 100% !important;
      line-height: 1.35 !important;
      font-weight: 400 !important;
      letter-spacing: 0.5px !important;
    }
    #chat-box .chat-suggestions .sug-btn:hover {
      background: rgba(79, 255, 176, 0.08) !important;
      border-color: var(--accent) !important;
      color: var(--accent) !important;
      transform: translateX(3px) !important;
    }
  `;
  document.head.appendChild(style);

  // Cache DOM element selectors
  const fab = document.getElementById('chat-fab');
  const chatBox = document.getElementById('chat-box');
  const msgs = document.getElementById('chat-messages');
  const sugsEl = document.getElementById('chat-suggestions');

  let typingBubble = null;

  // Toggle Chat Box visibility
  if (fab && chatBox) {
    fab.addEventListener('click', () => {
      fab.classList.toggle('open');
      chatBox.classList.toggle('open');
    });

    // Close chatbox when clicking outside
    document.addEventListener('click', e => {
      if (!chatBox.contains(e.target) && !fab.contains(e.target) && chatBox.classList.contains('open')) {
        fab.classList.remove('open');
        chatBox.classList.remove('open');
      }
    });
  }

  // Appends message bubble to UI
  function addMsg(text, type) {
    const d = document.createElement('div');
    d.className = 'msg msg-' + type;
    d.textContent = text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  // Appends a typing animation block to simulate active thinking
  function showTypingIndicator() {
    if (typingBubble) return;
    typingBubble = document.createElement('div');
    typingBubble.className = 'msg msg-bot msg-typing';
    typingBubble.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    msgs.appendChild(typingBubble);
    msgs.scrollTop = msgs.scrollHeight;
  }

  // Clears the typing animation block
  function hideTypingIndicator() {
    if (typingBubble && typingBubble.parentNode) {
      typingBubble.parentNode.removeChild(typingBubble);
    }
    typingBubble = null;
  }

  // ── DYNAMIC DIALOGUE GUIDED QUESTION TREE ──
  const QUESTION_TREE = {
    main: {
      reply: "Choose a topic below to learn more about my journey:",
      questions: [
        { text: "What high-impact projects have you built?", nextState: "projects" },
        { text: "What is your technical skills stack?", nextState: "skills" },
        { text: "Tell me about my Woxsen academic & research roles", nextState: "academics" },
        { text: "How do I manage my timetable & LeetCode?", nextState: "timeManagement" },
        { text: "How can we collaborate or connect?", nextState: "connect" }
      ]
    },
    projects: {
      reply: "I've built several notable projects including the Lineman Smart Safety System (IoT wearable), a CRNN Handwriting OCR model, and Robosort (robotic arm). I believe in building projects that solve real-world problems and create practical impact.",
      questions: [
        { text: "Tell me about the Lineman Smart Safety System", nextState: "proj_lineman" },
        { text: "Tell me about the CRNN Handwriting Recognition", nextState: "proj_crnn" },
        { text: "Tell me about the Robosort Robotic Arm", nextState: "proj_robosort" },
        { text: "Go back to Main Menu", nextState: "main" }
      ]
    },
    skills: {
      reply: "My core languages are Python, Java, JavaScript, and SQL. For AI/ML, I work with TensorFlow, Keras, Scikit-learn, OpenCV, and MediaPipe. My web stack is React, Node.js, and Express, backed by MySQL and MongoDB.",
      questions: [
        { text: "Tell me about my Woxsen academic & research roles", nextState: "academics" },
        { text: "How do I manage my timetable & LeetCode?", nextState: "timeManagement" },
        { text: "Go back to Main Menu", nextState: "main" }
      ]
    },
    academics: {
      reply: "I am pursuing a B.Tech in CSE at Woxsen University (Class of 2027) with an 9.08 CGPA. I serve as Class Representative, and work as a Research Assistant at Woxsen Agentic Lab researching LLM-driven autonomous AI agents.",
      questions: [
        { text: "What was my role at nBall.ai?", nextState: "exp_nball" },
        { text: "Tell me about my Amazon Mentorship", nextState: "exp_amazon" },
        { text: "Go back to Main Menu", nextState: "main" }
      ]
    },
    timeManagement: {
      reply: "I manage my schedule strictly using calendar block-planning, allocating dedicated slots for classes, projects, and LeetCode daily. Playing the Morsing percussion mouth instrument for 10+ years trains me in rhythm, discipline, and focus to balance it all.",
      questions: [
        { text: "Tell me about the Morsing instrument", nextState: "hobbies_morsing" },
        { text: "Tell me about my LeetCode goals", nextState: "leetcode_goals" },
        { text: "Go back to Main Menu", nextState: "main" }
      ]
    },
    connect: {
      reply: "I am always open to exciting engineering opportunities, research collaborations, or answering questions from younger students! How would you like to connect?",
      questions: [
        { text: "Connect on LinkedIn ↗", nextState: "connect", isExternal: true, url: "https://linkedin.com/in/devaguru-nanduri-874058294" },
        { text: "Send an Email ↗", nextState: "connect", isExternal: true, url: "mailto:nvdevagurus@gmail.com" },
        { text: "Explore my GitHub ↗", nextState: "connect", isExternal: true, url: "https://github.com/Devaguru11" },
        { text: "Go back to Main Menu", nextState: "main" }
      ]
    },
    proj_lineman: {
      reply: "The Lineman Smart Safety System is an IoT wearable for electric linemen using Arduino sensors (DHT11, tilt, gas, ultrasonic) integrated with a Node.js backend and React dashboard to issue real-time supervisor alerts.",
      questions: [
        { text: "Tell me about the CRNN Handwriting Recognition", nextState: "proj_crnn" },
        { text: "Go back to Projects Menu", nextState: "projects" },
        { text: "Go back to Main Menu", nextState: "main" }
      ]
    },
    proj_crnn: {
      reply: "I developed a CRNN architecture (CNN, BiLSTM, CTC Loss) to transcribe handwritten text into digital text without manual character segmentation, accompanied by a real-time Keras dashboard.",
      questions: [
        { text: "Tell me about the Robosort Robotic Arm", nextState: "proj_robosort" },
        { text: "Go back to Projects Menu", nextState: "projects" },
        { text: "Go back to Main Menu", nextState: "main" }
      ]
    },
    proj_robosort: {
      reply: "Robosort is an automated e-waste segregation arm utilizing sensor-based classification. It was presented as a national finalist at HITAM College's INNOFIESTA challenge.",
      questions: [
        { text: "Tell me about the Lineman Smart Safety System", nextState: "proj_lineman" },
        { text: "Go back to Projects Menu", nextState: "projects" },
        { text: "Go back to Main Menu", nextState: "main" }
      ]
    },
    exp_nball: {
      reply: "At nBall.ai, I worked on healthcare data scraping, ML prediction models, and secure authentication systems as a technology intern.",
      questions: [
        { text: "Tell me about my Amazon Mentorship", nextState: "exp_amazon" },
        { text: "Go back to Academics Menu", nextState: "academics" },
        { text: "Go back to Main Menu", nextState: "main" }
      ]
    },
    exp_amazon: {
      reply: "I was directly mentored by Amazon senior SDE and Business Intelligence engineers on relational database design, SQL query optimizations, and backend architectures.",
      questions: [
        { text: "What was my role at nBall.ai?", nextState: "exp_nball" },
        { text: "Go back to Academics Menu", nextState: "academics" },
        { text: "Go back to Main Menu", nextState: "main" }
      ]
    },
    hobbies_morsing: {
      reply: "Playing the Morsing (traditional mouth harp) for 10+ years has developed my discipline, patience, and rhythmic timing. This Carnatic classical percussion training has a profound impact on my structured coding routines.",
      questions: [
        { text: "How do I manage my timetable & LeetCode?", nextState: "timeManagement" },
        { text: "Go back to Main Menu", nextState: "main" }
      ]
    },
    leetcode_goals: {
      reply: "I solve algorithms daily on LeetCode across Arrays, Trees, DP, and Graphs. I view it as continuous logical optimization practice to prepare myself for building scalable software systems.",
      questions: [
        { text: "How do I manage my timetable & LeetCode?", nextState: "timeManagement" },
        { text: "Go back to Main Menu", nextState: "main" }
      ]
    }
  };

  // Renders the list of interactive question buttons dynamically based on current state key
  function renderSuggestions(stateKey) {
    if (!sugsEl) return;
    sugsEl.innerHTML = '';

    const stateObj = QUESTION_TREE[stateKey];
    if (!stateObj || !stateObj.questions) return;

    stateObj.questions.forEach(q => {
      const btn = document.createElement('button');
      btn.className = 'sug-btn';
      btn.textContent = q.text;

      btn.addEventListener('click', () => {
        if (q.isExternal) {
          // If external link, open cleanly in a new tab
          window.open(q.url, '_blank');
          return;
        }

        // Hide suggestions, add user bubble, animate typing, and print transition reply
        sugsEl.style.display = 'none';
        addMsg(q.text, 'user');
        showTypingIndicator();

        setTimeout(() => {
          hideTypingIndicator();

          const nextObj = QUESTION_TREE[q.nextState];
          if (nextObj) {
            addMsg(nextObj.reply, 'bot');
            renderSuggestions(q.nextState);
            sugsEl.style.display = 'flex';
          }
          msgs.scrollTop = msgs.scrollHeight;
        }, 400);
      });
      sugsEl.appendChild(btn);
    });

    msgs.scrollTop = msgs.scrollHeight;
  }

  // Load the initial main questions when the script loads
  renderSuggestions('main');

})();
