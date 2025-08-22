
        // Page visit counter
        let pageVisits = parseInt(localStorage.getItem('orangeArtVisits') || '0') + 1;
        localStorage.setItem('orangeArtVisits', pageVisits.toString());
        document.getElementById('pageVisits').textContent = pageVisits.toLocaleString();

        // Love system
        const loveData = JSON.parse(localStorage.getItem('orangeArtLoves') || '{}');
        let currentArtId = '';

        // Art data with placeholder images
        const artData = {
            featured: {
                title: "Featured Masterpiece",
                description: "A stunning digital composition that blends traditional techniques with modern innovation. This piece represents the evolution of contemporary art in the digital age.",
                image: "https://via.placeholder.com/500x500/F4A261/FFFFFF?text=Featured+Masterpiece"
            },
            abstract: {
                title: "Abstract Expression",
                description: "Bold colors and dynamic forms create a powerful emotional journey. This abstract piece invites viewers to find their own meaning and connection.",
                image: "https://via.placeholder.com/500x500/E85A4F/FFFFFF?text=Abstract+Expression"
            },
            portraits: {
                title: "Human Connection",
                description: "Capturing the essence of humanity through detailed portraiture. Each brushstroke tells a story of emotion and character.",
                image: "https://via.placeholder.com/500x500/3B82F6/FFFFFF?text=Human+Connection"
            },
            nature: {
                title: "Natural Harmony",
                description: "Celebrating the beauty of the natural world through vibrant landscapes and organic forms that inspire environmental consciousness.",
                image: "https://via.placeholder.com/500x500/10B981/FFFFFF?text=Natural+Harmony"
            },
            digital: {
                title: "Digital Innovation",
                description: "Pushing the boundaries of digital art with cutting-edge techniques and immersive visual experiences.",
                image: "https://via.placeholder.com/500x500/8B5CF6/FFFFFF?text=Digital+Innovation"
            },
            sculpture: {
                title: "Three-Dimensional Art",
                description: "Sculptural works that challenge perception and space, creating tangible experiences that viewers can walk around and explore.",
                image: "https://via.placeholder.com/500x500/F59E0B/FFFFFF?text=3D+Sculpture"
            },
            mixed: {
                title: "Mixed Media Magic",
                description: "Combining various artistic mediums to create unique textures and visual experiences that transcend traditional boundaries.",
                image: "https://via.placeholder.com/500x500/EC4899/FFFFFF?text=Mixed+Media+Magic"
            }
        };

        function updateLoveDisplay(artId) {
            const count = loveData[artId] || 0;
            const elements = document.querySelectorAll(`[onclick*="${artId}"] .love-count`);
            const modalCount = document.querySelector('#artModal .love-count');
            
            elements.forEach(el => el.textContent = count);
            if (modalCount && currentArtId === artId) {
                modalCount.textContent = count;
            }

            // Update love icon color
            const icons = document.querySelectorAll(`[onclick*="${artId}"] .love-icon`);
            const modalIcon = document.querySelector('#artModal .love-icon');
            
            icons.forEach(icon => {
                icon.textContent = count > 0 ? '❤️' : '🤍';
            });
            if (modalIcon && currentArtId === artId) {
                modalIcon.textContent = count > 0 ? '❤️' : '🤍';
            }
        }

        function handleLove(event, artId) {
            event.stopPropagation();
            
            // Create floating heart animation
            const rect = event.target.getBoundingClientRect();
            const heart = document.createElement('div');
            heart.className = 'floating-heart love-animation';
            heart.textContent = '❤️';
            heart.style.left = rect.left + 'px';
            heart.style.top = rect.top + 'px';
            document.body.appendChild(heart);
            
            setTimeout(() => {
                document.body.removeChild(heart);
            }, 800);

            // Update count
            loveData[artId] = (loveData[artId] || 0) + 1;
            localStorage.setItem('orangeArtLoves', JSON.stringify(loveData));
            
            updateLoveDisplay(artId);
            
            // Add bounce animation to the clicked element
            event.target.classList.add('smooth-bounce');
            setTimeout(() => {
                event.target.classList.remove('smooth-bounce');
            }, 600);
        }

        function openArtModal(artId) {
            const data = artData[artId];
            currentArtId = artId;
            
            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('modalDescription').textContent = data.description;
            document.getElementById('modalImage').innerHTML = `
                <img src="${data.image}" 
                     alt="${data.title}" 
                     class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            `;
            
            updateLoveDisplay(artId);
            
            document.getElementById('artModal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            document.getElementById('artModal').classList.add('hidden');
            document.body.style.overflow = '';
            currentArtId = '';
        }

        function getCurrentArtId() {
            return currentArtId;
        }

        // Initialize love displays
        Object.keys(artData).forEach(artId => {
            updateLoveDisplay(artId);
        });

        // Add relative positioning to art categories for love buttons
        document.querySelectorAll('.art-category').forEach(category => {
            category.classList.add('relative', 'group');
        });

        // Close modal on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });

        // Smooth scrolling and loading animations
        document.addEventListener('DOMContentLoaded', function() {
            const elements = document.querySelectorAll('.card-hover');
            elements.forEach((element, index) => {
                element.style.animationDelay = `${index * 0.1}s`;
                element.classList.add('fade-in');
            });
        });
