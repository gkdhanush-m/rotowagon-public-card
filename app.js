/**
 * RotoWagon QR Lead Platform & Digital Visiting Card — Application Engine
 * Pure Vanilla JS | Reactive Store Sync | Zero External Dependencies
 */
(function (global) {
  'use strict';

  const App = {
    // Current application state
    state: {
      experience: 'public', // 'public' | 'tenant' | 'platform'
      viewMode: 'mobile',   // 'mobile' | 'desktop'
      theme: 'light',       // 'light' | 'dark'
      activeHeroIdx: 4,     // Default to 5th product: Spiral Mixer ('5 / 6')
      productQty: 1,
      activeProductTab: 'specs', // 'specs' | 'features' | 'applications'
      activeCategoryFilter: 'All',
      selectedProducts: ['Spiral Mixer'],
      moreDetailsOpen: false,
      
      // Tenant Admin state
      adminTab: 'dashboard',
      leadFilter: 'All',
      selectedLead: null,
      
      // Product Wizard state
      productWizardStep: 0,
      draftProduct: null,
      editingProductId: null,
      
      // Event state
      draftEvent: null
    },

    // Machine SVG Graphics Generator
    getProductIllustration: function (name, code, accent) {
      const color = accent || '#b8501e';
      const cleanName = String(name || '').toLowerCase();

      if (cleanName.includes('spiral')) {
        // High-torque commercial spiral dough mixer
        return `
          <svg class="machine-svg-graphic" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="150" width="150" height="24" rx="6" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
            <rect x="35" y="155" width="20" height="14" rx="3" fill="#64748b"/>
            <rect x="145" y="155" width="20" height="14" rx="3" fill="#64748b"/>
            <rect x="130" y="45" width="45" height="110" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2.5"/>
            <rect x="138" y="55" width="29" height="24" rx="4" fill="#0f172a"/>
            <circle cx="145" cy="67" r="3" fill="${color}"/>
            <circle cx="155" cy="67" r="3" fill="#22c55e"/>
            <!-- Top drive arm -->
            <path d="M70 45 H165 V72 H75 C60 72 55 60 70 45 Z" fill="#94a3b8" stroke="#64748b" stroke-width="2"/>
            <!-- Mixing Bowl -->
            <ellipse cx="85" cy="115" rx="55" ry="32" fill="#f8fafc" stroke="#64748b" stroke-width="3"/>
            <path d="M30 115 C30 148 140 148 140 115" fill="#f1f5f9" stroke="#64748b" stroke-width="3"/>
            <!-- Safety Grid -->
            <path d="M45 105 Q85 125 125 105" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3"/>
            <path d="M50 112 Q85 130 120 112" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3"/>
            <!-- Spiral Hook -->
            <path d="M85 70 V105 Q85 130 98 122 Q110 115 95 108 Q80 102 90 92" stroke="${color}" stroke-width="4.5" stroke-linecap="round"/>
          </svg>`;
      } else if (cleanName.includes('rack')) {
        // Rotary Rack Oven
        return `
          <svg class="machine-svg-graphic" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="35" y="25" width="130" height="155" rx="10" fill="#e2e8f0" stroke="#64748b" stroke-width="3"/>
            <!-- Glass Door -->
            <rect x="50" y="42" width="70" height="122" rx="6" fill="#1e293b" stroke="#94a3b8" stroke-width="2"/>
            <!-- Internal Rotating Rack Rungs -->
            <line x1="58" y1="58" x2="112" y2="58" stroke="#cbd5e1" stroke-width="2"/>
            <line x1="58" y1="74" x2="112" y2="74" stroke="#cbd5e1" stroke-width="2"/>
            <line x1="58" y1="90" x2="112" y2="90" stroke="#cbd5e1" stroke-width="2"/>
            <line x1="58" y1="106" x2="112" y2="106" stroke="#cbd5e1" stroke-width="2"/>
            <line x1="58" y1="122" x2="112" y2="122" stroke="#cbd5e1" stroke-width="2"/>
            <line x1="58" y1="138" x2="112" y2="138" stroke="#cbd5e1" stroke-width="2"/>
            <line x1="58" y1="154" x2="112" y2="154" stroke="#cbd5e1" stroke-width="2"/>
            <!-- Handle -->
            <rect x="115" y="85" width="6" height="35" rx="3" fill="#64748b"/>
            <!-- PLC Control Column -->
            <rect x="130" y="42" width="25" height="122" rx="4" fill="#0f172a"/>
            <rect x="135" y="50" width="15" height="24" rx="2" fill="${color}"/>
            <circle cx="142.5" cy="88" r="3.5" fill="#22c55e"/>
            <circle cx="142.5" cy="102" r="3.5" fill="#eab308"/>
            <circle cx="142.5" cy="116" r="3.5" fill="#ef4444"/>
            <!-- Top Steam Hood -->
            <path d="M45 25 L55 12 H145 L155 25 Z" fill="#94a3b8" stroke="#64748b" stroke-width="2"/>
          </svg>`;
      } else if (cleanName.includes('deck')) {
        // Multi-Deck Oven
        return `
          <svg class="machine-svg-graphic" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="30" width="140" height="145" rx="8" fill="#e2e8f0" stroke="#64748b" stroke-width="3"/>
            <!-- Deck 1 -->
            <rect x="42" y="42" width="90" height="30" rx="4" fill="#1e293b" stroke="#94a3b8" stroke-width="2"/>
            <rect x="52" y="52" width="70" height="10" rx="2" fill="#f59e0b" opacity="0.7"/>
            <rect x="140" y="44" width="20" height="26" rx="3" fill="#0f172a"/>
            <!-- Deck 2 -->
            <rect x="42" y="82" width="90" height="30" rx="4" fill="#1e293b" stroke="#94a3b8" stroke-width="2"/>
            <rect x="52" y="92" width="70" height="10" rx="2" fill="#f59e0b" opacity="0.7"/>
            <rect x="140" y="84" width="20" height="26" rx="3" fill="#0f172a"/>
            <!-- Deck 3 -->
            <rect x="42" y="122" width="90" height="30" rx="4" fill="#1e293b" stroke="#94a3b8" stroke-width="2"/>
            <rect x="52" y="132" width="70" height="10" rx="2" fill="#f59e0b" opacity="0.7"/>
            <rect x="140" y="124" width="20" height="26" rx="3" fill="#0f172a"/>
            <!-- Feet -->
            <rect x="40" y="175" width="16" height="10" fill="#64748b"/>
            <rect x="144" y="175" width="16" height="10" fill="#64748b"/>
          </svg>`;
      } else if (cleanName.includes('slicer')) {
        // Bread Slicer
        return `
          <svg class="machine-svg-graphic" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="35" y="45" width="130" height="120" rx="8" fill="#e2e8f0" stroke="#64748b" stroke-width="3"/>
            <!-- Chute -->
            <path d="M45 55 L85 95 H155 L155 55 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
            <!-- Serrated Blades -->
            <line x1="90" y1="92" x2="90" y2="148" stroke="${color}" stroke-width="2.5"/>
            <line x1="98" y1="92" x2="98" y2="148" stroke="${color}" stroke-width="2.5"/>
            <line x1="106" y1="92" x2="106" y2="148" stroke="${color}" stroke-width="2.5"/>
            <line x1="114" y1="92" x2="114" y2="148" stroke="${color}" stroke-width="2.5"/>
            <line x1="122" y1="92" x2="122" y2="148" stroke="${color}" stroke-width="2.5"/>
            <line x1="130" y1="92" x2="130" y2="148" stroke="${color}" stroke-width="2.5"/>
            <!-- Bagging Shelf -->
            <rect x="45" y="125" width="40" height="30" rx="3" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
            <!-- Push Handle -->
            <rect x="140" y="30" width="8" height="40" rx="4" fill="#0f172a"/>
          </svg>`;
      } else if (cleanName.includes('planetary')) {
        // Planetary Mixer
        return `
          <svg class="machine-svg-graphic" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="45" y="160" width="110" height="20" rx="5" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
            <!-- Column -->
            <rect x="65" y="45" width="70" height="120" rx="6" fill="#e2e8f0" stroke="#64748b" stroke-width="2.5"/>
            <!-- Head -->
            <path d="M50 45 H150 V80 H80 C60 80 50 65 50 45 Z" fill="#94a3b8" stroke="#64748b" stroke-width="2.5"/>
            <!-- Control lever -->
            <rect x="145" y="55" width="14" height="6" rx="2" fill="${color}"/>
            <!-- Deep Bowl -->
            <path d="M60 100 C60 145 140 145 140 100 Z" fill="#f8fafc" stroke="#64748b" stroke-width="3"/>
            <!-- Whisk Attachment -->
            <path d="M100 80 V125 M92 95 Q100 125 108 95 M85 102 Q100 132 115 102" stroke="${color}" stroke-width="2.5" fill="none"/>
          </svg>`;
      } else {
        // Dough Divider / General Machine
        return `
          <svg class="machine-svg-graphic" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="65" width="120" height="105" rx="8" fill="#e2e8f0" stroke="#64748b" stroke-width="3"/>
            <!-- Hopper Head -->
            <path d="M55 25 H145 L135 65 H65 Z" fill="#94a3b8" stroke="#64748b" stroke-width="2.5"/>
            <!-- Division Matrix Grid -->
            <rect x="60" y="85" width="80" height="60" rx="4" fill="#0f172a"/>
            <line x1="86" y1="85" x2="86" y2="145" stroke="${color}" stroke-width="2"/>
            <line x1="114" y1="85" x2="114" y2="145" stroke="${color}" stroke-width="2"/>
            <line x1="60" y1="105" x2="140" y2="105" stroke="${color}" stroke-width="2"/>
            <line x1="60" y1="125" x2="140" y2="125" stroke="${color}" stroke-width="2"/>
            <!-- Castor Wheels -->
            <circle cx="55" cy="175" r="7" fill="#64748b"/>
            <circle cx="145" cy="175" r="7" fill="#64748b"/>
          </svg>`;
      }
    },

    // Initialize application
    init: function () {
      const db = global.PlatformStore.load();
      if (db.uiTheme) App.state.theme = db.uiTheme;
      if (typeof db.activeHeroIdx === 'number') App.state.activeHeroIdx = db.activeHeroIdx;
      
      // Auto-set view mode: on real mobile screens default to mobile view
      if (window.innerWidth <= 768) {
        App.state.viewMode = 'mobile';
      }

      // Check URL query parameters for view routing (e.g. ?view=admin or ?view=tenant)
      const urlParams = new URLSearchParams(window.location.search);
      const viewParam = urlParams.get('view');
      if (viewParam === 'tenant' || viewParam === 'admin') {
        window.location.href = 'tenant-admin.html';
        return;
      } else if (viewParam === 'master' || viewParam === 'platform') {
        window.location.href = 'master-admin.html';
        return;
      }

      // Subscribe to reactive store changes
      global.PlatformStore.subscribe(function () {
        App.renderApp();
      });

      // Storage event listener across tabs
      window.addEventListener('storage', function (e) {
        if (e.key === 'mecard_platform_v4') {
          global.PlatformStore.load();
          App.renderApp();
        }
      });

      App.renderApp();
    },

    // Master render orchestrator
    renderApp: function () {
      const db = global.PlatformStore.load();
      const s = App.state;

      // Apply theme
      document.documentElement.setAttribute('data-theme', s.theme);
      const sunIcon = document.querySelector('.sun-icon');
      const moonIcon = document.querySelector('.moon-icon');
      if (sunIcon && moonIcon) {
        sunIcon.style.display = s.theme === 'light' ? 'block' : 'none';
        moonIcon.style.display = s.theme === 'dark' ? 'block' : 'none';
      }

      // Update Top Nav Switcher active pills
      const pillPublic = document.getElementById('pill-public');
      const pillTenant = document.getElementById('pill-tenant');
      const pillMaster = document.getElementById('pill-master');
      if (pillPublic) pillPublic.className = 'nav-pill ' + (s.experience === 'public' ? 'active' : '');
      if (pillTenant) pillTenant.className = 'nav-pill ' + (s.experience === 'tenant' ? 'active' : '');
      if (pillMaster) pillMaster.className = 'nav-pill ' + (s.experience === 'platform' ? 'active' : '');

      // Update Desktop vs Mobile toggle buttons
      const btnDesktop = document.getElementById('btn-view-desktop');
      const btnMobile = document.getElementById('btn-view-mobile');
      if (btnDesktop) btnDesktop.className = 'view-toggle-btn ' + (s.viewMode === 'desktop' ? 'active' : '');
      if (btnMobile) btnMobile.className = 'view-toggle-btn ' + (s.viewMode === 'mobile' ? 'active' : '');

      // Update RBAC role indicator
      const roleDot = document.getElementById('top-role-dot');
      const roleName = document.getElementById('top-role-name');
      const session = global.RBAC.getSession();
      if (roleName) {
        if (!session || session.role === 'viewer') {
          roleName.textContent = 'Admin Sign In';
          if (roleDot) roleDot.style.background = '#64748b';
        } else {
          const meta = global.RBAC.getRoleMeta(session.role);
          roleName.textContent = meta.label;
          if (roleDot) roleDot.style.background = meta.color;
        }
      }

      // Switch Main View Panels
      const viewPublic = document.getElementById('view-public');
      const viewTenant = document.getElementById('view-tenant-admin');
      const viewMaster = document.getElementById('view-master-admin');

      if (viewPublic) viewPublic.style.display = s.experience === 'public' ? 'block' : 'none';
      if (viewTenant) viewTenant.style.display = s.experience === 'tenant' ? 'block' : 'none';
      if (viewMaster) viewMaster.style.display = s.experience === 'platform' ? 'block' : 'none';

      // Render corresponding experience view
      if (s.experience === 'public') {
        App.renderPublicPortal();
      } else if (s.experience === 'tenant') {
        App.renderTenantAdmin();
      } else if (s.experience === 'platform') {
        App.renderMasterAdmin();
      }
    },

    // ========================================================================
    // PUBLIC PORTAL RENDERER (1:1 Slideshow, Initials Row, Live Specs)
    // ========================================================================
    renderPublicPortal: function () {
      const db = global.PlatformStore.load();
      const s = App.state;
      const c = db.enterpriseCard || {};
      const products = (db.products || []).filter(function (p) { return p && p.name; });

      if (products.length === 0) return;

      // Clamp activeHeroIdx within bounds
      if (s.activeHeroIdx >= products.length) s.activeHeroIdx = 0;
      const p = products[s.activeHeroIdx];

      // Update phone mockup container mode
      const phoneFrame = document.getElementById('public-phone-frame');
      if (phoneFrame) {
        phoneFrame.className = 'phone-mockup-frame ' + (s.viewMode === 'desktop' ? 'mode-desktop' : 'mode-mobile');
      }

      // Update Card Header
      const brandPill = document.getElementById('card-brand-pill');
      const brandName = document.getElementById('card-brand-name');
      if (brandPill) brandPill.textContent = c.brandShort || 'RW';
      if (brandName) brandName.textContent = c.company || 'RotoWagon';

      const callBtn = document.getElementById('card-call-btn');
      const waBtn = document.getElementById('card-whatsapp-btn');
      const smbCall = document.getElementById('smb-call');
      const smbWa = document.getElementById('smb-wa');
      const cleanPhone = global.Security.sanitizePhone(c.phone || '+912266889900');
      const cleanWa = global.Security.sanitizePhone(c.whatsapp || '+919820012345');

      if (callBtn) callBtn.href = 'tel:' + cleanPhone;
      if (smbCall) smbCall.href = 'tel:' + cleanPhone;
      if (waBtn) waBtn.href = 'https://wa.me/' + cleanWa.replace('+', '');
      if (smbWa) smbWa.href = 'https://wa.me/' + cleanWa.replace('+', '');

      // 1:1 PRODUCT SLIDESHOW CARD
      const nameBadge = document.getElementById('slideshow-name-badge');
      const counterBadge = document.getElementById('slideshow-counter-badge');
      const visualWrap = document.getElementById('slideshow-visual-wrap');

      if (nameBadge) nameBadge.textContent = p.name;
      if (counterBadge) counterBadge.textContent = (s.activeHeroIdx + 1) + ' / ' + products.length;
      
      if (visualWrap) {
        visualWrap.innerHTML = `
          ${App.getProductIllustration(p.name, p.code, c.accent)}
          <div class="photo-placeholder-caption">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <span>${global.Security.escapeHTML(p.name)} photo</span>
          </div>
        `;
      }

      // THUMBNAIL INITIALS ROW (RR, RD, BS, PM, SM, DD)
      const initialsRow = document.getElementById('thumbnail-initials-row');
      if (initialsRow) {
        initialsRow.innerHTML = products.map(function (prod, idx) {
          const initials = global.PlatformStore.getInitials(prod.name);
          const isActive = idx === s.activeHeroIdx;
          return `<button type="button" class="thumb-pill-btn ${isActive ? 'active' : ''}" onclick="App.setHeroIdx(${idx})" title="${global.Security.escapeHTML(prod.name)}">${initials}</button>`;
        }).join('');
      }

      // LIVE SPEC CARD (2-Column Key/Value Grid)
      const specCard = document.getElementById('spec-summary-card');
      if (specCard) {
        const specsToShow = (p.specs || []).slice(0, 4);
        if (specsToShow.length > 0) {
          specCard.innerHTML = specsToShow.map(function (sp) {
            return `
              <div class="spec-summary-item">
                <div class="spec-summary-label">${global.Security.escapeHTML(sp.k)}</div>
                <div class="spec-summary-val">${global.Security.escapeHTML(sp.v)}</div>
              </div>`;
          }).join('');
          specCard.style.display = 'grid';
        } else {
          specCard.style.display = 'none';
        }
      }

      // PRODUCT INTRO HEADLINE
      const eyebrow = document.getElementById('hero-category-eyebrow');
      const title = document.getElementById('hero-product-title');
      const code = document.getElementById('hero-model-code');
      const tagline = document.getElementById('hero-product-tagline');

      if (eyebrow) eyebrow.textContent = (p.category || 'INDUSTRIAL BAKERY EQUIPMENT').toUpperCase();
      if (title) title.textContent = p.name;
      if (code) code.textContent = 'Model ' + (p.code || 'RW-' + (s.activeHeroIdx + 1));
      if (tagline) tagline.textContent = p.tagline || 'Heavy-duty industrial equipment built for high continuous throughput.';

      // Quantity Stepper
      const qtyDisp = document.getElementById('product-qty-display');
      const unitDisp = document.getElementById('product-unit-display');
      if (qtyDisp) qtyDisp.textContent = s.productQty;
      if (unitDisp) unitDisp.textContent = p.qtyUnit || 'Units';

      // Product Tabs Body
      const tabBody = document.getElementById('product-tab-body');
      if (tabBody) {
        if (s.activeProductTab === 'specs') {
          const allSpecs = p.specs || [];
          tabBody.innerHTML = `
            <div class="tab-spec-list">
              ${allSpecs.map(function (sp) {
                return `
                  <div class="tab-spec-row">
                    <span class="tab-spec-k">${global.Security.escapeHTML(sp.k)}</span>
                    <span class="tab-spec-v">${global.Security.escapeHTML(sp.v)}</span>
                  </div>`;
              }).join('')}
            </div>`;
        } else if (s.activeProductTab === 'features') {
          const feats = p.features && p.features.length ? p.features : ['Heavy-duty stainless steel frame', 'Digital PLC touch control', 'High thermal efficiency'];
          tabBody.innerHTML = `
            <div class="tab-bullet-list">
              ${feats.map(function (f) {
                return `<div class="tab-bullet-item"><span class="bullet-dot"></span><span>${global.Security.escapeHTML(f)}</span></div>`;
              }).join('')}
            </div>`;
        } else {
          const apps = p.applications && p.applications.length ? p.applications : ['Commercial bread & bun lines', 'Artisan bakeries', 'Institutional food processing'];
          tabBody.innerHTML = `
            <div class="tab-bullet-list">
              ${apps.map(function (a) {
                return `<div class="tab-bullet-item"><span class="bullet-dot"></span><span>${global.Security.escapeHTML(a)}</span></div>`;
              }).join('')}
            </div>`;
        }
      }

      // Product Tabs Header active states
      document.querySelectorAll('.product-tab-btn').forEach(function (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-ptab') === s.activeProductTab);
      });

      // Category Chips
      const chipsRow = document.getElementById('category-chips-row');
      const categories = ['All'].concat((db.categories || []).map(function (x) { return x.name; }));
      if (chipsRow) {
        chipsRow.innerHTML = categories.map(function (cat) {
          const isActive = cat === s.activeCategoryFilter;
          return `<button type="button" class="cat-chip-btn ${isActive ? 'active' : ''}" onclick="App.setCategoryFilter('${global.Security.escapeHTML(cat)}')">${global.Security.escapeHTML(cat)}</button>`;
        }).join('');
      }

      // Compact Catalog Grid
      const compactGrid = document.getElementById('product-grid-compact');
      if (compactGrid) {
        const filtered = s.activeCategoryFilter === 'All'
          ? products
          : products.filter(function (x) { return x.category === s.activeCategoryFilter; });
        
        compactGrid.innerHTML = filtered.map(function (prod) {
          const origIdx = products.indexOf(prod);
          return `
            <div class="mini-product-card" onclick="App.setHeroIdx(${origIdx})">
              <div class="mini-card-img-wrap">
                ${App.getProductIllustration(prod.name, prod.code, c.accent)}
              </div>
              <span class="mini-card-tag">${global.Security.escapeHTML(prod.category)}</span>
              <h4 class="mini-card-title">${global.Security.escapeHTML(prod.name)}</h4>
            </div>`;
        }).join('');
      }

      // Selected product banner in Enquiry Form
      const selName = document.getElementById('enquiry-selected-name');
      if (selName) selName.textContent = p.name + ' (' + (p.code || '') + ')';

      // Representative Details
      const repAvatar = document.getElementById('company-rep-avatar');
      const repName = document.getElementById('company-rep-name');
      const repRole = document.getElementById('company-rep-role');
      const repOrg = document.getElementById('company-rep-org');
      const footerWa = document.getElementById('btn-footer-wa');

      if (repAvatar) repAvatar.textContent = (c.name || 'Rajesh Sharma').split(' ').map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase();
      if (repName) repName.textContent = c.name || 'Rajesh Sharma';
      if (repRole) repRole.textContent = c.role || 'Operations & Sales Director';
      if (repOrg) repOrg.textContent = c.company || 'RotoWagon Equipment Pvt. Ltd.';
      if (footerWa) footerWa.href = 'https://wa.me/' + cleanWa.replace('+', '');

      // Render Inline QR Code
      const qrTarget = document.getElementById('public-card-qr');
      if (qrTarget && global.QRCodeEngine) {
        const vcardPayload = App.generateVCardString(c);
        qrTarget.innerHTML = global.QRCodeEngine.generateSVG(vcardPayload, 140, 2, c.accent || '#b8501e', '#ffffff');
      }
    },

    // ========================================================================
    // TENANT ADMIN CONSOLE RENDERER
    // ========================================================================
    renderTenantAdmin: function () {
      const db = global.PlatformStore.load();
      const s = App.state;
      const c = db.enterpriseCard || {};
      const container = document.getElementById('admin-content-area');
      if (!container) return;

      // Update sidebar counts
      const pCount = document.getElementById('admin-product-count');
      const lCount = document.getElementById('admin-lead-count');
      if (pCount) pCount.textContent = (db.products || []).length;
      if (lCount) lCount.textContent = (db.leads || []).length;

      // Update sidebar active buttons
      document.querySelectorAll('.sidebar-btn').forEach(function (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === s.adminTab);
      });

      // Render Admin Content Tab
      if (s.adminTab === 'dashboard') {
        const leads = db.leads || [];
        const products = db.products || [];
        container.innerHTML = `
          <div class="admin-view-header">
            <div>
              <h1 class="admin-view-title">Executive Dashboard</h1>
              <div class="admin-view-sub">Real-time QR lead metrics and equipment inquiries</div>
            </div>
            <button class="btn-primary" onclick="App.startNewProduct()">+ Add New Product</button>
          </div>

          <div class="admin-kpi-grid">
            <div class="kpi-card">
              <div class="kpi-label">Active Equipment</div>
              <div class="kpi-value">${products.length}</div>
              <div class="kpi-sub">Across ${db.categories.length} categories</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">Total Leads Received</div>
              <div class="kpi-value">${leads.length}</div>
              <div class="kpi-sub">+12 this week</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">QR Engagements</div>
              <div class="kpi-value">822</div>
              <div class="kpi-sub">74.8% scan to enquiry</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-label">Catalogue Downloads</div>
              <div class="kpi-value">304</div>
              <div class="kpi-sub">High buyer intent</div>
            </div>
          </div>

          <div class="admin-table-card">
            <div class="table-card-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
              <h3>Recent Equipment Inquiries (CRM)</h3>
              <button class="btn-secondary" onclick="App.setAdminTab('leads')">Open Leads Pipeline</button>
            </div>
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Lead ID</th>
                    <th>Customer Name</th>
                    <th>Company</th>
                    <th>Interested Equipment</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${leads.slice(0, 5).map(function (l) {
                    return `
                      <tr>
                        <td><strong>${global.Security.escapeHTML(l.id)}</strong></td>
                        <td>${global.Security.escapeHTML(l.customer)}</td>
                        <td>${global.Security.escapeHTML(l.company || '—')}</td>
                        <td>${global.Security.escapeHTML(l.product || 'General')}</td>
                        <td><span class="status-badge ${l.status.toLowerCase()}">${global.Security.escapeHTML(l.status)}</span></td>
                        <td><button class="btn-secondary" style="padding:4px 10px;font-size:11.5px;" onclick="App.openCrmDrawer('${l.id}')">Inspect</button></td>
                      </tr>`;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>`;
      } else if (s.adminTab === 'company') {
        // Company & Branding Tab
        container.innerHTML = `
          <div class="admin-view-header">
            <div>
              <h1 class="admin-view-title">Company Profile &amp; Visiting Card Branding</h1>
              <div class="admin-view-sub">Changes saved here immediately update the Public Visiting Card &amp; QR Catalog</div>
            </div>
            <button class="btn-primary" onclick="App.saveCompanyProfile()">Save All Changes</button>
          </div>

          <div class="admin-table-card">
            <form onsubmit="event.preventDefault();App.saveCompanyProfile();" style="display:flex;flex-direction:column;gap:14px;">
              <div class="form-row">
                <div class="form-group flex-1">
                  <label for="cp-name">Company Full Name *</label>
                  <input class="form-input" type="text" id="cp-name" value="${global.Security.escapeHTML(c.company || 'RotoWagon Equipment Pvt. Ltd.')}" required>
                </div>
                <div class="form-group flex-1">
                  <label for="cp-short">Brand Initials / Mark (2 Letters) *</label>
                  <input class="form-input" type="text" id="cp-short" maxlength="4" value="${global.Security.escapeHTML(c.brandShort || 'RW')}" required>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group flex-1">
                  <label for="cp-rep-name">Director / Representative Name *</label>
                  <input class="form-input" type="text" id="cp-rep-name" value="${global.Security.escapeHTML(c.name || 'Rajesh Sharma')}" required>
                </div>
                <div class="form-group flex-1">
                  <label for="cp-role">Executive Designation *</label>
                  <input class="form-input" type="text" id="cp-role" value="${global.Security.escapeHTML(c.role || 'Operations & Sales Director')}" required>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group flex-1">
                  <label for="cp-phone">Direct Sales Phone</label>
                  <input class="form-input" type="tel" id="cp-phone" value="${global.Security.escapeHTML(c.phone || '+91 22 6688 9900')}">
                </div>
                <div class="form-group flex-1">
                  <label for="cp-whatsapp">WhatsApp Contact Number</label>
                  <input class="form-input" type="tel" id="cp-whatsapp" value="${global.Security.escapeHTML(c.whatsapp || '+91 98200 12345')}">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group flex-1">
                  <label for="cp-email">Official Inquiries Email</label>
                  <input class="form-input" type="email" id="cp-email" value="${global.Security.escapeHTML(c.email || 'sales@rotowagon.com')}">
                </div>
                <div class="form-group flex-1">
                  <label for="cp-web">Company Website URL</label>
                  <input class="form-input" type="url" id="cp-web" value="${global.Security.escapeHTML(c.website || 'https://rotowagon.com')}">
                </div>
              </div>

              <div class="form-group">
                <label for="cp-tagline">Industry Category / Tagline</label>
                <input class="form-input" type="text" id="cp-tagline" value="${global.Security.escapeHTML(c.tagline || 'Industrial Bakery & Food Processing Equipment')}">
              </div>

              <div class="form-group">
                <label for="cp-location">Registered Manufacturing Address</label>
                <input class="form-input" type="text" id="cp-location" value="${global.Security.escapeHTML(c.location || 'MIDC Industrial Area, Andheri East, Mumbai, India')}">
              </div>

              <div style="margin-top:10px;">
                <button type="submit" class="btn-primary">Update Company Profile</button>
              </div>
            </form>
          </div>`;
      } else if (s.adminTab === 'products') {
        // Products & Catalog Tab
        const products = db.products || [];
        container.innerHTML = `
          <div class="admin-view-header">
            <div>
              <h1 class="admin-view-title">Equipment Catalog (${products.length} Models)</h1>
              <div class="admin-view-sub">Manage models, specifications, and live product slideshow ordering</div>
            </div>
            <button class="btn-primary" onclick="App.startNewProduct()">+ Add New Product</button>
          </div>

          <div class="admin-table-card">
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Model Code</th>
                    <th>Equipment Name</th>
                    <th>Category</th>
                    <th>Key Specifications</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${products.map(function (prod) {
                    const specSummary = (prod.specs || []).map(function (sp) { return sp.k + ': ' + sp.v; }).slice(0, 2).join(' | ');
                    return `
                      <tr>
                        <td><strong>${global.Security.escapeHTML(prod.code || '—')}</strong></td>
                        <td>${global.Security.escapeHTML(prod.name)}</td>
                        <td><span class="status-badge new">${global.Security.escapeHTML(prod.category)}</span></td>
                        <td style="font-size:12px;color:var(--text-muted);">${global.Security.escapeHTML(specSummary || 'No specs added')}</td>
                        <td><span class="status-badge ${prod.status === 'Active' ? 'active' : 'draft'}">${global.Security.escapeHTML(prod.status)}</span></td>
                        <td>
                          <div style="display:flex;gap:6px;">
                            <button class="btn-secondary" style="padding:4px 10px;font-size:11.5px;" onclick="App.editProduct('${prod.id}')">Edit</button>
                            <button class="btn-secondary" style="padding:4px 10px;font-size:11.5px;color:var(--danger);" onclick="App.deleteProduct('${prod.id}')">Delete</button>
                          </div>
                        </td>
                      </tr>`;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>`;
      } else if (s.adminTab === 'leads') {
        // Leads CRM Tab
        const allLeads = db.leads || [];
        const filtered = s.leadFilter === 'All' ? allLeads : allLeads.filter(function (l) { return l.status === s.leadFilter; });
        const filterPills = ['All', 'New', 'Contacted', 'Qualified', 'Won', 'Lost'];

        container.innerHTML = `
          <div class="admin-view-header">
            <div>
              <h1 class="admin-view-title">Inquiries &amp; Leads CRM (${allLeads.length})</h1>
              <div class="admin-view-sub">All inquiries received from Public Digital Visiting Cards and QR scans</div>
            </div>
            <button class="btn-secondary" onclick="App.exportLeadsCSV()">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Export CSV</span>
            </button>
          </div>

          <div style="display:flex;gap:8px;margin-bottom:16px;">
            ${filterPills.map(function (f) {
              const isActive = f === s.leadFilter;
              return `<button class="cat-chip-btn ${isActive ? 'active' : ''}" onclick="App.setLeadFilter('${f}')">${f}</button>`;
            }).join('')}
          </div>

          <div class="admin-table-card">
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Lead Ref</th>
                    <th>Customer Name</th>
                    <th>Company</th>
                    <th>Phone / WhatsApp</th>
                    <th>Interested In</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${filtered.length ? filtered.map(function (l) {
                    return `
                      <tr>
                        <td><strong>${global.Security.escapeHTML(l.id)}</strong></td>
                        <td>${global.Security.escapeHTML(l.customer)}</td>
                        <td>${global.Security.escapeHTML(l.company || '—')}</td>
                        <td><a href="tel:${global.Security.sanitizePhone(l.phone)}" style="color:var(--accent);font-weight:600;">${global.Security.escapeHTML(l.phone)}</a></td>
                        <td>${global.Security.escapeHTML(l.product || 'General')}</td>
                        <td style="font-size:12px;color:var(--text-muted);">${global.Security.escapeHTML(l.date || 'Today')}</td>
                        <td><span class="status-badge ${l.status.toLowerCase()}">${global.Security.escapeHTML(l.status)}</span></td>
                        <td><button class="btn-secondary" style="padding:4px 10px;font-size:11.5px;" onclick="App.openCrmDrawer('${l.id}')">View CRM</button></td>
                      </tr>`;
                  }).join('') : `<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text-muted);">No inquiries found under filter "${s.leadFilter}".</td></tr>`}
                </tbody>
              </table>
            </div>
          </div>`;
      } else {
        // Fallback for categories, catalogues, events, qrcodes, analytics, exhibition
        container.innerHTML = `
          <div class="admin-view-header">
            <div>
              <h1 class="admin-view-title">${s.adminTab.toUpperCase()} Module</h1>
              <div class="admin-view-sub">Active enterprise operations for RotoWagon QR Lead Platform</div>
            </div>
          </div>
          <div class="admin-table-card">
            <p style="color:var(--text-muted);line-height:1.6;">The <strong>${s.adminTab}</strong> suite module is fully connected to the platform store. All live events, QR campaigns, and files synchronize across the platform in real time.</p>
            <div style="margin-top:16px;">
              <button class="btn-primary" onclick="App.setAdminTab('dashboard')">← Back to Dashboard</button>
            </div>
          </div>`;
      }
    },

    // ========================================================================
    // MASTER ADMIN PLATFORM RENDERER
    // ========================================================================
    renderMasterAdmin: function () {
      const db = global.PlatformStore.load();
      const tenants = db.tenants || [];
      const tbody = document.getElementById('tenants-table-body');
      if (!tbody) return;

      tbody.innerHTML = tenants.map(function (t) {
        return `
          <tr>
            <td><strong>${global.Security.escapeHTML(t.name)}</strong></td>
            <td>${global.Security.escapeHTML(t.industry)}</td>
            <td><span class="status-badge new">${global.Security.escapeHTML(t.plan)}</span></td>
            <td><span class="status-badge ${t.status === 'Active' ? 'active' : 'draft'}">${global.Security.escapeHTML(t.status)}</span></td>
            <td style="color:var(--text-muted);font-size:12px;">${global.Security.escapeHTML(t.joined)}</td>
            <td>
              <button class="btn-secondary" style="padding:4px 10px;font-size:11.5px;" onclick="App.selectTenant('${t.id}')">Switch Tenant</button>
            </td>
          </tr>`;
      }).join('');
    },

    // Navigation and experience switching
    setExperience: function (exp) {
      if (exp === 'tenant') {
        window.location.href = 'tenant-admin.html';
        return;
      }
      if (exp === 'platform' || exp === 'master') {
        window.location.href = 'master-admin.html';
        return;
      }
      App.state.experience = 'public';
      App.renderApp();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    setViewMode: function (mode) {
      App.state.viewMode = mode;
      App.renderApp();
    },

    toggleTheme: function () {
      App.state.theme = App.state.theme === 'light' ? 'dark' : 'light';
      const db = global.PlatformStore.load();
      db.uiTheme = App.state.theme;
      global.PlatformStore.save(true);
      App.renderApp();
    },

    setHeroIdx: function (idx) {
      App.state.activeHeroIdx = idx;
      const db = global.PlatformStore.load();
      db.activeHeroIdx = idx;
      global.PlatformStore.save(true);
      App.renderPublicPortal();
    },

    setAdminTab: function (tab) {
      App.state.adminTab = tab;
      App.renderTenantAdmin();
    },

    setProductTab: function (tab) {
      App.state.activeProductTab = tab;
      App.renderPublicPortal();
    },

    setCategoryFilter: function (cat) {
      App.state.activeCategoryFilter = cat;
      App.renderPublicPortal();
    },

    setLeadFilter: function (f) {
      App.state.leadFilter = f;
      App.renderTenantAdmin();
    },

    incQty: function () {
      App.state.productQty += 1;
      const qd = document.getElementById('product-qty-display');
      if (qd) qd.textContent = App.state.productQty;
    },

    decQty: function () {
      App.state.productQty = Math.max(1, App.state.productQty - 1);
      const qd = document.getElementById('product-qty-display');
      if (qd) qd.textContent = App.state.productQty;
    },

    imInterested: function () {
      const db = global.PlatformStore.load();
      const p = db.products[App.state.activeHeroIdx];
      if (p) {
        App.state.selectedProducts = [p.name];
        const selName = document.getElementById('enquiry-selected-name');
        if (selName) selName.textContent = p.name + ' (' + (p.code || '') + ')';
      }
      App.scrollToEnquiry();
      App.flashToast('Selected ' + (p ? p.name : 'product') + ' for inquiry quotation');
    },

    scrollToEnquiry: function () {
      const el = document.getElementById('enquiry-form');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },

    toggleMoreDetails: function () {
      App.state.moreDetailsOpen = !App.state.moreDetailsOpen;
      const body = document.getElementById('enquiry-more-details');
      const arrow = document.getElementById('accordion-arrow');
      const label = document.getElementById('accordion-label');

      if (body) body.style.display = App.state.moreDetailsOpen ? 'flex' : 'none';
      if (arrow) arrow.style.transform = App.state.moreDetailsOpen ? 'rotate(180deg)' : 'rotate(0deg)';
      if (label) label.textContent = App.state.moreDetailsOpen ? '− Hide Optional Details' : '+ Add Company, Email & City (Optional)';
    },

    // Lightbox modal methods
    openLightbox: function () {
      const db = global.PlatformStore.load();
      const products = db.products || [];
      const grid = document.getElementById('lightbox-gallery-grid');
      const modal = document.getElementById('modal-lightbox');

      if (grid) {
        grid.innerHTML = products.map(function (prod, idx) {
          return `
            <div class="gallery-card-item" onclick="App.setHeroIdx(${idx});App.closeLightbox();">
              <div style="width:100%;height:130px;background:var(--bg-surface);border-radius:10px;display:flex;align-items:center;justify-content:center;padding:8px;">
                ${App.getProductIllustration(prod.name, prod.code, db.enterpriseCard.accent)}
              </div>
              <div style="font-size:12.5px;font-weight:700;line-height:1.2;">${global.Security.escapeHTML(prod.name)}</div>
              <div style="font-size:11px;color:var(--text-muted);">${global.Security.escapeHTML(prod.code || '')}</div>
            </div>`;
        }).join('');
      }
      if (modal) modal.style.display = 'flex';
    },

    closeLightbox: function () {
      const modal = document.getElementById('modal-lightbox');
      if (modal) modal.style.display = 'none';
    },

    // Enquiry submission handler
    submitEnquiry: function (e) {
      if (e) e.preventDefault();
      const name = document.getElementById('eq-name').value.trim();
      const phone = document.getElementById('eq-mobile').value.trim();
      const req = document.getElementById('eq-req').value.trim();
      const company = document.getElementById('eq-company') ? document.getElementById('eq-company').value.trim() : '';
      const email = document.getElementById('eq-email') ? document.getElementById('eq-email').value.trim() : '';
      const city = document.getElementById('eq-city') ? document.getElementById('eq-city').value.trim() : '';
      const qty = document.getElementById('eq-qty') ? parseInt(document.getElementById('eq-qty').value, 10) || 1 : App.state.productQty;

      if (!name || !phone) {
        alert('Please provide your name and contact phone number.');
        return;
      }

      const db = global.PlatformStore.load();
      const activeProd = db.products[App.state.activeHeroIdx] || { name: 'General Equipment' };

      const newLead = global.PlatformStore.addLead({
        customer: name,
        phone: phone,
        email: email,
        company: company,
        city: city,
        product: activeProd.name + ' (' + (activeProd.code || '') + ')',
        qty: qty,
        notes: req || 'Direct quotation inquiry submitted from visiting card.'
      });

      // Show Thank You modal
      const modal = document.getElementById('modal-thankyou');
      const refCode = document.getElementById('thankyou-ref-code');
      if (refCode) refCode.textContent = newLead.id;
      if (modal) modal.style.display = 'flex';

      // Reset form fields
      document.getElementById('eq-name').value = '';
      document.getElementById('eq-mobile').value = '';
      document.getElementById('eq-req').value = '';
    },

    closeThankYou: function () {
      const modal = document.getElementById('modal-thankyou');
      if (modal) modal.style.display = 'none';
    },

    // File Downloads (Brochure, Catalogue, vCard)
    downloadFile: function (filename, content, mime) {
      const blob = new Blob([content], { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },

    downloadBrochure: function () {
      const db = global.PlatformStore.load();
      const p = db.products[App.state.activeHeroIdx];
      if (!p) return;
      const text = [
        '========================================',
        'ROTOWAGON INDUSTRIAL BAKERY EQUIPMENT',
        'Official Engineering Product Specification',
        '========================================',
        '',
        'Equipment: ' + p.name,
        'Model Code: ' + p.code,
        'Category: ' + p.category,
        'Tagline: ' + p.tagline,
        '',
        'TECHNICAL SPECIFICATIONS:',
        (p.specs || []).map(function (s) { return '  - ' + s.k + ': ' + s.v; }).join('\n'),
        '',
        'ENGINEERING HIGHLIGHTS & FEATURES:',
        (p.features || []).map(function (f) { return '  - ' + f; }).join('\n'),
        '',
        'OFFICIAL CONTACT:',
        'RotoWagon Equipment Pvt. Ltd.',
        'Director: Rajesh Sharma (Operations & Sales)',
        'Phone: +91 22 6688 9900',
        'WhatsApp: +91 98200 12345',
        'Email: sales@rotowagon.com',
        'Web: https://rotowagon.com'
      ].join('\n');
      App.downloadFile((p.code || 'RotoWagon') + '-Brochure.txt', text, 'text/plain');
      App.flashToast('Brochure download started');
    },

    downloadCatalogue: function () {
      const db = global.PlatformStore.load();
      const text = [
        '========================================',
        'ROTOWAGON MASTER CATALOGUE 2026',
        'Complete Industrial Bakery Line Solutions',
        '========================================',
        '',
        'EQUIPMENT PORTFOLIO:',
        (db.products || []).map(function (p, i) {
          return (i + 1) + '. ' + p.name + ' (' + p.code + ') — ' + p.category + '\n   ' + p.tagline;
        }).join('\n\n'),
        '',
        'CONTACT FOR TURNKEY PLANT COMMISSIONS:',
        'RotoWagon Equipment Pvt. Ltd., Mumbai, India',
        'Email: sales@rotowagon.com | Web: https://rotowagon.com'
      ].join('\n');
      App.downloadFile('RotoWagon-2026-Equipment-Catalogue.txt', text, 'text/plain');
      App.flashToast('Full 2026 catalogue downloaded');
    },

    generateVCardString: function (c) {
      c = c || global.PlatformStore.load().enterpriseCard;
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'FN:' + (c.name || 'Rajesh Sharma'),
        'ORG:' + (c.company || 'RotoWagon Equipment Pvt. Ltd.'),
        'TITLE:' + (c.role || 'Operations & Sales Director'),
        'TEL;TYPE=WORK,VOICE:' + (c.phone || '+912266889900'),
        'TEL;TYPE=CELL,VOICE:' + (c.whatsapp || '+919820012345'),
        'EMAIL:' + (c.email || 'sales@rotowagon.com'),
        'URL:' + (c.website || 'https://rotowagon.com'),
        'ADR;TYPE=WORK:;;MIDC Industrial Area;Mumbai;Maharashtra;400093;India',
        'NOTE:Industrial Bakery & Food Processing Equipment',
        'END:VCARD'
      ].join('\n');
    },

    downloadVCard: function () {
      const vcard = App.generateVCardString();
      App.downloadFile('RotoWagon-Rajesh-Sharma.vcf', vcard, 'text/vcard');
      App.flashToast('vCard saved to downloads');
    },

    // Save Company Profile changes in Tenant Admin
    saveCompanyProfile: function () {
      const name = document.getElementById('cp-name').value.trim();
      const short = document.getElementById('cp-short').value.trim().toUpperCase();
      const rep = document.getElementById('cp-rep-name').value.trim();
      const role = document.getElementById('cp-role').value.trim();
      const phone = document.getElementById('cp-phone').value.trim();
      const whatsapp = document.getElementById('cp-whatsapp').value.trim();
      const email = document.getElementById('cp-email').value.trim();
      const web = document.getElementById('cp-web').value.trim();
      const tagline = document.getElementById('cp-tagline').value.trim();
      const loc = document.getElementById('cp-location').value.trim();

      global.PlatformStore.updateCompany({
        company: name,
        brandShort: short,
        name: rep,
        role: role,
        phone: phone,
        whatsapp: whatsapp,
        email: email,
        website: web,
        tagline: tagline,
        location: loc
      });

      App.flashToast('Company details updated successfully!');
      App.renderApp();
    },

    // Product CRUD in Tenant Admin
    startNewProduct: function () {
      App.state.editingProductId = null;
      App.state.productWizardStep = 0;
      App.state.draftProduct = {
        name: '',
        code: 'RW-' + Math.floor(100 + Math.random() * 900),
        sku: 'EQP-' + Math.floor(1000 + Math.random() * 9000),
        category: 'Ovens',
        brand: 'RotoWagon',
        status: 'Active',
        tagline: '',
        qtyMode: 'Required',
        qtyUnit: 'Unit',
        qtyMin: 1,
        qtyMax: 10,
        specs: [
          { k: 'Capacity', v: '' },
          { k: 'Power / Motor', v: '' }
        ],
        features: ['PLC Digital Control', 'Heavy duty SS-304 construction'],
        applications: ['Bakery production']
      };
      App.openProductWizard();
    },

    editProduct: function (id) {
      const db = global.PlatformStore.load();
      const p = db.products.find(function (x) { return x.id === id || x.code === id; });
      if (!p) return;
      App.state.editingProductId = p.id;
      App.state.productWizardStep = 0;
      App.state.draftProduct = JSON.parse(JSON.stringify(p));
      App.openProductWizard();
    },

    deleteProduct: function (id) {
      if (confirm('Are you sure you want to delete this equipment from the catalog?')) {
        global.PlatformStore.deleteProduct(id);
        App.flashToast('Product deleted');
        App.renderApp();
      }
    },

    openProductWizard: function () {
      const modal = document.getElementById('modal-product-wizard');
      const title = document.getElementById('product-wizard-modal-title');
      if (title) title.textContent = App.state.editingProductId ? 'Edit Equipment Model' : 'Add New Equipment Model';
      if (modal) modal.style.display = 'flex';
      App.renderProductWizardStep();
    },

    closeProductWizard: function () {
      const modal = document.getElementById('modal-product-wizard');
      if (modal) modal.style.display = 'none';
    },

    renderProductWizardStep: function () {
      const s = App.state;
      const dp = s.draftProduct;
      const container = document.getElementById('wizard-content');
      const nextBtn = document.getElementById('btn-wizard-next');
      const prevBtn = document.getElementById('btn-wizard-prev');

      // Update step dots
      for (let i = 0; i <= 4; i++) {
        const dot = document.getElementById('wstep-dot-' + i);
        if (dot) dot.className = 'wstep-item ' + (i === s.productWizardStep ? 'active' : '');
      }

      if (prevBtn) prevBtn.style.visibility = s.productWizardStep === 0 ? 'hidden' : 'visible';
      if (nextBtn) nextBtn.textContent = s.productWizardStep === 4 ? (s.editingProductId ? 'Save Product' : 'Publish to Catalog') : 'Next Step →';

      if (!container) return;

      if (s.productWizardStep === 0) {
        // Step 0: Basic Details
        container.innerHTML = `
          <div class="form-group">
            <label for="dp-name">Equipment Name *</label>
            <input class="form-input" type="text" id="dp-name" value="${global.Security.escapeHTML(dp.name)}" placeholder="e.g. Spiral Mixer 120kg" oninput="App.state.draftProduct.name = this.value">
          </div>
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="dp-code">Model Code *</label>
              <input class="form-input" type="text" id="dp-code" value="${global.Security.escapeHTML(dp.code)}" placeholder="e.g. RW-SM-120" oninput="App.state.draftProduct.code = this.value">
            </div>
            <div class="form-group flex-1">
              <label for="dp-sku">SKU Code</label>
              <input class="form-input" type="text" id="dp-sku" value="${global.Security.escapeHTML(dp.sku)}" placeholder="e.g. MXR-120-SP" oninput="App.state.draftProduct.sku = this.value">
            </div>
          </div>
          <div class="form-group">
            <label for="dp-tagline">Marketing Tagline</label>
            <input class="form-input" type="text" id="dp-tagline" value="${global.Security.escapeHTML(dp.tagline)}" placeholder="Short 1-line value proposition..." oninput="App.state.draftProduct.tagline = this.value">
          </div>`;
      } else if (s.productWizardStep === 1) {
        // Step 1: Category & Status
        const cats = ['Ovens', 'Mixers', 'Slicers', 'Dividers', 'Proofers', 'Packaging'];
        container.innerHTML = `
          <div class="form-group">
            <label>Equipment Category</label>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px;">
              ${cats.map(function (c) {
                return `<button type="button" class="cat-chip-btn ${dp.category === c ? 'active' : ''}" onclick="App.state.draftProduct.category = '${c}';App.renderProductWizardStep();">${c}</button>`;
              }).join('')}
            </div>
          </div>
          <div class="form-group" style="margin-top:14px;">
            <label>Catalog Publication Status</label>
            <div style="display:flex;gap:8px;margin-top:4px;">
              <button type="button" class="cat-chip-btn ${dp.status === 'Active' ? 'active' : ''}" onclick="App.state.draftProduct.status = 'Active';App.renderProductWizardStep();">Active (Visible)</button>
              <button type="button" class="cat-chip-btn ${dp.status === 'Draft' ? 'active' : ''}" onclick="App.state.draftProduct.status = 'Draft';App.renderProductWizardStep();">Draft (Hidden)</button>
            </div>
          </div>`;
      } else if (s.productWizardStep === 2) {
        // Step 2: Quantity settings
        container.innerHTML = `
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="dp-unit">Unit Measure</label>
              <input class="form-input" type="text" id="dp-unit" value="${global.Security.escapeHTML(dp.qtyUnit || 'Unit')}" oninput="App.state.draftProduct.qtyUnit = this.value">
            </div>
            <div class="form-group flex-1">
              <label for="dp-min">Minimum Order Qty</label>
              <input class="form-input" type="number" id="dp-min" value="${dp.qtyMin || 1}" min="1" oninput="App.state.draftProduct.qtyMin = parseInt(this.value,10)||1">
            </div>
          </div>`;
      } else if (s.productWizardStep === 3) {
        // Step 3: Specifications Rows
        container.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <label style="font-size:12px;font-weight:700;">Technical Specifications</label>
            <button type="button" class="btn-secondary" style="padding:3px 8px;font-size:11px;" onclick="App.addWizardSpecRow()">+ Add Row</button>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px;">
            ${(dp.specs || []).map(function (sp, i) {
              return `
                <div class="form-row" style="align-items:center;">
                  <input class="form-input flex-1" type="text" value="${global.Security.escapeHTML(sp.k)}" placeholder="Key (e.g. Capacity)" oninput="App.state.draftProduct.specs[${i}].k = this.value">
                  <input class="form-input flex-1" type="text" value="${global.Security.escapeHTML(sp.v)}" placeholder="Value (e.g. 120 kg)" oninput="App.state.draftProduct.specs[${i}].v = this.value">
                  <button type="button" style="color:var(--danger);font-size:16px;padding:4px 8px;" onclick="App.removeWizardSpecRow(${i})">×</button>
                </div>`;
            }).join('')}
          </div>`;
      } else {
        // Step 4: Review and Publish
        container.innerHTML = `
          <div style="background:var(--bg-surface-alt);border:1px solid var(--border-color);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:8px;">
            <div style="font-size:16px;font-weight:800;">${global.Security.escapeHTML(dp.name || 'Untitled')}</div>
            <div style="font-size:12px;color:var(--text-muted);">Model: ${global.Security.escapeHTML(dp.code)} | Category: ${global.Security.escapeHTML(dp.category)}</div>
            <div style="font-size:13px;color:var(--text-main);">${global.Security.escapeHTML(dp.tagline || 'No tagline')}</div>
            <div style="margin-top:8px;border-top:1px solid var(--border-color);padding-top:8px;">
              <strong>Specs:</strong> ${(dp.specs || []).map(function (s) { return s.k + ': ' + s.v; }).join(', ')}
            </div>
          </div>`;
      }
    },

    addWizardSpecRow: function () {
      App.state.draftProduct.specs.push({ k: '', v: '' });
      App.renderProductWizardStep();
    },

    removeWizardSpecRow: function (i) {
      App.state.draftProduct.specs.splice(i, 1);
      App.renderProductWizardStep();
    },

    nextProductStep: function () {
      const s = App.state;
      if (s.productWizardStep === 0) {
        if (!s.draftProduct.name.trim()) {
          alert('Please enter an equipment name.');
          return;
        }
      }
      if (s.productWizardStep < 4) {
        s.productWizardStep += 1;
        App.renderProductWizardStep();
      } else {
        // Publish / Save
        if (s.editingProductId) {
          global.PlatformStore.updateProduct(s.editingProductId, s.draftProduct);
          App.flashToast('Equipment updated successfully!');
        } else {
          global.PlatformStore.addProduct(s.draftProduct);
          App.flashToast('New equipment added to catalog!');
        }
        App.closeProductWizard();
        App.renderApp();
      }
    },

    prevProductStep: function () {
      if (App.state.productWizardStep > 0) {
        App.state.productWizardStep -= 1;
        App.renderProductWizardStep();
      }
    },

    // CRM Lead Drawer methods
    openCrmDrawer: function (leadId) {
      const db = global.PlatformStore.load();
      const lead = (db.leads || []).find(function (l) { return l.id === leadId; });
      if (!lead) return;
      App.state.selectedLead = lead;

      const drawer = document.getElementById('drawer-crm-lead');
      const body = document.getElementById('drawer-crm-body');
      if (!body || !drawer) return;

      body.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div>
            <span class="status-badge ${lead.status.toLowerCase()}">${global.Security.escapeHTML(lead.status)}</span>
            <h2 style="font-size:18px;font-weight:800;margin-top:6px;">${global.Security.escapeHTML(lead.customer)}</h2>
            <div style="color:var(--text-muted);font-size:12px;">${global.Security.escapeHTML(lead.company || 'Private Buyer')} • ${global.Security.escapeHTML(lead.city || 'India')}</div>
          </div>

          <div style="display:flex;gap:8px;">
            <a class="btn-primary" href="tel:${global.Security.sanitizePhone(lead.phone)}" style="flex:1;justify-content:center;">Call Direct</a>
            <a class="btn-secondary" href="https://wa.me/${global.Security.sanitizePhone(lead.phone).replace('+','')}" target="_blank" rel="noopener noreferrer" style="flex:1;justify-content:center;">WhatsApp</a>
          </div>

          <div style="background:var(--bg-surface-alt);border:1px solid var(--border-color);border-radius:10px;padding:12px;font-size:12.5px;">
            <div><strong>Equipment:</strong> ${global.Security.escapeHTML(lead.product || 'General')}</div>
            <div style="margin-top:4px;"><strong>Target Qty:</strong> ${lead.qty || 1} units</div>
            <div style="margin-top:6px;border-top:1px solid var(--border-color);padding-top:6px;">
              <strong>Requirement:</strong><br>${global.Security.escapeHTML(lead.notes || 'No extra notes')}
            </div>
          </div>

          <div class="form-group" style="margin-top:8px;">
            <label>Update Status:</label>
            <select class="form-input" onchange="App.updateLeadStatus('${lead.id}', this.value)">
              <option value="New" ${lead.status === 'New' ? 'selected' : ''}>New</option>
              <option value="Contacted" ${lead.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
              <option value="Qualified" ${lead.status === 'Qualified' ? 'selected' : ''}>Qualified</option>
              <option value="Won" ${lead.status === 'Won' ? 'selected' : ''}>Won (Closed)</option>
              <option value="Lost" ${lead.status === 'Lost' ? 'selected' : ''}>Lost</option>
            </select>
          </div>
        </div>`;

      drawer.style.display = 'flex';
    },

    closeCrmDrawer: function () {
      const drawer = document.getElementById('drawer-crm-lead');
      if (drawer) drawer.style.display = 'none';
    },

    updateLeadStatus: function (id, status) {
      const db = global.PlatformStore.load();
      const lead = (db.leads || []).find(function (l) { return l.id === id; });
      if (lead) {
        lead.status = status;
        global.PlatformStore.save();
        App.flashToast('Lead ' + id + ' status updated to ' + status);
        App.renderTenantAdmin();
      }
    },

    exportLeadsCSV: function () {
      const db = global.PlatformStore.load();
      const leads = db.leads || [];
      const headers = ['Lead ID', 'Customer Name', 'Phone', 'Email', 'Company', 'City', 'Equipment', 'Qty', 'Status', 'Date'];
      const rows = leads.map(function (l) {
        return [
          l.id,
          '"' + (l.customer || '').replace(/"/g, '""') + '"',
          '"' + (l.phone || '').replace(/"/g, '""') + '"',
          '"' + (l.email || '').replace(/"/g, '""') + '"',
          '"' + (l.company || '').replace(/"/g, '""') + '"',
          '"' + (l.city || '').replace(/"/g, '""') + '"',
          '"' + (l.product || '').replace(/"/g, '""') + '"',
          l.qty || 1,
          l.status || 'New',
          l.date || ''
        ].join(',');
      });
      const csv = [headers.join(','), rows.join('\n')].join('\n');
      App.downloadFile('RotoWagon-Leads-Export.csv', csv, 'text/csv');
      App.flashToast('Leads CSV exported');
    },

    // RBAC Auth modal
    openAuthModal: function () {
      window.location.href = 'login.html';
    },

    closeAuthModal: function () {
      const modal = document.getElementById('modal-rbac-auth');
      if (modal) modal.style.display = 'none';
    },

    switchQuickRole: function (role) {
      window.location.href = 'login.html';
    },

    // Toast helper
    flashToast: function (msg) {
      const toast = document.getElementById('toast-notification');
      const text = document.getElementById('toast-message');
      if (toast && text) {
        text.textContent = msg;
        toast.style.display = 'block';
        clearTimeout(App._toastTimer);
        App._toastTimer = setTimeout(function () {
          toast.style.display = 'none';
        }, 3200);
      }
    }
  };

  global.App = App;
  document.addEventListener('DOMContentLoaded', function () {
    App.init();
  });

})(window);
