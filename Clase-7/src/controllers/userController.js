let users = [
    { id: 1, name: "Gallo" },
    { id: 2, name: "Potro" },
    { id: 3, name: "Ché Guevara" },
    { id: 4, name: "Naomi Lira" },
    { id: 5, name: "America Muñiz" },
    { id: 6, name: "La Manzana" },
    { id: 7, name: "Guillermo" }
];

const parseId = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1 ) {
        res
            .status(400)
            .json({ message: "El ID debe ser un entero mayor o igual a 1" });
            return null;
    };

    return id;
};

const findUserIndexById = (id) => users.findIndex((u) => u.id === id);

const validateName = (req, res) => {
    const { name } = req.body;
    if ( name === undefined || name === null ) {
        res.status(400).json({ message: "El campo name es obligatorio" });
        return null;
    } else if ( name !== undefined) {
        if (typeof name !== "string") {
            res.status(400).json({ message: "El campo name debe ser un string" });
            return null;
        } else {
            const trimmed = name.trim();
            if (trimmed.length < 2) {
                res.status(400).json({ message: "El campo name debe tener al menos 2 caracteres" });
                return null;
            };
            return trimmed;
        };
    };
    return undefined;
};

const getUsers = (req, res) => {
    res.json(users);
};

const getUserById = (req, res) => {
    const id = parseId(req, res);
    if (id === null) return;
    
    let user = users.find((u) => u.id === id);

    if ( !user ) {
        res.status(404).json({ message: "El Id no existe" });
    }

    return res.json(user);
};

const createUser = (req, res) => {
    const name = validateName(req, res);
    if ( name === null || name === undefined) return;

    const nextId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = {id:nextId, name};
    users.push(newUser);

    return res.status(201).json(newUser);
};

const updateUser = (req, res) => {
    const id = parseId(req, res);
    if ( id === null) return;

    const index = findUserIndexById(id);

    if (index === -1) {
        return res.status(404).json({ message: "El ID no existe" });
    };

    const name = validateName(req, res);
    if (name === null || name === undefined) return;

    const updated = {id, name};
    users[index] = updated;
    return res.jeson(updated);
};

const deleteUser = (req, res) => {
    const name = validateName(req, res);
    if ( name === null || name === undefined) return;
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };