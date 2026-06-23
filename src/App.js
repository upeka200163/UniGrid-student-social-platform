import React, { useState } from 'react';
import './App.css';

function App() {
  // Authentication & Flow Control States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('landing'); // 'landing' or 'dashboard'
  const [activeForm, setActiveForm] = useState('signin'); // 'signin' or 'signup'
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cohort, setCohort] = useState("");
  const [authError, setAuthError] = useState("");

  // Social Feed State
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Kasun Perera",
      avatar: "👨‍💻",
      batch: "CS Batch '26",
      time: "2 hrs ago",
      content: "Guys, are you ready for the dynamic web presentation? If anyone has the lecture notes, please share them here.",
      image: "",
      likes: 5,
      hasLiked: false,
      reposts: 2,
      hasReposted: false,
      comments: [
        { id: 101, user: "Amali Perera", text: "It's available on LMS mate!" },
        { id: 102, user: "Sahan Dias", text: "I have a PDF, I will PM you." }
      ]
    },
    {
      id: 2,
      author: "Nimali Silva",
      avatar: "👩‍🔬",
      batch: "Engineering Batch '25",
      time: "5 hrs ago",
      content: "Our team won 1st Place at the Campus Group Project Hackathon held today! 🎉",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60",
      likes: 15,
      hasLiked: false,
      reposts: 8,
      hasReposted: false,
      comments: [
        { id: 103, user: "Roshan Fernando", text: "Wow! Congratulations clear!" },
        { id: 104, user: "Janith Silva", text: "Superb work." }
      ]
    },
    {
      id: 3,
      author: "Chathura Jayasinghe",
      avatar: "🤵",
      batch: "DS Batch '25",
      time: "3 hrs ago",
      content: "Guys, International Conference on Advanced Computing Technologies - ICACT 2026 Competition is at NSBM Green University. Get ready for November 18. More details are on the NSBM Green University Page.",
      image: "/image1.jpg",
      likes: 7,
      hasLiked: false,
      reposts: 0,
      hasReposted: false,
      comments: [
        { id: 105, user: "Nethmi Muthumini", text: "We can submit IoT Projects as well, right?" },
        { id: 106, user: "Pawani Ashani", text: "Registration deadline is October 15, right?" },
        { id: 107, user: "Dithmi Dilthara", text: "Visit the website (for more info. Website: icact.nsbm.ac.lk | Email: icact@nsbm.ac.lk)" }
      ]
    }
  ]);

  const onlineStudents = [
    { id: 1, name: "Dimuthu Karunarathne", avatar: "🧑‍💻", status: "online" },
    { id: 2, name: "Sanduni Jayawardena", avatar: "👩‍💼", status: "online" },
    { id: 3, name: "Pathum Herath", avatar: "👨‍🎨", status: "offline" },
    { id: 4, name: "Chathuri Perera", avatar: "👩‍⚕️", status: "online" },
    { id: 5, name: "Nadeesha Silva", avatar: "🧑‍🔬", status: "online" }
  ];

  const [newPostText, setNewPostText] = useState("");
  const [newPostImage, setNewPostImage] = useState("");
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
  
  const [commentInputs, setCommentInputs] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeDropdownPostId, setActiveDropdownPostId] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImagePreview(reader.result);
        setNewPostImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email.includes("@") && password.length >= 6) {
      setIsLoggedIn(true);
      setAuthMode('dashboard');
      setAuthError("");
    } else {
      setAuthError("Please enter a valid email and a password of at least 6 characters.");
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setAuthMode('dashboard');
    setAuthError("");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthMode('landing');
    setEmail("");
    setPassword("");
    setName("");
    setCohort("");
    setIsDropdownOpen(false);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim() && !newPostImage) return;

    const newPost = {
      id: Date.now(),
      author: name || "Upeka Sewwandi",
      avatar: "👨‍🎓",
      batch: cohort || "Computing - Batch '24",
      time: "Just now",
      content: newPostText || "Shared an attachment node",
      image: newPostImage,
      likes: 0,
      hasLiked: false,
      reposts: 0,
      hasReposted: false,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");
    setNewPostImage("");
    setUploadedImagePreview(null);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
          hasLiked: !post.hasLiked
        };
      }
      return post;
    }));
  };

  const handleRepost = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          reposts: post.hasReposted ? post.reposts - 1 : post.reposts + 1,
          hasReposted: !post.hasReposted
        };
      }
      return post;
    }));
  };

  const handleShareClick = (postContent) => {
    navigator.clipboard.writeText(window.location.href);
    alert(`"${postContent.substring(0, 20)}..." post link copied to clipboard! 🔗`);
  };

  const handleAddComment = (postId) => {
    const currentInput = commentInputs[postId];
    if (!currentInput || !currentInput.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { id: Date.now(), user: name || "Upeka Sewwandi", text: currentInput }]
        };
      }
      return post;
    }));

    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  const handlePostAction = (actionType, post) => {
    setActiveDropdownPostId(null);
    if (actionType === 'save') {
      alert(`"${post.content.substring(0, 20)}..." has been successfully saved to your bookmarks! 🔖`);
    } else if (actionType === 'share') {
      handleShareClick(post.content);
    } else if (actionType === 'delete') {
      if (window.confirm("Are you sure you want to delete this post?")) {
        setPosts(posts.filter(p => p.id !== post.id));
      }
    } else if (actionType === 'report') {
      alert("This post has been reported to the administration. ⚠️");
    } else if (actionType === 'privacy') {
      alert("Privacy Settings: Anyone on UniGrid can view this post.");
    }
  };

  if (authMode === 'landing') {
    return (
      <div className="pingup-landing-wrapper">
        <div className="landing-left-hero">
          <div className="brand-header">UniGrid <span>🎓</span></div>
          <h1>Connect. Collaborate. <br /><span className="highlight-text">Elevate Campus Life.</span></h1>
          <p className="hero-subtitle">The Ultimate Academic Social Hub Engineered Exclusively For Peer Networking, Real-time Knowledge Mapping, and Group Project Synchronization.</p>
        </div>

        <div className="landing-right-graphic">
          <div className="abstract-glow-core"></div>
          
          <div className="auth-central-card landing-form-card">
            {authError && <div className="auth-error-banner">❌ {authError}</div>}
            
            {activeForm === 'signin' ? (
              <>
                <h2>Sign in to UniGrid <span>👋</span></h2>
                <p className="auth-subtext">Welcome back! Please sign in to continue.</p>
                <form onSubmit={handleSignIn}>
                  <div className="auth-field-group">
                    <label>Email address</label>
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="auth-field-group">
                    <label>Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                    />
                  </div>
                  <button type="submit" className="auth-submit-btn">Continue ‣</button>
                </form>
                <p className="auth-switch-footer">Don't have an account? <span onClick={() => { setActiveForm('signup'); setAuthError(""); }}>Sign up</span></p>
              </>
            ) : (
              <>
                <h2>Create Profile <span>🎓</span></h2>
                <p className="auth-subtext">Provision a secure ledger node on the peer grid.</p>
                <form onSubmit={handleSignUp}>
                  <div className="auth-field-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="auth-field-group">
                    <label>Academic Email</label>
                    <input 
                      type="email" 
                      placeholder="john@campus.edu" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="auth-field-group">
                    <label>Select Batch Cohort</label>
                    <input 
                      type="text" 
                      placeholder="Computing - Batch '24" 
                      value={cohort}
                      onChange={(e) => setCohort(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="auth-field-group">
                    <label>Secure Password</label>
                    <input 
                      type="password" 
                      placeholder="Min. 8 characters" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                  <button type="submit" className="auth-submit-btn">Build Node Profile</button>
                </form>
                <p className="auth-switch-footer">Already active? <span onClick={() => { setActiveForm('signin'); setAuthError(""); }}>Authenticate</span></p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (authMode === 'dashboard') {
    return (
      <div className="dashboard-root">
        <header className="navbar">
          <div className="navbar-left">
            <div className="logo">UniGrid <span>🎓</span></div>
          </div>
          
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search logs, peers, cohorts..." />
          </div>
          
          <div className="navbar-right">
            <div className="nav-icon-badge">🔔<span className="badge-count">3</span></div>
            <div className="nav-icon-badge">
              <svg className="nav-custom-msg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              <span className="badge-count">5</span>
            </div>
            
            <div className="nav-profile-container">
              <div className="nav-user-clickable" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <div className="nav-avatar">👨‍🎓</div>
                <span className="nav-username">{name || "Upeka Sewwandi"}</span>
                <span className={`arrow-icon ${isDropdownOpen ? 'open' : ''}`}>▼</span>
              </div>

              {isDropdownOpen && (
                <div className="profile-dropdown-menu">
                  <div className="dropdown-header">
                    <strong>{name || "Upeka Sewwandi"}</strong>
                    <span>{email || "upeka@campus.edu"}</span>
                  </div>
                  <hr className="dropdown-divider" />
                  <div className="dropdown-item">⚙️ Core Settings</div>
                  <div className="dropdown-item">👤 Node Profile</div>
                  <div className="dropdown-item">📚 Cohorts</div>
                  <div className="dropdown-item">🤝 Help & Support</div>
                  <hr className="dropdown-divider" />
                  <div className="dropdown-item logout" onClick={handleLogout}>Log Out ➡️</div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="main-layout">
          <aside className="sidebar left-sidebar">
            <div className="dashboard-glass-card profile-card">
              <div className="profile-cover"></div>
              <div className="profile-avatar-large">👨‍🎓</div>
              <h3>{name || "Upeka Sewwandi"}</h3>
              <p className="student-id">{cohort || "Computing — Batch '24"}</p>
              <div className="stats-row">
                <div className="stat-box"><strong>{posts.length}</strong><span>Posts</span></div>
                <div className="stat-box"><strong>185</strong><span>Connections</span></div>
                <div className="stat-box"><strong>4.2</strong><span>GPA</span></div>
              </div>
            </div>
            
            <div className="dashboard-glass-card quick-links">
              <h4>System Terminals</h4>
              <ul>
                <li className="active">🏠 Network Feed</li>
                <li>📚 Study Nodes</li>
                <li>📅 Sprint Schedules</li>
                <li>📢 Bulletins</li>
                <li>🏆 Leaderboards</li>
                <li>💼 Campus Jobs</li>
              </ul>
            </div>
          </aside>

          <main className="feed-container">
            <div className="stories-container">
              <div className="story-card create-story">
                <div className="story-avatar">+</div>
                <span>Broadcast</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                  title="Upload image grid log"
                />
              </div>
              
              <div className="story-card">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&auto=format&fit=crop" alt="story" />
                <span>Workshop</span>
              </div>
              <div className="story-card">
                <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&auto=format&fit=crop" alt="story" />
                <span>Hackathon</span>
              </div>
              <div className="story-card">
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=150&auto=format&fit=crop" alt="story" />
                <span>Sync Meet</span>
              </div>
              <div className="story-card">
                <img src="/image2.jpg" alt="story" />
                <span>Examination</span>
              </div>
 
              {uploadedImagePreview && (
                <div className="story-preview-wrapper">
                  <button 
                    className="remove-preview-overlay" 
                    onClick={() => { setUploadedImagePreview(null); setNewPostImage(""); }}
                    title="Remove item"
                  >
                    ×
                  </button>
                  <img src={uploadedImagePreview} alt="Upload Grid item Preview" className="story-preview-img" />
                  <span className="preview-badge">Ready</span>
                </div>
              )}
            </div>

            <div className="dashboard-glass-card create-post">
              <div className="create-post-header">
                <div className="small-avatar">🎓</div>
                <h3>Broadcast to Cohort Channel</h3>
              </div>
              <form onSubmit={handleCreatePost}>
                <textarea 
                  placeholder="Transmit terminal log, assignment notes or sync queries..." 
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                />
                <div className="input-row">
                  <input 
                    type="text" 
                    placeholder="🔗 Attach Image Node URL (Optional)..." 
                    value={newPostImage && !newPostImage.startsWith('data:') ? newPostImage : ""}
                    onChange={(e) => setNewPostImage(e.target.value)}
                  />
                  <button type="submit">Transmit</button>
                </div>
              </form>
            </div>

            <div className="posts-list">
              {posts.map((post) => (
                <div key={post.id} className="dashboard-glass-card post-card">
                  <div className="post-header">
                    <div className="post-avatar">{post.avatar}</div>
                    <div className="post-meta">
                      <h4>{post.author}</h4>
                      <div className="badge-row">
                        <span className="badge">{post.batch}</span>
                        <span className="post-time">• {post.time}</span>
                      </div>
                    </div>
                    
                    <div className="post-options-wrapper">
                      <button 
                        className="post-options-trigger"
                        onClick={() => setActiveDropdownPostId(activeDropdownPostId === post.id ? null : post.id)}
                      >
                        •••
                      </button>
                      
                      {activeDropdownPostId === post.id && (
                        <div className="post-options-dropdown">
                          <div className="post-options-item" onClick={() => handlePostAction('save', post)}>
                            <span className="opt-icon">🔖</span> Save
                          </div>
                          <div className="post-options-item" onClick={() => handlePostAction('share', post)}>
                            <span className="opt-icon">🔗</span> Share via
                          </div>
                          <div className="post-options-item delete-action" onClick={() => handlePostAction('delete', post)}>
                            <span className="opt-icon">🗑️</span> Delete post
                          </div>
                          <div className="post-options-item" onClick={() => handlePostAction('report', post)}>
                            <span className="opt-icon">🏳️</span> Report post
                          </div>
                          <div className="post-options-item" onClick={() => handlePostAction('privacy', post)}>
                            <span className="opt-icon">👁️</span> Who can view my post?
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="post-content">{post.content}</p>
                  
                  {post.image && (
                    <div className="post-image">
                      <img src={post.image} alt="Node Graphic Attachment" />
                    </div>
                  )}

                  {/* ==========================================================================
                     UPDATED INLINE ACTIONS: UPVOTE -> COMMENT -> REPOST -> SHARE 
                     ========================================================================== */}
                  <div className="post-actions">
                    {/* 1. Upvote Button */}
                    <button 
                      className={`like-btn ${post.hasLiked ? 'liked' : ''}`} 
                      onClick={() => handleLike(post.id)}
                    >
                      <svg className="action-svg-icon" viewBox="0 0 24 24" fill={post.hasLiked ? "#ef4444" : "none"} stroke={post.hasLiked ? "#ef4444" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                      <span>{post.likes} Upvotes</span>
                    </button>

                    {/* 2. Comment Button */}
                    <button className="comment-count-btn">
                      <svg className="action-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                      <span>{post.comments.length} Comments</span>
                    </button>

                    {/* 3. Repost Button  */}
                    <button 
                      className={`repost-btn ${post.hasReposted ? 'reposted' : ''}`}
                      onClick={() => handleRepost(post.id)}
                    >
                      <svg className="action-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="17 1 21 5 17 9"></polyline>
                        <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                        <polyline points="7 23 3 19 7 15"></polyline>
                        <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                      </svg>
                      <span>{post.reposts} Reposts</span>
                    </button>

                    {/* 4. Share Button  */}
                    <button className="share-btn" onClick={() => handleShareClick(post.content)}>
                      <svg className="action-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                      </svg>
                      <span>Share</span>
                    </button>
                  </div>

                  <div className="comments-section">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="comment">
                        <span className="comment-user">{comment.user}:</span>
                        <span className="comment-text">{comment.text}</span>
                      </div>
                    ))}
                    
                    <div className="comment-input-group">
                      <input 
                        type="text" 
                        placeholder="Write a comment..." 
                        value={commentInputs[post.id] || ""}
                        onChange={(e) => setCommentInputs({
                          ...commentInputs,
                          [post.id]: e.target.value
                        })}
                      />
                      <button onClick={() => handleAddComment(post.id)}>Send</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>

          <aside className="right-panel">
            <div className="dashboard-glass-card online-peers-widget">
              <h4>Active Peers 🟢</h4>
              <div className="peers-vertical-stack">
                {onlineStudents.map(student => (
                  <div key={student.id} className="peer-profile-row">
                    <div className="peer-avatar-wrapper">
                      <span className="p-avatar-face">{student.avatar}</span>
                      <span className={`status-dot ${student.status}`}></span>
                    </div>
                    <div className="peer-profile-meta">
                      <span className="peer-profile-name">{student.name}</span>
                      <span className="peer-profile-status">{student.status === 'online' ? 'Active now' : 'Offline'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-glass-card trending-widget">
              <h4>Trending Tags 🔥</h4>
              <div className="tags-cloud">
                <span>#WebDev2026</span>
                <span>#Hackathon</span>
                <span>#ExamStruggle</span>
                <span>#CampusVibes</span>
                <span>#GroupProjects</span>
                <span>#ClubEvents</span>
              </div>
            </div>
          </aside>

        </div>
      </div>
    );
  }
}

export default App;