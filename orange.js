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
        image: "./Assets/Featured masterpiece 2.jpg"
    },
    abstract: {
        title: "Abstract Expression",
        description: "Bold colors and dynamic forms create a powerful emotional journey. This abstract piece invites viewers to find their own meaning and connection.",
        image: "./Assets/TextOnPic20200507033819.jpg"
    },
    portraits: {
        title: "Human Connection",
        description: "At Orange Arts Our Exterior deco painting is one that embodies magnificence evokes a sense of grandeur and opulence capturing the essence of luxury and splendor through its intricate details and rich textures.",
        image: "./Assets/Gold house.jpg"
    },
    nature: {
        title: "Natural Harmony",
        description: "Celebrating the beauty of the natural world through vibrant landscapes and organic forms that inspire environmental consciousness.",
        image: "./Assets/Float.jpg"
    },
    digital: {
        title: "Interior Deco",
        description: "A focus on creating a cohesive, high-end aesthetic that reflects the homeowner's style and sophistication",
        image: "./Assets/Luxirous parlor.jpg"
    },
    sculpture: {
        title: "Three-Dimensional Art",
        description: "Sculptural works that challenge perception and space, creating tangible experiences that viewers can walk around and explore.",
        image: "./Assets/Guitar man.jpg"
    },
    mixed: {
        title: "Mixed Media Magic",
        description: "Combining various artistic mediums to create unique textures and visual experiences that transcend traditional boundaries.",
        image: "./Assets/Screenshot_20230807-191551_Lite.jpg"
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

    // Start the rolling animation for stats divs
    startStatsRollingAnimation();
});

// Rolling animation for stats divs
function startStatsRollingAnimation() {
    const statsDivs = document.querySelectorAll('.stats-item');
    if (statsDivs.length === 0) return;

    let currentIndex = 0;
    const animationDuration = 800; // ms per div
    const pauseDuration = 1000; // ms between animations

    function animateNextDiv() {
        if (currentIndex >= statsDivs.length) {
            // All divs have animated, reset and start over
            currentIndex = 0;
            setTimeout(animateNextDiv, pauseDuration * 2);
            return;
        }

        const currentDiv = statsDivs[currentIndex];
        
        // Roll forward animation
        currentDiv.style.transition = `transform ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        currentDiv.style.transform = 'translateY(-20px) rotateX(360deg)';
        
        setTimeout(() => {
            // Return to original position
            currentDiv.style.transform = 'translateY(0) rotateX(0deg)';
            
            setTimeout(() => {
                currentIndex++;
                setTimeout(animateNextDiv, pauseDuration);
            }, animationDuration);
        }, animationDuration);
    }

    // Start the animation sequence
    setTimeout(animateNextDiv, 2000); // Start after 2 seconds delay
}

// New function to roll the colored divs
function rollDivs() {
    const divs = document.querySelectorAll('.flex.-space-x-2 > div'); // Select the three divs
    let delay = 0;

    divs.forEach((div, index) => {
        setTimeout(() => {
            div.style.animation = 'rollForward 0.5s forwards';
            setTimeout(() => {
                div.style.animation = 'rollBack 0.5s forwards';
            }, 500); // Roll back after 0.5s
        }, delay);
        delay += 1000; // Delay each div's animation by 1 second
    });
}

// Call the rollDivs function when the page loads
document.addEventListener('DOMContentLoaded', rollDivs);
