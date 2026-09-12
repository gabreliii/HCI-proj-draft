/**
 * WarehousePro - Inventory & Order Management System
 * Core Application Script
 */

// ==========================================
// 1. INITIAL DATA & STORAGE MANAGEMENT
// ==========================================

const STORAGE_KEYS = {
    INVENTORY: 'warehouse_inventory_v1',
    SHIPMENTS: 'warehouse_shipments_v1',
    ORDERS: 'warehouse_orders_v1',
    MOVEMENTS: 'warehouse_movements_v1',
    NOTIFICATIONS: 'warehouse_notifications_v1',
    USER: 'warehouse_user_v1',
    AUTH: 'warehouse_auth_v1'
};

const DEFAULT_INVENTORY = [
    { id: 'item-1', sku: 'ELEC-9021', name: 'Industrial Barcode Scanner 2D', category: 'Electronics', location: 'Aisle A-03', quantity: 45, minLevel: 15, unit: 'pcs', price: 185.00, status: 'available' },
    { id: 'item-2', sku: 'PACK-4402', name: 'Heavy Duty Corrugated Box (L)', category: 'Packaging', location: 'Aisle B-01', quantity: 180, minLevel: 100, unit: 'pcs', price: 2.75, status: 'available' },
    { id: 'item-3', sku: 'HARD-1193', name: 'Steel Pallet Racking Bolt Set', category: 'Hardware', location: 'Aisle C-04', quantity: 8, minLevel: 25, unit: 'sets', price: 14.50, status: 'low' },
    { id: 'item-4', sku: 'APPA-7721', name: 'Hi-Vis Safety Vest (XL)', category: 'Apparel', location: 'Aisle D-02', quantity: 0, minLevel: 20, unit: 'pcs', price: 18.00, status: 'out' },
    { id: 'item-5', sku: 'ELEC-3382', name: 'Thermal Shipping Label Printer', category: 'Electronics', location: 'Aisle A-05', quantity: 14, minLevel: 10, unit: 'pcs', price: 340.00, status: 'available' },
    { id: 'item-6', sku: 'PACK-2201', name: 'Clear Stretch Wrap 18" Roll', category: 'Packaging', location: 'Aisle B-03', quantity: 65, minLevel: 30, unit: 'rolls', price: 22.00, status: 'available' },
    { id: 'item-7', sku: 'RAWM-5509', name: 'High-Density Polyethylene Pellet (25kg)', category: 'Raw Materials', location: 'Aisle E-01', quantity: 12, minLevel: 20, unit: 'bags', price: 85.00, status: 'low' },
    { id: 'item-8', sku: 'HARD-6644', name: 'Hydraulic Hand Pallet Jack Wheels', category: 'Hardware', location: 'Aisle C-02', quantity: 28, minLevel: 12, unit: 'pairs', price: 46.00, status: 'available' }
];

const DEFAULT_SHIPMENTS = [
    { id: 'SHP-101', poNumber: 'PO-8821', supplier: 'LogiTech Global Supply', expectedDate: '2026-09-12', itemsCount: 150, status: 'pending', notes: 'Scheduled for Dock 2' },
    { id: 'SHP-102', poNumber: 'PO-8819', supplier: 'Apex Packaging Industries', expectedDate: '2026-09-11', itemsCount: 400, status: 'completed', notes: 'Received & verified by John Doe' },
    { id: 'SHP-103', poNumber: 'PO-8825', supplier: 'Nordic Hardware Parts', expectedDate: '2026-09-13', itemsCount: 75, status: 'picking', notes: 'Dock inspection in progress' }
];

const DEFAULT_ORDERS = [
    {
        id: 'ORD-4091',
        customer: 'Pacific Distribution Co.',
        date: '2026-09-12',
        status: 'picking',
        progress: 65,
        items: [
            { name: 'Industrial Barcode Scanner 2D', qty: 5 },
            { name: 'Clear Stretch Wrap 18" Roll', qty: 10 }
        ]
    },
    {
        id: 'ORD-4092',
        customer: 'Metro Logistics Hub',
        date: '2026-09-12',
        status: 'pending',
        progress: 10,
        items: [
            { name: 'Thermal Shipping Label Printer', qty: 2 },
            { name: 'Heavy Duty Corrugated Box (L)', qty: 50 }
        ]
    },
    {
        id: 'ORD-4088',
        customer: 'Titan Freight Services',
        date: '2026-09-11',
        status: 'completed',
        progress: 100,
        items: [
            { name: 'Hi-Vis Safety Vest (XL)', qty: 15 },
            { name: 'Steel Pallet Racking Bolt Set', qty: 4 }
        ]
    }
];

const DEFAULT_MOVEMENTS = [
    { id: 'MOV-301', timestamp: 'Today, 10:14 AM', type: 'Intake', sku: 'PACK-4402', productName: 'Heavy Duty Corrugated Box (L)', fromLoc: 'Receiving Bay', toLoc: 'Aisle B-01', qty: 100, user: 'John Doe' },
    { id: 'MOV-302', timestamp: 'Today, 09:30 AM', type: 'Picking', sku: 'ELEC-9021', productName: 'Industrial Barcode Scanner 2D', fromLoc: 'Aisle A-03', toLoc: 'Packing Station 3', qty: 5, user: 'Sarah Connor' },
    { id: 'MOV-303', timestamp: 'Yesterday, 04:15 PM', type: 'Transfer', sku: 'HARD-6644', productName: 'Hydraulic Pallet Jack Wheels', fromLoc: 'Aisle C-01', toLoc: 'Aisle C-02', qty: 10, user: 'John Doe' },
    { id: 'MOV-304', timestamp: 'Yesterday, 01:20 PM', type: 'Adjustment', sku: 'HARD-1193', productName: 'Steel Pallet Racking Bolt Set', fromLoc: 'Aisle C-04', toLoc: 'Aisle C-04', qty: -4, user: 'Inventory Lead' }
];

const DEFAULT_NOTIFICATIONS = [
    { id: 'ntf-1', title: 'Critical Low Stock Alert', message: 'Hi-Vis Safety Vest (XL) [APPA-7721] is completely OUT of stock.', time: '25 mins ago', read: false },
    { id: 'ntf-2', title: 'Inbound PO-8821 Arrived', message: 'Shipment PO-8821 from LogiTech Supply is ready at Dock 2 for intake verification.', time: '1 hour ago', read: false },
    { id: 'ntf-3', title: 'Stock Threshold Warning', message: 'Steel Pallet Racking Bolt Set is down to 8 units (Min: 25 units).', time: '3 hours ago', read: false },
    { id: 'ntf-4', title: 'Picking Batch Completed', message: 'Order ORD-4088 has been fully packed and marked ready for dispatch.', time: 'Yesterday', read: true }
];

const DEFAULT_USER = {
    name: 'John Doe',
    role: 'Warehouse Staff',
    email: 'j.doe@warehousepro.io',
    avatar: 'JD',
    shift: 'Morning Shift (07:00 - 15:30)',
    assignedZone: 'Zone A & B (Electronics & Packaging)'
};

// Data Store with LocalStorage fallback
const Store = {
    get(key, fallback) {
        try {
            const val = localStorage.getItem(key);
            return val ? JSON.parse(val) : fallback;
        } catch (e) {
            return fallback;
        }
    },
    set(key, val) {
        try {
            localStorage.setItem(key, JSON.stringify(val));
        } catch (e) {
            console.error('Storage error:', e);
        }
    }
};

let state = {
    inventory: Store.get(STORAGE_KEYS.INVENTORY, DEFAULT_INVENTORY),
    shipments: Store.get(STORAGE_KEYS.SHIPMENTS, DEFAULT_SHIPMENTS),
    orders: Store.get(STORAGE_KEYS.ORDERS, DEFAULT_ORDERS),
    movements: Store.get(STORAGE_KEYS.MOVEMENTS, DEFAULT_MOVEMENTS),
    notifications: Store.get(STORAGE_KEYS.NOTIFICATIONS, DEFAULT_NOTIFICATIONS),
    user: Store.get(STORAGE_KEYS.USER, DEFAULT_USER),
    currentPage: 'dashboard',
    searchQuery: '',
    categoryFilter: 'all',
    statusFilter: 'all'
};

function saveState(key) {
    if (key) {
        Store.set(key, state[key.replace('warehouse_', '').replace('_v1', '')]);
    } else {
        Store.set(STORAGE_KEYS.INVENTORY, state.inventory);
        Store.set(STORAGE_KEYS.SHIPMENTS, state.shipments);
        Store.set(STORAGE_KEYS.ORDERS, state.orders);
        Store.set(STORAGE_KEYS.MOVEMENTS, state.movements);
        Store.set(STORAGE_KEYS.NOTIFICATIONS, state.notifications);
        Store.set(STORAGE_KEYS.USER, state.user);
    }
}

// Compute Status
function computeStatus(qty, minLevel) {
    if (qty <= 0) return 'out';
    if (qty <= minLevel) return 'low';
    return 'available';
}

// ==========================================
// 2. DOM ELEMENTS & INITIALIZATION
// ==========================================

const el = {
    loginScreen: document.getElementById('loginScreen'),
    loginForm: document.getElementById('loginForm'),
    usernameInput: document.getElementById('username'),
    passwordInput: document.getElementById('password'),
    loginError: document.getElementById('loginError'),
    app: document.getElementById('app'),
    sidebar: document.querySelector('.sidebar'),
    mobileMenu: document.getElementById('mobileMenu'),
    logoutBtn: document.getElementById('logoutBtn'),
    pageTitle: document.getElementById('pageTitle'),
    pageSubtitle: document.getElementById('pageSubtitle'),
    content: document.getElementById('content'),
    modal: document.getElementById('modal'),
    modalContent: document.getElementById('modalContent'),
    toast: document.getElementById('toast'),
    navItems: document.querySelectorAll('.nav-item[data-page]'),
    topActionNotifications: document.querySelector('.top-actions [data-page="notifications"]'),
    userMenuName: document.querySelector('.user-menu strong'),
    userMenuRole: document.querySelector('.user-menu span'),
    userAvatar: document.querySelector('.avatar'),
    navBadge: document.querySelector('.nav-badge'),
    notificationDot: document.querySelector('.notification-dot')
};

// ==========================================
// 3. TOAST & MODAL SYSTEM
// ==========================================

let toastTimer = null;
function showToast(message, duration = 3200) {
    if (!el.toast) return;
    el.toast.textContent = message;
    el.toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        el.toast.classList.remove('show');
    }, duration);
}

function openModal(title, html) {
    if (!el.modal || !el.modalContent) return;
    el.modalContent.innerHTML = `
        <h3>${title}</h3>
        ${html}
    `;
    el.modal.classList.remove('hidden');
}

function closeModal() {
    if (!el.modal) return;
    el.modal.classList.add('hidden');
    if (el.modalContent) el.modalContent.innerHTML = '';
}
window.closeModal = closeModal;

// Close modal when clicking outside modal-card
window.addEventListener('click', (e) => {
    if (e.target === el.modal) {
        closeModal();
    }
});

// Close modal on Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && el.modal && !el.modal.classList.contains('hidden')) {
        closeModal();
    }
});

// ==========================================
// 4. NOTIFICATION BADGE SYNC
// ==========================================

function updateNotificationBadges() {
    const unreadCount = state.notifications.filter(n => !n.read).length;
    if (el.navBadge) {
        el.navBadge.textContent = unreadCount;
        el.navBadge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
    }
    if (el.notificationDot) {
        el.notificationDot.style.display = unreadCount > 0 ? 'block' : 'none';
    }
}

// Log Movement Helper
function logMovement(type, sku, productName, fromLoc, toLoc, qty) {
    const newMovement = {
        id: `MOV-${Date.now().toString().slice(-4)}`,
        timestamp: 'Just now',
        type,
        sku,
        productName,
        fromLoc,
        toLoc,
        qty,
        user: state.user.name
    };
    state.movements.unshift(newMovement);
    Store.set(STORAGE_KEYS.MOVEMENTS, state.movements);
}

// Check Low Stock Threshold & Trigger Alert
function checkStockAlert(item) {
    if (item.quantity <= 0) {
        const title = `Out of Stock: ${item.name}`;
        const msg = `${item.name} (${item.sku}) is completely out of stock!`;
        addNotification(title, msg, 'warning');
    } else if (item.quantity <= item.minLevel) {
        const title = `Low Stock Alert: ${item.name}`;
        const msg = `${item.name} (${item.sku}) has reached ${item.quantity} ${item.unit} (Threshold: ${item.minLevel}).`;
        addNotification(title, msg, 'warning');
    }
}

function addNotification(title, message) {
    const exists = state.notifications.some(n => n.title === title && !n.read);
    if (exists) return;
    const ntf = {
        id: `ntf-${Date.now()}`,
        title,
        message,
        time: 'Just now',
        read: false
    };
    state.notifications.unshift(ntf);
    Store.set(STORAGE_KEYS.NOTIFICATIONS, state.notifications);
    updateNotificationBadges();
}

// ==========================================
// 5. NAVIGATION & ROUTING
// ==========================================

const pageMeta = {
    dashboard: {
        title: 'Dashboard',
        subtitle: "Here's what's happening in your warehouse today."
    },
    inventory: {
        title: 'Inventory Management',
        subtitle: 'Track, search, update and filter all warehouse products and stock.'
    },
    receiving: {
        title: 'Inbound Receiving',
        subtitle: 'Process incoming purchase orders and supplier deliveries.'
    },
    orders: {
        title: 'Orders & Picking',
        subtitle: 'Manage active customer orders, picking workflows, and fulfillment.'
    },
    movement: {
        title: 'Stock Movement',
        subtitle: 'Audit trail of internal bin transfers, adjustments, and intake.'
    },
    reports: {
        title: 'Reports & Analytics',
        subtitle: 'Inventory turnover, picking throughput, and space utilization.'
    },
    notifications: {
        title: 'Notifications & Alerts',
        subtitle: 'System warnings, threshold breaches, and operational updates.'
    },
    profile: {
        title: 'User Profile',
        subtitle: 'Manage your credentials, shift assignments, and warehouse permissions.'
    }
};

function navigateTo(pageId) {
    if (!pageMeta[pageId]) pageId = 'dashboard';
    state.currentPage = pageId;

    // Update active nav button
    document.querySelectorAll('.nav-item').forEach(btn => {
        if (btn.getAttribute('data-page') === pageId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update Header
    if (el.pageTitle) el.pageTitle.textContent = pageMeta[pageId].title;
    if (el.pageSubtitle) el.pageSubtitle.textContent = pageMeta[pageId].subtitle;

    // Close mobile sidebar if open
    if (el.sidebar && el.sidebar.classList.contains('open')) {
        el.sidebar.classList.remove('open');
    }

    // Render Content
    renderPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.navigateTo = navigateTo;

function renderPage(pageId) {
    if (!el.content) return;
    switch (pageId) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'inventory':
            renderInventory();
            break;
        case 'receiving':
            renderReceiving();
            break;
        case 'orders':
            renderOrders();
            break;
        case 'movement':
            renderMovement();
            break;
        case 'reports':
            renderReports();
            break;
        case 'notifications':
            renderNotifications();
            break;
        case 'profile':
            renderProfile();
            break;
        default:
            renderDashboard();
    }
}

// ==========================================
// 6. PAGE RENDERERS
// ==========================================

// --- PAGE: DASHBOARD ---
function renderDashboard() {
    const totalItems = state.inventory.reduce((sum, item) => sum + item.quantity, 0);
    const lowStockCount = state.inventory.filter(item => item.quantity <= item.minLevel && item.quantity > 0).length;
    const outStockCount = state.inventory.filter(item => item.quantity <= 0).length;
    const pendingOrdersCount = state.orders.filter(o => o.status !== 'completed').length;
    const pendingShipmentsCount = state.shipments.filter(s => s.status !== 'completed').length;

    el.content.innerHTML = `
        <div class="stats-grid">
            <div class="card stat-card">
                <div class="stat-top">
                    <span class="stat-label">TOTAL STOCK UNITS</span>
                    <div class="stat-icon">📦</div>
                </div>
                <div class="stat-value">${totalItems.toLocaleString()}</div>
                <div class="stat-change">↑ 8% from last week across ${state.inventory.length} SKUs</div>
            </div>

            <div class="card stat-card">
                <div class="stat-top">
                    <span class="stat-label">STOCK ALERTS</span>
                    <div class="stat-icon" style="background: #fef2f2; color: #dc2626;">⚠️</div>
                </div>
                <div class="stat-value" style="color: ${outStockCount > 0 ? '#dc2626' : '#b45309'}">
                    ${lowStockCount + outStockCount}
                </div>
                <div class="stat-change" style="color: #dc2626;">
                    ${outStockCount} out of stock, ${lowStockCount} low stock
                </div>
            </div>

            <div class="card stat-card">
                <div class="stat-top">
                    <span class="stat-label">ACTIVE ORDERS</span>
                    <div class="stat-icon" style="background: #e0f2fe; color: #0284c7;">☷</div>
                </div>
                <div class="stat-value">${pendingOrdersCount}</div>
                <div class="stat-change" style="color: #0284c7;">Orders in picking & packing queue</div>
            </div>

            <div class="card stat-card">
                <div class="stat-top">
                    <span class="stat-label">INBOUND SHIPMENTS</span>
                    <div class="stat-icon" style="background: #f0fdf4; color: #16a34a;">↓</div>
                </div>
                <div class="stat-value">${pendingShipmentsCount}</div>
                <div class="stat-change">Awaiting receiving at dock</div>
            </div>
        </div>

        <div class="page-head" style="margin-top: 10px; margin-bottom: 14px;">
            <div>
                <h3>Quick Management Actions</h3>
                <p>Frequent actions to streamline daily operations</p>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button class="btn btn-primary" onclick="openAddProductModal()">+ Add New Product</button>
                <button class="btn" onclick="openReceiveShipmentModal()">↓ Inbound Intake</button>
                <button class="btn" onclick="openCreateOrderModal()">+ New Order</button>
                <button class="btn" onclick="openStockTransferModal()">↕ Transfer Stock</button>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="card">
                <div class="card-header">
                    <strong>Recent Stock Activity</strong>
                    <button class="btn btn-small" onclick="navigateTo('movement')">View All Log</button>
                </div>
                <div class="card-body">
                    ${state.movements.slice(0, 5).map(m => `
                        <div class="activity">
                            <div class="activity-icon">${m.type === 'Intake' ? '📥' : m.type === 'Picking' ? '📤' : '🔄'}</div>
                            <div style="flex: 1;">
                                <div style="display: flex; justify-content: space-between;">
                                    <strong>${m.productName}</strong>
                                    <span style="font-size: 11px; font-weight: 700; color: ${m.qty > 0 ? '#15803d' : '#dc2626'}">
                                        ${m.qty > 0 ? '+' + m.qty : m.qty} units
                                    </span>
                                </div>
                                <p>${m.type} • ${m.fromLoc} → ${m.toLoc} by ${m.user}</p>
                                <span style="font-size: 10px; color: #9ca3af;">${m.timestamp}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <strong>System Alerts & Priorities</strong>
                    <button class="btn btn-small" onclick="navigateTo('notifications')">Manage</button>
                </div>
                <div class="card-body">
                    ${outStockCount > 0 ? `
                        <div class="alert warning">
                            <span style="font-size: 16px;">🛑</span>
                            <div>
                                <strong>Immediate Restock Required</strong>
                                <p>${outStockCount} product(s) are at 0 quantity. Please review replenishment POs.</p>
                            </div>
                        </div>
                    ` : ''}

                    <div class="alert info">
                        <span style="font-size: 16px;">ℹ️</span>
                        <div>
                            <strong>Scheduled Dock Maintenance</strong>
                            <p>Dock Bay 3 will undergo hydraulic lift inspection at 14:00.</p>
                        </div>
                    </div>

                    <div class="alert success">
                        <span style="font-size: 16px;">✅</span>
                        <div>
                            <strong>Fulfillment On Target</strong>
                            <p>Average pick cycle time is 11.2 minutes (Goal: < 15 mins).</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// --- PAGE: INVENTORY ---
function renderInventory() {
    const categories = ['all', ...new Set(state.inventory.map(i => i.category))];
    
    // Filter inventory
    const filtered = state.inventory.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                              item.sku.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                              item.location.toLowerCase().includes(state.searchQuery.toLowerCase());
        const matchesCategory = state.categoryFilter === 'all' || item.category === state.categoryFilter;
        const matchesStatus = state.statusFilter === 'all' || item.status === state.statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    el.content.innerHTML = `
        <div class="page-head">
            <div>
                <h3>Inventory Catalog (${filtered.length} of ${state.inventory.length} items)</h3>
                <p>Monitor physical inventory levels, reorder points, and storage aisles</p>
            </div>
            <button class="btn btn-primary" onclick="openAddProductModal()">+ Add New Product</button>
        </div>

        <div class="toolbar">
            <div class="search-box">
                <span>🔍</span>
                <input type="text" id="inventorySearch" placeholder="Search by SKU, product name, or aisle..." value="${state.searchQuery}">
            </div>

            <select id="categorySelect">
                <option value="all" ${state.categoryFilter === 'all' ? 'selected' : ''}>All Categories</option>
                ${categories.filter(c => c !== 'all').map(c => `
                    <option value="${c}" ${state.categoryFilter === c ? 'selected' : ''}>${c}</option>
                `).join('')}
            </select>

            <select id="statusSelect">
                <option value="all" ${state.statusFilter === 'all' ? 'selected' : ''}>All Stock Statuses</option>
                <option value="available" ${state.statusFilter === 'available' ? 'selected' : ''}>Available</option>
                <option value="low" ${state.statusFilter === 'low' ? 'selected' : ''}>Low Stock</option>
                <option value="out" ${state.statusFilter === 'out' ? 'selected' : ''}>Out of Stock</option>
            </select>

            ${(state.searchQuery || state.categoryFilter !== 'all' || state.statusFilter !== 'all') ? `
                <button class="btn" id="resetFiltersBtn">Reset Filters</button>
            ` : ''}
        </div>

        <div class="card table-card">
            <table>
                <thead>
                    <tr>
                        <th>PRODUCT DETAILS</th>
                        <th>CATEGORY</th>
                        <th>LOCATION</th>
                        <th>QTY ON HAND</th>
                        <th>MIN LEVEL</th>
                        <th>UNIT PRICE</th>
                        <th>STATUS</th>
                        <th style="text-align: right;">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    ${filtered.length === 0 ? `
                        <tr>
                            <td colspan="8" class="empty">No inventory products found matching your search or filters.</td>
                        </tr>
                    ` : filtered.map(item => `
                        <tr>
                            <td>
                                <div class="product-name">${item.name}</div>
                                <div class="product-sku">SKU: ${item.sku}</div>
                            </td>
                            <td>${item.category}</td>
                            <td><strong>${item.location}</strong></td>
                            <td>
                                <span style="font-size: 14px; font-weight: 700; color: ${item.quantity <= 0 ? '#dc2626' : item.quantity <= item.minLevel ? '#b45309' : '#172033'}">
                                    ${item.quantity}
                                </span> 
                                <small style="color: #6b7280;">${item.unit}</small>
                            </td>
                            <td>${item.minLevel} ${item.unit}</td>
                            <td>$${Number(item.price).toFixed(2)}</td>
                            <td>
                                <span class="status ${item.status}">
                                    ${item.status === 'available' ? 'In Stock' : item.status === 'low' ? 'Low Stock' : 'Out of Stock'}
                                </span>
                            </td>
                            <td style="text-align: right;">
                                <div class="actions" style="justify-content: flex-end;">
                                    <button class="btn btn-small" onclick="openAdjustStockModal('${item.id}')" title="Quick Adjust Stock">± Adjust</button>
                                    <button class="btn btn-small" onclick="openEditProductModal('${item.id}')" title="Edit details">Edit</button>
                                    <button class="btn btn-small btn-danger" onclick="deleteProduct('${item.id}')" title="Remove SKU">✕</button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    // Attach inventory search & filter listeners
    const searchInput = document.getElementById('inventorySearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            renderInventory();
            // Refocus search input & set cursor
            const updatedInput = document.getElementById('inventorySearch');
            if (updatedInput) {
                updatedInput.focus();
                updatedInput.setSelectionRange(updatedInput.value.length, updatedInput.value.length);
            }
        });
    }

    const catSelect = document.getElementById('categorySelect');
    if (catSelect) {
        catSelect.addEventListener('change', (e) => {
            state.categoryFilter = e.target.value;
            renderInventory();
        });
    }

    const statSelect = document.getElementById('statusSelect');
    if (statSelect) {
        statSelect.addEventListener('change', (e) => {
            state.statusFilter = e.target.value;
            renderInventory();
        });
    }

    const resetBtn = document.getElementById('resetFiltersBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            state.searchQuery = '';
            state.categoryFilter = 'all';
            state.statusFilter = 'all';
            renderInventory();
        });
    }
}

// --- PAGE: RECEIVING ---
function renderReceiving() {
    el.content.innerHTML = `
        <div class="page-head">
            <div>
                <h3>Inbound Shipments & PO Receiving</h3>
                <p>Inspect incoming freight, verify supplier packing slips, and assign warehouse bins</p>
            </div>
            <button class="btn btn-primary" onclick="openReceiveShipmentModal()">+ New Inbound Delivery</button>
        </div>

        <div class="stats-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 20px;">
            <div class="card stat-card">
                <div class="stat-top">
                    <span class="stat-label">PENDING INTAKE</span>
                    <div class="stat-icon">⏳</div>
                </div>
                <div class="stat-value">${state.shipments.filter(s => s.status === 'pending').length}</div>
                <div class="stat-change">Awaiting bay unloading</div>
            </div>
            <div class="card stat-card">
                <div class="stat-top">
                    <span class="stat-label">INSPECTION IN PROGRESS</span>
                    <div class="stat-icon">🔍</div>
                </div>
                <div class="stat-value">${state.shipments.filter(s => s.status === 'picking').length}</div>
                <div class="stat-change" style="color: #2563eb;">Being scanned and verified</div>
            </div>
            <div class="card stat-card">
                <div class="stat-top">
                    <span class="stat-label">COMPLETED TODAY</span>
                    <div class="stat-icon">✅</div>
                </div>
                <div class="stat-value">${state.shipments.filter(s => s.status === 'completed').length}</div>
                <div class="stat-change">Successfully shelved to bins</div>
            </div>
        </div>

        <div class="card table-card">
            <table>
                <thead>
                    <tr>
                        <th>PO NUMBER</th>
                        <th>SUPPLIER NAME</th>
                        <th>EXPECTED / ARRIVAL DATE</th>
                        <th>TOTAL ITEMS</th>
                        <th>INSPECTION STATUS</th>
                        <th>NOTES & DOCK BAY</th>
                        <th style="text-align: right;">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    ${state.shipments.length === 0 ? `
                        <tr><td colspan="7" class="empty">No shipments currently logged.</td></tr>
                    ` : state.shipments.map(s => `
                        <tr>
                            <td><strong>${s.poNumber}</strong></td>
                            <td>${s.supplier}</td>
                            <td>${s.expectedDate}</td>
                            <td>${s.itemsCount} units</td>
                            <td>
                                <span class="status ${s.status}">
                                    ${s.status === 'completed' ? 'Completed & Shelved' : s.status === 'picking' ? 'Inspecting' : 'Awaiting Dock'}
                                </span>
                            </td>
                            <td><span style="color: #6b7280; font-size: 11px;">${s.notes || 'None'}</span></td>
                            <td style="text-align: right;">
                                <div class="actions" style="justify-content: flex-end;">
                                    ${s.status !== 'completed' ? `
                                        <button class="btn btn-small btn-primary" onclick="markShipmentCompleted('${s.id}')">Receive & Putaway</button>
                                    ` : `
                                        <button class="btn btn-small" onclick="viewShipmentSlip('${s.id}')">View Slip</button>
                                    `}
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// --- PAGE: ORDERS & PICKING ---
function renderOrders() {
    const totalOrders = state.orders.length;
    const completedOrders = state.orders.filter(o => o.status === 'completed').length;
    const pickingOrders = state.orders.filter(o => o.status === 'picking').length;

    el.content.innerHTML = `
        <div class="page-head">
            <div>
                <h3>Orders & Picking Lists</h3>
                <p>Track order dispatch progress, pick list completion, and customer consignments</p>
            </div>
            <button class="btn btn-primary" onclick="openCreateOrderModal()">+ Create New Order</button>
        </div>

        <div class="toolbar" style="margin-bottom: 20px;">
            <div style="font-size: 13px; color: #4b5563;">
                Total Orders: <strong>${totalOrders}</strong> | Active Picking: <strong>${pickingOrders}</strong> | Fulfilled: <strong>${completedOrders}</strong>
            </div>
        </div>

        <div class="order-grid">
            ${state.orders.length === 0 ? `
                <div class="card empty" style="grid-column: 1 / -1;">No customer orders found. Click "+ Create New Order" to start.</div>
            ` : state.orders.map(order => `
                <div class="card order-card">
                    <div class="order-top">
                        <div>
                            <span class="order-id">${order.id}</span>
                            <div class="order-customer">${order.customer}</div>
                        </div>
                        <span class="status ${order.status}">
                            ${order.status === 'completed' ? 'Shipped & Closed' : order.status === 'picking' ? 'Picking In Progress' : 'Pending Queue'}
                        </span>
                    </div>

                    <div class="order-items">
                        ${order.items.map(item => `
                            <div>
                                <span>${item.name}</span>
                                <strong>× ${item.qty}</strong>
                            </div>
                        `).join('')}
                    </div>

                    <div style="display: flex; justify-content: space-between; font-size: 11px; color: #6b7280;">
                        <span>Fulfillment Progress</span>
                        <strong>${order.progress}%</strong>
                    </div>

                    <div class="progress">
                        <div class="progress-bar" style="width: ${order.progress}%; background: ${order.progress === 100 ? '#15803d' : '#2563eb'}"></div>
                    </div>

                    <div class="order-footer">
                        <span style="font-size: 11px; color: #9ca3af;">Created: ${order.date}</span>
                        <div>
                            ${order.status === 'pending' ? `
                                <button class="btn btn-small btn-primary" onclick="advanceOrderStatus('${order.id}', 'picking')">Start Pick</button>
                            ` : order.status === 'picking' ? `
                                <button class="btn btn-small btn-primary" onclick="advanceOrderStatus('${order.id}', 'completed')">Ship Order</button>
                            ` : `
                                <button class="btn btn-small" onclick="viewOrderSlip('${order.id}')">View Slip</button>
                            `}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// --- PAGE: STOCK MOVEMENT ---
function renderMovement() {
    el.content.innerHTML = `
        <div class="page-head">
            <div>
                <h3>Stock Movement Audit Trail</h3>
                <p>Complete record of bin-to-bin transfers, pick deductions, intakes, and cycle counts</p>
            </div>
            <button class="btn btn-primary" onclick="openStockTransferModal()">↕ Log Transfer</button>
        </div>

        <div class="card table-card">
            <table>
                <thead>
                    <tr>
                        <th>TRANSACTION ID</th>
                        <th>TIME</th>
                        <th>TYPE</th>
                        <th>PRODUCT NAME & SKU</th>
                        <th>FROM LOCATION</th>
                        <th>TO LOCATION</th>
                        <th>QUANTITY</th>
                        <th>HANDLED BY</th>
                    </tr>
                </thead>
                <tbody>
                    ${state.movements.length === 0 ? `
                        <tr><td colspan="8" class="empty">No stock movement entries found.</td></tr>
                    ` : state.movements.map(m => `
                        <tr>
                            <td><strong>${m.id}</strong></td>
                            <td style="color: #6b7280; font-size: 11px;">${m.timestamp}</td>
                            <td>
                                <span class="status ${m.type === 'Intake' ? 'available' : m.type === 'Adjustment' ? 'low' : 'picking'}">
                                    ${m.type}
                                </span>
                            </td>
                            <td>
                                <div class="product-name">${m.productName}</div>
                                <div class="product-sku">${m.sku}</div>
                            </td>
                            <td>${m.fromLoc}</td>
                            <td><strong>${m.toLoc}</strong></td>
                            <td>
                                <strong style="color: ${m.qty > 0 ? '#15803d' : '#dc2626'}">
                                    ${m.qty > 0 ? '+' + m.qty : m.qty}
                                </strong>
                            </td>
                            <td>${m.user}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// --- PAGE: REPORTS & ANALYTICS ---
function renderReports() {
    const totalValue = state.inventory.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);
    const totalUnits = state.inventory.reduce((acc, curr) => acc + curr.quantity, 0);

    el.content.innerHTML = `
        <div class="page-head">
            <div>
                <h3>Warehouse Operations & Inventory Analytics</h3>
                <p>Key operational performance metrics, throughput, and capacity utilization</p>
            </div>
            <div style="display: flex; gap: 8px;">
                <button class="btn btn-primary" onclick="exportInventoryCSV()">📥 Export Inventory CSV</button>
            </div>
        </div>

        <div class="stats-grid">
            <div class="card stat-card">
                <span class="stat-label">TOTAL VALUATION</span>
                <div class="stat-value">$${Math.round(totalValue).toLocaleString()}</div>
                <div class="stat-change">Current on-hand retail value</div>
            </div>
            <div class="card stat-card">
                <span class="stat-label">TOTAL STOCK UNITS</span>
                <div class="stat-value">${totalUnits.toLocaleString()}</div>
                <div class="stat-change">Across active warehouse aisles</div>
            </div>
            <div class="card stat-card">
                <span class="stat-label">PICKING ACCURACY</span>
                <div class="stat-value">99.4%</div>
                <div class="stat-change">Error rate < 0.6% this cycle</div>
            </div>
            <div class="card stat-card">
                <span class="stat-label">STORAGE UTILIZATION</span>
                <div class="stat-value">84%</div>
                <div class="stat-change">Zone A & B optimal</div>
            </div>
        </div>

        <div class="report-grid">
            <div class="card report-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong>Weekly Order Fulfillment Volume</strong>
                    <span style="font-size: 11px; color: #6b7280;">Units Dispatched</span>
                </div>
                <div class="bar-chart">
                    <div class="bar" style="height: 45%;" title="Mon: 45 units"><span>Mon</span></div>
                    <div class="bar" style="height: 70%;" title="Tue: 70 units"><span>Tue</span></div>
                    <div class="bar" style="height: 55%;" title="Wed: 55 units"><span>Wed</span></div>
                    <div class="bar" style="height: 90%;" title="Thu: 90 units"><span>Thu</span></div>
                    <div class="bar" style="height: 85%;" title="Fri: 85 units"><span>Fri</span></div>
                    <div class="bar" style="height: 40%;" title="Sat: 40 units"><span>Sat</span></div>
                    <div class="bar" style="height: 25%;" title="Sun: 25 units"><span>Sun</span></div>
                </div>
            </div>

            <div class="card report-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong>Inbound Receiving Throughput</strong>
                    <span style="font-size: 11px; color: #6b7280;">Pallets Received</span>
                </div>
                <div class="bar-chart">
                    <div class="bar" style="height: 30%; background: #059669;" title="Mon: 12 pallets"><span>Mon</span></div>
                    <div class="bar" style="height: 60%; background: #059669;" title="Tue: 24 pallets"><span>Tue</span></div>
                    <div class="bar" style="height: 80%; background: #059669;" title="Wed: 32 pallets"><span>Wed</span></div>
                    <div class="bar" style="height: 65%; background: #059669;" title="Thu: 26 pallets"><span>Thu</span></div>
                    <div class="bar" style="height: 95%; background: #059669;" title="Fri: 38 pallets"><span>Fri</span></div>
                    <div class="bar" style="height: 35%; background: #059669;" title="Sat: 14 pallets"><span>Sat</span></div>
                    <div class="bar" style="height: 15%; background: #059669;" title="Sun: 6 pallets"><span>Sun</span></div>
                </div>
            </div>
        </div>

        <div class="card" style="margin-top: 20px; padding: 20px;">
            <strong style="display: block; margin-bottom: 12px; font-size: 14px;">Stock Categorization Summary</strong>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
                ${['Electronics', 'Packaging', 'Hardware', 'Apparel', 'Raw Materials'].map(cat => {
                    const itemsInCat = state.inventory.filter(i => i.category === cat);
                    const qtyInCat = itemsInCat.reduce((sum, i) => sum + i.quantity, 0);
                    return `
                        <div style="padding: 14px; background: #f8fafc; border-radius: 8px; border: 1px solid #e5e7eb;">
                            <span style="font-size: 11px; color: #6b7280; font-weight: 700; text-transform: uppercase;">${cat}</span>
                            <div style="font-size: 20px; font-weight: 800; margin: 6px 0;">${qtyInCat} units</div>
                            <span style="font-size: 11px; color: #4b5563;">${itemsInCat.length} unique SKUs</span>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

// CSV Export Helper
function exportInventoryCSV() {
    let csvContent = 'SKU,Product Name,Category,Location,Quantity,Unit,Min Level,Unit Price,Status\n';
    state.inventory.forEach(i => {
        csvContent += `"${i.sku}","${i.name.replace(/"/g, '""')}","${i.category}","${i.location}",${i.quantity},"${i.unit}",${i.minLevel},${i.price},"${i.status}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `warehouse_inventory_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Inventory report downloaded as CSV');
}
window.exportInventoryCSV = exportInventoryCSV;

// --- PAGE: NOTIFICATIONS ---
function renderNotifications() {
    el.content.innerHTML = `
        <div class="page-head">
            <div>
                <h3>System Notifications & Operational Alerts</h3>
                <p>Real-time audit log of stock warnings, purchase orders, and picking milestones</p>
            </div>
            <div style="display: flex; gap: 8px;">
                <button class="btn btn-small" onclick="markAllNotificationsRead()">Mark All Read</button>
                <button class="btn btn-small btn-danger" onclick="clearAllNotifications()">Clear All</button>
            </div>
        </div>

        <div class="card notification-list">
            ${state.notifications.length === 0 ? `
                <div class="empty">No alerts or notifications at this time.</div>
            ` : state.notifications.map(n => `
                <div class="notification-item ${n.read ? 'read' : 'unread'}" onclick="toggleNotificationRead('${n.id}')" style="cursor: pointer;">
                    <div class="notification-bullet"></div>
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between;">
                            <strong>${n.title}</strong>
                            <small>${n.time}</small>
                        </div>
                        <p>${n.message}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function toggleNotificationRead(id) {
    const item = state.notifications.find(n => n.id === id);
    if (item) {
        item.read = !item.read;
        Store.set(STORAGE_KEYS.NOTIFICATIONS, state.notifications);
        updateNotificationBadges();
        renderNotifications();
    }
}
window.toggleNotificationRead = toggleNotificationRead;

function markAllNotificationsRead() {
    state.notifications.forEach(n => n.read = true);
    Store.set(STORAGE_KEYS.NOTIFICATIONS, state.notifications);
    updateNotificationBadges();
    renderNotifications();
    showToast('All notifications marked as read');
}
window.markAllNotificationsRead = markAllNotificationsRead;

function clearAllNotifications() {
    state.notifications = [];
    Store.set(STORAGE_KEYS.NOTIFICATIONS, state.notifications);
    updateNotificationBadges();
    renderNotifications();
    showToast('All notifications cleared');
}
window.clearAllNotifications = clearAllNotifications;

// --- PAGE: PROFILE ---
function renderProfile() {
    el.content.innerHTML = `
        <div class="page-head">
            <div>
                <h3>Operator Profile & Permissions</h3>
                <p>View your active shift assignment, operator credentials, and warehouse role</p>
            </div>
            <button class="btn btn-primary" onclick="openEditProfileModal()">Edit Profile</button>
        </div>

        <div style="display: grid; grid-template-columns: 300px 1fr; gap: 20px; align-items: start;">
            <div class="card" style="padding: 25px; text-align: center;">
                <div class="avatar" style="width: 76px; height: 76px; font-size: 26px; margin: 0 auto 15px; border-radius: 50%;">
                    ${state.user.avatar}
                </div>
                <h3 style="font-size: 18px;">${state.user.name}</h3>
                <span style="color: #6b7280; font-size: 13px;">${state.user.role}</span>
                <div style="margin-top: 20px; border-top: 1px solid #e5e7eb; padding-top: 15px; text-align: left;">
                    <div style="font-size: 12px; margin-bottom: 8px;"><strong>Status:</strong> <span class="status available">Active On Shift</span></div>
                    <div style="font-size: 12px; margin-bottom: 8px;"><strong>Email:</strong> ${state.user.email}</div>
                    <div style="font-size: 12px;"><strong>ID:</strong> EMP-99201</div>
                </div>
            </div>

            <div class="card" style="padding: 25px;">
                <h4 style="margin-bottom: 16px; font-size: 15px;">Warehouse Assignment Details</h4>
                <div class="detail-list">
                    <div>
                        <span>CURRENT SHIFT</span>
                        <strong>${state.user.shift}</strong>
                    </div>
                    <div>
                        <span>ASSIGNED ZONES</span>
                        <strong>${state.user.assignedZone}</strong>
                    </div>
                    <div>
                        <span>FORKLIFT CERTIFICATION</span>
                        <strong>Class II & III (Valid thru 2028)</strong>
                    </div>
                    <div>
                        <span>ACCESS LEVEL</span>
                        <strong>Inventory Admin & Picking Supervisor</strong>
                    </div>
                </div>

                <h4 style="margin: 24px 0 12px; font-size: 15px;">Security & Session</h4>
                <p style="font-size: 13px; color: #6b7280; margin-bottom: 14px;">
                    Logged in via local terminal session. To secure access during breaks, remember to log out.
                </p>
                <button class="btn btn-danger" onclick="logout()">End Shift & Log Out</button>
            </div>
        </div>
    `;
}

// ==========================================
// 7. INVENTORY MODALS & ACTIONS
// ==========================================

function openAddProductModal() {
    const html = `
        <form id="addProductForm" onsubmit="handleAddProduct(event)">
            <div class="form-grid">
                <div class="form-group">
                    <label>SKU *</label>
                    <input type="text" id="newSku" placeholder="e.g. ELEC-1020" required>
                </div>
                <div class="form-group">
                    <label>Category *</label>
                    <select id="newCategory" required>
                        <option value="Electronics">Electronics</option>
                        <option value="Packaging">Packaging</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Apparel">Apparel</option>
                        <option value="Raw Materials">Raw Materials</option>
                    </select>
                </div>
                <div class="form-group full">
                    <label>Product Name *</label>
                    <input type="text" id="newName" placeholder="Full descriptive product title" required>
                </div>
                <div class="form-group">
                    <label>Warehouse Location / Aisle *</label>
                    <input type="text" id="newLocation" placeholder="e.g. Aisle B-04" required>
                </div>
                <div class="form-group">
                    <label>Unit of Measure *</label>
                    <input type="text" id="newUnit" placeholder="e.g. pcs, boxes, rolls" value="pcs" required>
                </div>
                <div class="form-group">
                    <label>Initial Quantity *</label>
                    <input type="number" id="newQty" min="0" value="10" required>
                </div>
                <div class="form-group">
                    <label>Min Alert Level *</label>
                    <input type="number" id="newMin" min="0" value="5" required>
                </div>
                <div class="form-group full">
                    <label>Unit Price ($) *</label>
                    <input type="number" id="newPrice" step="0.01" min="0" value="25.00" required>
                </div>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Save Product</button>
            </div>
        </form>
    `;
    openModal('Add New Product SKU', html);
}
window.openAddProductModal = openAddProductModal;

function handleAddProduct(e) {
    e.preventDefault();
    const sku = document.getElementById('newSku').value.trim();
    const name = document.getElementById('newName').value.trim();
    const category = document.getElementById('newCategory').value;
    const location = document.getElementById('newLocation').value.trim();
    const unit = document.getElementById('newUnit').value.trim() || 'pcs';
    const quantity = parseInt(document.getElementById('newQty').value, 10) || 0;
    const minLevel = parseInt(document.getElementById('newMin').value, 10) || 0;
    const price = parseFloat(document.getElementById('newPrice').value) || 0;

    // Check duplicate SKU
    if (state.inventory.some(i => i.sku.toLowerCase() === sku.toLowerCase())) {
        alert('A product with this SKU already exists!');
        return;
    }

    const newItem = {
        id: `item-${Date.now()}`,
        sku,
        name,
        category,
        location,
        quantity,
        minLevel,
        unit,
        price,
        status: computeStatus(quantity, minLevel)
    };

    state.inventory.unshift(newItem);
    Store.set(STORAGE_KEYS.INVENTORY, state.inventory);
    logMovement('Intake', sku, name, 'Receiving Dock', location, quantity);
    checkStockAlert(newItem);

    closeModal();
    renderPage(state.currentPage);
    showToast(`Product "${name}" added successfully`);
}
window.handleAddProduct = handleAddProduct;

function openEditProductModal(id) {
    const item = state.inventory.find(i => i.id === id);
    if (!item) return;

    const html = `
        <form id="editProductForm" onsubmit="handleEditProduct(event, '${id}')">
            <div class="form-grid">
                <div class="form-group">
                    <label>SKU</label>
                    <input type="text" id="editSku" value="${item.sku}" required>
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <select id="editCategory">
                        <option value="Electronics" ${item.category === 'Electronics' ? 'selected' : ''}>Electronics</option>
                        <option value="Packaging" ${item.category === 'Packaging' ? 'selected' : ''}>Packaging</option>
                        <option value="Hardware" ${item.category === 'Hardware' ? 'selected' : ''}>Hardware</option>
                        <option value="Apparel" ${item.category === 'Apparel' ? 'selected' : ''}>Apparel</option>
                        <option value="Raw Materials" ${item.category === 'Raw Materials' ? 'selected' : ''}>Raw Materials</option>
                    </select>
                </div>
                <div class="form-group full">
                    <label>Product Name</label>
                    <input type="text" id="editName" value="${item.name}" required>
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" id="editLocation" value="${item.location}" required>
                </div>
                <div class="form-group">
                    <label>Unit</label>
                    <input type="text" id="editUnit" value="${item.unit}" required>
                </div>
                <div class="form-group">
                    <label>Min Alert Level</label>
                    <input type="number" id="editMin" min="0" value="${item.minLevel}" required>
                </div>
                <div class="form-group">
                    <label>Unit Price ($)</label>
                    <input type="number" id="editPrice" step="0.01" min="0" value="${item.price}" required>
                </div>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Update Details</button>
            </div>
        </form>
    `;
    openModal(`Edit ${item.name}`, html);
}
window.openEditProductModal = openEditProductModal;

function handleEditProduct(e, id) {
    e.preventDefault();
    const item = state.inventory.find(i => i.id === id);
    if (!item) return;

    item.sku = document.getElementById('editSku').value.trim();
    item.name = document.getElementById('editName').value.trim();
    item.category = document.getElementById('editCategory').value;
    item.location = document.getElementById('editLocation').value.trim();
    item.unit = document.getElementById('editUnit').value.trim();
    item.minLevel = parseInt(document.getElementById('editMin').value, 10) || 0;
    item.price = parseFloat(document.getElementById('editPrice').value) || 0;
    item.status = computeStatus(item.quantity, item.minLevel);

    Store.set(STORAGE_KEYS.INVENTORY, state.inventory);
    closeModal();
    renderPage(state.currentPage);
    showToast(`Updated "${item.name}"`);
}
window.handleEditProduct = handleEditProduct;

function openAdjustStockModal(id) {
    const item = state.inventory.find(i => i.id === id);
    if (!item) return;

    const html = `
        <form onsubmit="handleAdjustStock(event, '${id}')">
            <p style="margin-bottom: 15px; color: #4b5563; font-size: 13px;">
                Current Stock: <strong>${item.quantity} ${item.unit}</strong> in <strong>${item.location}</strong>
            </p>
            <div class="form-grid">
                <div class="form-group">
                    <label>Adjustment Action</label>
                    <select id="adjType">
                        <option value="add">Add Stock (+)</option>
                        <option value="remove">Deduct Stock (-)</option>
                        <option value="set">Set Exact Count (=)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Quantity</label>
                    <input type="number" id="adjAmount" min="1" value="5" required>
                </div>
                <div class="form-group full">
                    <label>Reason / Note</label>
                    <input type="text" id="adjReason" placeholder="e.g. Cycle count discrepancy, damaged item, replenishment" required>
                </div>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Apply Adjustment</button>
            </div>
        </form>
    `;
    openModal(`Adjust Stock: ${item.name}`, html);
}
window.openAdjustStockModal = openAdjustStockModal;

function handleAdjustStock(e, id) {
    e.preventDefault();
    const item = state.inventory.find(i => i.id === id);
    if (!item) return;

    const type = document.getElementById('adjType').value;
    const amount = parseInt(document.getElementById('adjAmount').value, 10) || 0;
    const reason = document.getElementById('adjReason').value.trim();

    let diff = 0;
    if (type === 'add') {
        diff = amount;
        item.quantity += amount;
    } else if (type === 'remove') {
        if (item.quantity - amount < 0) {
            alert('Cannot deduct more than current quantity on hand!');
            return;
        }
        diff = -amount;
        item.quantity -= amount;
    } else if (type === 'set') {
        diff = amount - item.quantity;
        item.quantity = amount;
    }

    item.status = computeStatus(item.quantity, item.minLevel);
    Store.set(STORAGE_KEYS.INVENTORY, state.inventory);
    logMovement('Adjustment', item.sku, item.name, item.location, item.location, diff);
    checkStockAlert(item);

    closeModal();
    renderPage(state.currentPage);
    showToast(`Stock updated: now ${item.quantity} ${item.unit}`);
}
window.handleAdjustStock = handleAdjustStock;

function deleteProduct(id) {
    const item = state.inventory.find(i => i.id === id);
    if (!item) return;

    if (confirm(`Are you sure you want to remove "${item.name}" (${item.sku}) from the catalog?`)) {
        state.inventory = state.inventory.filter(i => i.id !== id);
        Store.set(STORAGE_KEYS.INVENTORY, state.inventory);
        renderPage(state.currentPage);
        showToast(`Product "${item.name}" deleted`);
    }
}
window.deleteProduct = deleteProduct;

// ==========================================
// 8. RECEIVING & SHIPMENTS ACTIONS
// ==========================================

function openReceiveShipmentModal() {
    const html = `
        <form onsubmit="handleNewShipment(event)">
            <div class="form-grid">
                <div class="form-group">
                    <label>PO Number *</label>
                    <input type="text" id="shipPo" placeholder="e.g. PO-8910" required>
                </div>
                <div class="form-group">
                    <label>Supplier Name *</label>
                    <input type="text" id="shipSupplier" placeholder="e.g. Acme Industrial" required>
                </div>
                <div class="form-group">
                    <label>Expected / Delivery Date *</label>
                    <input type="date" id="shipDate" value="${new Date().toISOString().slice(0, 10)}" required>
                </div>
                <div class="form-group">
                    <label>Total Units Count *</label>
                    <input type="number" id="shipCount" min="1" value="50" required>
                </div>
                <div class="form-group full">
                    <label>Dock Bay / Packing Notes</label>
                    <input type="text" id="shipNotes" placeholder="e.g. Dock 3, requires forklift">
                </div>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Register Inbound</button>
            </div>
        </form>
    `;
    openModal('Register Inbound Shipment', html);
}
window.openReceiveShipmentModal = openReceiveShipmentModal;

function handleNewShipment(e) {
    e.preventDefault();
    const poNumber = document.getElementById('shipPo').value.trim();
    const supplier = document.getElementById('shipSupplier').value.trim();
    const expectedDate = document.getElementById('shipDate').value;
    const itemsCount = parseInt(document.getElementById('shipCount').value, 10) || 0;
    const notes = document.getElementById('shipNotes').value.trim();

    const newShipment = {
        id: `SHP-${Date.now().toString().slice(-3)}`,
        poNumber,
        supplier,
        expectedDate,
        itemsCount,
        status: 'pending',
        notes
    };

    state.shipments.unshift(newShipment);
    Store.set(STORAGE_KEYS.SHIPMENTS, state.shipments);
    addNotification('New Shipment Logged', `Inbound delivery ${poNumber} from ${supplier} registered.`);

    closeModal();
    renderPage(state.currentPage);
    showToast(`Shipment ${poNumber} registered`);
}
window.handleNewShipment = handleNewShipment;

function markShipmentCompleted(id) {
    const shipment = state.shipments.find(s => s.id === id);
    if (!shipment) return;

    shipment.status = 'completed';
    Store.set(STORAGE_KEYS.SHIPMENTS, state.shipments);
    logMovement('Intake', shipment.poNumber, `Shipment from ${shipment.supplier}`, 'Inbound Dock', 'Warehouse Storage', shipment.itemsCount);
    addNotification('Shipment Shelved', `PO ${shipment.poNumber} marked completed and shelved.`);

    renderPage(state.currentPage);
    showToast(`Shipment ${shipment.poNumber} completed and verified!`);
}
window.markShipmentCompleted = markShipmentCompleted;

function viewShipmentSlip(id) {
    const s = state.shipments.find(item => item.id === id);
    if (!s) return;

    const html = `
        <div class="detail-list" style="margin-bottom: 20px;">
            <div>
                <span>PO REFERENCE</span>
                <strong>${s.poNumber}</strong>
            </div>
            <div>
                <span>STATUS</span>
                <strong class="status ${s.status}">${s.status.toUpperCase()}</strong>
            </div>
            <div>
                <span>SUPPLIER</span>
                <strong>${s.supplier}</strong>
            </div>
            <div>
                <span>DELIVERY DATE</span>
                <strong>${s.expectedDate}</strong>
            </div>
            <div>
                <span>TOTAL UNITS</span>
                <strong>${s.itemsCount} units</strong>
            </div>
            <div>
                <span>BAY NOTES</span>
                <strong>${s.notes || 'N/A'}</strong>
            </div>
        </div>
        <div class="modal-actions">
            <button class="btn" onclick="closeModal()">Close</button>
        </div>
    `;
    openModal(`Receiving Slip: ${s.poNumber}`, html);
}
window.viewShipmentSlip = viewShipmentSlip;

// ==========================================
// 9. ORDERS & PICKING ACTIONS
// ==========================================

function openCreateOrderModal() {
    const availableItems = state.inventory.filter(i => i.quantity > 0);
    const html = `
        <form onsubmit="handleCreateOrder(event)">
            <div class="form-grid">
                <div class="form-group full">
                    <label>Customer or Consignee *</label>
                    <input type="text" id="orderCust" placeholder="e.g. Apex Freight Hub" required>
                </div>
                <div class="form-group">
                    <label>Select Product *</label>
                    <select id="orderProduct" required>
                        ${availableItems.map(i => `
                            <option value="${i.id}">${i.name} (Stock: ${i.quantity} ${i.unit})</option>
                        `).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Order Quantity *</label>
                    <input type="number" id="orderQty" min="1" value="2" required>
                </div>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Create Order</button>
            </div>
        </form>
    `;
    openModal('Create New Outbound Order', html);
}
window.openCreateOrderModal = openCreateOrderModal;

function handleCreateOrder(e) {
    e.preventDefault();
    const customer = document.getElementById('orderCust').value.trim();
    const productId = document.getElementById('orderProduct').value;
    const qty = parseInt(document.getElementById('orderQty').value, 10) || 1;

    const item = state.inventory.find(i => i.id === productId);
    if (!item) return;

    if (qty > item.quantity) {
        alert(`Cannot order ${qty} units. Only ${item.quantity} units available in stock!`);
        return;
    }

    const newOrder = {
        id: `ORD-${Date.now().toString().slice(-4)}`,
        customer,
        date: new Date().toISOString().slice(0, 10),
        status: 'pending',
        progress: 0,
        items: [
            { name: item.name, qty }
        ]
    };

    state.orders.unshift(newOrder);
    Store.set(STORAGE_KEYS.ORDERS, state.orders);

    closeModal();
    renderPage(state.currentPage);
    showToast(`Order ${newOrder.id} created`);
}
window.handleCreateOrder = handleCreateOrder;

function advanceOrderStatus(id, nextStatus) {
    const order = state.orders.find(o => o.id === id);
    if (!order) return;

    if (nextStatus === 'picking') {
        order.status = 'picking';
        order.progress = 50;
        showToast(`Order ${order.id} moved to Picking queue`);
    } else if (nextStatus === 'completed') {
        order.status = 'completed';
        order.progress = 100;

        // Automatically deduct stock and log movements
        order.items.forEach(orderItem => {
            const invItem = state.inventory.find(i => i.name === orderItem.name);
            if (invItem) {
                invItem.quantity = Math.max(0, invItem.quantity - orderItem.qty);
                invItem.status = computeStatus(invItem.quantity, invItem.minLevel);
                logMovement('Picking', invItem.sku, invItem.name, invItem.location, 'Dispatch Dock', -orderItem.qty);
                checkStockAlert(invItem);
            }
        });

        Store.set(STORAGE_KEYS.INVENTORY, state.inventory);
        addNotification('Order Shipped', `Order ${order.id} for ${order.customer} has been shipped!`);
        showToast(`Order ${order.id} fulfilled and stock deducted`);
    }

    Store.set(STORAGE_KEYS.ORDERS, state.orders);
    renderPage(state.currentPage);
}
window.advanceOrderStatus = advanceOrderStatus;

function viewOrderSlip(id) {
    const o = state.orders.find(item => item.id === id);
    if (!o) return;

    const html = `
        <div class="detail-list" style="margin-bottom: 16px;">
            <div>
                <span>ORDER ID</span>
                <strong>${o.id}</strong>
            </div>
            <div>
                <span>STATUS</span>
                <strong class="status ${o.status}">${o.status.toUpperCase()}</strong>
            </div>
            <div>
                <span>CUSTOMER</span>
                <strong>${o.customer}</strong>
            </div>
            <div>
                <span>DATE CREATED</span>
                <strong>${o.date}</strong>
            </div>
        </div>
        <strong style="display: block; margin: 15px 0 8px; font-size: 13px;">Packing List</strong>
        <div class="card" style="padding: 12px; margin-bottom: 20px;">
            ${o.items.map(item => `
                <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f1f5f9; font-size: 12px;">
                    <span>${item.name}</span>
                    <strong>${item.qty} units</strong>
                </div>
            `).join('')}
        </div>
        <div class="modal-actions">
            <button class="btn" onclick="closeModal()">Close</button>
        </div>
    `;
    openModal(`Order Slip: ${o.id}`, html);
}
window.viewOrderSlip = viewOrderSlip;

// ==========================================
// 10. STOCK TRANSFER ACTIONS
// ==========================================

function openStockTransferModal() {
    const html = `
        <form onsubmit="handleStockTransfer(event)">
            <div class="form-grid">
                <div class="form-group full">
                    <label>Select Item to Move *</label>
                    <select id="transferItem" required>
                        ${state.inventory.map(i => `
                            <option value="${i.id}">${i.name} (${i.sku}) - Cur: ${i.location} [${i.quantity} ${i.unit}]</option>
                        `).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>New Destination Aisle / Bin *</label>
                    <input type="text" id="transferTo" placeholder="e.g. Aisle D-04" required>
                </div>
                <div class="form-group">
                    <label>Quantity to Move *</label>
                    <input type="number" id="transferQty" min="1" value="5" required>
                </div>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Confirm Bin Transfer</button>
            </div>
        </form>
    `;
    openModal('Log Internal Stock Transfer', html);
}
window.openStockTransferModal = openStockTransferModal;

function handleStockTransfer(e) {
    e.preventDefault();
    const itemId = document.getElementById('transferItem').value;
    const toLoc = document.getElementById('transferTo').value.trim();
    const qty = parseInt(document.getElementById('transferQty').value, 10) || 1;

    const item = state.inventory.find(i => i.id === itemId);
    if (!item) return;

    if (qty > item.quantity) {
        alert(`Cannot transfer ${qty} units. Only ${item.quantity} available!`);
        return;
    }

    const oldLoc = item.location;
    item.location = toLoc;
    Store.set(STORAGE_KEYS.INVENTORY, state.inventory);

    logMovement('Transfer', item.sku, item.name, oldLoc, toLoc, qty);

    closeModal();
    renderPage(state.currentPage);
    showToast(`Moved ${qty} units of ${item.name} to ${toLoc}`);
}
window.handleStockTransfer = handleStockTransfer;

// ==========================================
// 11. PROFILE MODAL
// ==========================================

function openEditProfileModal() {
    const html = `
        <form onsubmit="handleSaveProfile(event)">
            <div class="form-grid">
                <div class="form-group full">
                    <label>Display Name *</label>
                    <input type="text" id="profName" value="${state.user.name}" required>
                </div>
                <div class="form-group full">
                    <label>Role / Position *</label>
                    <input type="text" id="profRole" value="${state.user.role}" required>
                </div>
                <div class="form-group full">
                    <label>Email Address *</label>
                    <input type="email" id="profEmail" value="${state.user.email}" required>
                </div>
                <div class="form-group full">
                    <label>Assigned Shift *</label>
                    <input type="text" id="profShift" value="${state.user.shift}" required>
                </div>
                <div class="form-group full">
                    <label>Assigned Zones *</label>
                    <input type="text" id="profZones" value="${state.user.assignedZone}" required>
                </div>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `;
    openModal('Edit Operator Profile', html);
}
window.openEditProfileModal = openEditProfileModal;

function handleSaveProfile(e) {
    e.preventDefault();
    state.user.name = document.getElementById('profName').value.trim();
    state.user.role = document.getElementById('profRole').value.trim();
    state.user.email = document.getElementById('profEmail').value.trim();
    state.user.shift = document.getElementById('profShift').value.trim();
    state.user.assignedZone = document.getElementById('profZones').value.trim();

    // Create initials
    const parts = state.user.name.split(' ');
    state.user.avatar = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0].slice(0, 2).toUpperCase();

    Store.set(STORAGE_KEYS.USER, state.user);
    updateUserDisplay();
    closeModal();
    renderPage(state.currentPage);
    showToast('Profile updated successfully');
}
window.handleSaveProfile = handleSaveProfile;

function updateUserDisplay() {
    if (el.userMenuName) el.userMenuName.textContent = state.user.name;
    if (el.userMenuRole) el.userMenuRole.textContent = state.user.role;
    if (el.userAvatar) el.userAvatar.textContent = state.user.avatar;
}

// ==========================================
// 12. AUTHENTICATION (LOGIN / LOGOUT)
// ==========================================

function initAuth() {
    const isLoggedIn = Store.get(STORAGE_KEYS.AUTH, false);
    if (isLoggedIn) {
        showApp();
    } else {
        showLogin();
    }
}

function showLogin() {
    if (el.loginScreen) el.loginScreen.classList.remove('hidden');
    if (el.app) el.app.classList.add('hidden');
}

function showApp() {
    if (el.loginScreen) el.loginScreen.classList.add('hidden');
    if (el.app) el.app.classList.remove('hidden');
    updateUserDisplay();
    updateNotificationBadges();
    navigateTo('dashboard');
}

if (el.loginForm) {
    el.loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = el.usernameInput.value.trim();
        const password = el.passwordInput.value.trim();

        if (!username || !password) {
            if (el.loginError) el.loginError.textContent = 'Please enter both username and password.';
            return;
        }

        if (el.loginError) el.loginError.textContent = '';

        // If user typed a specific name, personalize profile
        if (username.includes('@')) {
            state.user.email = username;
            const namePart = username.split('@')[0];
            state.user.name = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        } else if (username.length > 2 && username.toLowerCase() !== 'admin') {
            state.user.name = username.charAt(0).toUpperCase() + username.slice(1);
        }

        const parts = state.user.name.split(' ');
        state.user.avatar = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : state.user.name.slice(0, 2).toUpperCase();

        Store.set(STORAGE_KEYS.USER, state.user);
        Store.set(STORAGE_KEYS.AUTH, true);

        showApp();
        showToast(`Welcome back, ${state.user.name}!`);
    });
}

function logout() {
    Store.set(STORAGE_KEYS.AUTH, false);
    if (el.usernameInput) el.usernameInput.value = '';
    if (el.passwordInput) el.passwordInput.value = '';
    showLogin();
    showToast('Logged out successfully');
}
window.logout = logout;

if (el.logoutBtn) {
    el.logoutBtn.addEventListener('click', logout);
}

// ==========================================
// 13. GLOBAL EVENT LISTENERS & SETUP
// ==========================================

// Navigation clicks
el.navItems.forEach(item => {
    item.addEventListener('click', () => {
        const page = item.getAttribute('data-page');
        if (page) navigateTo(page);
    });
});

if (el.topActionNotifications) {
    el.topActionNotifications.addEventListener('click', () => {
        navigateTo('notifications');
    });
}

// Mobile sidebar toggle
if (el.mobileMenu && el.sidebar) {
    el.mobileMenu.addEventListener('click', () => {
        el.sidebar.classList.toggle('open');
    });
}

// Close mobile sidebar on outside click
document.addEventListener('click', (e) => {
    if (el.sidebar && el.sidebar.classList.contains('open')) {
        if (!el.sidebar.contains(e.target) && e.target !== el.mobileMenu) {
            el.sidebar.classList.remove('open');
        }
    }
});

// Boot application
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initAuth();
    });
} else {
    initAuth();
}
