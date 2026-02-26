        // Wait for DOM to load
        document.addEventListener('DOMContentLoaded', function() {
            'use strict';

            // ===== FOOD DATA =====
            const foodItems = [
                { name: 'Grilled Salmon', price: 'N39,999', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600' },
                { name: 'Beef Wellington', price: 'N43,999', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600' },
                { name: 'Truffle Pasta', price: 'N40,000', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600' },
                { name: 'Seafood Platter', price: 'N42,999', image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600' },
                { name: 'Vegetarian Lasagna', price: 'N19,000', image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600' },
                { name: 'Chocolate Soufflé', price: 'N102,999', image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600' }
            ];

            // ===== TESTIMONIALS DATA =====
            const testimonials = [
                { name: 'Sarah Johnson', rating: 5, text: 'Absolutely amazing food for our corporate event! Everyone was impressed.', image: '👩‍🍳' },
                { name: 'Michael Chen', rating: 5, text: 'The attention to detail and presentation was outstanding. Will definitely order again.', image: '👨‍🍳' },
                { name: 'Emma Davis', rating: 4, text: 'Best catering service in town! The staff was professional and the food delicious.', image: '👩‍🍳' },
                { name: 'James Wilson', rating: 5, text: 'Made our wedding reception perfect. Guests are still talking about the food!', image: '👨‍🍳' }
            ];

            // ===== GENERATE FOOD GRID =====
            const foodGrid = document.querySelector('.food-grid');
            foodItems.forEach(item => {
                const foodCard = document.createElement('div');
                foodCard.className = 'food-card reveal';
                foodCard.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="food-image" loading="lazy">
                    <div class="food-info">
                        <h3 class="food-name">${item.name}</h3>
                        <p class="food-price">${item.price}</p>
                        <button class="add-to-cart-btn" data-item="${item.name}" data-price="${item.price}">
                            Add to Cart <i class="fas fa-plus"></i>
                        </button>
                    </div>
                `;
                foodGrid.appendChild(foodCard);
            });

            // ===== GENERATE TESTIMONIALS =====
            const testimonialTrack = document.getElementById('testimonialTrack');
            testimonials.forEach(t => {
                const stars = '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating);
                const testimonialCard = document.createElement('div');
                testimonialCard.className = 'testimonial-card';
                testimonialCard.innerHTML = `
                    <div class="testimonial-img">${t.image}</div>
                    <h3 class="testimonial-name">${t.name}</h3>
                    <div class="testimonial-rating">${stars}</div>
                    <p class="testimonial-text">"${t.text}"</p>
                `;
                testimonialTrack.appendChild(testimonialCard);
            });

            // ===== HERO SLIDER =====
            const sliderTrack = document.getElementById('sliderTrack');
            const slides = document.querySelectorAll('.slide');
            const prevBtn = document.getElementById('prevSlide');
            const nextBtn = document.getElementById('nextSlide');
            const dotsContainer = document.getElementById('sliderDots');
            let currentSlide = 0;
            let slideInterval;

            // Create dots
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.className = `dot ${index === 0 ? 'active' : ''}`;
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });

            const dots = document.querySelectorAll('.dot');

            function updateSlider() {
                sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
            }

            function nextSlide() {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlider();
            }

            function prevSlide() {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateSlider();
            }

            function goToSlide(index) {
                currentSlide = index;
                updateSlider();
            }

            // Auto slide
            function startAutoSlide() {
                slideInterval = setInterval(nextSlide, 5000);
            }

            function stopAutoSlide() {
                clearInterval(slideInterval);
            }

            // Event listeners
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoSlide();
                startAutoSlide();
            });

            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoSlide();
                startAutoSlide();
            });

            // Touch events for mobile
            let touchStartX = 0;
            let touchEndX = 0;

            sliderTrack.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoSlide();
            });

            sliderTrack.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                if (touchEndX < touchStartX) {
                    nextSlide();
                } else if (touchEndX > touchStartX) {
                    prevSlide();
                }
                startAutoSlide();
            });

            startAutoSlide();

            // ===== TESTIMONIALS SLIDER =====
            const testimonialSlides = document.querySelectorAll('.testimonial-card');
            const prevTestimonial = document.getElementById('prevTestimonial');
            const nextTestimonial = document.getElementById('nextTestimonial');
            let currentTestimonial = 0;

            function updateTestimonialSlider() {
                testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
            }

            nextTestimonial.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
                updateTestimonialSlider();
            });

            prevTestimonial.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
                updateTestimonialSlider();
            });

            // Auto slide testimonials
            setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
                updateTestimonialSlider();
            }, 6000);

            // ===== MODAL & ORDER FORM =====
            const modal = document.getElementById('orderModal');
            const cartIcon = document.getElementById('cartIcon');
            const closeModal = document.querySelector('.close-modal');
            const orderForm = document.getElementById('orderForm');
            const selectedItemInput = document.getElementById('selectedItem');
            const cartCount = document.getElementById('cartCount');
            let itemCount = 0;

            // Set minimum date for delivery
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('deliveryDate').min = today;

            // Open modal function
            function openOrderModal(itemName = '') {
                selectedItemInput.value = itemName || 'Select an item';
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }

            // Close modal function
            function closeModalFunc() {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }

            // Event listeners for opening modal
            document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const item = btn.dataset.item || btn.closest('[data-item]')?.dataset.item || 'Catering Item';
                    openOrderModal(item);
                    
                    // Increment cart count
                    itemCount++;
                    cartCount.textContent = itemCount;
                });
            });

            cartIcon.addEventListener('click', () => openOrderModal());

            closeModal.addEventListener('click', closeModalFunc);

            // Click outside modal to close
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModalFunc();
                }
            });

            // ===== WHATSAPP ORDER FORM =====
            orderForm.addEventListener('submit', (e) => {
                e.preventDefault();

                // Get form values
                const item = document.getElementById('selectedItem').value;
                const name = document.getElementById('customerName').value.trim();
                const phone = document.getElementById('customerPhone').value.trim();
                const quantity = document.getElementById('itemQuantity').value;
                const deliveryDate = document.getElementById('deliveryDate').value;
                const instructions = document.getElementById('specialInstructions').value.trim();

                // Simple validation
                if (!name || !phone) {
                    alert('Please fill in all required fields');
                    return;
                }

                if (!phone.match(/^[\d\s\+\-\(\)]{10,}$/)) {
                    alert('Please enter a valid phone number');
                    return;
                }

                // Format WhatsApp message
                const message = `🍽️ *New Catering Order*
────────────────
*Item:* ${item}
*Quantity:* ${quantity}
*Customer:* ${name}
*Phone:* ${phone}
*Delivery Date:* ${deliveryDate || 'Not specified'}
*Special Instructions:* ${instructions || 'None'}

Thank you for choosing Marvelan Delish!`;

                // WhatsApp URL (replace with actual caterer's number)
                const whatsappNumber = '+2348082926454';
                const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

                // Open WhatsApp
                window.open(whatsappURL, '_blank');

                // Close modal and reset form
                closeModalFunc();
                orderForm.reset();
                
                // Show success message
                alert('Order ready! You will be redirected to WhatsApp to confirm.');
            });

            // ===== NEWSLETTER FORM =====
            const newsletterForm = document.getElementById('newsletterForm');
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]').value;
                if (email && email.includes('@')) {
                    alert('Thank you for subscribing! You will receive our updates soon.');
                    newsletterForm.reset();
                } else {
                    alert('Please enter a valid email address');
                }
            });

            // ===== MOBILE MENU =====
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navMenu = document.querySelector('.nav-menu');

            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
                    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            });

            // Close mobile menu when clicking a link
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });

            // ===== SCROLL REVEAL ANIMATION =====
            const revealElements = document.querySelectorAll('.reveal');

            function checkReveal() {
                revealElements.forEach(element => {
                    const elementTop = element.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (elementTop < windowHeight - 100) {
                        element.classList.add('active');
                    }
                });
            }

            window.addEventListener('scroll', checkReveal);
            window.addEventListener('load', checkReveal);

            // ===== SMOOTH SCROLLING =====
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // ===== INITIAL REVEAL CHECK =====
            setTimeout(checkReveal, 100);
        });