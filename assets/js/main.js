// AuraBloom main script
// Handles: posts data, rendering, category filter, search, pagination, nav toggle, scroll-in animation.

const POSTS_PER_PAGE = 6;

const posts = [
  {
    id: 1,
    slug: 'soft-pastel-capsule-wardrobe',
    title: 'Soft City Chic: A Pastel Capsule Wardrobe That Still Feels Like You',
    category: 'Fashion & Accessories',
    dateISO: '2025-03-12',
    dateLabel: 'Mar 12, 2025',
    readTime: '7 min read',
    excerpt:
      'Build a realistic pastel capsule wardrobe that works for busy weekdays, slow Sundays, and everything in between — without replacing your whole closet.',
    heroImage:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80',
    tags: ['pastel style', 'capsule wardrobe', 'city outfits'],
    primaryProduct: 'Sand-rose crossbody bag & soft leather sneakers',
    detailUrl: 'post-soft-pastel-capsule-wardrobe.html',
  },
  {
    id: 2,
    slug: 'minimal-night-routine-sensitive-skin',
    title: 'Gentle Glow: A Minimalist Night Routine for Sensitive Skin',
    category: 'Health & Beauty',
    dateISO: '2025-05-03',
    dateLabel: 'May 3, 2025',
    readTime: '8 min read',
    excerpt:
      'A three-step routine that dials down redness and tightness, focusing on barrier-friendly formulas you can actually find at regular pharmacies.',
    heroImage: 'https://picsum.photos/seed/aurabloom-beauty/1000/700',
    tags: ['skincare', 'sensitive skin', 'night routine'],
    primaryProduct: 'Ceramide-rich cream & fragrance-free cleansing milk',
    detailUrl: 'post-gentle-glow-sensitive-skin.html',
  },
  {
    id: 3,
    slug: 'reading-nook-indoor-plants',
    title: 'Calm Corners: Creating a Reading Nook with Soft Light & Indoor Plants',
    category: 'Home & Garden',
    dateISO: '2025-06-21',
    dateLabel: 'Jun 21, 2025',
    readTime: '9 min read',
    excerpt:
      'Turn a spare corner into a tiny sanctuary with layered lighting, forgiving greenery, and a chair that hugs you instead of hurting your back.',
    heroImage:
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1000&q=80',
    tags: ['home styling', 'plants', 'reading nook'],
    primaryProduct: 'Cloud-back reading chair & low-maintenance potted plants',
    detailUrl: 'post-calm-corners-reading-nook.html',
  },
  {
    id: 4,
    slug: 'slow-weekend-coastal-town',
    title: 'Slow Weekends: 48 Hours in a Small Coastal Town (Without Rushing)',
    category: 'Travel & Stays',
    dateISO: '2025-08-09',
    dateLabel: 'Aug 9, 2025',
    readTime: '10 min read',
    excerpt:
      'A gentle itinerary with seaside walks, café stops, and one beautiful stay that feels like borrowing a friend’s beach house.',
    heroImage:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=80',
    tags: ['slow travel', 'weekend trip', 'coastal stays'],
    primaryProduct: 'Small seaside guesthouse & canvas weekender bag',
    detailUrl: 'post-slow-weekend-coastal-town.html',
  },
  {
    id: 5,
    slug: 'budgeting-for-little-luxuries',
    title: 'Budgeting for Little Luxuries: Café Dates Without the Guilt',
    category: 'Finance & Insurance, Food & Beverage',
    dateISO: '2025-10-02',
    dateLabel: 'Oct 2, 2025',
    readTime: '8 min read',
    excerpt:
      'A simple “treat budget” that makes room for matcha lattes, soft cakes, and cozy coffee shop days while your savings still quietly grow.',
    heroImage:
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1000&q=80',
    tags: ['budgeting', 'coffee', 'everyday joy'],
    primaryProduct: 'App-based budgeting tool & café-at-home coffee setup',
    detailUrl: 'post-budgeting-little-luxuries.html',
  },
  {
    id: 6,
    slug: 'collaborate-with-creators-easily',
    title: 'Collaborate with Creators Easily',
    category: 'Marketing & Business',
    dateISO: '2024-10-03',
    dateLabel: 'Oct 3, 2024',
    readTime: '9 min read',
    excerpt:
      'How TikTok Business Center streamlines collaboration with creators, unifies assets, and gives you the data clarity to grow faster together.',
    heroImage:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1000&h=700&fit=crop',
    tags: ['TikTok', 'creator marketing', 'collaboration'],
    primaryProduct: 'TikTok Business Center collaboration tools',
    detailUrl: 'collaborate-with-creators.html',
  },
  {
    id: 7,
    slug: 'realtime-bus-tracking',
    title: 'Real-Time Bus Tracking Maakt Reizen Stressvrij',
    category: 'Travel & Stays',
    dateISO: '2024-10-03',
    dateLabel: '3 okt 2024',
    readTime: '8 min lezen',
    excerpt:
      'Ontdek hoe real-time bus tracking technologieën het openbaar vervoer transformeren en reizigers de gemoedsrust geven die ze verdienen tijdens hun dagelijkse reizen.',
    heroImage:
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
    tags: ['bus tracking', 'travel technology', 'stress-free travel'],
    primaryProduct: 'Real-time bus tracking app & reisplanning tools',
    detailUrl: 'post-realtime-bus-tracking.html',
  },
];

let currentPage = 1;
let currentCategory = 'all';
let currentSearch = '';

function getFilteredPosts() {
  return posts.filter((post) => {
    const matchCategory =
      currentCategory === 'all' || post.category.includes(currentCategory);
    const search = currentSearch.trim().toLowerCase();
    const matchSearch =
      !search ||
      post.title.toLowerCase().includes(search) ||
      post.excerpt.toLowerCase().includes(search) ||
      post.primaryProduct.toLowerCase().includes(search) ||
      post.tags.some((t) => t.toLowerCase().includes(search));
    return matchCategory && matchSearch;
  });
}

function renderPosts() {
  const grid = document.getElementById('postsGrid');
  const paginationEl = document.getElementById('pagination');
  if (!grid || !paginationEl) return;

  const filtered = getFilteredPosts().sort(
    (a, b) => new Date(b.dateISO) - new Date(a.dateISO)
  );
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const pageItems = filtered.slice(start, start + POSTS_PER_PAGE);

  document.getElementById('resultsCount').textContent = String(total);

  grid.innerHTML = '';
  if (pageItems.length === 0) {
    grid.innerHTML =
      '<p style="grid-column:1/-1;font-size:0.9rem;color:#8c7a71;">No stories match this search yet. Try a softer keyword.</p>';
  } else {
    for (const post of pageItems) {
      const card = document.createElement('article');
      card.className = 'ab-post-card ab-fade-in';
      card.innerHTML = `
        <a class="ab-post-card-inner" href="${post.detailUrl}" aria-label="Open: ${post.title}">
          <div class="ab-post-thumb">
            <img src="${post.heroImage}" alt="${post.title}" loading="lazy" />
            <span class="ab-post-badge">${post.category}</span>
          </div>
          <div class="ab-post-date">${post.dateLabel}</div>
          <h3 class="ab-post-title">${post.title}</h3>
          <p class="ab-post-excerpt">${post.excerpt}</p>
          <div class="ab-post-meta-row">
            <div class="ab-post-tags">
              ${post.tags
                .slice(0, 2)
                .map((tag) => `<span class="ab-tag">${tag}</span>`)
                .join('')}
            </div>
            <div class="ab-post-read">${post.readTime}</div>
          </div>
          <div class="ab-post-actions">
            <span class="ab-link-soft">
              Read story <span>↗</span>
            </span>
            <span class="ab-chip-soft">${post.primaryProduct}</span>
          </div>
        </a>
      `;
      grid.appendChild(card);
    }
  }

  // Pagination
  paginationEl.innerHTML = '';
  if (totalPages > 1) {
    const prevBtn = document.createElement('button');
    prevBtn.className = 'ab-page-btn';
    prevBtn.textContent = '‹';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage -= 1;
        renderPosts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    paginationEl.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i += 1) {
      const btn = document.createElement('button');
      btn.className = 'ab-page-btn' + (i === currentPage ? ' is-active' : '');
      btn.textContent = String(i);
      btn.addEventListener('click', () => {
        if (currentPage !== i) {
          currentPage = i;
          renderPosts();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
      paginationEl.appendChild(btn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = 'ab-page-btn';
    nextBtn.textContent = '›';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage += 1;
        renderPosts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    paginationEl.appendChild(nextBtn);
  }

  triggerScrollAnimations();
}

function setupCategoryChips() {
  const chips = document.querySelectorAll('#categoryChips .ab-chip');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      currentCategory = chip.getAttribute('data-category') || 'all';
      currentPage = 1;
      renderPosts();
    });
  });
}

function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  searchInput.addEventListener('input', () => {
    currentSearch = searchInput.value || '';
    currentPage = 1;
    renderPosts();
  });
}

function setupNavToggle() {
  const toggle = document.querySelector('.ab-nav-toggle');
  const nav = document.querySelector('.ab-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      nav.classList.remove('is-open');
    }
  });
}

function triggerScrollAnimations() {
  const items = document.querySelectorAll('.ab-fade-in');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => observer.observe(el));
  } else {
    items.forEach((el) => el.classList.add('is-visible'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupCategoryChips();
  setupSearch();
  setupNavToggle();
  renderPosts();
});


