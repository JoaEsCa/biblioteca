const API_URL = "http://localhost:3001/api/games";

// GET - Obtener juegos
export const getGames = async () => {
    const res = await fetch(API_URL);
    return res.json();
};

// POST - Crear juego
export const createGame = async (game) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(game),
    });
    return res.json();
};

// PUT - Actualizar juego
export const updateGame = async (id, game) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(game),
    });
    return res.json();
};

// DELETE - Eliminar juego
export const deleteGame = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
};
