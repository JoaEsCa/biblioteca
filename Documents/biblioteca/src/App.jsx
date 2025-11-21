import React, { useState, useMemo } from 'react';
// Componente principal de la aplicación.
const App = () => {
    // --- 1. Datos de Ejemplo (Placeholder) ---
    const initialGameData = [
        { id: 1, title: "Animal Crossing: New Horizons", genre: "Simulación", platform: "Switch", releaseYear: 2020, rating: 5.0, cover: "https://placehold.co/150x200/f472b6/ffffff?text=ACNH" },
        { id: 2, title: "Starfield", genre: "RPG", platform: "PC", releaseYear: 2023, rating: 4.5, cover: "https://placehold.co/150x200/7c3aed/ffffff?text=Starfield" },
        { id: 3, title: "The Sims 4: Wedding Stories", genre: "Simulación", platform: "PC", releaseYear: 2022, rating: 4.2, cover: "https://placehold.co/150x200/ec4899/ffffff?text=Sims" },
        { id: 4, title: "Final Fantasy XVI", genre: "RPG", platform: "PS5", releaseYear: 2023, rating: 4.8, cover: "https://placehold.co/150x200/be185d/ffffff?text=FFXVI" },
        { id: 5, title: "Hogwarts Legacy", genre: "Aventura", platform: "PS5", releaseYear: 2023, rating: 4.9, cover: "https://placehold.co/150x200/9d174d/ffffff?text=Hogwarts" },
        { id: 6, title: "Stardew Valley", genre: "Simulación", platform: "Switch", releaseYear: 2016, rating: 4.7, cover: "https://placehold.co/150x200/db2777/000000?text=Stardew" },
        { id: 7, title: "Overwatch 2", genre: "Shooter", platform: "PC", releaseYear: 2022, rating: 4.1, cover: "https://placehold.co/150x200/4c0519/ffffff?text=OW2" },
        { id: 8, title: "Palia", genre: "MMO", platform: "Switch", releaseYear: 2023, rating: 4.6, cover: "https://placehold.co/150x200/fbcfe8/000000?text=Palia" },
    ];

    const uniqueGenres = useMemo(() => [...new Set(initialGameData.map(game => game.genre))], [initialGameData]);
    const uniquePlatforms = useMemo(() => [...new Set(initialGameData.map(game => game.platform))], [initialGameData]);


    // --- 2. Estados de la Aplicación ---
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('Todos');
    const [selectedPlatform, setSelectedPlatform] = useState('Todas');
    const [sortBy, setSortBy] = useState('rating');
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const [interestData, setInterestData] = useState({ name: '', email: '' });
    const [formMessage, setFormMessage] = useState('');


    // --- 3. Lógica de Filtrado y Ordenamiento ---
    const filteredGames = useMemo(() => {
        let games = [...initialGameData];

        if (searchTerm) {
            games = games.filter(game =>
                game.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedGenre !== 'Todos') {
            games = games.filter(game => game.genre === selectedGenre);
        }

        if (selectedPlatform !== 'Todas') {
            games = games.filter(game => game.platform === selectedPlatform);
        }

        games.sort((a, b) => {
            if (sortBy === 'title') {
                return a.title.localeCompare(b.title);
            } else if (sortBy === 'releaseYear') {
                return b.releaseYear - a.releaseYear;
            } else if (sortBy === 'rating') {
                return b.rating - a.rating;
            }
            return 0;
        });

        return games;
    }, [searchTerm, selectedGenre, selectedPlatform, sortBy, initialGameData]);

    // --- 4. Manejo del Formulario de Interés ---
    const handleInterestChange = (e) => {
        const { name, value } = e.target;
        setInterestData(prev => ({ ...prev, [name]: value }));
    };

    const handleInterestSubmit = (e) => {
        e.preventDefault();
        setFormMessage('');

        if (!interestData.name || !interestData.email) {
            setFormMessage('Error: Por favor, introduce tu nombre y correo electrónico.');
            return;
        }

        console.log("Datos de interés enviados:", interestData);
        setFormMessage(`¡Gracias, ${interestData.name}! Estarás al tanto de todas las novedades.`);
        
        setInterestData({ name: '', email: '' });
        setTimeout(() => setFormMessage(''), 5000);
    };


    // --- 5. Componente Tarjeta de Juego (GameCard) ---
    const GameCard = ({ game }) => {
        const renderRating = (rating) => {
            // Símbolos de estrella Unicode (para mejor visualización)
            const fullStars = '★'.repeat(Math.floor(rating));
            const halfStar = (rating % 1 !== 0) ? '½' : ''; // Usar medio bloque si se requiere
            const emptyStars = '☆'.repeat(5 - Math.ceil(rating));
            
            return (
                <div className="rating-stars">
                    <span className="text-pink-400 mr-1">
                        {/* Icono de Corazón en lugar de Estrella para el toque "Pink Hub" */}
                        <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
                    </span>
                    <span className="text-yellow-300">{fullStars}</span>
                    <span className="text-yellow-300">{halfStar}</span>
                    <span className="text-gray-500">{emptyStars}</span>
                    <span className="ml-2 text-sm text-gray-400 font-bold">({rating})</span>
                </div>
            );
        };

        const platformColor = {
            'PC': 'bg-pink-700',
            'PS5': 'bg-fuchsia-700',
            'Switch': 'bg-rose-700',
            'Xbox': 'bg-purple-700',
        }[game.platform] || 'bg-gray-700';

        return (
            <div className="game-card">
                {/* Imagen/Cover */}
                <div className="card-cover">
                    <img
                        src={game.cover}
                        alt={`Portada de ${game.title}`}
                        className="cover-image"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/150x200/1e0a1b/f472b6?text=Cover+Missing";
                        }}
                    />
                </div>

                {/* Detalles del Juego */}
                <div className="flex-1 text-white flex flex-col justify-between">
                    <div>
                        <h2 className="card-title">{game.title}</h2>
                        <p className="text-sm text-gray-400 mb-3 font-semibold">
                            Año: <span className="font-medium text-pink-200">{game.releaseYear}</span>
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <span className={`platform-tag ${platformColor}`}>
                                {game.platform}
                            </span>
                            <span className="genre-tag">
                                {game.genre}
                            </span>
                        </div>
                        {renderRating(game.rating)}
                    </div>

                    <button
                        className="play-button"
                        onClick={() => console.log(`Abriendo perfil de ${game.title}...`)}
                    >
                        Ver Detalle 🌸
                    </button>
                </div>
            </div>
        );
    };


    // --- 6. Renderizado de la Interfaz (JSX) ---
    return (
        <div className="app-container">
            {/* Script para cargar Tailwind CSS */}
            <script src="https://cdn.tailwindcss.com"></script>

            {/* Aislamiento del CSS: Estilos Profesionales en Rosa */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Playfair+Display:ital,wght@1,500&display=swap');
                
                /* -------------------------------------- */
                /* 1. ESTILOS GLOBALES Y UTILIDADES */
                /* -------------------------------------- */
                body { 
                    font-family: 'Inter', sans-serif; 
                    background-color: #000000ff; /* Fondo base muy oscuro */
                }
                .app-container {
                    min-height: 100vh;
                    background-color: #830e60ff; /* Fondo principal más suave que el body */
                    padding-top: 5rem;
                }
                .main-content-padding {
                    /* Max-width para centrar el contenido y asegurar márgenes invisibles */
                    padding: 40px 20px; 
                    max-width: 1200px; /* Incrementado a 1200px para más espacio */
                    margin-left: auto;
                    margin-right: auto;
                }
                .accent-color { color: #f472b6; } /* Pink-400 */
                .rose-gold-text { color: #fbcfe8; } /* Rose Gold light */

                /* -------------------------------------- */
                /* 2. HEADER CENTRADO Y NAVEGACIÓN */
                /* -------------------------------------- */
                .app-header-nav {
                    position: fixed; top: 0; left: 0; width: 100%; z-index: 50;
                    background-color: #140212ff; /* Fondo de la barra de navegación */
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.9); /* Sombra más fuerte y llamativa */
                    padding: 1rem 20px;
                }
                .nav-inner {
                    max-width: 1200px; margin: 0 auto;
                    display: flex; align-items: center; 
                    justify-content: space-between; 
                }
                /* En desktop, centramos los links alrededor del logo */
                @media (min-width: 768px) {
                    .nav-inner {
                        justify-content: space-around; 
                    }
                }

                .nav-logo-text {
                    font-family: 'Playfair Display', serif; 
                    font-size: 1.8rem; font-weight: 500; color: #fbcfe8; 
                    text-shadow: 0 0 8px rgba(253, 164, 175, 0.7); /* Sombra de texto más intensa */
                    white-space: nowrap; 
                    overflow: hidden; 
                    text-overflow: ellipsis; 
                    max-width: 80%; 
                }
                @media (min-width: 768px) {
                    .nav-logo-text {
                        max-width: none;
                        font-size: 2rem; /* Logo más grande en desktop */
                    }
                }

                .nav-link {
                    padding: 0.5rem 1rem; color: #fbcfe8; font-weight: 400;
                    border-radius: 9999px; transition: all 250ms;
                }
                .nav-link:hover {
                    background-color: #581845;
                    color: #fff;
                    box-shadow: 0 0 15px #f472b6; /* Sombra en hover para los links */
                }
                
                /* Botón Hamburguesa Móvil */
                .hamburger-button {
                    color: #fbcfe8; padding: 0.5rem; border-radius: 0.5rem;
                    background-color: #a21caf; 
                    transition: transform 200ms;
                }

                .mobile-menu-open { max-height: 200px; opacity: 1; transition: max-height 300ms ease-in-out, opacity 300ms ease-in; }
                .mobile-menu-closed { max-height: 0; opacity: 0; overflow: hidden; transition: max-height 300ms ease-in-out, opacity 300ms ease-out; }

                /* -------------------------------------- */
                /* 3. PANEL DE FILTROS (Tarjeta Elevada) */
                /* -------------------------------------- */
                .filters-panel {
                    background: linear-gradient(135deg, #0f030bff, #3f0f35);
                    padding: 30px;
                    border-radius: 1.5rem; 
                    box-shadow: 0 15px 40px rgba(92, 16, 82, 0.5); /* Sombra más pronunciada */
                    margin-bottom: 3rem;
                    border: 1px solid #701a75; 
                }
                .filters-panel-grid {
                    display: grid; grid-template-columns: repeat(1, 1fr); gap: 1.5rem; /* Aumento de espacio */
                }
                @media (min-width: 768px) {
                    .filters-panel-grid {
                        grid-template-columns: repeat(4, 1fr);
                    }
                }
                .form-label { color: #fbcfe8; font-weight: 600; }
                .form-input-select {
                    width: 100%; padding: 0.75rem; border: 1px solid #701a75;
                    background-color: #1a0817; 
                    color: #ffffff; border-radius: 0.75rem; 
                    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.6); /* Sombra interna para profundidad */
                    -webkit-appearance: none; -moz-appearance: none; appearance: none;
                    padding-left: 2.5rem; 
                    transition: border-color 0.2s;
                }
                .form-input-select:focus {
                    border-color: #f472b6;
                    outline: none;
                }
                .search-input-container {
                    position: relative; 
                }
                .search-icon { 
                    color: #fbcfe8; 
                    position: absolute; 
                    left: 0.75rem; 
                    top: 50%; 
                    transform: translateY(-50%);
                    width: 1.25rem; 
                    height: 1.25rem;
                    z-index: 10; /* Asegurar que el icono esté encima */
                } 

                /* -------------------------------------- */
                /* 4. TARJETA DE JUEGO (ROWS y COLUMNS) */
                /* -------------------------------------- */
                .game-cards-container {
                    display: flex;
                    overflow-x: auto; 
                    gap: 2rem; /* Más espacio entre tarjetas */
                    padding-bottom: 2rem;
                    scrollbar-color: #f472b6 #2e0a29;
                    scrollbar-width: thin;
                }
                .game-cards-container > .game-card {
                    flex-shrink: 0; 
                    width: 320px; 
                }

                @media (min-width: 768px) {
                    .game-cards-container {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); /* Tarjetas ligeramente más anchas */
                        overflow-x: hidden; 
                        gap: 2rem;
                    }
                    .game-cards-container > .game-card {
                        width: auto;
                    }
                }

                .game-card {
                    background-color: #2e0a29; 
                    padding: 20px;
                    border-radius: 1.5rem; 
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.8); /* Sombra más oscura y profunda */
                    cursor: pointer;
                    display: flex; flex-direction: column; gap: 1.5rem;
                    transition: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    border: 1px solid transparent;
                    min-height: 24rem; /* Altura mínima aumentada */
                }
                @media (min-width: 768px) {
                    .game-card { flex-direction: row; min-height: 16rem; } /* Altura mínima en desktop */
                }

                .game-card:hover {
                    box-shadow: 0 0 40px rgba(253, 164, 175, 0.7); /* Sombra Rose Gold/Pink MÁS LLAMATIVA en hover */
                    transform: translateY(-10px) scale(1.02); /* Efecto de elevación sutil */
                    border: 1px solid #f472b6;
                }
                .card-cover {
                    flex-shrink: 0; width: 100%; height: 14rem; background-color: #1a0817; /* Altura de cover aumentada */
                    border-radius: 1rem; overflow: hidden;
                }
                @media (min-width: 768px) {
                    .card-cover { width: 10rem; height: 14rem; }
                }
                .cover-image { width: 100%; height: 100%; object-fit: cover; }
                .card-title {
                    font-size: 1.6rem; font-weight: 700; color: #fff;
                    margin-bottom: 0.5rem; border-bottom: 3px solid #fda4af; 
                    padding-bottom: 0.25rem;
                }
                .platform-tag {
                    font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.75rem;
                    border-radius: 9999px; color: #ffffff;
                }
                .genre-tag {
                    font-size: 0.875rem; color: #fbcfe8; border: 1px solid #fbcfe8;
                    padding: 0.25rem 0.75rem; border-radius: 9999px; background-color: rgba(251, 207, 232, 0.1);
                }
                .rating-stars { display: flex; align-items: center; color: #fef08a; font-size: 1.25rem; }
                .play-button { 
                    margin-top: 1.5rem; background-image: linear-gradient(to right, #ec4899 0%, #db2777 100%); /* Gradiente llamativo */
                    color: #ffffff; font-weight: 800; padding: 0.75rem 1.5rem; border-radius: 0.75rem; 
                    transition: all 250ms ease; 
                    box-shadow: 0 6px 20px -3px rgba(236, 72, 153, 0.8); /* Sombra intensa */
                    width: 100%;
                }
                .play-button:hover { 
                    background-image: linear-gradient(to right, #db2777 0%, #ec4899 100%);
                    transform: translateY(-5px); /* Efecto de "clic" o levantamiento */
                }
                @media (min-width: 768px) { 
                    .play-button { width: auto; }
                }

                /* -------------------------------------- */
                /* 5. FORMULARIO DE INTERÉS */
                /* -------------------------------------- */
                .interest-card {
                    background: linear-gradient(160deg, #581845, #831843); 
                    padding: 50px; border-radius: 2rem;
                    box-shadow: 0 15px 50px rgba(0, 0, 0, 1.0); /* Sombra muy oscura y definida */
                    margin-bottom: 3rem;
                    border: 1px solid #f472b6;
                }
                .form-input-interest {
                    width: 100%; padding: 0.75rem; border: 1px solid #fda4af;
                    background-color: #1a0817; color: #ffffff; border-radius: 0.75rem;
                    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.6);
                    transition: all 200ms;
                }
                .form-input-interest:focus {
                     border-color: #f472b6;
                     box-shadow: 0 0 0 4px rgba(244, 114, 182, 0.6); /* Anillo de foco más grueso */
                     outline: none;
                }
                .submit-button {
                    background-image: linear-gradient(to right, #f472b6 0%, #ec4899 100%);
                    color: #1a0817; font-weight: 800;
                    padding: 0.75rem 1.5rem; border-radius: 0.75rem; transition: all 200ms;
                    box-shadow: 0 6px 20px rgba(244, 114, 182, 0.8);
                    width: 100%;
                }
                .submit-button:hover { 
                    background-image: linear-gradient(to right, #ec4899 0%, #f472b6 100%); 
                    transform: translateY(-2px);
                }
                .success-message { padding: 0.75rem; background-color: #f472b6; color: #1a0817; border-radius: 0.5rem; font-weight: 600; text-align: center; }
                .error-message { padding: 0.75rem; background-color: #dc2626; color: #ffffff; border-radius: 0.5rem; font-weight: 600; text-align: center; }
                
                /* -------------------------------------- */
                /* 6. FOOTER (Arreglo de Espaciado) */
                /* -------------------------------------- */
                .app-footer {
                    background-color: #2e0a29;
                    padding: 30px 20px; color: #fbcfe8;
                }
                .footer-links-container {
                    display: flex;
                    justify-content: center; /* Centrado perfecto */
                    align-items: center;
                    flex-wrap: wrap; /* Para que se adapte bien en móvil */
                    margin-top: 1rem;
                }
                .footer-link { 
                    transition: color 200ms; color: #f472b6; 
                    padding: 0 1rem; /* Espaciado horizontal para los enlaces */
                    position: relative;
                }
                .footer-link:not(:last-child)::after {
                    content: '|'; /* Separador vertical */
                    position: absolute;
                    right: 0;
                    color: #701a75; /* Color sutil */
                }
                .footer-link:hover { color: #fff; }
            `}</style>
            
            {/* --- HEADER/NAVBAR FIJO (Corregido el Logo y Centrado) --- */}
            <nav className="app-header-nav">
                <div className="nav-inner">
                    {/* Logo Corregido: Sin duplicación y con espacio */}
                    <a href="#inicio" className="nav-logo-text flex items-center">
                        <span className="text-pink-400 mr-2">💎</span>
                        Pink Hub <span className="hidden md:inline mx-1">|</span> Luxury Game Catalog
                        <span className="text-pink-400 ml-2 hidden md:inline">💎</span>
                    </a>
                    
                    {/* Botones de Navegación (Desktop) */}
                    <div className="hidden md:flex space-x-6">
                        <a href="#inicio" className="nav-link">Inicio</a>
                        <a href="#juegos" className="nav-link">Catálogo Exclusivo</a>
                        <a href="#interes" className="nav-link">Acceso VIP</a>
                        <a href="#contacto" className="nav-link">Soporte</a>
                    </div>
                    
                    {/* Botón Hamburguesa (Mobile) */}
                    <button
                        className="md:hidden hamburger-button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        {/* Icono de Menú */}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            )}
                        </svg>
                    </button>
                </div>

                {/* Menú Desplegable (Mobile) */}
                <div id="mobile-menu" className={`md:hidden ${isMenuOpen ? 'mobile-menu-open' : 'mobile-menu-closed'} mt-2`}>
                    <div className="flex flex-col space-y-2 p-3 bg-fuchsia-900 rounded-lg">
                        <a href="#inicio" className="nav-link text-center" onClick={() => setIsMenuOpen(false)}>Inicio</a>
                        <a href="#juegos" className="nav-link text-center" onClick={() => setIsMenuOpen(false)}>Catálogo Exclusivo</a>
                        <a href="#interes" className="nav-link text-center" onClick={() => setIsMenuOpen(false)}>Acceso VIP</a>
                        <a href="#contacto" className="nav-link text-center" onClick={() => setIsMenuOpen(false)}>Soporte</a>
                    </div>
                </div>
            </nav>


            {/* --- CONTENIDO PRINCIPAL CENTRADO --- */}
            <div className="main-content-padding">
             
                {/* Sección de Inicio */}
                <header id="inicio" className="text-center mb-16 pt-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-3">
                        Bienvenida a <span className="accent-color">Pink Hub</span>
                    </h1>
                    <p className="text-xl text-gray-300 font-light">
                        Una curaduría de títulos digitales con estilo.
                    </p>
                </header>
                
                {/* --- PANEL DE FILTROS Y BÚSQUEDA (Centrado y Llamativo) --- */}
                <div className="filters-panel">
                    <h2 className="text-2xl font-bold rose-gold-text mb-6 border-b border-pink-700 pb-2 text-center">
                        Define tu Experiencia
                    </h2>

                    <div className="filters-panel-grid">
                        {/* Búsqueda por Título (Icono visible) */}
                        <div>
                            <label htmlFor="search" className="form-label">Título</label>
                            <div className="search-input-container">
                                <input
                                    type="text"
                                    id="search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Busca por nombre..."
                                    className="form-input-select"
                                />
                                {/* Icono de Lupa - Corregido el posicionamiento */}
                                <svg className="search-icon" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                        </div>

                        {/* Filtro por Género */}
                        <div>
                            <label htmlFor="genre" className="form-label">Género</label>
                            <select
                                id="genre"
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)}
                                className="form-input-select pl-3" // Remove left padding for select fields
                            >
                                <option value="Todos">Todos</option>
                                {uniqueGenres.map(genre => (
                                    <option key={genre} value={genre}>{genre}</option>
                                ))}
                            </select>
                        </div>

                        {/* Filtro por Plataforma */}
                        <div>
                            <label htmlFor="platform" className="form-label">Plataforma</label>
                            <select
                                id="platform"
                                value={selectedPlatform}
                                onChange={(e) => setSelectedPlatform(e.target.value)}
                                className="form-input-select pl-3" // Remove left padding for select fields
                            >
                                <option value="Todas">Todas</option>
                                {uniquePlatforms.map(platform => (
                                    <option key={platform} value={platform}>{platform}</option>
                                ))}
                            </select>
                        </div>

                        {/* Ordenar por */}
                        <div>
                            <label htmlFor="sort" className="form-label">Ordenar por</label>
                            <select
                                id="sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="form-input-select pl-3" // Remove left padding for select fields
                            >
                                <option value="rating">Calificación (Mayor)</option>
                                <option value="title">Título (A-Z)</option>
                                <option value="releaseYear">Año (Reciente)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* --- SECCIÓN DE JUEGOS (CATÁLOGO - Centrado) --- */}
                <section id="juegos">
                    <h3 className="text-xl font-medium text-pink-200 mb-8 text-center md:text-left">
                        Títulos Destacados (<span className="font-bold">{filteredGames.length}</span> encontrados)
                    </h3>

                    {filteredGames.length === 0 ? (
                        <div className="text-center p-10 bg-rose-900/30 border border-rose-700/50 rounded-xl max-w-lg mx-auto shadow-xl">
                            <p className="text-xl text-pink-300">
                                💔 No hay títulos que coincidan con esta selección.
                            </p>
                            <button
                                className="mt-4 bg-pink-700 hover:bg-pink-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-lg"
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedGenre('Todos');
                                    setSelectedPlatform('Todas');
                                }}
                            >
                                Limpiar Filtros
                            </button>
                        </div>
                    ) : (
                        <div className="game-cards-container">
                            {filteredGames.map(game => (
                                <GameCard key={game.id} game={game} />
                            ))}
                        </div>
                    )}
                </section>
                
                {/* --- SECCIÓN DE INTERÉS (Acceso VIP) --- */}
                <section id="interes" className="my-20">
                    <div className="interest-card max-w-3xl mx-auto"> {/* Centrado con mx-auto */}
                        <h2 className="text-4xl font-extrabold text-white mb-4 text-center">
                            Regístrate para Acceso <span className="accent-color">VIP</span>
                        </h2>
                        <p className="text-pink-200 mb-8 text-center">
                            Sé la primera en recibir notificaciones sobre nuevos lanzamientos y eventos exclusivos. ¡Tu dosis de lujo digital!
                        </p>

                        <form onSubmit={handleInterestSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="form-label mb-2 block">Nombre Completo</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={interestData.name}
                                        onChange={handleInterestChange}
                                        className="form-input-interest"
                                        placeholder="Tu nombre elegante"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="form-label mb-2 block">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={interestData.email}
                                        onChange={handleInterestChange}
                                        className="form-input-interest"
                                        placeholder="Tu correo exclusivo"
                                    />
                                </div>
                            </div>
                            
                            <button type="submit" className="submit-button flex items-center justify-center"> {/* Centrado de texto en el botón */}
                                Quiero mi Acceso VIP ✨
                            </button>

                            {formMessage && (
                                <div className={`mt-4 ${formMessage.startsWith('Error') ? 'error-message' : 'success-message'}`}>
                                    {formMessage}
                                </div>
                            )}
                        </form>
                    </div>
                </section>
            </div>
            {/* --- FOOTER (Corregido el Espaciado de los Enlaces) --- */}
            <footer id="contacto" className="app-footer text-center">
                <p className="text-lg font-semibold mb-2">
                    Pink Hub | Luxury Game Catalog
                </p>
                <p className="text-sm mb-4 text-gray-400">
                    © {new Date().getFullYear()} Todos los derechos reservados a la exclusividad.
                </p>
                <div className="footer-links-container">
                    <a href="#" className="footer-link">Política de Privacidad</a>
                    <a href="#" className="footer-link">Términos de Servicio</a>
                    <a href="mailto:soporte@pinkhub.com" className="footer-link">Contacto</a>
                </div>
            </footer>
        </div>
    );
};

export default App;