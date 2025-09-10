// Booking form functionality for Tatra Tours website

document.addEventListener('DOMContentLoaded', function() {
    initBookingForm();
    initBookingSummary();
});

// Tour data for pricing and details
const tourData = {
    'winter-walking': {
        name: 'Winter Walking and Activity Holiday',
        duration: '5 days',
        price: 967,
        currency: 'USD',
        location: 'Poprad/High Tatras',
        highlights: ['❄️ Snow Hiking', '🏔️ Frozen Lakes', '🥾 Guided Walks']
    },
    'wellness-retreat': {
        name: 'Winter Wellness Retreat',
        duration: '5 days',
        price: 1340,
        currency: 'USD',
        location: 'Ždiar/High Tatras',
        highlights: ['🧘 Spa & Wellness', '🏔️ Mountain Views', '🌿 Relaxation']
    },
    'mountain-escape': {
        name: 'High Tatras Walking Holiday Mountain Escape',
        duration: '6 days',
        price: 1187,
        currency: 'EUR',
        location: 'High Tatras National Park',
        highlights: ['🥾 Alpine Walking', '🏞️ National Park', '📸 Photography']
    },
    'all-seasons': {
        name: 'High Tatras Walking Holiday All Seasons',
        duration: '7 days',
        price: 1465,
        currency: 'EUR',
        location: 'High Tatras Region',
        highlights: ['🌲 All Weather', '🏔️ Peak Climbing', '🗺️ Comprehensive']
    },
    'hut-to-hut': {
        name: 'Hut-to-Hut Self-Guided Trek',
        duration: '7+ days',
        price: 0,
        currency: 'USD',
        location: 'Alpine Valleys & Lakes',
        highlights: ['🏕️ Mountain Huts', '🥾 Multi-day Trek', '⭐ Self-Guided']
    }
};

function initBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    const tourSelection = document.getElementById('tourSelection');
    const participantsSelect = document.getElementById('participants');
    const tourDateInput = document.getElementById('tourDate');
    
    if (!bookingForm) return;
    
    // Set minimum date to today
    if (tourDateInput) {
        const today = new Date();
        const minDate = new Date(today.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days from now
        tourDateInput.min = minDate.toISOString().split('T')[0];
    }
    
    // Tour selection change handler
    if (tourSelection) {
        tourSelection.addEventListener('change', function() {
            updateBookingSummary();
        });
    }
    
    // Participants change handler
    if (participantsSelect) {
        participantsSelect.addEventListener('change', function() {
            updateBookingSummary();
        });
    }
    
    // Form submission handler
    bookingForm.addEventListener('submit', handleBookingSubmission);
    
    // Real-time validation
    initFormValidation();
}

function initBookingSummary() {
    updateBookingSummary();
}

function updateBookingSummary() {
    const tourSelection = document.getElementById('tourSelection');
    const participantsSelect = document.getElementById('participants');
    const summaryContent = document.getElementById('summaryContent');
    
    if (!tourSelection || !participantsSelect || !summaryContent) return;
    
    const selectedTour = tourSelection.value;
    const participantCount = parseInt(participantsSelect.value) || 1;
    
    if (!selectedTour || !tourData[selectedTour]) {
        summaryContent.innerHTML = '<p>Select a tour to see pricing details</p>';
        return;
    }
    
    const tour = tourData[selectedTour];
    const totalPrice = tour.price * participantCount;
    
    let summaryHTML = `
        <div class="tour-summary">
            <h4>${tour.name}</h4>
            <div class="summary-details">
                <div class="summary-row">
                    <span>Duration:</span>
                    <span>${tour.duration}</span>
                </div>
                <div class="summary-row">
                    <span>Location:</span>
                    <span>${tour.location}</span>
                </div>
                <div class="summary-row">
                    <span>Participants:</span>
                    <span>${participantCount} ${participantCount === 1 ? 'person' : 'people'}</span>
                </div>
    `;
    
    if (tour.price > 0) {
        summaryHTML += `
                <div class="summary-row">
                    <span>Price per person:</span>
                    <span>${window.TatraTours.formatCurrency(tour.price, tour.currency)}</span>
                </div>
                <div class="summary-row total">
                    <span><strong>Total Price:</strong></span>
                    <span><strong>${window.TatraTours.formatCurrency(totalPrice, tour.currency)}</strong></span>
                </div>
        `;
    } else {
        summaryHTML += `
                <div class="summary-row total">
                    <span><strong>Price:</strong></span>
                    <span><strong>Contact for pricing</strong></span>
                </div>
        `;
    }
    
    summaryHTML += `
            </div>
            <div class="tour-highlights">
                <strong>Highlights:</strong>
                <ul>
                    ${tour.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    summaryContent.innerHTML = summaryHTML;
    
    // Add styles for summary
    if (!document.querySelector('#summary-styles')) {
        const style = document.createElement('style');
        style.id = 'summary-styles';
        style.textContent = `
            .tour-summary h4 {
                color: var(--text-dark);
                margin-bottom: 1rem;
                font-size: 1.1rem;
            }
            .summary-details {
                margin-bottom: 1rem;
            }
            .summary-row {
                display: flex;
                justify-content: space-between;
                padding: 0.5rem 0;
                border-bottom: 1px solid var(--warm-gray);
            }
            .summary-row:last-child {
                border-bottom: none;
            }
            .summary-row.total {
                background-color: var(--warm-gray);
                padding: 0.75rem;
                margin-top: 0.5rem;
                border-radius: 0.375rem;
            }
            .tour-highlights {
                margin-top: 1rem;
                padding-top: 1rem;
                border-top: 1px solid var(--warm-gray);
            }
            .tour-highlights ul {
                list-style: none;
                padding: 0;
                margin-top: 0.5rem;
            }
            .tour-highlights li {
                padding: 0.25rem 0;
                font-size: 0.9rem;
            }
        `;
        document.head.appendChild(style);
    }
}

function initFormValidation() {
    const form = document.getElementById('bookingForm');
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    }
    
    // Specific validations
    switch (fieldName) {
        case 'email':
            if (value && !window.TatraTours.validateEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
            break;
        case 'phone':
        case 'emergencyPhone':
            if (value && !window.TatraTours.validatePhone(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number.';
            }
            break;
        case 'tourDate':
            if (value) {
                const selectedDate = new Date(value);
                const minDate = new Date();
                minDate.setDate(minDate.getDate() + 7);
                
                if (selectedDate < minDate) {
                    isValid = false;
                    errorMessage = 'Please select a date at least 7 days from today.';
                }
            }
            break;
        case 'age':
            const age = parseInt(value);
            if (value && (age < 18 || age > 100)) {
                isValid = false;
                errorMessage = 'Age must be between 18 and 100.';
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #dc2626;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    `;
    
    field.style.borderColor = '#dc2626';
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
}

async function handleBookingSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Validate all fields
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isFormValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });
    
    // Check terms acceptance
    const termsAccepted = form.querySelector('#termsAccepted');
    if (!termsAccepted.checked) {
        isFormValid = false;
        showFieldError(termsAccepted, 'Please accept the terms and conditions.');
    }
    
    if (!isFormValid) {
        window.TatraTours.showNotification('Please fix the errors in the form.', 'error');
        return;
    }
    
    try {
        window.TatraTours.showLoading(submitBtn);
        
        // Prepare booking data
        const bookingData = {
            tour: formData.get('tourSelection'),
            tourDate: formData.get('tourDate'),
            participants: formData.get('participants'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            country: formData.get('country'),
            age: formData.get('age'),
            experience: formData.get('experience'),
            dietary: formData.get('dietary'),
            medical: formData.get('medical'),
            specialRequests: formData.get('specialRequests'),
            emergencyName: formData.get('emergencyName'),
            emergencyPhone: formData.get('emergencyPhone'),
            emergencyRelation: formData.get('emergencyRelation'),
            newsletter: formData.get('newsletter') === 'on',
            submittedAt: new Date().toISOString()
        };
        
        // Send booking request
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const result = await response.json();
        
        if (result.success) {
            showBookingConfirmation(bookingData, result.booking);
        } else {
            throw new Error(result.error || 'Booking failed');
        }
        
    } catch (error) {
        console.error('Booking error:', error);
        window.TatraTours.showNotification(
            'Sorry, we encountered an error processing your booking. Please try again or contact us directly.',
            'error'
        );
    } finally {
        window.TatraTours.hideLoading(submitBtn);
    }
}

function showBookingConfirmation(bookingData, bookingResult) {
    const modal = document.getElementById('confirmationModal');
    const bookingDetails = document.getElementById('bookingDetails');
    
    if (!modal || !bookingDetails) return;
    
    const tour = tourData[bookingData.tour];
    const formattedDate = window.TatraTours.formatDate(bookingData.tourDate);
    
    bookingDetails.innerHTML = `
        <div class="booking-confirmation-details">
            <div class="detail-row">
                <strong>Booking ID:</strong> ${bookingResult.id}
            </div>
            <div class="detail-row">
                <strong>Tour:</strong> ${tour.name}
            </div>
            <div class="detail-row">
                <strong>Date:</strong> ${formattedDate}
            </div>
            <div class="detail-row">
                <strong>Participants:</strong> ${bookingData.participants} ${bookingData.participants == 1 ? 'person' : 'people'}
            </div>
            <div class="detail-row">
                <strong>Lead Traveler:</strong> ${bookingData.firstName} ${bookingData.lastName}
            </div>
            <div class="detail-row">
                <strong>Email:</strong> ${bookingData.email}
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Add confirmation details styles
    if (!document.querySelector('#confirmation-styles')) {
        const style = document.createElement('style');
        style.id = 'confirmation-styles';
        style.textContent = `
            .booking-confirmation-details {
                background-color: var(--warm-gray);
                padding: 1rem;
                border-radius: 0.5rem;
                margin: 1rem 0;
            }
            .detail-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.5rem 0;
                border-bottom: 1px solid #e5e7eb;
            }
            .detail-row:last-child {
                border-bottom: none;
            }
            .detail-row strong {
                color: var(--text-dark);
            }
            @media (max-width: 480px) {
                .detail-row {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.25rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show success notification
    window.TatraTours.showNotification('Booking submitted successfully!', 'success');
    
    // Reset form
    document.getElementById('bookingForm').reset();
    updateBookingSummary();
}

// Initialize booking summary when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set default minimum date
    const tourDateInput = document.getElementById('tourDate');
    if (tourDateInput) {
        const today = new Date();
        const minDate = new Date(today.getTime() + (7 * 24 * 60 * 60 * 1000));
        tourDateInput.min = minDate.toISOString().split('T')[0];
        
        // Set default date to 2 weeks from now
        const defaultDate = new Date(today.getTime() + (14 * 24 * 60 * 60 * 1000));
        tourDateInput.value = defaultDate.toISOString().split('T')[0];
    }
});