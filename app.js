/**
 * MANGO Hair Studio — Interactive Atelier, Mobile 2s Triptych Loop & Live Google Reviews
 */

(() => {
  'use strict';

  /* ==========================================================================
     1. MOBILE 2-SECOND HERO TRIPTYCH LOOP
     Starts with Middle photo (index 0: Front View) and fades into the next one
     every 2.0 seconds (2000ms), looping continuously: Front (0) -> Back (1) -> Side (2)
     ========================================================================== */
  const panels = Array.from(document.querySelectorAll('.triptych-panel'));
  const dots = Array.from(document.querySelectorAll('.triptych-dot'));
  let currentMobileSlide = 0; // 0 = Middle (Front View), 1 = Left (Back View), 2 = Right (Side Pose)
  let mobileSlideTimer = null;

  function setMobileSlide(targetIndex) {
    currentMobileSlide = ((targetIndex % 3) + 3) % 3;
    panels.forEach((panel) => {
      const idx = Number(panel.getAttribute('data-slide-index'));
      panel.classList.toggle('is-mobile-active', idx === currentMobileSlide);
    });
    dots.forEach((dot) => {
      const idx = Number(dot.getAttribute('data-target-slide'));
      dot.classList.toggle('is-active', idx === currentMobileSlide);
    });
  }

  function startMobileHeroLoop() {
    if (mobileSlideTimer) clearInterval(mobileSlideTimer);
    mobileSlideTimer = setInterval(() => {
      setMobileSlide(currentMobileSlide + 1);
    }, 2000);
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = Number(dot.getAttribute('data-target-slide'));
      setMobileSlide(idx);
      startMobileHeroLoop();
    });
  });

  setMobileSlide(0);
  startMobileHeroLoop();

  /* ==========================================================================
     2. EXACT SERVICES & PRICES FROM MANGOBEAUTY.US
     (/for-women/, /for-men/, /for-kids/)
     ========================================================================== */
  const SERVICES_DATA = {
    women: {
      badge: 'For Women',
      heroImg: 'assets/images/original/wp_Kerastase_Genesis_2.jpg',
      quote: '“We do our best to make you look gorgeous, from hair coloring, straightening to extensions.”',
      categories: [
        {
          name: 'Haircut',
          items: [
            { id: 'w-cut-1', name: 'Cut & Blow Dry', priceText: 'starting at $90', amount: 90 },
            { id: 'w-cut-2', name: 'Cut & Blow Dry Textured Hair with Style', priceText: 'starting at $150', amount: 150 }
          ]
        },
        {
          name: 'Blow Dry & Style',
          items: [
            { id: 'w-bd-1', name: 'Blow Dry', priceText: 'starting at $50', amount: 50 },
            { id: 'w-bd-2', name: 'Blow Dry Textured Hair with Style', priceText: 'starting at $110', amount: 110 },
            { id: 'w-bd-3', name: 'Add Flat Iron / Curling Iron', priceText: 'starting at $20', amount: 20 },
            { id: 'w-bd-4', name: 'Blow Dry with Extensions', priceText: 'starting at $75', amount: 75 }
          ]
        },
        {
          name: 'Up-do',
          items: [
            { id: 'w-up-1', name: 'Bridal Up-do', priceText: 'by consultation', amount: 0 },
            { id: 'w-up-2', name: 'Up-do / Event Styling', priceText: 'starting at $110', amount: 110 }
          ]
        },
        {
          name: 'Treatments',
          items: [
            { id: 'w-tr-1', name: 'Brazilian Blowout', priceText: 'starting at $315', amount: 315 },
            { id: 'w-tr-2', name: 'Brazilian Rewind Treatment', priceText: 'starting at $65', amount: 65 },
            { id: 'w-tr-3', name: 'B3 Brazilian Bond Builder', priceText: 'starting at $75', amount: 75 },
            { id: 'w-tr-4', name: 'Brazilian Split Ends Treatment with Flat Iron', priceText: 'starting at $65', amount: 65 },
            { id: 'w-tr-5', name: 'Deep Conditioning Treatment', priceText: 'starting at $35', amount: 35 },
            { id: 'w-tr-6', name: 'Keratin Treatment', priceText: 'starting at $300', amount: 300 },
            { id: 'w-tr-7', name: 'Collagen Treatment (BOTO Hair)', priceText: 'starting at $215', amount: 215 },
            { id: 'w-tr-8', name: 'Kérastase Fusio-Dose', priceText: 'starting at $50', amount: 50 },
            { id: 'w-tr-9', name: 'Kérastase Mask', priceText: 'starting at $35', amount: 35 },
            { id: 'w-tr-10', name: 'Kérastase Gloss Treatment', priceText: 'starting at $60', amount: 60 },
            { id: 'w-tr-11', name: 'Kérastase Premier Treatment', priceText: 'starting at $65', amount: 65 },
            { id: 'w-tr-12', name: 'Kérastase Scalp Treatment', priceText: 'starting at $35', amount: 35 },
            { id: 'w-tr-13', name: 'Kérastase Fusio-Dose & Mask', priceText: 'starting at $75', amount: 75 },
            { id: 'w-tr-14', name: 'Bellami Treatment (Bond Fusion System)', priceText: 'starting at $75', amount: 75 }
          ]
        },
        {
          name: 'Color',
          items: [
            { id: 'w-col-1', name: 'Color Roots (1 inch)', priceText: 'starting at $85', amount: 85 },
            { id: 'w-col-2', name: 'Color Melt', priceText: 'starting at $105', amount: 105 },
            { id: 'w-col-3', name: 'Full Color', priceText: 'starting at $135', amount: 135 },
            { id: 'w-col-4', name: 'Platinum Retouch on Scalp Bleach & Toner', priceText: 'starting at $290', amount: 290 },
            { id: 'w-col-5', name: 'Full Hi-Lights', priceText: 'starting at $230', amount: 230 },
            { id: 'w-col-6', name: 'Partial Hi-Lights', priceText: 'starting at $175', amount: 175 },
            { id: 'w-col-7', name: 'Babylights', priceText: 'starting at $300', amount: 300 },
            { id: 'w-col-8', name: 'Partial Babylights', priceText: 'starting at $250', amount: 250 },
            { id: 'w-col-9', name: 'Air Touch Full', priceText: 'starting at $300', amount: 300 },
            { id: 'w-col-10', name: 'Air Touch Partial', priceText: 'starting at $250', amount: 250 },
            { id: 'w-col-11', name: 'Full Balayage', priceText: 'starting at $275', amount: 275 },
            { id: 'w-col-12', name: 'Partial Balayage', priceText: 'starting at $220', amount: 220 },
            { id: 'w-col-13', name: 'OMBRE', priceText: 'starting at $275', amount: 275 },
            { id: 'w-col-14', name: 'Toner', priceText: 'starting at $70', amount: 70 },
            { id: 'w-col-15', name: 'Frame Highlight', priceText: 'starting at $125', amount: 125 },
            { id: 'w-col-16', name: 'Fantasy Color', priceText: 'starting at $135', amount: 135 },
            { id: 'w-col-17', name: 'Color Correction', priceText: 'Upon Consultation', amount: 0 },
            { id: 'w-col-18', name: 'Lowlights', priceText: 'starting at $125', amount: 125 }
          ]
        },
        {
          name: 'Hair extensions',
          items: [
            { id: 'w-ext-1', name: 'Hair Extensions', priceText: 'Upon Consultation', amount: 0 }
          ]
        }
      ]
    },
    men: {
      badge: 'For Men',
      heroImg: 'assets/images/original/wp_Kerastase_GenesisHomme_1.jpg',
      quote: '“Men want to be stylish too.”',
      categories: [
        {
          name: 'Services for Men',
          items: [
            { id: 'm-1', name: 'Cut & Style', priceText: 'starting at $60', amount: 60 },
            { id: 'm-2', name: 'Cut & Gray Blending Color', priceText: 'starting at $110', amount: 110 }
          ]
        }
      ]
    },
    kids: {
      badge: 'For Kids (10 & under)',
      heroImg: 'assets/images/original/wp_Fusio-Dose-2.jpg',
      quote: '“Discover all the best haircuts for kids” (10 & under)',
      categories: [
        {
          name: 'Services for Children (10 & under)',
          items: [
            { id: 'k-1', name: 'Girls Haircut with Blow Dry', priceText: 'starting at $90', amount: 90 },
            { id: 'k-2', name: 'Add Flat Iron / Curling Iron', priceText: 'starting at $20', amount: 20 },
            { id: 'k-3', name: 'Boys Cut & Style', priceText: 'starting at $60', amount: 60 }
          ]
        }
      ]
    }
  };

  let activeAudience = 'women';
  let activeWomenCategory = 'all';
  const selectedEstimateItems = new Map();

  const audienceHeroImg = document.getElementById('audienceHeroImg');
  const audienceBadge = document.getElementById('audienceBadge');
  const audienceQuote = document.getElementById('audienceQuote');
  const womenCategoryBar = document.getElementById('womenCategoryBar');
  const serviceLedgerContainer = document.getElementById('serviceLedgerContainer');
  const estimatorList = document.getElementById('estimatorList');
  const estimatorTotal = document.getElementById('estimatorTotal');
  const clearEstimatorBtn = document.getElementById('clearEstimatorBtn');

  function renderServices() {
    const data = SERVICES_DATA[activeAudience];
    if (!data || !serviceLedgerContainer) return;

    if (audienceHeroImg) {
      audienceHeroImg.src = data.heroImg;
      audienceHeroImg.alt = `${data.badge} — MANGO Hair Studio`;
    }
    if (audienceBadge) audienceBadge.textContent = data.badge;
    if (audienceQuote) audienceQuote.textContent = data.quote;

    if (womenCategoryBar) {
      womenCategoryBar.style.display = activeAudience === 'women' ? 'flex' : 'none';
    }

    const catsToShow = activeAudience === 'women' && activeWomenCategory !== 'all'
      ? data.categories.filter((c) => c.name === activeWomenCategory)
      : data.categories;

    serviceLedgerContainer.innerHTML = catsToShow
      .map((cat) => {
        const rowsHtml = cat.items
          .map((item) => {
            const isSelected = selectedEstimateItems.has(item.id);
            return `
              <div class="service-row">
                <span class="service-row__name">${item.name}</span>
                <div class="service-row__right">
                  <span class="service-row__price">${item.priceText}</span>
                  <button
                    type="button"
                    class="service-row__add ${isSelected ? 'is-selected' : ''}"
                    data-service-id="${item.id}"
                    data-service-name="${item.name}"
                    data-service-price="${item.priceText}"
                    data-service-amount="${item.amount}"
                    title="${isSelected ? 'Remove from estimate' : 'Add to estimate'}"
                    aria-label="${isSelected ? 'Remove' : 'Add'} ${item.name}"
                  >${isSelected ? '✓' : '+'}</button>
                </div>
              </div>
            `;
          })
          .join('');

        return `
          <article class="service-group">
            <div class="service-group__head">
              <h3 class="service-group__title">${cat.name}</h3>
              <span class="service-group__count">${cat.items.length} ${cat.items.length === 1 ? 'Service' : 'Services'}</span>
            </div>
            <div class="service-rows">
              ${rowsHtml}
            </div>
          </article>
        `;
      })
      .join('');
  }

  function renderEstimator() {
    if (!estimatorList || !estimatorTotal) return;
    if (selectedEstimateItems.size === 0) {
      estimatorList.innerHTML = '<p class="estimator-tray__empty">Tap any service on the right to build a price estimate before booking.</p>';
      estimatorTotal.textContent = '$0';
      if (clearEstimatorBtn) clearEstimatorBtn.hidden = true;
      return;
    }

    if (clearEstimatorBtn) clearEstimatorBtn.hidden = false;
    let sum = 0;
    let hasConsultation = false;
    const html = [];

    selectedEstimateItems.forEach((val, id) => {
      sum += val.amount;
      if (val.amount === 0) hasConsultation = true;
      html.push(`
        <div class="estimator-item">
          <span>${val.name} <small>(${val.priceText})</small></span>
          <button type="button" class="estimator-item__remove" data-remove-id="${id}" aria-label="Remove ${val.name}">×</button>
        </div>
      `);
    });

    estimatorList.innerHTML = html.join('');
    estimatorTotal.textContent = sum > 0
      ? `$${sum}${hasConsultation ? ' + Consultation' : '+'}`
      : 'Upon Consultation';
  }

  document.querySelectorAll('.audience-pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.audience-pill').forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      activeAudience = btn.getAttribute('data-audience') || 'women';
      renderServices();
    });
  });

  document.querySelectorAll('.swatch-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.swatch-chip').forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      activeWomenCategory = chip.getAttribute('data-cat') || 'all';
      renderServices();
    });
  });

  if (serviceLedgerContainer) {
    serviceLedgerContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.service-row__add');
      if (!btn) return;
      const id = btn.getAttribute('data-service-id');
      if (selectedEstimateItems.has(id)) {
        selectedEstimateItems.delete(id);
      } else {
        selectedEstimateItems.set(id, {
          name: btn.getAttribute('data-service-name'),
          priceText: btn.getAttribute('data-service-price'),
          amount: Number(btn.getAttribute('data-service-amount') || 0)
        });
      }
      renderServices();
      renderEstimator();
    });
  }

  if (estimatorList) {
    estimatorList.addEventListener('click', (e) => {
      const rm = e.target.closest('.estimator-item__remove');
      if (!rm) return;
      const id = rm.getAttribute('data-remove-id');
      selectedEstimateItems.delete(id);
      renderServices();
      renderEstimator();
    });
  }

  if (clearEstimatorBtn) {
    clearEstimatorBtn.addEventListener('click', () => {
      selectedEstimateItems.clear();
      renderServices();
      renderEstimator();
    });
  }

  renderServices();
  renderEstimator();

  /* ==========================================================================
     3. LIVE GOOGLE MAPS REVIEWS LOADER & AUTO-UPDATER
     Pulls live from /api/google-reviews.php (which queries Google Maps RPC
     directly for Mango Hair Studio Lake Nona) and falls back to data/google-reviews.json
     ========================================================================== */
  const googleReviewsDeck = document.getElementById('googleReviewsDeck');
  const liveGoogleRating = document.getElementById('liveGoogleRating');
  const liveGoogleTotal = document.getElementById('liveGoogleTotal');
  const heroReviewCount = document.getElementById('heroReviewCount');
  const navReviewRating = document.getElementById('navReviewRating');
  const liveSyncText = document.getElementById('liveSyncText');

  let allGoogleReviews = [];
  let activeReviewFilter = 'all';

  function getInitials(name) {
    return (name || 'G')
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p.charAt(0).toUpperCase())
      .join('');
  }

  function filterReviewItem(rev, filter) {
    if (filter === 'all') return true;
    if (filter === 'photos') return Array.isArray(rev.photos) && rev.photos.length > 0;
    const t = (rev.text || '').toLowerCase();
    if (filter === 'color') {
      return /color|balayage|highlight|blonde|tone|root|dye|ash|copper/.test(t);
    }
    if (filter === 'cut') {
      return /cut|blow|style|layer|curl|wash|massage|trim/.test(t);
    }
    return true;
  }

  function renderReviewsDeck() {
    if (!googleReviewsDeck) return;
    const filtered = allGoogleReviews.filter((r) => filterReviewItem(r, activeReviewFilter));

    googleReviewsDeck.innerHTML = filtered
      .map((rev) => {
        const stars = '★'.repeat(Math.max(1, Math.min(5, Number(rev.rating) || 5)));
        const avatarHtml = rev.avatar
          ? `<img src="${rev.avatar}" alt="${rev.reviewerName}" class="review-card__avatar" width="42" height="42" loading="lazy" />`
          : `<span class="review-card__avatar">${getInitials(rev.reviewerName)}</span>`;

        const photosHtml = Array.isArray(rev.photos) && rev.photos.length > 0
          ? `<div class="review-card__photos">
              ${rev.photos
                .map(
                  (ph, i) => `
                  <button type="button" class="review-photo-thumb" data-lightbox-src="${ph}" data-lightbox-caption="Google Review Photo by ${rev.reviewerName} · MANGO Hair Studio">
                    <img src="${ph}" alt="Hair photo by ${rev.reviewerName} (${i + 1})" width="96" height="96" loading="lazy" />
                  </button>`
                )
                .join('')}
            </div>`
          : '';

        return `
          <article class="review-card">
            <div>
              <div class="review-card__head">
                <div class="review-card__user">
                  ${avatarHtml}
                  <div>
                    <div class="review-card__name">${rev.reviewerName}</div>
                    <div class="review-card__meta">${rev.relativeDate || 'Recent'} · ${rev.badge || 'Google Review'}</div>
                  </div>
                </div>
                <div class="review-card__stars" aria-label="${rev.rating} stars">${stars}</div>
              </div>
              <p class="review-card__text" style="margin-top:12px;">${rev.text || ''}</p>
            </div>
            ${photosHtml}
          </article>
        `;
      })
      .join('');
  }

  async function loadLiveGoogleReviews() {
    const endpoints = ['api/google-reviews.php', 'data/google-reviews.json'];
    for (const url of endpoints) {
      try {
        const resp = await fetch(url, { cache: 'no-store' });
        if (!resp.ok) continue;
        const data = await resp.json();
        if (data && Array.isArray(data.reviews) && data.reviews.length > 0) {
          allGoogleReviews = data.reviews;
          if (data.rating) {
            if (liveGoogleRating) liveGoogleRating.textContent = Number(data.rating).toFixed(1);
            if (navReviewRating) navReviewRating.textContent = `${Number(data.rating).toFixed(1)}★`;
          }
          if (data.totalReviews) {
            if (liveGoogleTotal) liveGoogleTotal.textContent = data.totalReviews;
            if (heroReviewCount) heroReviewCount.textContent = data.totalReviews;
          }
          if (liveSyncText && data.liveSync && data.liveSync.status === 'connected') {
            liveSyncText.textContent = 'Connected Live to Google Maps · Auto-Updating';
          }
          renderReviewsDeck();
          return;
        }
      } catch (_) {
        // Fallback to next endpoint
      }
    }
  }

  document.querySelectorAll('.review-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.review-filter-btn').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeReviewFilter = btn.getAttribute('data-filter') || 'all';
      renderReviewsDeck();
    });
  });

  loadLiveGoogleReviews();
  // Auto-refresh from Google Maps endpoint every 3 minutes
  setInterval(loadLiveGoogleReviews, 180000);

  /* ==========================================================================
     4. LIGHTBOX VIEWER FOR ALL HAIR & REVIEW PHOTOS
     ========================================================================== */
  const hairLightbox = document.getElementById('hairLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-lightbox-src]');
    if (!trigger || !hairLightbox || !lightboxImg) return;
    const src = trigger.getAttribute('data-lightbox-src');
    const cap = trigger.getAttribute('data-lightbox-caption') || '';
    lightboxImg.src = src;
    lightboxImg.alt = cap;
    if (lightboxCaption) lightboxCaption.textContent = cap;
    if (typeof hairLightbox.showModal === 'function') {
      hairLightbox.showModal();
    } else {
      hairLightbox.setAttribute('open', '');
    }
  });

  if (closeLightboxBtn && hairLightbox) {
    closeLightboxBtn.addEventListener('click', () => hairLightbox.close());
    hairLightbox.addEventListener('click', (e) => {
      if (e.target === hairLightbox) hairLightbox.close();
    });
  }
})();
