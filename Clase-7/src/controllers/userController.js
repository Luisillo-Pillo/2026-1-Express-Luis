let users = [
    { id: 1, name: "Gallo" },
    { id: 2, name: "Potro" },
    { id: 3, name: "Ché Guevara" },
    { id: 4, name: "Naomi Lira" },
    { id: 5, name: "America Muñiz" },
    { id: 6, name: "La Manzana" },
    { id: 7, name: "Guillermo" }
];

const getUsers = (req, res) => {
    res.json(users);
};

const getUserById = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1 ) {
        return res
            .status(400)
            .json({ message: "El ID debe ser un entero mayor o igual a 1" });
    }

    let user = users.find((u) => u.id === id);

    if ( !user ) {
        res.status(404).json({ message: "El Id no existe" });
    }

    return res.json(user);
};

export { getUsers, getUserById };