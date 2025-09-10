// Admin Dashboard JavaScript for Tatra Tours

document.addEventListener('DOMContentLoaded', function() {
    initAdminDashboard();
});

let bookingsData = [];

async function initAdminDashboard() {
    await loadBookings();
    updateStats();
    initEventListeners();
}

function initEventListeners() {
    const refreshButton = document.getElementById('refreshBookings');
    const closeModal = document.getElementById('closeModal');
    const closeDetailsModal = document.getElementById('closeDetailsModal');
    const confirmBooking = document.getElementById('confirmBooking');
    const cancelBooking = document.getElementById('cancelBooking');

    if (refreshButton) {
        refreshButton.addEventListener('click', async () => {
            await loadBookings();
            updateStats();
        });
    }

    if (closeModal || closeDetailsModal) {
        [closeModal, closeDetailsModal].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => {
                    document.getElementById('bookingDetailsModal').style.display = 'none';
                });
            }
        });
    }

    if (confirmBooking) {
        confirmBooking.addEventListener('click', confirmSelectedBooking);
    }

    if (cancelBooking) {
        cancelBooking.addEventListener('click', cancelSelectedBooking);
    }

    // Close modal when clicking outside
    const modal = document.getElementById('bookingDetailsModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

async function loadBookings() {
    try {
        const response = await fetch('/api/bookings');
        if (response.ok) {
            bookingsData = await response.json();
            renderBookingsTable();
        } else {
            console.error('Failed to load bookings');
            bookingsData = [];
        }
    } catch (error) {
        console.error('Error loading bookings:', error);
        bookingsData = [];
    }
}

function renderBookingsTable() {
    const tableBody = document.getElementById('bookingsTableBody');
    if (!tableBody) return;

    if (bookingsData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="no-bookings">No bookings found</td></tr>';
        return;
    }

    // Sort bookings by creation date (newest first)
    const sortedBookings = [...bookingsData].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
    );

    tableBody.innerHTML = sortedBookings.map(booking => {
        const tourName = getTourDisplayName(booking.tour);
        const statusClass = getStatusClass(booking.status);
        const createdDate = new Date(booking.createdAt).toLocaleDateString();
        const tourDate = new Date(booking.tourDate).toLocaleDateString();

        return `
            <tr>
                <td><strong>#${booking.id.slice(-6)}</strong></td>
                <td>
                    <div class="customer-info">
                        <strong>${booking.firstName} ${booking.lastName}</strong>
                        <small>${booking.email}</small>
                    </div>
                </td>
                <td>
                    <div class="tour-info">
                        <strong>${tourName}</strong>
                        <small>Date: ${tourDate}</small>
                    </div>
                </td>
                <td>${createdDate}</td>
                <td>${booking.participants}</td>
                <td><span class="status-badge ${statusClass}">${booking.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline" onclick="viewBookingDetails('${booking.id}')">View</button>
                </td>
            </tr>
        `;
    }).join('');
}

function getTourDisplayName(tourId) {
    const tourNames = {
        'winter-walking': 'Winter Walking Holiday',
        'wellness-retreat': 'Winter Wellness Retreat',
        'mountain-escape': 'Mountain Escape',
        'all-seasons': 'All Seasons Holiday',
        'hut-to-hut': 'Hut-to-Hut Trek'
    };
    return tourNames[tourId] || 'Unknown Tour';
}

function getStatusClass(status) {
    const statusClasses = {
        'pending': 'status-pending',
        'confirmed': 'status-confirmed',
        'cancelled': 'status-cancelled',
        'completed': 'status-completed'
    };
    return statusClasses[status] || 'status-pending';
}

function updateStats() {
    const totalBookings = bookingsData.length;
    const pendingBookings = bookingsData.filter(b => b.status === 'pending').length;
    const confirmedBookings = bookingsData.filter(b => b.status === 'confirmed').length;
    
    // Calculate bookings from this month
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const monthlyBookings = bookingsData.filter(b => {
        const bookingDate = new Date(b.createdAt);
        return bookingDate.getMonth() === thisMonth && bookingDate.getFullYear() === thisYear;
    }).length;

    // Update stat displays
    document.getElementById('totalBookings').textContent = totalBookings;
    document.getElementById('pendingBookings').textContent = pendingBookings;
    document.getElementById('confirmedBookings').textContent = confirmedBookings;
    document.getElementById('monthlyBookings').textContent = monthlyBookings;
}

function viewBookingDetails(bookingId) {
    const booking = bookingsData.find(b => b.id === bookingId);
    if (!booking) return;

    const modal = document.getElementById('bookingDetailsModal');
    const content = document.getElementById('bookingDetailsContent');

    const tourName = getTourDisplayName(booking.tour);
    const createdDate = new Date(booking.createdAt).toLocaleDateString();
    const tourDate = new Date(booking.tourDate).toLocaleDateString();

    content.innerHTML = `
        <div class="booking-details-grid">
            <div class="detail-section">
                <h3>Customer Information</h3>
                <div class="detail-row">
                    <span class="label">Name:</span>
                    <span>${booking.firstName} ${booking.lastName}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Email:</span>
                    <span>${booking.email}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Phone:</span>
                    <span>${booking.phone}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Country:</span>
                    <span>${booking.country}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Age:</span>
                    <span>${booking.age}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Experience:</span>
                    <span>${booking.experience}</span>
                </div>
            </div>

            <div class="detail-section">
                <h3>Tour Details</h3>
                <div class="detail-row">
                    <span class="label">Tour:</span>
                    <span>${tourName}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Tour Date:</span>
                    <span>${tourDate}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Participants:</span>
                    <span>${booking.participants}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Status:</span>
                    <span class="status-badge ${getStatusClass(booking.status)}">${booking.status}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Booking Date:</span>
                    <span>${createdDate}</span>
                </div>
            </div>

            <div class="detail-section">
                <h3>Emergency Contact</h3>
                <div class="detail-row">
                    <span class="label">Name:</span>
                    <span>${booking.emergencyName}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Phone:</span>
                    <span>${booking.emergencyPhone}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Relationship:</span>
                    <span>${booking.emergencyRelation}</span>
                </div>
            </div>

            <div class="detail-section full-width">
                <h3>Additional Information</h3>
                ${booking.dietary ? `
                <div class="detail-row">
                    <span class="label">Dietary Requirements:</span>
                    <span>${booking.dietary}</span>
                </div>
                ` : ''}
                ${booking.medical ? `
                <div class="detail-row">
                    <span class="label">Medical Information:</span>
                    <span>${booking.medical}</span>
                </div>
                ` : ''}
                ${booking.specialRequests ? `
                <div class="detail-row">
                    <span class="label">Special Requests:</span>
                    <span>${booking.specialRequests}</span>
                </div>
                ` : ''}
            </div>
        </div>
    `;

    // Store current booking ID for actions
    modal.setAttribute('data-booking-id', bookingId);
    
    // Show/hide action buttons based on status
    const confirmBtn = document.getElementById('confirmBooking');
    const cancelBtn = document.getElementById('cancelBooking');
    
    if (confirmBtn) {
        confirmBtn.style.display = booking.status === 'pending' ? 'inline-flex' : 'none';
    }
    
    if (cancelBtn) {
        cancelBtn.style.display = booking.status !== 'cancelled' ? 'inline-flex' : 'none';
    }

    modal.style.display = 'flex';
}

async function confirmSelectedBooking() {
    const modal = document.getElementById('bookingDetailsModal');
    const bookingId = modal.getAttribute('data-booking-id');
    
    if (!bookingId) return;

    try {
        const response = await fetch(`/api/bookings/${bookingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'confirmed' })
        });

        if (response.ok) {
            window.TatraTours.showNotification('Booking confirmed successfully!', 'success');
            await loadBookings();
            updateStats();
            modal.style.display = 'none';
        } else {
            throw new Error('Failed to confirm booking');
        }
    } catch (error) {
        console.error('Error confirming booking:', error);
        window.TatraTours.showNotification('Failed to confirm booking.', 'error');
    }
}

async function cancelSelectedBooking() {
    const modal = document.getElementById('bookingDetailsModal');
    const bookingId = modal.getAttribute('data-booking-id');
    
    if (!bookingId) return;

    if (!confirm('Are you sure you want to cancel this booking?')) {
        return;
    }

    try {
        const response = await fetch(`/api/bookings/${bookingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'cancelled' })
        });

        if (response.ok) {
            window.TatraTours.showNotification('Booking cancelled successfully!', 'success');
            await loadBookings();
            updateStats();
            modal.style.display = 'none';
        } else {
            throw new Error('Failed to cancel booking');
        }
    } catch (error) {
        console.error('Error cancelling booking:', error);
        window.TatraTours.showNotification('Failed to cancel booking.', 'error');
    }
}

// Add admin-specific styles
const adminStyles = document.createElement('style');
adminStyles.textContent = `
    .dashboard-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--space-lg);
        margin-bottom: var(--space-3xl);
    }

    .stat-card {
        background: var(--snow-white);
        padding: var(--space-xl);
        border-radius: var(--radius-lg);
        text-align: center;
        box-shadow: var(--shadow-md);
    }

    .stat-card h3 {
        font-size: 0.9rem;
        color: var(--text-light);
        margin-bottom: var(--space-sm);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .stat-number {
        font-size: 2.5rem;
        font-weight: var(--font-weight-bold);
        color: var(--primary-green);
    }

    .admin-dashboard {
        padding: var(--space-3xl) 0;
    }

    .bookings-section .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-xl);
    }

    .bookings-table-container {
        background: var(--snow-white);
        border-radius: var(--radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow-md);
    }

    .bookings-table {
        width: 100%;
        border-collapse: collapse;
    }

    .bookings-table th,
    .bookings-table td {
        padding: var(--space-md);
        text-align: left;
        border-bottom: 1px solid var(--warm-gray);
    }

    .bookings-table th {
        background-color: var(--primary-green);
        color: var(--snow-white);
        font-weight: var(--font-weight-semibold);
    }

    .bookings-table tr:hover {
        background-color: var(--warm-gray);
    }

    .customer-info,
    .tour-info {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
    }

    .customer-info strong,
    .tour-info strong {
        color: var(--text-dark);
    }

    .customer-info small,
    .tour-info small {
        color: var(--text-light);
        font-size: 0.8rem;
    }

    .status-badge {
        padding: var(--space-xs) var(--space-sm);
        border-radius: var(--radius-sm);
        font-size: 0.8rem;
        font-weight: var(--font-weight-medium);
        text-transform: uppercase;
    }

    .status-pending {
        background-color: var(--warning-amber);
        color: var(--snow-white);
    }

    .status-confirmed {
        background-color: var(--success-green);
        color: var(--snow-white);
    }

    .status-cancelled {
        background-color: #dc2626;
        color: var(--snow-white);
    }

    .status-completed {
        background-color: var(--stone-gray);
        color: var(--snow-white);
    }

    .btn-sm {
        padding: var(--space-xs) var(--space-sm);
        font-size: 0.8rem;
        min-height: auto;
    }

    .btn-success {
        background-color: var(--success-green);
        border-color: var(--success-green);
        color: var(--snow-white);
    }

    .btn-success:hover {
        background-color: #15803d;
        border-color: #15803d;
    }

    .btn-danger {
        background-color: #dc2626;
        border-color: #dc2626;
        color: var(--snow-white);
    }

    .btn-danger:hover {
        background-color: #b91c1c;
        border-color: #b91c1c;
    }

    .booking-details-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    }

    .booking-details-modal .modal-content {
        background-color: var(--snow-white);
        border-radius: var(--radius-lg);
        padding: var(--space-2xl);
        max-width: 800px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: var(--shadow-xl);
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-xl);
        border-bottom: 1px solid var(--warm-gray);
        padding-bottom: var(--space-md);
    }

    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-light);
    }

    .booking-details-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-xl);
        margin-bottom: var(--space-xl);
    }

    .detail-section {
        background-color: var(--warm-gray);
        padding: var(--space-lg);
        border-radius: var(--radius-md);
    }

    .detail-section.full-width {
        grid-column: 1 / -1;
    }

    .detail-section h3 {
        color: var(--text-dark);
        margin-bottom: var(--space-lg);
        font-size: 1.1rem;
    }

    .detail-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: var(--space-sm) 0;
        border-bottom: 1px solid #e5e7eb;
    }

    .detail-row:last-child {
        border-bottom: none;
    }

    .detail-row .label {
        font-weight: var(--font-weight-medium);
        color: var(--text-dark);
        min-width: 120px;
    }

    .no-bookings {
        text-align: center;
        color: var(--text-light);
        font-style: italic;
        padding: var(--space-3xl);
    }

    @media (max-width: 768px) {
        .bookings-table-container {
            overflow-x: auto;
        }
        
        .bookings-table {
            min-width: 700px;
        }
        
        .booking-details-grid {
            grid-template-columns: 1fr;
        }
        
        .dashboard-stats {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 480px) {
        .dashboard-stats {
            grid-template-columns: 1fr;
        }
        
        .bookings-section .section-header {
            flex-direction: column;
            gap: var(--space-md);
        }
    }
`;
document.head.appendChild(adminStyles);