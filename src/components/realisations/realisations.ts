import gsap from 'gsap';

  const floatingZone    = document.getElementById('floating-zone')!;
  const expansionZone   = document.getElementById('expansion-zone')!;
  const expansionBorder = document.getElementById('expansion-border')!;
  const expansionInner  = document.getElementById('expansion-inner')!;
  const closeBtn        = document.getElementById('close-btn')!;

  const positions: Record<number, { top: string, left: string }> = {
    0: { top: '20px', left: '0%' },
    1: { top: '20px', left: '26%' },
    2: { top: '20px', left: '52%' },
    3: { top: '20px', left: '76%' },
  };

  let currentCategory = '';
  let activeCard: HTMLElement | null = null;
  let isOpen = false;

  function openCategory(category: string, clickedCard: HTMLElement) {
    if (isOpen) return;
    isOpen = true;
    currentCategory = category;
    activeCard = clickedCard;

    const otherCards = [...document.querySelectorAll<HTMLElement>('.floating-card')]
      .filter(c => c !== clickedCard);

    // Stoppe l'animation CSS de flottement et nettoie les transforms
    gsap.killTweensOf(clickedCard);
    clickedCard.style.animation = 'none';
    gsap.set(clickedCard, { clearProps: 'transform' });

    // ── TEMPS 1 — Scale in carte principale + fade/scale out des autres ──
    const t1 = gsap.timeline({
      onComplete: () => {
        const t2 = gsap.timeline();

        const cover  = clickedCard.querySelector<HTMLElement>('.folder-cover')!;
        const papers = clickedCard.querySelectorAll<HTMLElement>('.folder-paper');

        // 1. Déplacement
        if (!isMobile()) {
          t2.to(clickedCard, {
            top: 0, left: 0, rotation: 0,
            duration: 0.35, ease: 'power3.out',
          }, 0);

          t2.to(cover, {
            rotateX: -30, duration: 0.4, ease: 'power2.out',
          }, 0.25);

          t2.to(papers, {
            opacity: 1, y: 0, duration: 0.3,
            ease: 'back.out(1.5)', stagger: 0.1,
          }, 0.4);
        }

        // 2. Affiche la zone — timing adapté
        const zoneDelay = isMobile() ? 0 : 0.65;

        t2.call(() => {
          floatingZone.classList.add('collapsed');
          expansionZone.style.transition = 'none';
          expansionZone.classList.add('active');
          expansionZone.removeAttribute('aria-hidden');
          gsap.set(expansionZone, { opacity: 1 });
          gsap.set(expansionInner, { opacity: 0 });
          document.querySelectorAll('.grid-panel').forEach(p => p.classList.remove('active'));
          document.querySelector(`[data-grid="${category}"]`)?.classList.add('active');

          // Scroll vers le début de la section sur mobile
          if (isMobile()) {
            const section = document.getElementById('realisations');
            if (section) {
              section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }, [], zoneDelay);

        t2.set(expansionBorder, { opacity: 1 }, zoneDelay);
        t2.fromTo(expansionBorder,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 0.3, ease: 'power2.out' },
          zoneDelay
        );

        t2.to(expansionInner, { opacity: 1, duration: 0.1 }, zoneDelay + 0.25);

        t2.call(() => {
          const cards = expansionInner.querySelectorAll<HTMLElement>(
            '.banner-card, .email-card, .site-card, .game-card'
          );
          gsap.set(cards, { opacity: 0, y: 12 });
          gsap.to(cards, {
            opacity: 1, y: 0,
            duration: 0.2, ease: 'power2.out', stagger: 0.04,
            onComplete: () => attachIframeEvents(),
          });
        }, [], zoneDelay + 0.27);

        t2.to(closeBtn, { opacity: 1, duration: 0.15 }, zoneDelay + 0.4);
        t2.call(() => closeBtn.classList.add('visible'), [], zoneDelay + 0.4);
      }
    });

    t1.to(clickedCard, {
      scale: 1.1,
      duration: 0.18,
      ease: 'back.out(1.5)',
    });

    t1.to(otherCards, {
      opacity: 0,
      scale: 0.8,
      duration: 0.2,
      ease: 'power2.in',
      pointerEvents: 'none',
    }, 0);

    // Pause entre les 2 temps
    t1.to({}, { duration: 0.05 });
  }

  function closeCategory() {
    if (!isOpen || !activeCard) return;

    // Reset des cartes avant fermeture
    const cards = expansionInner.querySelectorAll<HTMLElement>(
      '.banner-card, .email-card, .site-card, .game-card'
    );
    gsap.set(cards, { opacity: 0, y: 12 });
    // Retire le flag bound pour pouvoir réattacher les events à la réouverture
    cards.forEach(c => delete (c as HTMLElement).dataset.bound);

    const hint = activeCard.querySelector<HTMLElement>('.floating-hint');
    if (hint) hint.textContent = hint.dataset.openLabel ?? 'Explorer →';

    const t = gsap.timeline({
      onComplete: () => {
        isOpen = false;
        currentCategory = '';
        activeCard = null;
      }
    });

    // Cache le contenu
    t.to(expansionInner, { opacity: 0, y: 8, duration: 0.2, ease: 'power2.in' });
    t.to(closeBtn, { opacity: 0, duration: 0.15 }, 0);

    // Efface le trait
    t.to(expansionBorder, {
      clipPath: 'inset(0 100% 0 0)',
      duration: 0.3,
      ease: 'power2.in',
    }, 0.1);

    // Cache la zone
    t.to(expansionZone, { opacity: 0, duration: 0.2 }, 0.2);

    t.call(() => {
      expansionZone.classList.remove('active');
      expansionZone.setAttribute('aria-hidden', 'true');
      gsap.set(expansionBorder, { opacity: 0 });
      closeBtn.classList.remove('visible');
      floatingZone.classList.remove('collapsed');
      document.querySelectorAll('.grid-panel').forEach(p => p.classList.remove('active'));

      if (activeCard) {
        activeCard.style.animation = '';
      }
    }, [], 0.4);

    // Remet la carte à sa position d'origine
    const cover  = activeCard.querySelector<HTMLElement>('.folder-cover');
    const papers = activeCard.querySelectorAll<HTMLElement>('.folder-paper');

    // Referme le dossier
    if (cover) {
      t.to(cover, { rotateX: 0, duration: 0.4, ease: 'power2.in' }, 0.4);
    }
    if (papers) {
      t.to(papers, { opacity: 0, y: 80, duration: 0.3, stagger: 0.1 }, 0.3);
    }

    const index = parseInt(activeCard.dataset.index ?? '0');
    const pos = positions[index];

    t.to(activeCard, {
      top: pos.top,
      left: pos.left,
      rotation: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, 0.3);

    // Réapparition des autres cartes
    const allCards = document.querySelectorAll<HTMLElement>('.floating-card');
    t.to(allCards, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
      pointerEvents: 'auto',
      stagger: 0.06,
    }, 0.5);
  }

  // Écoute clics sur les cartes
  document.querySelectorAll<HTMLElement>('.floating-card').forEach(card => {
    card.addEventListener('click', () => {
      if (isOpen && card === activeCard) {
        // Carte active cliquée → ferme
        closeCategory();
      } else if (!isOpen) {
        // Ouvre
        const category = card.dataset.category;
        if (category) openCategory(category, card);
      }
    });
  });

  closeBtn.addEventListener('click', closeCategory);

  function attachIframeEvents() {
    const overlay = document.getElementById('iframe-overlay');
    const iframe  = document.getElementById('banner-iframe') as HTMLIFrameElement;
    if (!overlay || !iframe) return;

    document.querySelectorAll<HTMLElement>('.banner-card').forEach(card => {
      if (card.dataset.bound) return; // évite les doublons
      card.dataset.bound = '1';
      card.addEventListener('click', () => {
        const name = card.dataset.name;
        if (!name) return;
        iframe.style.opacity = '0';
        iframe.style.width   = '300px';
        iframe.style.height  = '250px';
        iframe.setAttribute('scrolling', 'no');
        iframe.src = `/crea/${name}/index.html`;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        startResize(iframe);
      });
    });

    document.querySelectorAll<HTMLElement>('.email-card').forEach(card => {
      if (card.dataset.bound) return;
      card.dataset.bound = '1';
      card.addEventListener('click', () => {
        const name = card.dataset.name;
        if (!name) return;
        iframe.style.opacity = '0';
        iframe.style.width   = '600px';
        iframe.style.height  = '80vh';
        iframe.setAttribute('scrolling', 'yes');
        iframe.src = `/emails/${name}/index.html`;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        iframe.onload = () => {
          iframe.style.opacity = '1';
          iframe.onload = null;
        };
      });
    });
  }

  let resizeInterval: ReturnType<typeof setInterval>;

  function startResize(iframe: HTMLIFrameElement) {
    clearInterval(resizeInterval);
    let attempts = 0;

    resizeInterval = setInterval(() => {
      attempts++;
      const target = iframe.contentWindow?.document.body?.children[0];

      if (!target) {
        if (attempts > 50) {
          clearInterval(resizeInterval);
          iframe.style.opacity = '1'; // fallback
        }
        return;
      }

      const x = (target as HTMLElement).clientWidth;
      const y = (target as HTMLElement).clientHeight;

      if (x === 0 || y === 0) return;

      iframe.style.width  = x + 'px';
      iframe.style.height = y + 'px';

      clearInterval(resizeInterval);
      // Affiche l'iframe une fois redimensionnée
      iframe.style.opacity = '1';

    }, 100);
  }

  function isMobile() {
    return window.innerWidth <= 900;
  }