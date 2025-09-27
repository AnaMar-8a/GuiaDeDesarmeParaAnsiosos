// Espera a que todo el contenido del HTML se haya cargado antes de ejecutar el script.
// Es una buena práctica para evitar errores si el script intenta manipular elementos que aún no existen.
document.addEventListener('DOMContentLoaded', () => {

    // --- MÓDULO 1: NAVEGACIÓN DE DIAPOSITIVAS ---

    // Selección de todos los elementos necesarios del HTML
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Variables para controlar el estado de la presentación
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Función para mostrar una diapositiva específica
    function showSlide(index) {
        // Primero, oculta todas las diapositivas quitando la clase 'active'
        slides.forEach((slide) => slide.classList.remove('active'));
        // Luego, muestra solo la diapositiva del índice deseado añadiendo la clase 'active'
        if (slides[index]) {
            slides[index].classList.add('active');
        }
    }

    // Función para ir a la siguiente diapositiva
    function nextSlide() {
        // El operador '%' (módulo) asegura que el contador vuelva a 0 al llegar al final, creando un bucle.
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // Función para ir a la diapositiva anterior
    function prevSlide() {
        // Lógica para retroceder y volver al final si estamos en la primera diapositiva.
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Asignación de los eventos a los botones y a las teclas del teclado
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        else if (e.key === 'ArrowLeft') prevSlide();
    });

    // Muestra la primera diapositiva al cargar la página
    showSlide(currentSlide);

    // --- MÓDULO 2: LÓGICA DE POP-UPS Y MODALES ---

    const popupOverlay = document.getElementById('popup-overlay');
    // Selecciona todos los elementos que pueden activar un pop-up
    const triggers = document.querySelectorAll('.author-trigger, .info-button');

    // Objeto que contiene toda la información de los pop-ups. Es como una base de datos.
    const popupContents = {
        // Autores
        galtung: { type: 'author', title: 'Johan Galtung', text: 'Sociólogo noruego, fundador de los estudios sobre la paz. Diferenció entre paz negativa (ausencia de guerra) y paz positiva (presencia de justicia y equidad), y conceptualizó la violencia directa, estructural y cultural.', colorClass: 'bg-popup-galtung' },
        lederach: { type: 'author', title: 'John Paul Lederach', text: 'Experto en transformación de conflictos. Propone ver el conflicto como una oportunidad para el cambio social y la construcción de relaciones, enfocándose en la reconciliación desde las bases comunitarias.', colorClass: 'bg-popup-lederach' },
        munoz: { type: 'author', title: 'Francisco A. Muñoz', text: 'Historiador español que propone el concepto de "Paz Imperfecta". Sostiene que la paz no es un estado final y perfecto, sino un proceso dinámico, lleno de contradicciones, que se construye constantemente.', colorClass: 'bg-popup-munoz' },
        bourdieu: { type: 'author', title: 'Pierre Bourdieu', text: 'Sociólogo francés cuya teoría de la "violencia simbólica" explica cómo las estructuras de dominación se naturalizan e interiorizan, haciendo que la desigualdad parezca normal y legitimando la violencia estructural.', colorClass: 'bg-popup-bourdieu' },
        // Sudáfrica
        'sa-origenes': { type: 'case', title: 'Orígenes del Conflicto', text: '<p class="text-left">La segregación racial fue practicada desde las primeras colonias neerlandesas (1652). Con la llegada de colonos europeos (Afrikáners), se consolidó un sistema de dominación. En 1948, el Partido Nacional institucionalizó el <strong>Apartheid</strong> como política de Estado, basado en la ideología de que razas diferentes no podían convivir en igualdad.</p>', colorClass: 'bg-popup-munoz case-modal' },
        'sa-timeline': { type: 'case', title: 'Línea de Tiempo', text: `<div class="timeline text-left"><div class="timeline-item"><strong>1652:</strong> Primeras colonias neerlandesas e inicio de la segregación.</div><div class="timeline-item"><strong>1948:</strong> Institucionalización del Apartheid.</div><div class="timeline-item"><strong>1960:</strong> Masacre de Sharpeville y radicalización de la resistencia.</div><div class="timeline-item"><strong>1964:</strong> Encarcelamiento de Nelson Mandela (27 años).</div><div class="timeline-item"><strong>1990:</strong> Liberación de Mandela e inicio de la transición.</div><div class="timeline-item"><strong>1994:</strong> Primeras elecciones democráticas multirraciales.</div></div>`, colorClass: 'bg-popup-munoz case-modal' },
        'sa-paz': { type: 'case', title: 'Arquitectura de Paz', text: '<p class="text-left">La pieza central fue la <strong>Comisión de la Verdad y la Reconciliación (CVR)</strong>, liderada por Desmond Tutu. Su mandato fue recoger más de 22,000 testimonios en audiencias públicas televisadas. Se basó en el principio de <strong>"verdad por amnistía"</strong>, donde los perpetradores que confesaban crímenes políticamente motivados podían recibir amnistía, priorizando la verdad sobre el castigo retributivo.</p>', colorClass: 'bg-popup-munoz case-modal' },
        // Irlanda del Norte
        'in-origenes': { type: 'case', title: 'Orígenes del Conflicto', text: '<p class="text-left">El conflicto tiene raíces en la colonización del Úlster en el siglo XVII, cuando colonos protestantes ingleses y escoceses se asentaron en tierras de irlandeses católicos. Esto generó una división sectaria que se profundizó con las Leyes Penales (1695) que prohibían derechos a los católicos y la partición de Irlanda en 1921, que creó Irlanda del Norte con mayoría protestante dentro del Reino Unido.</p>', colorClass: 'bg-popup-galtung case-modal' },
        'in-timeline': { type: 'case', title: 'Línea de Tiempo', text: `<div class="timeline text-left"><div class="timeline-item"><strong>1609:</strong> "Plantación del Úlster", colonos protestantes desplazan a católicos.</div><div class="timeline-item"><strong>1695:</strong> Leyes Penales restringen derechos de los católicos.</div><div class="timeline-item"><strong>1921:</strong> Partición de Irlanda y creación de Irlanda del Norte.</div><div class="timeline-item"><strong>1968:</strong> Movimiento por los derechos civiles católicos. Inicio de "The Troubles".</div><div class="timeline-item"><strong>1998:</strong> Firma del Acuerdo de Viernes Santo.</div></div>`, colorClass: 'bg-popup-galtung case-modal' },
        'in-paz': { type: 'case', title: 'Arquitectura de Paz', text: '<div class="text-left"><p>El Acuerdo de Viernes Santo se basa en varios pilares:</p><ul class="list-disc list-inside mt-2"><li><strong>Gobierno compartido:</strong> Sistema proporcional para asegurar la representación de ambas comunidades en el ejecutivo.</li><li><strong>Doble mayoría:</strong> Decisiones cruciales requieren apoyo tanto de unionistas como de nacionalistas.</li><li><strong>Principio de consentimiento:</strong> El estatus de Irlanda del Norte como parte del Reino Unido solo puede cambiar si una mayoría en la región lo desea.</li><li><strong>Dimensión transfronteriza:</strong> Creación de instituciones Norte-Sur (con la República de Irlanda) y Este-Oeste (con Gran Bretaña).</li></ul></div>`, colorClass: 'bg-popup-galtung case-modal' },
        // Guatemala
        'gt-origenes': { type: 'case', title: 'Orígenes del Conflicto', text: '<p class="text-left">El conflicto armado (1960-1996) tiene raíces estructurales en la extrema desigualdad sobre la distribución de tierras, donde una élite de ascendencia europea y compañías extranjeras controlaban la mayor parte del territorio, en detrimento de la población campesina, mayoritariamente indígena maya. Esto generó un levantamiento armado en un contexto de represión estatal y Guerra Fría.</p>', colorClass: 'bg-popup-lederach case-modal' },
        'gt-timeline': { type: 'case', title: 'Línea de Tiempo', text: `<div class="timeline text-left"><div class="timeline-item"><strong>1954:</strong> Golpe de estado respaldado por la CIA derroca al gobierno electo de Jacobo Árbenz.</div><div class="timeline-item"><strong>1960:</strong> Un alzamiento de oficiales del ejército da inicio al conflicto armado interno.</div><div class="timeline-item"><strong>1978-83:</strong> Período de mayor violencia y genocidio contra la población maya.</div><div class="timeline-item"><strong>1996:</strong> Firma de los Acuerdos de Paz Firme y Duradera.</div></div>`, colorClass: 'bg-popup-lederach case-modal' },
        'gt-paz': { type: 'case', title: 'Aprendizajes Clave', text: '<p class="text-left">La guerra civil dejó más de <strong>200,000 personas asesinadas</strong>, de las cuales el 83% eran mayas. La Comisión para el Esclarecimiento Histórico (CEH) concluyó que el 93% de las violaciones a los DDHH fueron perpetradas por fuerzas estatales y grupos paramilitares. El principal aprendizaje de Guatemala es el desafío de la <strong>implementación</strong>: aunque los acuerdos eran ambiciosos en derechos indígenas y reformas sociales, su cumplimiento ha sido limitado por falta de voluntad política y la persistencia de las estructuras de poder.</p>', colorClass: 'bg-popup-lederach case-modal' }
    };

    // Asigna el evento de clic a cada activador de pop-up
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el clic se propague a otros elementos
            const popupId = trigger.dataset.popup || trigger.dataset.modal;
            const content = popupContents[popupId];
            
            if (content) {
                // Construye el HTML del pop-up dinámicamente
                popupOverlay.innerHTML = `
                    <div class="popup-content ${content.colorClass}">
                        <span class="popup-close">&times;</span>
                        <h4>${content.title}</h4>
                        <div class="text-lg">${content.text}</div>
                    </div>
                `;
                // Muestra el pop-up
                popupOverlay.classList.add('visible');
            }
        });
    });

    // Evento para cerrar el pop-up
    popupOverlay.addEventListener('click', function(e) {
        // Se cierra si se hace clic en el fondo oscuro (overlay) o en el botón de cerrar (X)
        if (e.target === this || e.target.classList.contains('popup-close')) {
            this.classList.remove('visible');
        }
    });

    // --- MÓDULO 3: ANIMACIÓN DE FONDO (CANVAS) ---

    const canvas = document.getElementById('dynamic-background');
    const ctx = canvas.getContext('2d');
    let width, height, circles;
    const circleCount = 20;
    const colors = ['#8A2B74', '#B8321B', '#e48a31', '#f2c03b', '#5a1a1a'];

    // Función para ajustar el tamaño del canvas a la ventana
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        circles = [];
        for (let i = 0; i < circleCount; i++) circles.push(new Circle());
    }

    // Clase que define cómo es y cómo se comporta cada círculo
    class Circle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1; // Velocidad horizontal
            this.vy = (Math.random() - 0.5) * 1; // Velocidad vertical
            this.radius = Math.random() * 40 + 10;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            // Lógica para que los círculos reboten en los bordes
            if (this.x - this.radius < 0 || this.x + this.radius > width) this.vx *= -1;
            if (this.y - this.radius < 0 || this.y + this.radius > height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color + '60'; // Añade transparencia al color
            ctx.fill();
        }
    }

    // Bucle de animación que se ejecuta continuamente
    function animate() {
        ctx.clearRect(0, 0, width, height); // Limpia el canvas en cada fotograma
        circles.forEach(c => {
            c.update();
            c.draw();
        });
        requestAnimationFrame(animate); // Llama a la función de nuevo para el siguiente fotograma
    }

    // Evento para reajustar la animación si cambia el tamaño de la ventana
    window.addEventListener('resize', resize);
    
    // Inicia todo el proceso
    resize();
    animate();
});

